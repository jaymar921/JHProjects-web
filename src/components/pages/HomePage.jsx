import React from "react";

function HomePage() {
  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">JHProjects</h1>
        <p className="text-sm text-slate-400 mb-6">
          Small indie projects by JayMar921
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="/customenchantments3"
            className="block rounded-lg border p-4 hover:shadow"
          >
            <h2 className="font-semibold">Custom Enchantments 3</h2>
            <p className="text-xs text-slate-500">
              RPG enchantments plugin for Minecraft. Premium & free builds
              available.
            </p>
          </a>

          <a
            href="/kumandras-economy"
            className="block rounded-lg border p-4 hover:shadow"
          >
            <h2 className="font-semibold">Kumandra&apos;s Economy</h2>
            <p className="text-xs text-slate-500">
              A whole server economy in one free jar. Jobs, trading, delivery,
              shops and quests.
            </p>
          </a>
        </div>

        <div className="mt-8 text-sm">
          <a
            href="https://github.com/jaymar921"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400"
          >
            View more on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
