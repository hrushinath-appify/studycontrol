const fs = require('fs');
const path = require('path');

// Read the videos.ts file
const filePath = path.join(__dirname, 'client/lib/mock-data/videos.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract the VideosData array from the file
const dataMatch = fileContent.match(/export const VideosData: VideosData\[\] = (\[[\s\S]*?\]);/);

if (!dataMatch) {
  console.log('Could not extract VideosData');
  process.exit(1);
}

try {
  // Create a safe evaluation context
  const VideosData = eval(dataMatch[1]);
  
  console.log('=== DATA STRUCTURE ANALYSIS ===');
  console.log('Total subjects:', VideosData.length);
  
  // Analyze subjects
  const subjects = VideosData.map(item => item.subject);
  const uniqueSubjects = [...new Set(subjects)];
  console.log('Unique subjects:', uniqueSubjects.length);
  console.log('Subject duplicates:', subjects.length - uniqueSubjects.length);
  
  if (subjects.length !== uniqueSubjects.length) {
    console.log('\n=== DUPLICATE SUBJECTS ===');
    const subjectCounts = {};
    subjects.forEach(subject => {
      subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
    });
    Object.entries(subjectCounts).forEach(([subject, count]) => {
      if (count > 1) {
        console.log(`- ${subject}: ${count} times`);
      }
    });
  }
  
  // Analyze topics
  const allTopics = [];
  VideosData.forEach(subjectData => {
    subjectData.topics.forEach(topicData => {
      allTopics.push({
        subject: subjectData.subject,
        topic: topicData.topic
      });
    });
  });
  
  const topicNames = allTopics.map(item => item.topic);
  const uniqueTopics = [...new Set(topicNames)];
  console.log('\nTotal topics:', topicNames.length);
  console.log('Unique topics:', uniqueTopics.length);
  console.log('Topic duplicates:', topicNames.length - uniqueTopics.length);
  
  if (topicNames.length !== uniqueTopics.length) {
    console.log('\n=== DUPLICATE TOPICS ===');
    const topicCounts = {};
    allTopics.forEach(item => {
      const key = item.topic;
      if (!topicCounts[key]) {
        topicCounts[key] = { count: 0, subjects: new Set() };
      }
      topicCounts[key].count++;
      topicCounts[key].subjects.add(item.subject);
    });
    
    Object.entries(topicCounts).forEach(([topic, data]) => {
      if (data.count > 1) {
        console.log(`- "${topic}": ${data.count} times`);
        console.log(`  Subjects: ${Array.from(data.subjects).join(', ')}`);
      }
    });
  }
  
  // Analyze titles (subtopics)
  const allTitles = [];
  VideosData.forEach(subjectData => {
    subjectData.topics.forEach(topicData => {
      topicData.subtopics.forEach(subtopicData => {
        allTitles.push({
          subject: subjectData.subject,
          topic: topicData.topic,
          title: subtopicData.title
        });
      });
    });
  });
  
  const titleNames = allTitles.map(item => item.title);
  const uniqueTitles = [...new Set(titleNames)];
  console.log('\nTotal titles:', titleNames.length);
  console.log('Unique titles:', uniqueTitles.length);
  console.log('Title duplicates:', titleNames.length - uniqueTitles.length);
  
  if (titleNames.length !== uniqueTitles.length) {
    console.log('\n=== DUPLICATE TITLES ===');
    const titleCounts = {};
    allTitles.forEach(item => {
      const key = item.title;
      if (!titleCounts[key]) {
        titleCounts[key] = { count: 0, locations: [] };
      }
      titleCounts[key].count++;
      titleCounts[key].locations.push(`${item.subject} > ${item.topic}`);
    });
    
    Object.entries(titleCounts).forEach(([title, data]) => {
      if (data.count > 1) {
        console.log(`\n- "${title}": ${data.count} times`);
        data.locations.forEach((location, index) => {
          console.log(`  ${index + 1}. ${location}`);
        });
      }
    });
  }
  
  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total items: ${subjects.length} subjects, ${topicNames.length} topics, ${titleNames.length} titles`);
  console.log(`Duplicates: ${subjects.length - uniqueSubjects.length} subjects, ${topicNames.length - uniqueTopics.length} topics, ${titleNames.length - uniqueTitles.length} titles`);
  
} catch (error) {
  console.error('Error parsing data:', error.message);
  process.exit(1);
}