import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABAE_URL,
    import.meta.env.VITE_SUPABSE_ANON_KEY
)
export default supabase