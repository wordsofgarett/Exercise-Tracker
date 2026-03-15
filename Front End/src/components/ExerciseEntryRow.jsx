import '../App.css'

function ExerciseEntryRow () {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const [muscle_group, setMuscleGroup] = useState('');
    const [user, setUser] = useState('');

    return (
        <form className = "single-exercise-entry">
            <fieldset>
                <legend>Record an Exercise</legend>
                <label>Name: 
                    <input type="text" value={name}
                        onChange={e => setName(e.target.value)} />
                </label>
                <label>Reps: 
                    <input type="number" min="1" value={reps}
                        onChange={e => setReps(e.target.valueAsNumber)} />
                </label>
                <label>Sets: 
                    <input type="number" min="1" value={sets}
                        onChange={e => setSets(e.target.valueAsNumber)} />
                </label>
                <label>Weight: 
                    <input type="number" min="0" value={weight}
                        onChange={e => setWeight(e.target.valueAsNumber)} />
                </label>
                <label>Units: 
                    <select name = "unit" value={unit}
                        onChange={e => setUnit(e.target.value)}>
                        <option></option>
                        <option value = "body">body</option>
                        <option value = "lbs">lbs</option>
                        <option value = "kgs">kgs</option>
                    </select>
                </label>
                <label>Date: 
                    <input type="date" value={date} 
                        onChange={e => setDate(e.target.value)} />
                </label>
            </fieldset>
        </form>
    )
}

export default ExerciseEntryRow;