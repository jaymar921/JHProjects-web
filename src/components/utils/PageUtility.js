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
