import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EditExerciseModal from "@/app/components/ExerciseList/EditExerciseModal/EditExerciseModal"
import { ExerciseProps } from "@/app/api/exercises/route"
import { YouTube } from "@/app/components/Video/YouTube/YouTube"

type ExercisePageProps = {
  exercise: ExerciseProps
}

export const metadata: Metadata = {
  title: 'Exercise Details',
}

export default function ExercisePage({ params }: { params: { id: string } }) {
//   const { exercise } = getStaticProps(params.id)

  if (!exercise) {
    notFound()
  }

  return (
    <div className="bg-midnight">
      <h1>{exercise.title}</h1>
      {exercise.video && <YouTube embedId={exercise.video} />}
      {exercise.description && <div className="p-5">{exercise.description}</div>}
      {exercise.execution && (
        <div className="p-5">
          <h5 className="font-bold">Execution</h5>
          <div>{exercise.execution}</div>
        </div>
      )}
    </div>
  )
}
