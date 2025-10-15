import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn("[Supabase] NEXT_PUBLIC_SUPABASE_URL не задан");
}

if (!supabaseServiceKey) {
  console.warn("[Supabase] SUPABASE_SERVICE_ROLE_KEY не задан, операции записи будут недоступны");
}

export const supabaseServerClient = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })
  : null;
