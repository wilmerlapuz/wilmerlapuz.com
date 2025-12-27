import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://plrvdkwcnlbjsohztnkg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscnZka3djbmxianNvaHp0bmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MzI5OTIsImV4cCI6MjA4MjMwODk5Mn0.jg6yFPySTCxSqit_Ka-8rKQk1O_pfOCuIOdQLeTB24Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
