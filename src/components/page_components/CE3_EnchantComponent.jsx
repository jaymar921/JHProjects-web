import React from "react";

function CE3_EnchantComponent({ enchantment }) {
  const {
    title,
    currency,
    price,
    type,
    description,
    damageType,
    resistanceType,
    absorbType,
    maxLevel,
  } = enchantment;
  return (
    <div className="w-full border-2 p-2">
      <h1 className="text-2xl font-mono font-extrabold">
        {title}
        <span className="text-amber-400 pl-2">
          {currency}
          {price}
          <i class="fa-solid fa-tag pl-2"></i>
        </span>
      </h1>
      <h3 className="text-red-300 text-sm">Max Level: {maxLevel}</h3>
      <h3 className="text-blue-400">({type} ENCHANTMENT)</h3>
      <p className="text-gray-400 font-mono">{description}</p>
      {damageType && damageType.length > 0 && (
        <>
          <h3 className="pt-2">Damage Type:</h3>
          {damageType.map((dT) => {
            return <p className="font-mono">- {dT}</p>;
          })}
        </>
      )}
      {resistanceType && resistanceType.length > 0 && (
        <>
          <h3 className="pt-2">Counter Resistance:</h3>
          {resistanceType.map((dT) => {
            return <p className="font-mono">- {dT}</p>;
          })}
        </>
      )}
      {absorbType && absorbType.length > 0 && (
        <>
          <h3 className="pt-2">Absorb Damage:</h3>
          {absorbType.map((dT) => {
            return <p className="font-mono">- {dT}</p>;
          })}
        </>
      )}
    </div>
  );
}

export default CE3_EnchantComponent;
