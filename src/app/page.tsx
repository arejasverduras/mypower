import Link from "next/link";


export default function Home() {
  const pages: 
  {title: string,
    link: string,
  }[] = [
    {
    title: "Search",
    link: "/search"
  },
  {
    title: "Discover",
    link: "/discover"
  },
  // {
  //   title: "Library",
  //   link: "/library"
  // },
  {
    title: "Excercises",
    link: "/exercises"
  },
  {
    title: "Workouts",
    link: "/workouts"
  },
  // {
  //   title: "Programs",
  //   link: "/programs"
  // },
  // {
  //   title: "Tags",
  //   link: "/tags"
  // },
  {
    title: "Users",
    link: "/users"
  },
  {
    title: "Dashboard",
    link: "/dashboard"
  },
]

const links = pages.map((page, index) => 
  <Link 
      key={index} 
      href={page.link} 
      className="font-bold"
      >
        {page.title}
  </Link>)


  return (
    <div className=" min-h-screen bg-primary-color text-secondary-color p-5">
      <h2 className="text-2xl my-5">Welcome to MyPower!</h2>
      <div className="flex flex-col space-y-2">
      {links}
      </div>
      
    </div>

  );
}
