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
    // Convert input to Date object
    const startDate = new Date(inputDate);
    if (isNaN(startDate)) {
      throw new Error("Invalid date format");
    }

    const today = new Date();

    // Calculate year and month difference
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();

    // Adjust if the current month is before the start month
    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years > 0 ? `${years} yr${years > 1 ? "s" : ""} ` : ""}${months > 0 ? `${months} mo ` : ""}${days > 0 ? `${days} days` : ""} ago`;
  } catch (error) {
    console.error(error.message);
    return { years: 0, months: 0 };
  }
}
