#!/usr/bin/env python3
import re
import json
from collections import defaultdict, Counter

# Read the videos.ts file
with open('/Users/rishi/studyControl/client/lib/mock-data/videos.ts', 'r') as f:
    content = f.read()

# Extract the VideosData array using regex
data_match = re.search(r'export const VideosData: VideosData\[\] = (\[[\s\S]*?\]);', content)

if not data_match:
    print('Could not extract VideosData')
    exit(1)

# Parse the TypeScript array (simplified parsing)
data_str = data_match.group(1)

# Count subjects, topics, and titles manually by parsing the structure
subjects = []
topics = []
titles = []

# Split by main subject blocks
subject_blocks = re.findall(r'{\s*subject:\s*"([^"]+)"[\s\S]*?topics:\s*\[([\s\S]*?)\]\s*},?', data_str)

print('=== DATA STRUCTURE ANALYSIS ===')
print(f'Total subject blocks found: {len(subject_blocks)}')

for subject_name, topics_content in subject_blocks:
    subjects.append(subject_name)
    
    # Find all topics within this subject
    topic_matches = re.findall(r'{\s*topic:\s*"([^"]+)"[\s\S]*?subtopics:\s*\[([\s\S]*?)\]', topics_content)
    
    for topic_name, subtopics_content in topic_matches:
        topics.append((subject_name, topic_name))
        
        # Find all titles within this topic
        title_matches = re.findall(r'title:\s*"([^"]+)"', subtopics_content)
        
        for title in title_matches:
            titles.append((subject_name, topic_name, title))

print(f'Total subjects: {len(subjects)}')
print(f'Total topics: {len(topics)}')
print(f'Total titles: {len(titles)}')

# Analyze subject duplicates
subject_counts = Counter(subjects)
subject_duplicates = {subject: count for subject, count in subject_counts.items() if count > 1}

print(f'Unique subjects: {len(set(subjects))}')
print(f'Subject duplicates: {len(subjects) - len(set(subjects))}')

if subject_duplicates:
    print('\n=== DUPLICATE SUBJECTS ===')
    for subject, count in subject_duplicates.items():
        print(f'- "{subject}": {count} times')

# Analyze topic duplicates
topic_names = [topic[1] for topic in topics]
topic_counts = Counter(topic_names)
topic_duplicates = {topic: count for topic, count in topic_counts.items() if count > 1}

print(f'\nUnique topics: {len(set(topic_names))}')
print(f'Topic duplicates: {len(topic_names) - len(set(topic_names))}')

if topic_duplicates:
    print('\n=== DUPLICATE TOPICS ===')
    for topic_name, count in topic_duplicates.items():
        print(f'- "{topic_name}": {count} times')
        # Find which subjects contain this topic
        subjects_with_topic = [topic[0] for topic in topics if topic[1] == topic_name]
        print(f'  Subjects: {", ".join(set(subjects_with_topic))}')

# Analyze title duplicates
title_names = [title[2] for title in titles]
title_counts = Counter(title_names)
title_duplicates = {title: count for title, count in title_counts.items() if count > 1}

print(f'\nUnique titles: {len(set(title_names))}')
print(f'Title duplicates: {len(title_names) - len(set(title_names))}')

if title_duplicates:
    print('\n=== DUPLICATE TITLES ===')
    for title_name, count in title_duplicates.items():
        print(f'\n- "{title_name}": {count} times')
        # Find all locations of this title
        locations = [(title[0], title[1]) for title in titles if title[2] == title_name]
        for i, (subject, topic) in enumerate(locations, 1):
            print(f'  {i}. {subject} > {topic}')

# Summary
print('\n=== SUMMARY ===')
print(f'Total items: {len(subjects)} subjects, {len(topics)} topics, {len(titles)} titles')
print(f'Duplicates: {len(subjects) - len(set(subjects))} subjects, {len(topic_names) - len(set(topic_names))} topics, {len(title_names) - len(set(title_names))} titles')

# Most frequent duplicates
if title_duplicates:
    print('\n=== MOST DUPLICATED TITLES ===')
    sorted_duplicates = sorted(title_duplicates.items(), key=lambda x: x[1], reverse=True)
    for title, count in sorted_duplicates[:10]:  # Top 10
        print(f'- "{title}": {count} times')