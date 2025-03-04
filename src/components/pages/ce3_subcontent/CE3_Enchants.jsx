import React from "react";
import { Enchantments } from "../../contants/custom_enchants_3/CE3Constants";
import CE3_EnchantComponent from "../../page_components/CE3_EnchantComponent";

function CE3_Enchants() {
  return (
    <div>
      <div className="w-full grid md:grid-cols-3 xl:grid-cols-5 gap-2 p-2">
        {Enchantments.map((enchantment) => {
          return <CE3_EnchantComponent enchantment={enchantment} />;
        })}
      </div>
    </div>
  );
}

export default CE3_Enchants;
