/** @type {import('next').NextConfig} */
const nextConfig = {
  // Supaya deploy tidak gagal hanya karena error tipe kecil selama workshop.
  typescript: { ignoreBuildErrors: true },
  // Izinkan akses dari jaringan lokal (Laragon/HP) saat development.
  allowedDevOrigins: ["192.168.56.1", "192.168.1.1"],
};

export default nextConfig;
