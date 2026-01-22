# Confidence App - Landing Page

Premium landing page for the Confidence App, built with React (Vite) + Tailwind CSS.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to Project Settings > API
3. Copy your project URL and anon/public key
4. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
5. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Create Database Table

In your Supabase project, go to the SQL Editor and run this query:

```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Anyone can insert" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads only for authenticated users (optional)
CREATE POLICY "Only authenticated users can read" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 4. Set Up Facebook Pixel

1. Open `index.html`
2. Replace `YOUR_PIXEL_ID` with your actual Facebook Pixel ID (appears twice in the code)

### 5. Run Development Server
```bash
npm run dev
```

The app will open at http://localhost:3000

### 6. Build for Production
```bash
npm run build
```

## Deployment

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Option 2: Netlify
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Add environment variables in Netlify dashboard
4. Build command: `npm run build`
5. Publish directory: `dist`

## Features

- ✅ Mobile-first design (optimized for iPhone 15/16)
- ✅ Apple-inspired premium aesthetic
- ✅ Supabase email collection with country tracking
- ✅ Facebook Pixel integration
- ✅ "Fake door" beta waitlist modal
- ✅ Fully responsive design
- ✅ Clean, conversion-optimized layout

## URL Parameters for Country Tracking

Add `?country=US` (or UK, FR, LB) to your ad URLs to track signups by country.

Example ad URLs:
- US: `https://yoursite.com/?country=US`
- UK: `https://yoursite.com/?country=UK`
- France: `https://yoursite.com/?country=FR`
- Lebanon: `https://yoursite.com/?country=LB`

## Customization

### Edit Copy
All text content is in `src/App.jsx`. Search for the text you want to change and update it directly.

### Edit Colors
Color scheme is in `src/App.jsx` using Tailwind classes. Main colors:
- Primary gradient: `from-blue-500 to-purple-600`
- Background: `bg-white`, `bg-gray-50`, `bg-black`
- Text: `text-gray-900`, `text-gray-600`

### Edit Styling
Tailwind config is in `tailwind.config.js` for global style changes.
