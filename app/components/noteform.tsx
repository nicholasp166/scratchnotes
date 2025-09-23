"use client";

import Editor from "./editor";
import Dropdown from "./dropdown";
import { useState } from "react";

interface Noteform {
  locations: string[];
  countries: string[];
}

export default function Noteform({ locations, countries }: Noteform) {
  const [selRef1, setSelRef1] = useState("Select an Item");
  const [selRef2, setSelRef2] = useState("Select an Item");
  const [textItem, setTextItem] = useState("Enter text...");

  type formObj = {
    country: string;
    city: string;
    notes: string;
  };

  /*
  note here for future me:
  we need to figure out how to get the formatting here as well
  it might be worth it to include the entire dom but i honestly dont know
  we'll need:
    styling
    html elements

  */

  function processData(e: React.FormEvent) {
    e.preventDefault();

    const country = selRef1;
    const city = selRef2;
    const notes = textItem;

    const data: formObj = {
      country,
      city,
      notes,
    };

    //prettier-ignore
    if (selRef1 != "Select an Item" && selRef2 != "Select an Item" && textItem) {
      const jsonData = JSON.stringify(data);
      console.log(jsonData);
    }

    // You can use jsonData as needed (e.g., send to API)
  }

  return (
    <form
      className="text-black p-4 bg-white rounded shadow"
      onSubmit={processData}
    >
      <Dropdown items={countries} selRef={selRef1} setSelRef={setSelRef1} />

      {selRef1 && selRef1 !== "Select an Item" ? (
        <>
          <Dropdown items={locations} selRef={selRef2} setSelRef={setSelRef2} />
          {selRef2 && selRef2 !== "Select an Item" ? (
            <Editor textItem={textItem} setTextItem={setTextItem} />
          ) : null}
        </>
      ) : null}

      <button
        type="submit"
        className="px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
      >
        submit
      </button>
    </form>
  );
}
