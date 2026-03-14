import '../App.css';
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";

function ExerciseEntry({exercise, deleteExercise, editExercise}) {
    return (
        <tr className="exercise-entry">
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><EditEntry exercise = {exercise} editExercise = {editExercise} /></td>
            <td><DeleteEntry exerciseID = {exercise._id} deleteExercise = {deleteExercise} /> </td>
        </tr> 
        );
}

export default ExerciseEntry;