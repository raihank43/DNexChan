export default function GreentextFormatter({ text }: { text: string }) {
  // Fungsi untuk memproses teks dan menerapkan styling

  return text.split("\n").map((line, index) => {
    // Periksa apakah baris dimulai dengan '>'
    if (line.startsWith(">")) {
      return (
        <span key={index} className="text-sm text-center text-green-600">
          {`>` + line.substring(1)}
          <br />
        </span>
      );
    } else {
      return (
        <span key={index}>
          {line}
          <br />
        </span>
      );
    }
  });
}
