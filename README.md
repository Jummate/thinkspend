# ThinkSpend

**Smart spending, powered by AI**

ThinkSpend is an AI-powered expense tracker that uses natural language processing to make tracking expenses effortless. Just type "Coffee at Starbucks $5" and let the AI handle the rest.

![ThinkSpend Screenshot](./docs/screenshot.png)

## ✨ Features

- **AI-Powered Entry**: Add expenses using natural language
- **Smart Categorization**: Automatic category detection
- **Visual Analytics**: See spending patterns with charts
- **Offline Support**: Works without internet connection
- **PWA**: Install on mobile and desktop

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Mistral API
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Anthropic API key

### Setup

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/thinkspend.git
   cd thinkspend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create `.env.local` file:
```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. **Set up Supabase database**
   
   Run this SQL in your Supabase SQL editor:
```sql
   CREATE TABLE expenses (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     amount DECIMAL(10, 2) NOT NULL,
     category TEXT NOT NULL,
     description TEXT,
     date DATE NOT NULL DEFAULT CURRENT_DATE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

   -- Policies
   CREATE POLICY "Users can view own expenses" 
   ON expenses FOR SELECT 
   USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert own expenses" 
   ON expenses FOR INSERT 
   WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can delete own expenses" 
   ON expenses FOR DELETE 
   USING (auth.uid() = user_id);
```

5. **Run development server**
```bash
   npm run dev
```

   Open [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Sign up** with your email
2. **Add an expense** by typing naturally:
   - "Lunch $15"
   - "Coffee at Starbucks 5 dollars"
   - "Uber to airport $25"
3. **View your dashboard** to see spending breakdown
4. **Track expenses** in the list view
5. **Works offline** - changes sync when back online

## 🏗️ Project Structure
```
thinkspend/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   └── styles/          # Global styles
├── public/              # Static assets
├── docs/                # Documentation
└── supabase/            # Database migrations
```

## 🧪 Testing
```bash
npm run test
```

## 🚢 Deployment

Deployed automatically via Vercel when pushing to `main` branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/thinkspend)

## 🤝 Contributing

This is a personal learning project, but suggestions are welcome! Feel free to open an issue.

## 📝 License

MIT License - feel free to use this project for learning.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/Jummate)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://omololujumat.netlify.app)

## 🙏 Acknowledgments

- Built as a learning project to explore PWAs and AI integration
- Inspired by modern expense tracking needs