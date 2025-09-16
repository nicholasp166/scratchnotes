"use client";

import Dropdown from "./select";
import { useRef } from "react";

export default function Noteform({ locations }: { locations: string[] }) {
  const selectRef1 = useRef<HTMLButtonElement>(null); //this will pull the input from the select object

  function processData(e: React.FormEvent) {
    //form handler
    e.preventDefault();
    if (selectRef1.current) {
      console.log(selectRef1.current.value);
    }
  }

  return (
    <form className=" p-4 bg-white rounded shadow" onSubmit={processData}>
      <Dropdown items={locations} ref={selectRef1} />

      <button
        type="submit"
        className="px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
      >
        submit
      </button>
    </form>
  );
}
