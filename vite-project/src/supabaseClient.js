import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gqkdtcnojnwksarxcbwl.supabase.co/'
const supabaseAnonKey = 'sb_publishable_Rexp404jGx00qT8x7tV84A_ZG8k7Hxd'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)