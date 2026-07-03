import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mqnrycobwvaxghreghyp.supabase.co';
const supabaseKey = 'sb_publishable_h6d__XOQmt7Q2wwZai5peA_NBHwUtTt';

export const supabase = createClient(supabaseUrl, supabaseKey);