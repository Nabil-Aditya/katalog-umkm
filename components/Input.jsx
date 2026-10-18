export default function Input({ label, name, type = "text", textarea = false, ...props }) {
  const kelas =
    "w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none";

  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold">
      {label}
      {textarea ? (
        <textarea name={name} rows={4} className={kelas} {...props} />
      ) : (
        <input name={name} type={type} className={kelas} {...props} />
      )}
    </label>
  );
}
