
import { HeaderJara } from "./components/Header/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-800">
      <HeaderJara/>
      <main className="bg-black border  flex items-center justify-center">
        <p>
          Hola
        </p>
      </main>
    </div>
  );
}
