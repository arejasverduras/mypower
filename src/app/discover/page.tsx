import Link from 'next/link';

export default function DiscoverPage ()  {

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading text-text font-bold mb-6 text-center sm:text-left">Discover</h1>
          <>
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
            
            
            {/* <h2 className="text-2xl font-heading text-text font-bold mb-4">Exercises</h2>
            <Exercises />

            <h2 className="text-2xl font-heading text-text font-bold mb-4">Workouts</h2>
            <WorkOuts /> */}

            {/* <h2 className="text-2xl font-heading text-text font-bold mb-4">Programs</h2>
            <ProgramList programs={filteredPrograms} /> */}
          </>
        
      </div>
    </div>
  );
};
