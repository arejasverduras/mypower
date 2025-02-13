"use client"

import { ExerciseList } from '@/app/components/Exercises/ExerciseList';
import { WorkOuts } from '../components/WorkOuts/WorkOuts';
// import ProgramList from '../../components/Library/Programs/ProgramList';

// import { SearchBar } from '../components/UI functions/SearchBar/SearchBar';
// import { ExerciseWithRelations } from '../../../types/exercise';
// import { WorkoutWithRelations } from '../../../types/workout';
// import { ProgramWithRelations } from '../../../types/program';

export default function LibraryPage ()  {
  // is Browse: render different components for exercises/ workouts /programs
  // const [exercises, setExercises] = useState<ExerciseWithRelations[]>([]);
  // const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
//   const [programs, setPrograms] = useState<ProgramWithRelations[]>([]);
  // const [search, setSearch] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const [exercisesRes, workoutsRes] = await Promise.all([
  //         fetch('/api/exercises'),
  //         fetch('/api/workouts'),
  //       //   fetch('/api/programs'),
  //       ]);

  //       if (!exercisesRes.ok || !workoutsRes.ok ) {
  //         setError('Failed to load library data');
  //         return;
  //       }

  //       const [exercisesData, workoutsData] = await Promise.all([
  //         exercisesRes.json(),
  //         workoutsRes.json(),
  //       //   programsRes.json(),
  //       ]);

  //       setExercises(exercisesData);
  //       setWorkouts(workoutsData);
  //       // setPrograms(programsData);
  //     } catch (err) {
  //       console.error(err);
  //       setError('Failed to load library data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const lowerCaseSearch = search.toLowerCase();




  // const filteredWorkouts = workouts.filter(workout =>
  //   workout.title.toLowerCase().includes(lowerCaseSearch) ||
  //   workout.description?.toLowerCase().includes(lowerCaseSearch) ||
  //   workout.tags.some(tag => tag.name.toLowerCase().includes(lowerCaseSearch)) ||
  //   workout.createdBy.name?.toLowerCase().includes(lowerCaseSearch) ||
  //   workout.exercises.some(exercise => exercise.exercise.title.toLowerCase().includes(lowerCaseSearch))
  // );

//   const filteredPrograms = programs.filter(program =>
//     program.title.toLowerCase().includes(lowerCaseSearch) ||
//     program.description?.toLowerCase().includes(lowerCaseSearch)
//   );

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading text-text font-bold mb-6 text-center sm:text-left">Library</h1>
        {/* <SearchBar search={search} setSearch={setSearch} placeholderText="Search library..." /> */}
          <>
            {/* <h2 className="text-2xl font-heading text-text font-bold mb-4">Programs</h2>
            <ProgramList programs={filteredPrograms} /> */}
            
            <h2 className="text-2xl font-heading text-text font-bold mb-4">Exercises</h2>
            <ExerciseList />

            <h2 className="text-2xl font-heading text-text font-bold mb-4">Workouts</h2>
            <WorkOuts />
          </>
        
      </div>
    </div>
  );
};
