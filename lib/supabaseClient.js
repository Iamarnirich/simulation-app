import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zyeyycznwmosvoqqcrxh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5ZXl5Y3pud21vc3ZvcXFjcnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzM2MjksImV4cCI6MjA2MjEwOTYyOX0.hDL7xvcb5omghXxjNdolVkyp7dn36HG5TA02sPH21rA'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)