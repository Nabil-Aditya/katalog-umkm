"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { buatDeskripsiAI } from "@/app/admin/actions";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09).
// Dilengkapi pembuatan deskripsi otomatis AI Gemini (US-14).
export default function FormProduk({ produk = {}, labelTombol, action }) {
  const [nama, setNama] = useState(produk.nama || "");
  const [kategori, setKategori] = useState(produk.kategori || "");
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi || "");
  const [sedangMembuatAI, setSedangMembuatAI] = useState(false);
  const [pesanAI, setPesanAI] = useState(null);

  async function handleBuatDeskripsiAI() {
    if (!nama.trim()) {
      setPesanAI({
        tipe: "error",
        teks: "Ketik nama produk terlebih dahulu sebelum membuat deskripsi dengan AI.",
      });
      return;
    }

    setSedangMembuatAI(true);
    setPesanAI(null);

    try {
      const res = await buatDeskripsiAI(nama, kategori);
      if (res.sukses) {
        setDeskripsi(res.deskripsi);
        setPesanAI({
          tipe: "sukses",
          teks: "Deskripsi berhasil dibuat oleh AI! Kamu masih bisa mengubah atau menyesuaikannya.",
        });
      } else {
        setPesanAI({
          tipe: "error",
          teks: res.error || "Gagal membuat deskripsi dengan AI.",
        });
      }
    } catch (err) {
      setPesanAI({
        tipe: "error",
        teks: err.message || "Terjadi kesalahan saat memanggil AI.",
      });
    } finally {
      setSedangMembuatAI(false);
    }
  }

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      {produk.id && <input type="hidden" name="id" value={produk.id} />}
      <Input
        label="Nama produk"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <Input
        label="Kategori"
        name="kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="deskripsi" className="text-sm font-semibold">
            Deskripsi
          </label>
          <button
            type="button"
            onClick={handleBuatDeskripsiAI}
            disabled={sedangMembuatAI}
            className="inline-flex items-center gap-1.5 rounded-lg border border-garis bg-permukaan px-2.5 py-1 text-xs font-semibold text-utama hover:border-utama hover:text-utama-gelap disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            <span>{sedangMembuatAI ? "⏳" : "✨"}</span>
            <span>{sedangMembuatAI ? "Membuat dengan AI..." : "Buat deskripsi dengan AI"}</span>
          </button>
        </div>

        {pesanAI && (
          <div
            className={`rounded-lg border p-2.5 text-xs ${
              pesanAI.tipe === "sukses"
                ? "border-utama/30 bg-permukaan text-utama"
                : "border-bahaya/30 bg-permukaan text-bahaya"
            }`}
          >
            {pesanAI.teks}
          </div>
        )}

        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Tulis deskripsi atau klik 'Buat deskripsi dengan AI'..."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          suppressHydrationWarning
        />
      </div>

      <div className="flex gap-3">
        <Tombol type="submit">{labelTombol}</Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
