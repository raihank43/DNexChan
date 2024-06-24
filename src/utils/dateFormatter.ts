export default function dateFormatter(dateString: Date) {
  // Parse the input date string
  const date = new Date(dateString);

  // Function to map day index to Indonesian day name
  const getIndonesianDayName = (dayIndex: number) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return days[dayIndex];
  };

  // Extract components from the date
  const year = date.getFullYear().toString().substr(-2); // Get last 2 digits of year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed; add 1
  const day = date.getDate().toString().padStart(2, "0");
  const dayOfWeek = getIndonesianDayName(date.getDay());
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Format the date and time components
  return `${month}/${day}/${year}(${dayOfWeek})${hours}:${minutes}:${seconds}`;
}
