import docx
import re
import json
from collections import defaultdict

def extract_razan_word_data():
    """
    Extract data from Razan's Word document and parse the statistics.
    """
    
    print("📄 Extracting data from Razan's Word document...")
    print("=" * 60)
    
    # Read the Word document
    doc = docx.Document('Task6_ Report.docx')
    content = '\n'.join([p.text for p in doc.paragraphs if p.text.strip()])
    
    print("📋 Document Content Summary:")
    print("-" * 40)
    
    # Extract conversation counts
    conversation_counts = {}
    case_data = defaultdict(list)
    
    # Parse the content
    lines = content.split('\n')
    current_date = None
    current_case = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Extract dates and conversation counts
        if 'Conversation of' in line:
            current_date = line
            print(f"📅 {line}")
        elif 'Total number of conversations:' in line:
            count_match = re.search(r'Total number of conversations: (\d+)', line)
            if count_match:
                count = int(count_match.group(1))
                conversation_counts[current_date] = count
                print(f"   📊 Total conversations: {count}")
        
        # Extract case information
        elif line.startswith('For Case'):
            current_case = line
            print(f"   📋 {line}")
        elif current_case and line and not line.startswith('For Case'):
            # This is case data
            case_data[current_case].append(line)
    
    # Parse case statistics
    print("\n📈 Parsing Case Statistics:")
    print("-" * 40)
    
    case_statistics = defaultdict(int)
    
    for case, data in case_data.items():
        print(f"\n🔍 {case}:")
        for item in data:
            # Extract numbers from patterns like "No reason (11)"
            number_match = re.search(r'\((\d+)\)', item)
            if number_match:
                count = int(number_match.group(1))
                case_statistics[case] += count
                print(f"   ✅ {item} -> {count}")
            else:
                print(f"   📝 {item}")
    
    # Calculate totals
    total_conversations = sum(conversation_counts.values())
    total_cases = sum(case_statistics.values())
    
    print(f"\n🎯 SUMMARY:")
    print(f"   Total Conversations: {total_conversations}")
    print(f"   Total Cases: {total_cases}")
    
    # Create structured data
    razan_data = {
        'overview': {
            'total_conversations': total_conversations,
            'dates': conversation_counts,
            'total_cases': total_cases
        },
        'case_statistics': dict(case_statistics),
        'raw_content': content
    }
    
    return razan_data

def update_comprehensive_statistics(razan_data):
    """
    Update the comprehensive statistics with Razan's Word document data.
    """
    
    print("\n🔄 Updating Comprehensive Statistics...")
    print("=" * 60)
    
    # Load existing comprehensive statistics
    with open('comprehensive_statistics.json', 'r', encoding='utf-8') as f:
        comprehensive_stats = json.load(f)
    
    # Add Razan's data
    razan_conversations = razan_data['overview']['total_conversations']
    comprehensive_stats['overview']['total_conversations'] += razan_conversations
    comprehensive_stats['overview']['total_files_processed'] += 1
    
    # Update assignee breakdown
    if 'Razan Word Document' not in comprehensive_stats['assignee_breakdown']:
        comprehensive_stats['assignee_breakdown']['Razan Word Document'] = 0
    comprehensive_stats['assignee_breakdown']['Razan Word Document'] += razan_conversations
    
    # Add Razan's case statistics to label analysis
    for case, count in razan_data['case_statistics'].items():
        case_label = f"Razan - {case}"
        if case_label in comprehensive_stats['label_analysis']:
            comprehensive_stats['label_analysis'][case_label] += count
        else:
            comprehensive_stats['label_analysis'][case_label] = count
    
    # Add Razan's data to the statistics
    comprehensive_stats['razan_word_data'] = razan_data
    
    # Save updated comprehensive statistics
    with open('comprehensive_statistics_updated.json', 'w', encoding='utf-8') as f:
        json.dump(comprehensive_stats, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Updated comprehensive statistics saved to 'comprehensive_statistics_updated.json'")
    print(f"📊 New total conversations: {comprehensive_stats['overview']['total_conversations']}")
    
    return comprehensive_stats

if __name__ == "__main__":
    # Extract Razan's Word document data
    razan_data = extract_razan_word_data()
    
    # Update comprehensive statistics
    updated_stats = update_comprehensive_statistics(razan_data)
    
    print(f"\n🎯 FINAL SUMMARY:")
    print(f"   Original conversations: 406")
    print(f"   Razan Word document conversations: {razan_data['overview']['total_conversations']}")
    print(f"   Total conversations: {updated_stats['overview']['total_conversations']}")
    print(f"   Total files processed: {updated_stats['overview']['total_files_processed']}")
    
    # Generate updated dashboard data
    from comprehensive_statistics_analyzer import generate_dashboard_data
    updated_dashboard_data = generate_dashboard_data(updated_stats)
    
    # Save updated dashboard data
    with open('dashboard_data_updated.json', 'w', encoding='utf-8') as f:
        json.dump(updated_dashboard_data, f, indent=2, ensure_ascii=False)
    
    print(f"🎯 Updated dashboard data saved to 'dashboard_data_updated.json'")
    print(f"📊 You can now update the React dashboard with the combined data!")
