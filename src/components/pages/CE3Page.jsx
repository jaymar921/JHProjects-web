import React, { useEffect } from "react";

function CE3Page() {
  useEffect(() => {
    document.title = "Custom Enchantments 3";
  }, []);

  return (
    <div className="flex place-items-center text-center justify-center h-screen">
      <div className="w-fit">
        <p>Ongoing Maintenance</p>
        <a href="https://jaymar921.github.io/jaymar_plugin_wiki/custom_enchantments_3.html">
          CE 3 Wiki
        </a>
      </div>
    </div>
  );
}

export default CE3Page;
