import { Exercises } from '@/app/components/Exercises/Exercises';
import { WorkOuts } from '../components/WorkOuts/WorkOuts';


export default function DiscoverPage ()  {


  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading text-text font-bold mb-6 text-center sm:text-left">Library</h1>
          <>
            <h2 className="text-2xl font-heading text-text font-bold mb-4">Exercises</h2>
            <Exercises />

            <h2 className="text-2xl font-heading text-text font-bold mb-4">Workouts</h2>
            <WorkOuts />

            {/* <h2 className="text-2xl font-heading text-text font-bold mb-4">Programs</h2>
            <ProgramList programs={filteredPrograms} /> */}
          </>
        
      </div>
    </div>
  );
};
