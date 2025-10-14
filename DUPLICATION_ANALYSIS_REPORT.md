# Video Data Duplication Analysis Report

## Overview
- **Total Data**: 19 subjects, 158 topics, 1292 titles
- **Unique Data**: 18 subjects, 144 topics, 1225 titles
- **Duplications**: 1 subject, 14 topics, 67 titles

## Critical Issues Found

### 1. Subject Duplication
**Problem**: "Biochemistry" appears 2 times
- This suggests a data structure issue where Biochemistry content is split across multiple subject entries

### 2. Topic Duplications (14 instances)
**Cross-subject topic duplicates**:
- `Bioenergetics` - appears in both Anatomy and Biochemistry
- `Carbohydrates` - appears in both Anatomy and Biochemistry  
- `Enzymology` - appears in both Anatomy and Biochemistry
- `General Topics` - appears in both Anatomy and Biochemistry
- `Lipids` - appears in both Anatomy and Biochemistry
- `Molecular Biology` - appears in both Anatomy and Biochemistry
- `Proteins & Amino Acids` - appears in both Anatomy and Biochemistry
- `Vitamins` - appears in both Anatomy and Biochemistry

**Cross-subject medical system duplicates**:
- `CARDIOVASCULAR SYSTEM` - appears in both Anatomy and Community Medicine
- `Endocrine System` - appears in both Anatomy and Microbiology
- `GASTROINTESTINAL SYSTEM` - appears in both Anatomy and Community Medicine
- `HEMATOLOGY` - appears in both Anatomy and Community Medicine
- `MISCELLANEOUS - E8` - appears in both Anatomy and Community Medicine
- `RESPIRATORY SYSTEM` - appears in both Anatomy and Community Medicine

### 3. Title Duplications (67 instances)
**Major issue**: Many Biochemistry titles are incorrectly placed under "Anatomy > Embryology"

**Most problematic duplicates**:
1. `Gametogenesis` - appears in both Anatomy > Embryology and Biochemistry > General Topics
2. `How to Approach Biochemistry Edition 8` - appears in Anatomy > Embryology (wrong!)
3. `Metabolism in Fed and Fasting State` - appears in Anatomy > Embryology (wrong!)
4. `Introduction to Enzymes` - appears in Anatomy > Embryology (wrong!)
5. `Classification of Enzymes` - appears in Anatomy > Embryology (wrong!)
6. `Enzyme Kinetics` - appears in Anatomy > Embryology (wrong!)
7. `Chemistry of Carbohydrates` - appears in Anatomy > Embryology (wrong!)
8. `Glycolysis: Part 1` - appears in Anatomy > Embryology (wrong!)
9. `Pyruvate Dehydrogenase` - appears in Anatomy > Embryology (wrong!)

## Root Cause Analysis

### Primary Issue: Data Mixing
The main problem appears to be **Biochemistry content incorrectly categorized under Anatomy > Embryology**. This suggests:

1. **Copy-paste errors** during data entry
2. **Incorrect subject assignment** for biochemistry topics
3. **Missing data validation** during content creation

### Secondary Issues:
1. **Duplicate subject entries** for Biochemistry
2. **Cross-subject topic overlap** without proper categorization
3. **Inconsistent naming conventions** (some topics use ALL CAPS, others don't)

## Recommendations

### Immediate Actions:
1. **Fix Biochemistry categorization**: Move all biochemistry titles from "Anatomy > Embryology" to appropriate Biochemistry topics
2. **Consolidate duplicate Biochemistry subject**: Merge the two Biochemistry entries
3. **Review cross-subject topics**: Decide if topics like "Cardiovascular System" should exist in multiple subjects or be consolidated

### Data Quality Improvements:
1. **Implement validation rules**: Ensure biochemistry topics don't appear under anatomy
2. **Standardize naming**: Decide on consistent capitalization for topic names
3. **Add content review process**: Validate subject-topic-title hierarchy before adding new content

### Suggested Clean-up Priority:
1. **High Priority**: Fix biochemistry titles in anatomy (affects 47+ titles)
2. **Medium Priority**: Consolidate duplicate subjects and topics
3. **Low Priority**: Standardize naming conventions

## Impact Assessment
- **Data Integrity**: Severely compromised due to content miscategorization
- **User Experience**: Users looking for biochemistry content in anatomy will be confused
- **Search/Filter Functionality**: Filtering by subject won't work correctly
- **Content Discovery**: Related content is scattered across wrong categories

This analysis shows significant data quality issues that should be addressed before production deployment.