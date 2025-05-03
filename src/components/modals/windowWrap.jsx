import React from "react";

function WindowWrap({ children, title = "", close = () => {} }) {
  return (
    <>
      <div className="fixed top-0 w-full h-full bg-[rgba(0,0,0,0.8)]">
        <div
          className="absolute z-[-1] top-0 w-screen h-screen"
          onClick={close}
        ></div>
        <div className="w-[80%] rounded-md pb-2 bg-[rgba(27,27,27,0.9)] pixel-font m-auto mt-8">
          <div className="relative top-0 right-0 pb-8">
            <button
              className="absolute right-0 rounded-none rounded-tr-sm"
              onClick={close}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="text-center">
            <h1 className="font-bold text-amber-600 text-md md:text-2xl">
              {title.toUpperCase()}
            </h1>
          </div>
          <div className="p-2 h-[80vh] overflow-y-scroll">{children}</div>
        </div>
      </div>
    </>
  );
}

export default WindowWrap;
