import React from "react";
import CE3ClassImg from "../../../assets/custom_enchants_3/ce3_classes.png";
import { PluginInformation } from "../../contants";

function CE3_Classes() {
  return (
    <div className="w-full">
      <div className="w-[60%] md:w-[40%] xl:w-[30%] m-auto">
        <img className="w-full" src={CE3ClassImg} />
      </div>
      <div className="p-8">
        <h1 className="text-md md:text-xl text-purple-500">About</h1>
        <p className="text-xs md:text-[1em]">
          {PluginInformation.classes.description}
        </p>
      </div>
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-2">
        {PluginInformation.classes.class.map((clazz) => {
          return (
            <div className="border-2 p-3 ">
              <h1 className={`${clazz.color} text-xl pb-2`}>
                {clazz.icon && <i className={`${clazz.icon} pr-2`}></i>}
                {clazz.title}
              </h1>
              <p className="text-justify text-xs">{clazz.description}</p>
              <p className="text-center text-xs pt-4">{clazz.subdescription}</p>

              <div className="text-xs font-serif text-justify">
                <h1 className="text-[1.2em] font-bold text-purple-500 pt-4">
                  MAIN ATTRIBUTE
                </h1>
                <p className="font-bold text-red-300">
                  {clazz.main_attribute.toUpperCase()}
                </p>
                {clazz.attributes.map((attr) => {
                  return (
                    <>
                      <div className="py-2">
                        <p className="text-gray-400">{attr}</p>
                      </div>
                    </>
                  );
                })}
                <h1 className="text-[1.2em] font-bold text-purple-500 pt-4">
                  SKILLS
                </h1>
                {clazz.skills.map((skill) => {
                  return (
                    <>
                      <div className="py-2">
                        <h1 className="font-bold text-red-300">
                          {skill.title}
                        </h1>
                        <p className="text-gray-400">{skill.description}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CE3_Classes;
