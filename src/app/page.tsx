
import { HeaderJara } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

export default function Home() {
  return (
    <div className=" min-h-screen bg-blue-800">
      <HeaderJara/>
      <Hero/>
      {/* <main className="bg-black border  flex items-center justify-center">
        <p>
          Hola
        </p>
      </main> */}
    </div>
  );
}
