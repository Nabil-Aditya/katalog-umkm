import KartuProduk from "@/components/KartuProduk";
import FilterPencarian from "@/components/FilterPencarian";
import { toko } from "@/lib/toko";
import { buatKlienServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog({ searchParams }) {
  const sp = (await searchParams) || {};
  const q = sp?.q?.trim() || "";
  const kategori = sp?.kategori?.trim() || "";

  let daftarProduk = null;
  let daftarKategori = [];
  let pesanError = null;

  try {
    const supabase = buatKlienServer();

    // Ambil daftar kategori unik
    const { data: kategoriRows } = await supabase.from("produk").select("kategori");
    daftarKategori = Array.from(
      new Set((kategoriRows || []).map((item) => item.kategori?.trim()).filter(Boolean))
    ).sort();

    // Query produk dengan filter pencarian dan kategori jika ada
    let query = supabase.from("produk").select("*");

    if (q) {
      query = query.or(`nama.ilike.%${q}%,deskripsi.ilike.%${q}%`);
    }

    if (kategori) {
      query = query.eq("kategori", kategori);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      pesanError = error.message || "Gagal mengambil data produk dari database.";
    } else {
      daftarProduk = data;
    }
  } catch (err) {
    pesanError = err.message || "Gagal menghubungkan ke database Supabase.";
  }

  const adaFilter = Boolean(q || kategori);

  return (
    <>
      {/* Banner / Hero Toko */}
      <section className="relative my-6 overflow-hidden rounded-3xl bg-gradient-to-br from-utama via-utama to-utama-gelap p-6 text-white shadow-sm sm:p-10">
        {/* Dekorasi pencahayaan latar */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-white/5 blur-xl" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-harga-latar animate-pulse" />
              <span>Katalog Resmi UMKM</span>
            </div>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {toko.nama}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
              {toko.tagline}
            </p>

            {/* Info Lokasi & Jam Buka */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-white/85">
              <div className="flex items-center gap-1.5 rounded-lg bg-black/10 px-2.5 py-1.5 backdrop-blur-sm">
                <span>🕒</span>
                <span>{toko.jamBuka}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-black/10 px-2.5 py-1.5 backdrop-blur-sm">
                <span>📍</span>
                <span>{toko.alamat}</span>
              </div>
            </div>

            {/* Tombol Aksi Banner */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#judul-produk"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-utama shadow-sm transition hover:bg-permukaan"
              >
                Lihat Produk
              </a>
              <a
                href={`https://wa.me/${(toko.nomorWhatsApp || "").replace(/\D/g, "")}?text=${encodeURIComponent(`Halo ${toko.nama}, saya ingin bertanya tentang produk di katalog Anda.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <span>💬</span>
                <span>Tanya via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Ikon Toko & Badge Cepat */}
          <div className="hidden lg:flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm text-center">
            <img
              src="/icons/icon-192.png"
              alt={toko.nama}
              className="h-24 w-24 rounded-2xl bg-white p-2 object-contain shadow-sm"
            />
            <span className="mt-3 text-xs font-bold text-white">Pesan Langsung</span>
            <span className="text-[11px] text-white/75">Terhubung ke WhatsApp</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h2 id="judul-produk" className="text-xl font-bold">
            Produk kami
          </h2>
          <FilterPencarian
            basePath="/"
            q={q}
            kategoriAktif={kategori}
            daftarKategori={daftarKategori}
          />
        </div>

        {pesanError ? (
          <div className="rounded-xl border border-garis bg-permukaan p-4 text-bahaya">
            <p className="font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-sm">{pesanError}</p>
          </div>
        ) : daftarProduk && daftarProduk.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        ) : adaFilter ? (
          <div className="rounded-2xl border border-garis p-8 text-center text-teks-lembut">
            Tidak ada produk yang cocok dengan pencarianmu.
          </div>
        ) : (
          <p className="text-teks-lembut">Belum ada produk</p>
        )}
      </section>
    </>
  );
}
