import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wmsggxnhrpljvjyxutlp.supabase.co"
const supabaseAnonKey = "eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtc2dneG5ocnBsanZqeXh1dGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ5NjU5MjQsImV4cCI6MjAwMDU0MTkyNH0.q3hFEX-4OJ73B6c5q7R36qyEFy4dTs7KOlM7JJo21Ik"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
