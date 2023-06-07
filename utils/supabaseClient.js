import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xksxmfrhnucxpduxkpmm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrc3htZnJobnVjeHBkdXhrcG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwODIzMDQsImV4cCI6MjAwMTY1ODMwNH0.NDlbuwxjuOuZVQswB-RmkwwGxIIzrkFqi5u62Xqy90E"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
