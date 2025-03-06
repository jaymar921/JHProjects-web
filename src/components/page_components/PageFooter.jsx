import React from "react";

function PageFooter() {
  return (
    <footer className="text-center text-sm p-2 pt-4 m-2 border-t-2 border-slate-700">
      by <a href="https://github.com/JnH-Projects">JH Projects Team</a> &copy;{" "}
      {new Date().getFullYear()}
    </footer>
  );
}

export default PageFooter;
