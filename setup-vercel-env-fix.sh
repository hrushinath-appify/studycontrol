#!/bin/bash

echo "Setting up Vercel environment variables..."

# Set MongoDB URI
vercel env add MONGODB_URI production << EOF
mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod
EOF

# Set JWT Secret
vercel env add JWT_SECRET production << EOF
dInVgrJrSZa4YbW1uBB+Bq0iwACml8QM4rmJEjg1ZWHZH8/KNQ4KeyadkZzW5V8lbmHMdbwmgxHCbFAbv7D+DA==
EOF

# Set Session Secret
vercel env add SESSION_SECRET production << EOF
secure-session-secret-for-production-change-this-in-real-deployment
EOF

echo "Environment variables set! Now deploying..."