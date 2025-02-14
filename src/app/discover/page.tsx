import Link from 'next/link';

export default function DiscoverPage ()  {

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading text-text font-bold mb-6 text-center sm:text-left">Discover</h1>
          
            {/* just promo cards that link to pages (exercises, workouts, programs) or promoted items. Or browse by tag / category */}
            <div className="promo-cards mb-6">
              <div className="promo-card bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-bold mb-2">Explore Exercises</h3>
                <p className="text-gray-700 mb-4">Find exercises to target specific muscle groups and improve your fitness.</p>
                <Link href="/exercises" className="text-blue-500 hover:underline">Browse Exercises</Link>
              </div>
              <div className="promo-card bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-bold mb-2">Discover Workouts</h3>
                <p className="text-gray-700 mb-4">Explore various workout routines to match your fitness goals.</p>
                <Link href="/workouts" className="text-blue-500 hover:underline">Browse Workouts</Link>
              </div>
              <div className="promo-card bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-bold mb-2">Browse Programs</h3>
                <p className="text-gray-700 mb-4">Check out our curated programs to help you stay on track.</p>
                <Link href="/programs" className="text-blue-500 hover:underline">Browse Programs</Link>
              </div>
            </div>
            
            
            {/* featured items */}
            {/* <h2 className="text-2xl font-heading font-bold mb-4">Featured Items</h2>
            <div className="featured-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="featured-item bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Featured Exercise</h3>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link href="/exercises" className="text-blue-500 hover:underline">View Exercise</Link>
              </div>
              <div className="featured-item bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Featured Workout</h3>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link href="/workouts" className="text-blue-500 hover:underline">View Workout</Link>
              </div>
              <div className="featured-item bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Featured Program</h3>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link href="/programs" className="text-blue-500 hover:underline">View Program</Link>
              </div>
            </div> */}

            {/* browse by tag / category */}
            {/* <h2 className="text-2xl font-heading font-bold mb-4">Browse by Tag</h2>
            <div className="tags grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="tag bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Cardio</h3>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link href="/tags/cardio" className="text-blue-500 hover:underline">View Tag</Link>
              </div>
              <div className="tag bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Strength</h3>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link href="/tags/strength" className="text-blue-500 hover:underline">View Tag</Link>
              </div>
              <div className="tag bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Yoga</h3>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link href="/tags/yoga" className="text-blue-500 hover:underline">View Tag</Link>
              </div>
            </div> */}
          
          {/* browse by category */}
          {/* <h2 className="text-2xl font-heading font-bold mb-4">Browse by Category</h2>
          <div className="categories grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="category bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Upper Body</h3>
              <p className="text-gray-700 mb-4">Exercises and workouts focused on upper body strength.</p>
              <Link href="/categories/upper-body" className="text-blue-500 hover:underline">View Category</Link>
            </div>
            <div className="category bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Lower Body</h3>
              <p className="text-gray-700 mb-4">Exercises and workouts focused on lower body strength.</p>
              <Link href="/categories/lower-body" className="text-blue-500 hover:underline">View Category</Link>
            </div>
            <div className="category bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Full Body</h3>
              <p className="text-gray-700 mb-4">Exercises and workouts that target the entire body.</p>
              <Link href="/categories/full-body" className="text-blue-500 hover:underline">View Category</Link>
            </div>
          </div> */}
        
      </div>
    </div>
  );
};
