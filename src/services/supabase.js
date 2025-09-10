import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qenffiqyxrreazpflwsw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbmZmaXF5eHJyZWF6cGZsd3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MDMwNDUsImV4cCI6MjA3MzA3OTA0NX0.i5633e2F4L-rwyXKP1kn7p7SP6dFT0Vqis3gJsk7bF4";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
