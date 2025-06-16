export const formatDate = (
  date,
  locale = "ru-RU",
  timeZone = "Europe/Minsk",
) => {
  return new Date(date).toLocaleString(locale, {
    timeZone,
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
