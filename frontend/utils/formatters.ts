import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

export const formatNumber = (num: number): string => {
  if (num >= 1000) return Math.floor(num / 1000) + "k";
  return num.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;

  return `${Math.floor(days)}`;
};
