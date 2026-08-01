-- =========================================================
-- Getrefy — Supabase Database & Auth Schema Setup
-- Paste this entire SQL snippet into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- =========================================================

-- 1. Create Public Users Profile Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  bio TEXT DEFAULT 'Indie maker on Getrefy',
  role TEXT DEFAULT 'Full-Stack Developer',
  points INT DEFAULT 0,
  streak_days INT DEFAULT 1,
  launched_count INT DEFAULT 0,
  total_upvotes_received INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles
CREATE POLICY "Public user profiles are viewable by everyone" 
  ON public.users FOR SELECT 
  USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" 
  ON public.users FOR INSERT 
  WITH CHECK (auth.uid() = id);


-- 2. Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    name,
    handle,
    avatar,
    bio,
    role,
    points,
    streak_days,
    launched_count,
    total_upvotes_received
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'handle', '@' || split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'),
    'Indie software creator on Getrefy',
    COALESCE(NEW.raw_user_meta_data->>'role', 'Developer Creator'),
    0, -- Initial 0 points (Bronze tier)
    0, -- Initial 0 streak days
    0, -- Initial 0 launched count
    0  -- Initial 0 upvotes received
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  product_url TEXT NOT NULL,
  category TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  image_url TEXT,
  upvotes INT DEFAULT 1,
  points INT DEFAULT 3,
  comment_count INT DEFAULT 0,
  is_panda_choice BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert products" ON public.products FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own products" ON public.products FOR UPDATE USING (auth.uid() = user_id);


-- 4. Comments Table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_handle TEXT NOT NULL,
  author_avatar TEXT NOT NULL,
  author_role TEXT,
  content TEXT NOT NULL,
  is_private BOOLEAN DEFAULT FALSE,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public comments are viewable by everyone" ON public.comments FOR SELECT USING (is_private = false OR auth.uid() = user_id);
CREATE POLICY "Authenticated users can insert comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
