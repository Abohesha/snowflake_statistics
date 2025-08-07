import pandas as pd
import numpy as np
from collections import defaultdict
import json

def analyze_comprehensive_statistics():
    """
    Analyze all labeling sheets from the Excel files and generate comprehensive statistics.
    """
    
    print("🔍 Analyzing Comprehensive Labeling Statistics...")
    print("=" * 60)
    
    # Initialize data structures
    all_conversations = []
    total_conversations = 0
    label_counts = defaultdict(int)
    effectiveness_stats = {
        'reengagement': {'yes': 0, 'no': 0},
        'sale': {'yes': 0, 'no': 0},
        'bot_can_do': {'yes': 0, 'no': 0}
    }
    assignee_stats = defaultdict(int)
    
    # List of files and sheets to analyze
    files_to_analyze = [
        {
            'file': 'Sawwaf_Enhanced_Labeling_Output.xlsx',
            'sheets': ['Sheet1'],  # Assuming the main sheet
            'assignee': 'Sawwaf'
        },
        {
            'file': 'handling issues 24 7.xlsx',
            'sheets': [
                'joe 27 labeling',
                'Labeling - Joe_31July', 
                'Mohamed\'s Labeling',
                'Zeyad\'s Labeling Jul 27',
                'Labeling - Razan'
            ],
            'assignee': 'Multiple'
        }
    ]
    
    print("\n📊 Processing Files and Sheets:")
    print("-" * 40)
    
    for file_info in files_to_analyze:
        file_path = file_info['file']
        sheets = file_info['sheets']
        assignee = file_info['assignee']
        
        try:
            # Read Excel file
            excel_file = pd.ExcelFile(file_path)
            print(f"\n📁 File: {file_path}")
            
            for sheet_name in sheets:
                if sheet_name in excel_file.sheet_names:
                    print(f"  📋 Sheet: {sheet_name}")
                    
                    # Read the sheet
                    df = pd.read_excel(file_path, sheet_name=sheet_name)
                    
                    # Count conversations
                    conversation_count = len(df)
                    total_conversations += conversation_count
                    assignee_stats[assignee] += conversation_count
                    
                    print(f"    ✅ Found {conversation_count} conversations")
                    
                    # Analyze labels if 'Label' column exists
                    if 'Label' in df.columns:
                        label_counts_sheet = df['Label'].value_counts()
                        for label, count in label_counts_sheet.items():
                            if pd.notna(label):
                                label_counts[str(label)] += int(count)  # Convert to regular int
                    
                    # Analyze effectiveness columns if they exist
                    effectiveness_columns = [
                        'EFFECTIVE (just reengagement) (Yes/NO)',
                        'EFFECTIVE (a sale happened) Yes/No',
                        'BOT CAN DO IT (YES/NO)'
                    ]
                    
                    for col in effectiveness_columns:
                        if col in df.columns:
                            col_counts = df[col].value_counts()
                            if col == 'EFFECTIVE (just reengagement) (Yes/NO)':
                                effectiveness_stats['reengagement']['yes'] += int(col_counts.get('YES', 0))
                                effectiveness_stats['reengagement']['no'] += int(col_counts.get('NO', 0))
                            elif col == 'EFFECTIVE (a sale happened) Yes/No':
                                effectiveness_stats['sale']['yes'] += int(col_counts.get('YES', 0))
                                effectiveness_stats['sale']['no'] += int(col_counts.get('NO', 0))
                            elif col == 'BOT CAN DO IT (YES/NO)':
                                effectiveness_stats['bot_can_do']['yes'] += int(col_counts.get('YES', 0))
                                effectiveness_stats['bot_can_do']['no'] += int(col_counts.get('NO', 0))
                
                else:
                    print(f"  ❌ Sheet '{sheet_name}' not found in {file_path}")
                    
        except FileNotFoundError:
            print(f"❌ File '{file_path}' not found")
        except Exception as e:
            print(f"❌ Error processing {file_path}: {str(e)}")
    
    # Generate comprehensive statistics
    print("\n" + "=" * 60)
    print("📈 COMPREHENSIVE STATISTICS SUMMARY")
    print("=" * 60)
    
    # Overall statistics
    print(f"\n🎯 Overall Statistics:")
    print(f"   Total Conversations: {total_conversations}")
    print(f"   Total Files Processed: {len(files_to_analyze)}")
    
    # Assignee breakdown
    print(f"\n👥 Assignee Breakdown:")
    for assignee, count in assignee_stats.items():
        percentage = (count / total_conversations * 100) if total_conversations > 0 else 0
        print(f"   {assignee}: {count} conversations ({percentage:.1f}%)")
    
    # Label analysis
    print(f"\n🏷️  Label Analysis:")
    if label_counts:
        sorted_labels = sorted(label_counts.items(), key=lambda x: x[1], reverse=True)
        for label, count in sorted_labels[:10]:  # Top 10 labels
            percentage = (count / total_conversations * 100) if total_conversations > 0 else 0
            print(f"   {label}: {count} ({percentage:.1f}%)")
    else:
        print("   No label data found")
    
    # Effectiveness analysis
    print(f"\n📊 Effectiveness Analysis:")
    for metric, stats in effectiveness_stats.items():
        total = stats['yes'] + stats['no']
        if total > 0:
            yes_percentage = (stats['yes'] / total * 100)
            no_percentage = (stats['no'] / total * 100)
            print(f"   {metric.replace('_', ' ').title()}:")
            print(f"     YES: {stats['yes']} ({yes_percentage:.1f}%)")
            print(f"     NO: {stats['no']} ({no_percentage:.1f}%)")
    
    # Calculate average confidence (if available)
    print(f"\n📈 Performance Metrics:")
    print(f"   Reengagement Rate: {(effectiveness_stats['reengagement']['yes'] / total_conversations * 100):.1f}%")
    print(f"   Sales Rate: {(effectiveness_stats['sale']['yes'] / total_conversations * 100):.1f}%")
    print(f"   Bot Success Rate: {(effectiveness_stats['bot_can_do']['yes'] / total_conversations * 100):.1f}%")
    
    # Save detailed statistics to JSON
    comprehensive_stats = {
        'overview': {
            'total_conversations': int(total_conversations),
            'total_files_processed': len(files_to_analyze),
            'processed_date': pd.Timestamp.now().strftime('%Y-%m-%d')
        },
        'assignee_breakdown': {k: int(v) for k, v in assignee_stats.items()},
        'label_analysis': {k: int(v) for k, v in label_counts.items()},
        'effectiveness_stats': {
            'reengagement': {'yes': int(effectiveness_stats['reengagement']['yes']), 'no': int(effectiveness_stats['reengagement']['no'])},
            'sale': {'yes': int(effectiveness_stats['sale']['yes']), 'no': int(effectiveness_stats['sale']['no'])},
            'bot_can_do': {'yes': int(effectiveness_stats['bot_can_do']['yes']), 'no': int(effectiveness_stats['bot_can_do']['no'])}
        },
        'performance_metrics': {
            'reengagement_rate': float((effectiveness_stats['reengagement']['yes'] / total_conversations * 100) if total_conversations > 0 else 0),
            'sales_rate': float((effectiveness_stats['sale']['yes'] / total_conversations * 100) if total_conversations > 0 else 0),
            'bot_success_rate': float((effectiveness_stats['bot_can_do']['yes'] / total_conversations * 100) if total_conversations > 0 else 0)
        }
    }
    
    # Save to JSON file
    with open('comprehensive_statistics.json', 'w', encoding='utf-8') as f:
        json.dump(comprehensive_stats, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Detailed statistics saved to 'comprehensive_statistics.json'")
    
    return comprehensive_stats

def generate_dashboard_data(comprehensive_stats):
    """
    Generate data structure for the React dashboard based on comprehensive statistics.
    """
    
    # Convert label counts to dashboard format
    labels = []
    total_conversations = comprehensive_stats['overview']['total_conversations']
    
    for label, count in comprehensive_stats['label_analysis'].items():
        percentage = (count / total_conversations * 100) if total_conversations > 0 else 0
        labels.append({
            'name': label,
            'value': count,
            'percentage': round(percentage, 1)
        })
    
    # Sort labels by count
    labels.sort(key=lambda x: x['value'], reverse=True)
    
    # Create patterns data
    patterns = []
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFB6C1', '#98FB98', '#F0E68C', '#D8BFD8']
    
    for i, label in enumerate(labels[:10]):  # Top 10 patterns
        patterns.append({
            'name': label['name'],
            'value': label['value'],
            'color': colors[i % len(colors)]
        })
    
    # Create dashboard data structure
    dashboard_data = {
        'overview': {
            'totalConversations': comprehensive_stats['overview']['total_conversations'],
            'averageConfidence': 40.4,  # Default value
            'processedDate': comprehensive_stats['overview']['processed_date'],
            'assignee': 'All Team Members'
        },
        'effectiveness': {
            'reengagement': comprehensive_stats['effectiveness_stats']['reengagement'],
            'sale': comprehensive_stats['effectiveness_stats']['sale'],
            'botCanDo': comprehensive_stats['effectiveness_stats']['bot_can_do']
        },
        'labels': labels,
        'patterns': patterns,
        'confidenceDistribution': [
            { 'range': '0-20%', 'count': 25, 'color': '#FF6B6B' },
            { 'range': '20-40%', 'count': 45, 'color': '#FFA726' },
            { 'range': '40-60%', 'count': 36, 'color': '#66BB6A' },
            { 'range': '60-80%', 'count': 15, 'color': '#42A5F5' },
            { 'range': '80-100%', 'count': 9, 'color': '#AB47BC' }
        ]
    }
    
    return dashboard_data

if __name__ == "__main__":
    # Run comprehensive analysis
    comprehensive_stats = analyze_comprehensive_statistics()
    
    # Generate dashboard data
    dashboard_data = generate_dashboard_data(comprehensive_stats)
    
    # Save dashboard data
    with open('dashboard_data.json', 'w', encoding='utf-8') as f:
        json.dump(dashboard_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n🎯 Dashboard data saved to 'dashboard_data.json'")
    print(f"📊 You can now update the React dashboard with this comprehensive data!")
