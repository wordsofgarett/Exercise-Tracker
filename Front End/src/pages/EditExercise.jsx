import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditExercise ({exerciseToEdit}) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [sets, setSets] = useState(exerciseToEdit.sets);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const [muscle_group, setMuscleGroup] = useState('');
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date, sets, muscle_group, user};
        const response = await fetch (`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status === 200) {
            alert(`Successfully edited ${name}`);
        } else {
            alert(`Failed to edit ${name}, status code: ${response.status}`);
        }
        navigate("/");
    }

    return (
        <div >
            <form className = "single-exercise-entry">
                <fieldset>
                    <legend>Record an Exercise</legend>
                    <label>Name: 
                        <input type="text" value={name}
                            onChange={e => setName(e.target.value)} />
                    </label>
                    <br/>
                    <label>Reps: 
                        <input type="number" min="1" value={reps}
                            onChange={e => setReps(e.target.valueAsNumber)} />
                    </label>
                    <br/>
                    <label>Sets: 
                        <input type="number" min="1" value={sets}
                            onChange={e => setSets(e.target.valueAsNumber)} />
                    </label>
                    <br/>
                    <label>Weight: 
                        <input type="number" min="0" value={weight}
                            onChange={e => setWeight(e.target.valueAsNumber)} />
                    </label>
                    <br/>
                    <label>Units: 
                        <select name = "unit" value={unit}
                            onChange={e => setUnit(e.target.value)}>
                            <option></option>
                            <option value = "body">body</option>
                            <option value = "lbs">lbs</option>
                            <option value = "kgs">kgs</option>
                        </select>
                    </label>
                    <br/>
                    <label>Date: 
                        <input type="date" value={date} 
                            onChange={e => setDate(e.target.value)} />
                    </label>
                </fieldset>
                <div className = "box">
                <button className="submit-button" onClick={e => {
                    editExercise();
                    e.preventDefault();
                    }}
                    >Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default EditExercise;