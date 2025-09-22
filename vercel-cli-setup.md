# Quick Vercel CLI commands to set environment variables
# Install vercel CLI: npm i -g vercel
# Then run these commands:

vercel env add MONGODB_URI production
# Paste: mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod

vercel env add JWT_SECRET production
# Paste: dInVgrJrSZa4YbW1uBB+Bq0iwACml8QM4rmJEjg1ZWHZH8/KNQ4KeyadkZzW5V8lbmHMdbwmgxHCbFAbv7D+DA==

vercel env add JWT_REFRESH_SECRET production
# Paste: 4KXDHsQ6hSuRFblnf1vpyU6vQMsskB2JtbUqXXci0ZZ6GND7xymkPo9+NttvEGq8xARy9i0qypL7hh9cjJn0bg==

vercel env add SESSION_SECRET production
# Paste: 5J80vSvRa2HJCZPIlVUwiy8OGC1GcioXwWP+989r/lJtprWwoaXTgMA5n4FOz9Vkt9MoXBGwVN0IDgtUa6W/iQ==

vercel env add NODE_ENV production
# Paste: production

vercel env add CORS_ORIGIN production
# Paste: https://rishi4ammu.vercel.app

vercel env add SMTP_HOST production
# Paste: smtp.gmail.com

vercel env add SMTP_PORT production
# Paste: 587

vercel env add SMTP_USER production
# Paste: hrushinath29@gmail.com

vercel env add SMTP_PASS production
# Paste: yzelhwzvsuuhtosa

vercel env add EMAIL_FROM production
# Paste: noreply@studycontrol.com

# Then redeploy
vercel --prod