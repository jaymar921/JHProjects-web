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
    <div className="w-full p-2 font-mono rounded-xl shadow-xs shadow-blue-300 hover:bg-[rgba(255,255,255,0.05)]">
      <h3 className="text-blue-400 text-center text-xs">
        ({type} ENCHANTMENT)
      </h3>
      <h1 className="text-2xl font-extrabold text-center">{title}</h1>
      <div className="text-amber-400 text-sm flex">
        <div className="w-[50%] md:w-[60%]">
          <p>
            <i class="fa-solid fa-tag"></i> Price:
          </p>
        </div>
        <div>
          <span className="pr-1">{currency}</span>
          {price}
        </div>
      </div>
      <div className="text-red-300 text-sm flex">
        <div className="w-[50%] md:w-[60%]">
          <i class="fa-solid fa-caret-up"></i> Max Level:
        </div>
        <div>{maxLevel}</div>
      </div>
      {manaCost !== 0 && (
        <div className="text-blue-300 text-sm flex">
          <div className="w-[50%] md:w-[60%]">
            <i class="fa-solid fa-droplet"></i> Mana cost:
          </div>
          <div>{manaCost}</div>
        </div>
      )}
      {cooldown !== 0 && (
        <div className="text-yellow-300 text-sm flex">
          <div className="w-[50%] md:w-[60%]">
            <i class="fa-solid fa-clock-rotate-left"></i> Cooldown:
          </div>
          <div>{cooldown}</div>
        </div>
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
