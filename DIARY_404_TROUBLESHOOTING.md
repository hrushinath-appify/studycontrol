# Diary Entry 404 Error - Troubleshooting Guide

## Current Issue

Getting a 404 error when clicking on past diary entries. The error shows:
- **URL**: `https://rishi4ammu.vercel.app/diary/60ea0855...`
- **Error**: 404: NOT_FOUND

## Possible Causes

### 1. **No Diary Entries in Database** (Most Likely)
The database might not have any diary entries yet, or the entries that exist don't belong to your current user account.

### 2. **User Authentication Issue**
The user ID from the authentication token might not match the userId in the diary entries.

### 3. **Database Connection Issue**
The production environment might not be connecting to the correct MongoDB database.

## Diagnostic Steps

### Step 1: Check Vercel Logs

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your `studycontrol` project
3. Go to the "Logs" tab
4. Look for the enhanced logging messages after clicking a diary entry:
   ```
   🔍 GET /api/diary/[id] - Request received
   ✅ User authenticated: [userId]
   ✅ Database connected
   🔍 Diary entry ID requested: [entryId]
   ✅ ObjectId format valid
   🔍 Querying database for entry: {...}
   ❌ Diary entry not found: {...}
   ```

### Step 2: Check Browser Console

1. Open the diary page: `https://rishi4ammu.vercel.app/diary`
2. Open browser console (F12)
3. Look for these messages:
   ```
   📥 Diary API - Full response: {...}
   📥 Diary API - Extracted entries count: X
   ✅ Entry 0 validated - ID: ..., Title: ...
   ```

### Step 3: Verify Database Entries

Check if diary entries exist in your MongoDB database:

1. **Using MongoDB Atlas Dashboard**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Navigate to your cluster
   - Browse Collections
   - Look for `diaryentries` collection
   - Check if it has any documents

2. **Using the Check Script** (if Node.js is available):
   ```bash
   cd /Users/rishi/studyControl
   node check-diary-entries.js
   ```

## Solutions

### Solution 1: Create New Diary Entries

If the database is empty or has no entries for your user:

1. Go to the diary page
2. Write a new entry in the entry box
3. Click "Save Entry"
4. The new entry should appear in the "Past Entries" section
5. Try clicking on it to verify it opens correctly

### Solution 2: Check User Authentication

If entries exist but you can't see them:

1. **Log out and log back in**:
   - Click on your profile/settings
   - Log out
   - Log back in with the same credentials

2. **Verify your user ID**:
   - Open browser console
   - Check the authentication logs
   - Ensure the user ID matches the entries in the database

### Solution 3: Verify Environment Variables

Ensure these environment variables are correctly set in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify these are set:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `JWT_REFRESH_SECRET` - Your JWT refresh secret
   - `SESSION_SECRET` - Your session secret
   - `NEXT_PUBLIC_API_URL` - Should be `https://rishi4ammu.vercel.app/api/v1`

3. If you changed any variables, redeploy:
   - Go to Deployments tab
   - Click on the latest deployment
   - Click "Redeploy"

### Solution 4: Check Database Connection

Verify the MongoDB connection string is correct:

1. The `MONGODB_URI` should look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/studycontrol?retryWrites=true&w=majority
   ```

2. Ensure:
   - Username and password are correct
   - IP whitelist includes `0.0.0.0/0` (for Vercel) or Vercel's IP ranges
   - Database name is correct (should be `studycontrol`)

## Expected Behavior After Fix

Once resolved, you should see:

1. **On Diary Page**:
   - List of your past diary entries
   - Each entry shows: date, title, preview text
   - Console shows: `✅ Entry X validated - ID: [24-char-hex-id]`

2. **When Clicking an Entry**:
   - Smooth navigation to `/diary/[valid-id]`
   - Entry details load without errors
   - Console shows: `✅ Successfully loaded entry: {...}`

3. **Server Logs** (in Vercel):
   - `✅ User authenticated: [userId]`
   - `✅ Database connected`
   - `✅ Diary entry found: [title]`

## Quick Test

To quickly test if the system is working:

1. **Create a test entry**:
   - Go to `/diary`
   - Write: "Test entry - [current date/time]"
   - Click "Save Entry"

2. **Verify it appears**:
   - Should see it in "Past Entries" section
   - Note the date shown

3. **Click on it**:
   - Should navigate to detail page
   - Should show full entry content
   - No 404 error

4. **Check console**:
   - Should see validation messages
   - Should see "Successfully loaded entry"

## Still Not Working?

If the issue persists after trying all solutions:

1. **Check Vercel Function Logs**:
   - Look for any error messages
   - Check if there are database connection errors
   - Verify authentication is working

2. **Share the following information**:
   - Browser console output (full log)
   - Vercel function logs (from the deployment)
   - Number of entries shown in MongoDB Atlas
   - Your user ID (from the logs)

3. **Temporary workaround**:
   - Clear browser cache and cookies
   - Try in incognito/private browsing mode
   - Try a different browser

## Prevention

To prevent this issue in the future:

1. ✅ Always validate entry IDs are 24-char hex strings
2. ✅ Add comprehensive error logging
3. ✅ Check database connection before queries
4. ✅ Verify user authentication before data access
5. ✅ Handle "not found" cases gracefully

---

**Updated**: October 12, 2025  
**Status**: Enhanced logging deployed - awaiting Vercel deployment completion
