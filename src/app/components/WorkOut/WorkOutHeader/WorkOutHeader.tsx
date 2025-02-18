
export const WorkOutHeader = ({workout}: {workout: WorkoutWithRelations}) => {

    return (
        <>
            <section>
                <p>Created by: John Doe</p>
                <h1>{workout.title || "My workout"}</h1>
                <p>Add a description</p>
            </section
        </>
    )