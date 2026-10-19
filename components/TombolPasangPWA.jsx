"use client";

import { useState, useEffect } from "react";

export default function TombolPasangPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [sudahTerpasang, setSudahTerpasang] = useState(false);
  const [tampilkanPetunjuk, setTampilkanPetunjuk] = useState(false);
  const [bannerDitutup, setBannerDitutup] = useState(false);

  useEffect(() => {
    // Periksa apakah web app dibuka dalam mode standalone (aplikasi terpasang)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setSudahTerpasang(true);
      return;
    }

    // Tangkap event sebelum instalasi browser
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setSudahTerpasang(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (sudahTerpasang) return null;

  const pasangAplikasi = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      // Tampilkan petunjuk manual jika browser belum memicu event prompt otomatis
      setTampilkanPetunjuk(true);
    }
  };

  return (
    <>
      {/* Tombol Pasang di Header */}
      <button
        type="button"
        onClick={pasangAplikasi}
        className="inline-flex items-center gap-1.5 rounded-lg border border-garis bg-permukaan px-3 py-1.5 text-xs font-semibold text-utama transition-colors hover:border-utama hover:bg-latar"
        title="Pasang katalog di layar HP"
      >
        <span>📱</span>
        <span>Pasang Aplikasi</span>
      </button>

      {/* Floating banner khusus di HP/Mobile */}
      {!bannerDitutup && (
        <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md rounded-2xl border border-garis bg-latar p-3.5 shadow-xl md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/icons/icon-192.png"
                alt="Ikon Katalog"
                className="h-11 w-11 rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-teks">Pasang Aplikasi di HP</span>
                <span className="text-[11px] text-teks-lembut">Buka katalog cepat dari layar utama</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={pasangAplikasi}
                className="rounded-lg bg-utama px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-utama-gelap"
              >
                Pasang
              </button>
              <button
                type="button"
                onClick={() => setBannerDitutup(true)}
                className="p-1 text-sm text-teks-lembut hover:text-teks"
                aria-label="Tutup banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Petunjuk untuk Browser (iOS Safari / browser tanpa prompt langsung) */}
      {tampilkanPetunjuk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-garis bg-latar p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-bold text-teks">Pasang di Layar Utama</h3>
              <button
                type="button"
                onClick={() => setTampilkanPetunjuk(false)}
                className="text-lg leading-none text-teks-lembut hover:text-teks"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-teks-lembut">
              Kamu bisa memasang katalog ini langsung ke layar utama HP kamu:
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-teks">
              <div className="rounded-xl border border-garis bg-permukaan p-3">
                <p className="font-semibold text-utama">📱 Android (Chrome)</p>
                <p className="mt-1 text-xs text-teks-lembut">
                  Tekan menu titik tiga (⋮) di pojok kanan atas browser, lalu pilih <strong>&quot;Tambahkan ke Layar Utama&quot;</strong> atau <strong>&quot;Instal Aplikasi&quot;</strong>.
                </p>
              </div>
              <div className="rounded-xl border border-garis bg-permukaan p-3">
                <p className="font-semibold text-utama">🍎 iPhone / iPad (Safari)</p>
                <p className="mt-1 text-xs text-teks-lembut">
                  Tekan tombol Bagikan (ikon kotak panah ke atas ⎋) di bawah browser, lalu pilih <strong>&quot;Tambah ke Layar Utama&quot;</strong>.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTampilkanPetunjuk(false)}
              className="mt-5 w-full rounded-lg bg-utama py-2 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}

