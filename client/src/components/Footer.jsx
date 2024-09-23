import React from "react";

function Footer() {
  return (
    <div className="flex flex-col justify-center w-full gap-2 py-12 mt-12 bg-gray-500/5 ">
      <div className="flex items-center gap-4 ">
        <section className="flex items-center justify-end flex-1 gap-1 ">
          <p className="text-base italic font-black text-rose-500">WM</p>
          <h1 className="text-sm font-semibold">WatchMe</h1>
        </section>

        <div className="h-6 border-l border-gray-100/20"></div>

        <p className="flex-1 text-sm ">
          Made by <span className="text-base font-semibold">Orue 💚</span>
        </p>
      </div>

      <p className="px-8 mt-2 text-sm text-center opacity-40">
        This does not store any files on its server, it only provides links to
        media hosted on 3rd party services.
      </p>
    </div>
  );
}

export default Footer;
