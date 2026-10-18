import { createClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase di sisi server untuk pengunjung
 * menggunakan SUPABASE_URL dan SUPABASE_SECRET_KEY.
 * Kunci rahasia ini melewati aturan RLS untuk membaca data publik.
 */
export function buatKlienServer() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const createClientServer = buatKlienServer;
export default buatKlienServer;

