// US-03: tombol ini belum berfungsi.
// Tugas peserta: buka WhatsApp toko dengan pesan otomatis berisi nama dan harga produk.
export default function TombolWhatsApp({ produk }) {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
    >
      Pesan via WhatsApp
    </button>
  );
}
