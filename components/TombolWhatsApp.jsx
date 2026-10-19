"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState("");

  const kurangi = () => {
    if (jumlah > 1) setJumlah(jumlah - 1);
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
  };

  const nomor = (toko.nomorWhatsApp || "").replace(/\D/g, "");
  const totalHarga = (produk.harga || 0) * jumlah;

  // Format pesan WhatsApp sesuai jumlah dan varian (US-12)
  let detailPesanan = `${produk.nama} (${jumlah} pcs)`;
  if (varian.trim()) {
    detailPesanan += ` - Varian/Catatan: ${varian.trim()}`;
  }
  detailPesanan += ` - Total: ${formatRupiah(totalHarga)}`;

  const pesan = `Halo, saya ingin memesan:\n${detailPesanan}\n\nMohon info ketersediaan dan cara pembayarannya. Terima kasih!`;
  const urlWhatsApp = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-garis bg-permukaan/40 p-4">
      {/* Pemilih Jumlah & Estimasi Harga */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-semibold text-teks">
          Jumlah
          <div className="mt-1.5 flex items-center gap-2">
            <button
              type="button"
              onClick={kurangi}
              disabled={jumlah <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-latar text-base font-bold text-teks transition-colors hover:border-utama disabled:opacity-40"
              aria-label="Kurangi jumlah"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={jumlah}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setJumlah(isNaN(val) || val < 1 ? 1 : val);
              }}
              className="h-9 w-14 rounded-lg border border-garis bg-latar text-center text-sm font-semibold text-teks focus:border-utama focus:outline-none"
            />
            <button
              type="button"
              onClick={tambah}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-latar text-base font-bold text-teks transition-colors hover:border-utama"
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>
        </label>

        <div className="flex flex-col text-sm sm:text-right">
          <span className="text-xs text-teks-lembut">Total perkiraan:</span>
          <span className="text-lg font-bold text-harga">
            {formatRupiah(totalHarga)}
          </span>
        </div>
      </div>

      {/* Input Varian / Catatan */}
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-teks">
        <span>
          Varian / Catatan{" "}
          <span className="text-xs font-normal text-teks-lembut">(opsional)</span>
        </span>
        <input
          type="text"
          value={varian}
          onChange={(e) => setVarian(e.target.value)}
          placeholder="Misal: Ukuran L, Rasa Cokelat, Pedas sedang..."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </label>

      {/* Tombol Pesan via WhatsApp */}
      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors hover:bg-utama-gelap"
      >
        Pesan via WhatsApp ({jumlah} item)
      </a>
    </div>
  );
}
