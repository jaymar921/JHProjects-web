import React from "react";

function CE3_BugReport() {
  return (
    <div className="w-full">
      <div className="w-[90%] m-auto">
        <div className="p-8">
          <h1 className="text-md md:text-xl text-purple-500">Found a bug?</h1>
          <p className="py-2">
            Help the developer by reporting an issue that is found in the
            plugin.
          </p>

          {/* Code block */}

          <div className="mx-auto mt-8 bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 overflow-auto">
              <pre>
                <code className="text-sm" lang="md">
                  <p className="mt-5 mb-0 font-bold bg-gray-700 w-fit py-2 px-2 rounded-md">
                    [BUG REPORTING REQUIREMENT]
                  </p>
                  {`
➡ DESCRIPTION
   • A clear and consise description of what the bug is.
➡ EXPECTED BEHAVIOR 
   • A clear and consise description of what you expected to happen.
➡ SCREENSHOT
   • If applicable, add screenshots to help explain your problem (Error Messages will helps a lot). 
➡ SERVER VERSION 
   • Helps the developer to track a specific version that causes the bug
➡ ADDITIONAL CONTEXT
   • Add any other context about the problem
                    `}
                </code>
              </pre>
            </div>
          </div>

          <p className="py-2">
            Click the link below to submit a report at github
          </p>

          <div className="text-center p-8">
            <a
              className="border-b-2 p-2 border-white cursor-pointer text-xs md:text-lg"
              href="https://github.com/JnH-Projects/Custom-Enchantments-3/issues/new/choose"
              target="_blank"
            >
              <i className="fa-brands fa-github text-white"></i> Github Issues
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CE3_BugReport;
