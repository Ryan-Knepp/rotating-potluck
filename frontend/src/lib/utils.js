import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse as parseDate, format as formatDate } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTotalAttendeesForPotluck = (potluck) => {
  let adults = 0;
  let kids = 0;
  const hostAdults =
    potluck.host_household?.people?.filter((person) => !person.is_child)
      .length || 0;
  adults += hostAdults;
  kids += (potluck.host_household?.people?.length || 0) - hostAdults;
  potluck.households?.forEach((household) => {
    const householdAdults =
      household.people?.filter((person) => !person.is_child).length || 0;
    adults += householdAdults;
    kids += (household.people?.length || 0) - householdAdults;
  });
  adults += potluck.people?.length || 0;

  return `${adults} Adults and ${kids} kids`;
};

export const splitDateRange = (dateRange) => {
  // we are getting this back from the rails api: 2023-04-15...2023-05-27
  const date = new Date();
  const [from, to] = dateRange.split("...");
  return [
    parseDate(from, "yyyy-MM-dd", date),
    parseDate(to, "yyyy-MM-dd", date),
  ];
};

export const formatDateRange = (dateRange) => {
  const [fromDate, toDate] = splitDateRange(dateRange);
  return `${formatDate(fromDate, "LLL dd, y")} - ${formatDate(toDate, "LLL dd, y")}`;
};
