# Quick Setup Guide

## Step-by-Step Instructions

### 1. Initialize the Project
```bash
cd gag-reflex-app
npm install
```

### 2. Set Up Supabase (5 minutes)

**A. Create Project**
1. Go to https://supabase.com
2. Sign up/login
3. Click "New Project"
4. Name it "confidence-app-waitlist"
5. Set a strong database password (save it!)
6. Choose region closest to you
7. Wait 2-3 minutes for setup

**B. Get API Credentials**
1. In Supabase dashboard, click Settings (gear icon) > API
2. Copy "Project URL" 
3. Copy "anon public" key
4. Create `.env` file in project root:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**C. Create Database Table**
1. In Supabase, go to SQL Editor (left sidebar)
2. Click "New Query"
3. Paste this code:
```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert" ON waitlist
  FOR INSERT WITH CHECK (true);
```
4. Click "Run" (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

**D. Verify Setup**
1. Go to Table Editor (left sidebar)
2. You should see "waitlist" table with columns: id, email, country, created_at

### 3. Set Up Facebook Pixel

1. Go to Facebook Events Manager: https://business.facebook.com/events_manager
2. Create a new Pixel (or use existing)
3. Copy your Pixel ID (15-16 digit number)
4. Open `index.html` in the project
5. Replace `YOUR_PIXEL_ID` with your actual Pixel ID (appears in 2 places)

### 4. Run Locally
```bash
npm run dev
```

Your app will open at http://localhost:3000

### 5. Test the Flow
1. Click "Download on the App Store" button
2. Modal should appear
3. Enter a test email (e.g., test@example.com)
4. Click "Join Waitlist"
5. Go to Supabase > Table Editor > waitlist
6. Your test email should appear!

### 6. Deploy to Vercel

**A. Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

**B. Deploy on Vercel**
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Add Environment Variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click "Deploy"
7. Wait 2-3 minutes
8. Your site is live! 🎉

### 7. Set Up Facebook Ads

**URL Structure for Country Tracking:**
- US: `https://your-site.vercel.app/?country=US`
- UK: `https://your-site.vercel.app/?country=UK`
- France: `https://your-site.vercel.app/?country=FR`
- Lebanon: `https://your-site.vercel.app/?country=LB`

**Facebook Ads Manager Setup:**
1. Create Campaign > Traffic
2. Create 4 Ad Sets (one per country)
3. For each ad set, use the country-specific URL above
4. Set daily budget ($10-20 per country recommended)
5. Target: Women, 18-45, interests in wellness/relationships/self-improvement

### 8. Monitor Results

**Check Email Signups:**
1. Go to Supabase > Table Editor > waitlist
2. View all signups with timestamps and countries

**Check Facebook Performance:**
1. Facebook Ads Manager > Your Campaign
2. Key metrics to watch:
   - CTR (Click-Through Rate) - aim for 1%+
   - CPC (Cost Per Click) - aim for under $2
   - Landing page views
   - Cost per result

**Calculate Conversion Rate:**
- Go to Supabase, count total emails
- Divide by total landing page visits from Facebook Ads
- Aim for 10%+ conversion rate (landing page → email signup)

## Troubleshooting

**Problem: "Invalid API key" error**
- Solution: Double-check your `.env` file has correct Supabase credentials
- Restart dev server after changing `.env`

**Problem: Emails not saving**
- Solution: Check Supabase SQL Editor for errors when creating table
- Verify RLS policies are set correctly

**Problem: Facebook Pixel not tracking**
- Solution: Install "Facebook Pixel Helper" Chrome extension
- Verify Pixel ID is correct in `index.html`

**Problem: Site not loading after deployment**
- Solution: Check Vercel build logs for errors
- Verify environment variables are set in Vercel dashboard

## Next Steps

Once you have 500+ emails:
1. Export data from Supabase (CSV)
2. Analyze by country - which has best conversion?
3. Calculate total ad spend vs. emails collected
4. If cost per email < $2 → Strong validation!
5. Decide: build the app or iterate on positioning
