import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit ({exerciseToEdit}) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
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
        <div className = "single-exercise-entry">
            <form>
                <fieldset>
                    <legend>Edit Exercise</legend>
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
                    <label>Weight: 
                        <input type="number" min="1" value={weight}
                            onChange={e => setWeight(e.target.valueAsNumber)} />
                    </label>
                    <br/>
                    <label>Units: 
                        <select name = "unit" value={unit}
                            onChange={e => setUnit(e.target.value)}>
                            <option></option>
                            <option value = "lbs">lbs</option>
                            <option value = "kgs">kgs</option>
                        </select>
                    </label>
                    <br/>
                    <label>Date: 
                        <input type="text" value={date}
                            onChange={e => setDate(e.target.value)} />
                    </label>
                </fieldset>
                <button className="submit-button" onClick={e => {
                    editExercise();
                    e.preventDefault();
                    }}
                    >Save Changes</button>
            </form>
        </div>
    );
}

export default Edit;