#!/usr/bin/env python3
import re
from collections import defaultdict, Counter

# Read the videos.ts file
with open('/Users/rishi/studyControl/client/lib/mock-data/videos.ts', 'r') as f:
    content = f.read()

print('=== ANALYZING DUPLICATE DATA ===')
print(f'File size: {len(content)} characters')

# Extract all subjects
subject_pattern = r'subject:\s*"([^"]+)"'
subjects = re.findall(subject_pattern, content)

# Extract all topics  
topic_pattern = r'topic:\s*"([^"]+)"'
topics = re.findall(topic_pattern, content)

# Extract all titles
title_pattern = r'title:\s*"([^"]+)"'
titles = re.findall(title_pattern, content)

print(f'\nFound: {len(subjects)} subjects, {len(topics)} topics, {len(titles)} titles')

# Analyze subject duplicates
subject_counts = Counter(subjects)
subject_duplicates = {subject: count for subject, count in subject_counts.items() if count > 1}

print(f'\n=== SUBJECTS ===')
print(f'Total subjects: {len(subjects)}')
print(f'Unique subjects: {len(set(subjects))}')
print(f'Subject duplicates: {len(subjects) - len(set(subjects))}')

if subject_duplicates:
    print('\nDUPLICATE SUBJECTS:')
    for subject, count in sorted(subject_duplicates.items()):
        print(f'- "{subject}": {count} times')
else:
    print('No duplicate subjects found.')

# Analyze topic duplicates
topic_counts = Counter(topics)
topic_duplicates = {topic: count for topic, count in topic_counts.items() if count > 1}

print(f'\n=== TOPICS ===')
print(f'Total topics: {len(topics)}')
print(f'Unique topics: {len(set(topics))}')
print(f'Topic duplicates: {len(topics) - len(set(topics))}')

if topic_duplicates:
    print('\nDUPLICATE TOPICS:')
    for topic, count in sorted(topic_duplicates.items()):
        print(f'- "{topic}": {count} times')
        
        # Find which subjects contain this topic
        subject_topic_pattern = rf'subject:\s*"([^"]+)"[\s\S]*?topic:\s*"{re.escape(topic)}"'
        subjects_with_topic = re.findall(subject_topic_pattern, content)
        if subjects_with_topic:
            print(f'  Found in subjects: {", ".join(set(subjects_with_topic))}')
else:
    print('No duplicate topics found.')

# Analyze title duplicates
title_counts = Counter(titles)
title_duplicates = {title: count for title, count in title_counts.items() if count > 1}

print(f'\n=== TITLES ===')
print(f'Total titles: {len(titles)}')
print(f'Unique titles: {len(set(titles))}')
print(f'Title duplicates: {len(titles) - len(set(titles))}')

if title_duplicates:
    print(f'\nDUPLICATE TITLES ({len(title_duplicates)} unique duplicated titles):')
    
    # Sort by frequency (most duplicated first)
    sorted_title_duplicates = sorted(title_duplicates.items(), key=lambda x: x[1], reverse=True)
    
    for i, (title, count) in enumerate(sorted_title_duplicates[:20], 1):  # Show top 20
        print(f'\n{i}. "{title}": {count} times')
        
        # Find the context (subject > topic) for each occurrence
        # Look for the pattern: subject -> topic -> title
        title_pattern_with_context = rf'subject:\s*"([^"]+)"[\s\S]*?topic:\s*"([^"]+)"[\s\S]*?title:\s*"{re.escape(title)}"'
        contexts = re.findall(title_pattern_with_context, content)
        
        if contexts:
            for j, (subject, topic) in enumerate(contexts, 1):
                print(f'   {j}. {subject} > {topic}')
        else:
            # Fallback: try to find any nearby subject/topic
            print(f'   (Could not determine exact context for "{title}")')
    
    if len(title_duplicates) > 20:
        print(f'\n... and {len(title_duplicates) - 20} more duplicated titles')
else:
    print('No duplicate titles found.')

# Summary statistics
print(f'\n=== SUMMARY STATISTICS ===')
print(f'Total items: {len(subjects)} subjects, {len(topics)} topics, {len(titles)} titles')
print(f'Unique items: {len(set(subjects))} subjects, {len(set(topics))} topics, {len(set(titles))} titles')
print(f'Duplicates: {len(subjects) - len(set(subjects))} subjects, {len(topics) - len(set(topics))} topics, {len(titles) - len(set(titles))} titles')

if title_duplicates:
    max_duplicates = max(title_duplicates.values())
    most_duplicated = [title for title, count in title_duplicates.items() if count == max_duplicates]
    print(f'Most duplicated title(s): {max_duplicates} occurrences')
    for title in most_duplicated[:3]:  # Show top 3
        print(f'  - "{title}"')

print('\n=== UNIQUE SUBJECTS LIST ===')
for subject in sorted(set(subjects)):
    print(f'- {subject}')