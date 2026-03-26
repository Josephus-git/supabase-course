import { createClient } from "@supabase/supabase-js";

import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAPIKey = process.env.SUPABASE_API_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAPIKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAPIKey,
);
