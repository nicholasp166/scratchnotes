"use client";

import Editor from "./editor";
import Dropdown from "./select";
import { useState } from "react";

interface Noteform {
  locations: string[];
  countries: string[];
}

export default function Noteform({ locations, countries }: Noteform) {
  const [selRef1, setSelRef1] = useState("Select an Item");
  const [selRef2, setSelRef2] = useState("Select an Item");

  function processData(e: React.FormEvent) {
    //form handler
    e.preventDefault();
    if (selRef1) {
      console.log(selRef1);
    }
    if (selRef2) {
      console.log(selRef2);
    }
  }

  return (
    <form
      className="text-black p-4 bg-white rounded shadow"
      onSubmit={processData}
    >
      <Dropdown items={countries} selRef={selRef1} setSelRef={setSelRef1} />

      {selRef1 && selRef1 != "Select an Item" ? (
        <Dropdown items={locations} selRef={selRef2} setSelRef={setSelRef2} />
      ) : null}
      <Editor />

      <button
        type="submit"
        className="px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
      >
        submit
      </button>
    </form>
  );
}
