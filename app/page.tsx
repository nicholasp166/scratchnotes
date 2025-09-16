"use server";
import "./styles/globals.css";
import Noteform from "./components/noteform";

export default async function Home() {
  const locations: string[] = [
    "Select an Item",
    "New York",
    "Tokyo",
    "Paris",
    "Sydney",
    "Cairo",
    "Rio de Janeiro",
    "London",
    "Toronto",
    "Dubai",
    "Cape Town",
  ];

  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-center text-black">Welcome to My Website</h1>

        <Noteform locations={locations} />
      </div>
    </>
  );
}
