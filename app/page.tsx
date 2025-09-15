import CustomSelect from "./components/select";
import "./styles/globals.css";

export default function Home() {
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
    <form className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <CustomSelect items={locations} />
    </form>
  );
}
