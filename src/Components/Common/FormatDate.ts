import { format, formatDistanceToNowStrict } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return format(date, "HH:mm");
  }

  return formatDistanceToNowStrict(date, { addSuffix: true });
};
