

import Link from "next/link";


export default function Home() {
  
  return (
    <div className=" min-h-screen bg-primary-color text-secondary-color p-5">
      <h2 className="text-2xl my-5">Welcome to MyPower!</h2>
      <Link 
        href="/exercises"
        className="font-bold"
        >Go to exercises</Link>
    <Link href="/exercises/13">link</Link>
    </div>

  );
}
