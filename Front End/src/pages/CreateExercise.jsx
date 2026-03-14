import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateExercise () {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const [muscle_group, setMuscleGroup] = useState('');
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    const recordExercise = async () => {
        const newExercise = {name, reps, weight, unit, date, sets, muscle_group, user};
        const response = await fetch ('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status === 201) {
            alert(`Successfully added ${name}`);
        } else {
            alert(`Failed to add ${name}, status code: ${response.status}`);
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
                    recordExercise();
                    e.preventDefault();
                    }}
                    >Record</button>
                </div>
            </form>
        </div>
    );
}

export default CreateExercise;