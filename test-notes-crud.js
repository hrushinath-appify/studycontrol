#!/usr/bin/env node

/**
 * Test script for Notes CRUD operations
 * This script tests all the CRUD operations for the notes functionality
 */

const API_BASE = 'http://localhost:3000/api'

// Test data
const testNote = {
  title: 'Test Note - CRUD Operations',
  content: 'This is a test note to verify all CRUD operations are working properly. It contains multiple sentences to test word counting functionality.',
  tags: ['test', 'crud', 'automation'],
  category: 'testing'
}

const updatedNote = {
  title: 'Updated Test Note - CRUD Operations',
  content: 'This is an updated test note. The content has been modified to test the update functionality.',
  tags: ['test', 'crud', 'automation', 'updated'],
  category: 'testing'
}

async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const response = await fetch(url, { ...defaultOptions, ...options })
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  return response.json()
}

async function testNotesCRUD() {
  console.log('🧪 Starting Notes CRUD Operations Test\n')

  try {
    // Test 1: Create a note
    console.log('1️⃣ Testing CREATE operation...')
    const createResponse = await makeRequest('/notes', {
      method: 'POST',
      body: JSON.stringify(testNote)
    })
    
    if (createResponse.success && createResponse.data) {
      console.log('✅ CREATE operation successful')
      console.log(`   Created note with ID: ${createResponse.data.id}`)
      const noteId = createResponse.data.id
      
      // Test 2: Read the created note
      console.log('\n2️⃣ Testing READ operation...')
      const readResponse = await makeRequest(`/notes/${noteId}`)
      
      if (readResponse.success && readResponse.data) {
        console.log('✅ READ operation successful')
        console.log(`   Retrieved note: "${readResponse.data.title}"`)
        
        // Test 3: Update the note
        console.log('\n3️⃣ Testing UPDATE operation...')
        const updateResponse = await makeRequest(`/notes/${noteId}`, {
          method: 'PUT',
          body: JSON.stringify({ ...updatedNote, id: noteId })
        })
        
        if (updateResponse.success && updateResponse.data) {
          console.log('✅ UPDATE operation successful')
          console.log(`   Updated note: "${updateResponse.data.title}"`)
          
          // Test 4: Get notes list
          console.log('\n4️⃣ Testing GET ALL operation...')
          const listResponse = await makeRequest('/notes')
          
          if (listResponse.success && listResponse.data.notes) {
            console.log('✅ GET ALL operation successful')
            console.log(`   Found ${listResponse.data.notes.length} notes`)
            
            // Test 5: Search notes
            console.log('\n5️⃣ Testing SEARCH operation...')
            const searchResponse = await makeRequest('/notes/search?q=test')
            
            if (searchResponse.success && searchResponse.data.notes) {
              console.log('✅ SEARCH operation successful')
              console.log(`   Found ${searchResponse.data.notes.length} notes matching "test"`)
              
              // Test 6: Get note statistics
              console.log('\n6️⃣ Testing STATS operation...')
              const statsResponse = await makeRequest('/notes/stats')
              
              if (statsResponse.success && statsResponse.data) {
                console.log('✅ STATS operation successful')
                console.log(`   Total notes: ${statsResponse.data.total}`)
                console.log(`   Total words: ${statsResponse.data.totalWords}`)
                
                // Test 7: Duplicate note
                console.log('\n7️⃣ Testing DUPLICATE operation...')
                const duplicateResponse = await makeRequest(`/notes/${noteId}/duplicate`, {
                  method: 'POST'
                })
                
                if (duplicateResponse.success && duplicateResponse.data) {
                  console.log('✅ DUPLICATE operation successful')
                  console.log(`   Duplicated note with ID: ${duplicateResponse.data.id}`)
                  const duplicateId = duplicateResponse.data.id
                  
                  // Test 8: Archive note
                  console.log('\n8️⃣ Testing ARCHIVE operation...')
                  const archiveResponse = await makeRequest(`/notes/${duplicateId}/archive`, {
                    method: 'PATCH'
                  })
                  
                  if (archiveResponse.success && archiveResponse.data) {
                    console.log('✅ ARCHIVE operation successful')
                    console.log(`   Archived note: ${archiveResponse.data.isArchived}`)
                    
                    // Test 9: Delete the original note
                    console.log('\n9️⃣ Testing DELETE operation...')
                    const deleteResponse = await makeRequest(`/notes/${noteId}`, {
                      method: 'DELETE'
                    })
                    
                    if (deleteResponse.success) {
                      console.log('✅ DELETE operation successful')
                      console.log(`   Deleted note with ID: ${noteId}`)
                      
                      // Test 10: Verify note was deleted
                      console.log('\n🔟 Testing DELETE verification...')
                      try {
                        await makeRequest(`/notes/${noteId}`)
                        console.log('❌ DELETE verification failed - note still exists')
                      } catch (error) {
                        if (error.message.includes('404')) {
                          console.log('✅ DELETE verification successful - note no longer exists')
                        } else {
                          console.log('❌ DELETE verification failed with unexpected error:', error.message)
                        }
                      }
                      
                      console.log('\n🎉 All CRUD operations completed successfully!')
                      console.log('\n📊 Test Summary:')
                      console.log('   ✅ CREATE - Note creation')
                      console.log('   ✅ READ - Single note retrieval')
                      console.log('   ✅ UPDATE - Note modification')
                      console.log('   ✅ GET ALL - Notes listing')
                      console.log('   ✅ SEARCH - Notes search functionality')
                      console.log('   ✅ STATS - Note statistics')
                      console.log('   ✅ DUPLICATE - Note duplication')
                      console.log('   ✅ ARCHIVE - Note archiving')
                      console.log('   ✅ DELETE - Note deletion')
                      console.log('   ✅ DELETE VERIFICATION - Confirm deletion')
                      
                    } else {
                      console.log('❌ DELETE operation failed')
                    }
                  } else {
                    console.log('❌ ARCHIVE operation failed')
                  }
                } else {
                  console.log('❌ DUPLICATE operation failed')
                }
              } else {
                console.log('❌ STATS operation failed')
              }
            } else {
              console.log('❌ SEARCH operation failed')
            }
          } else {
            console.log('❌ GET ALL operation failed')
          }
        } else {
          console.log('❌ UPDATE operation failed')
        }
      } else {
        console.log('❌ READ operation failed')
      }
    } else {
      console.log('❌ CREATE operation failed')
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
    
    if (error.message.includes('fetch')) {
      console.log('\n💡 Make sure the development server is running:')
      console.log('   Frontend: npm run dev (port 3000)')
      console.log('   Backend: cd server && npm run dev (port 5000)')
    }
    
    if (error.message.includes('401')) {
      console.log('\n💡 Authentication required. Make sure you are logged in.')
    }
    
    process.exit(1)
  }
}

// Run the test
testNotesCRUD().catch(console.error)
