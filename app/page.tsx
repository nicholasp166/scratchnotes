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
  const countries: string[] = [
    "United States",
    "Japan",
    "France",
    "Australia",
    "Egypt",
    "Brazil",
    "United Kingdom",
    "Canada",
    "United Arab Emirates",
    "South Africa",
  ];

  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-center text-black">Web Form</h1>

        <Noteform locations={locations} countries={countries} />
      </div>
    </>
  );
}
