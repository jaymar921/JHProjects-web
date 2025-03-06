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
    cooldown,
    manaCost,
  } = enchantment;
  return (
    <div className="w-full border-2 p-2 font-mono ">
      <h3 className="text-blue-400 text-center">({type} ENCHANTMENT)</h3>
      <h1 className="text-2xl font-extrabold">
        {title}
        <span className="text-amber-400 pl-2">
          <span className="px-1">{currency}</span>
          {price}
          <i class="fa-solid fa-tag pl-2"></i>
        </span>
      </h1>
      <h3 className="text-red-300 text-sm">
        <i class="fa-solid fa-caret-up"></i> Max Level: {maxLevel}
      </h3>
      {manaCost !== 0 && (
        <h3 className="text-blue-300 text-sm">
          <i class="fa-solid fa-droplet"></i> Mana cost: {manaCost}
        </h3>
      )}
      {cooldown !== 0 && (
        <h3 className="text-yellow-300 text-sm">
          <i class="fa-solid fa-clock-rotate-left"></i> Cooldown: {cooldown}
        </h3>
      )}
      <p className="text-gray-200 font-mono py-2 font-bold">{description}</p>
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
