#!/bin/bash

# Test creating a new diary entry on the deployed app
# This will verify if the fix is working for new entries

echo "🧪 Testing diary entry creation on deployed app..."
echo ""
echo "Please do the following:"
echo "1. Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)"
echo "2. Delete all existing diary entries from the UI"
echo "3. Create a new diary entry with some test content"
echo "4. Try clicking on the new entry"
echo ""
echo "If new entries work but old ones don't, it means the old entries"
echo "in the database have corrupted IDs from before the fix."
echo ""
echo "📝 Alternatively, you can test the API directly:"
echo "curl -X POST https://rishi4ammu.vercel.app/api/diary \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Cookie: your-session-cookie' \\"
echo "  -d '{\"title\":\"Test Entry\",\"content\":\"Testing the fix\"}'"

