export default function getTimeSincePosted(dateString: Date) {
  // Parse the input date string
  const date = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const difference = currentDate.getTime() - date.getTime();

  // Calculate the difference in seconds
  const seconds = Math.floor(difference / 1000);

  // Calculate the difference in minutes
  const minutes = Math.floor(seconds / 60);

  // Calculate the difference in hours
  const hours = Math.floor(minutes / 60);

  // Calculate the difference in days
  const days = Math.floor(hours / 24);

  // Calculate the difference in weeks
  const weeks = Math.floor(days / 7);

  // Calculate the difference in months
  const months = Math.floor(days / 30);

  // Calculate the difference in years
  const years = Math.floor(days / 365);

  // Return the appropriate string based on the difference
  if (years > 0) {
    return `${years} tahun yang lalu`;
  } else if (months > 0) {
    return `${months} bulan yang lalu`;
  } else if (weeks > 0) {
    return `${weeks} minggu yang lalu`;
  } else if (days > 0) {
    return `${days} hari yang lalu`;
  } else if (hours > 0) {
    return `${hours} jam yang lalu`;
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`;
  }
  return `${seconds} detik yang lalu`;
}
