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
        <p className=" text-xs md:text-lg">
          {PluginInformation.classes.description}
        </p>
      </div>
      <div className="p-8 text-center text-xs md:text-lg">
        <p>
          To activate, you have to open the Skills GUI by using the ce skill
          command. Minimum requirement will be level 10. Once ready, just spend
          your skill points
        </p>
        <p className="rounded-sm mt-2 font-mono bg-slate-700 p-4 text-left w-full">
          <i class="fa-solid fa-angle-right"></i>{" "}
          {PluginInformation.classes.command}
        </p>
      </div>
      <h1 className="text-center text-md md:text-xl text-purple-500">
        Classes
      </h1>
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-2">
        {PluginInformation.classes.class.map((clazz, index) => {
          return (
            <div key={`${index}-${Math.random()}`} className="border-2 p-3 ">
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
