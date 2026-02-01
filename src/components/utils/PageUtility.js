import { EnchantType } from "../contants/CE3_Enums";
export const RedirectTo = (url, target = "_blank") => {
  window.open(url, target);
};

/**
 * @param {...EnchantType} type
 */
export const getIcon = (type) => {
  switch (type) {
    case EnchantType.SWORD:
      return "fa-solid ";
    default:
      return "fa-solid fa-cube";
  }
};

export function getYearsAndMonthsFromDate(inputDate) {
  try {
    if (inputDate === null) {
      return "In Development";
    }

    const startDate = new Date(inputDate);
    const today = new Date();

    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();

    // Adjust if the current month is before the start month
    if (months < 0) {
      years--;
      months += 12;
    }

    // Adjust if the current day is before the start day
    if (days < 0) {
      months--;
      // Get number of days in the previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return `${years > 0 ? `${years} yr${years > 1 ? "s" : ""} ` : ""}${months > 0 ? `${months} mo ` : ""}${days > 0 ? `${days} day${days > 1 ? "s" : ""} ` : ""}ago`;
  } catch (error) {
    console.error(error.message);
    return { years: 0, months: 0, days: 0 };
  }
}
