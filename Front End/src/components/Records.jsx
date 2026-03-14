import '../App.css';
import ExerciseEntry from './ExerciseEntry';

function Records({exercises, deleteExercise, editExercise}) {
    return (
        <table className = "records-table">
            <thead className = "records-header">
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Units</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody className = "records-body">
                {exercises.map((exercise,i) => <ExerciseEntry exercise = {exercise} key = {i} deleteExercise = {deleteExercise} editExercise = {editExercise} />)}
            </tbody>
            
        </table>
    );
}

export default Records;