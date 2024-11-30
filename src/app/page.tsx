
import { HeaderJara } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

export default function Home() {
  return (
    <div className=" min-h-screen bg-blue-500 ">
      <HeaderJara/>
      <Hero/>
    </div>
  );
}
