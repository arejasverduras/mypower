
import { HeaderJara } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

export default function Home() {
  return (
    <div className=" min-h-screen bg-blue-600 ">
      <HeaderJara/>
      <Hero/>
    </div>
  );
}
