import '../App.css';
import Records from "../components/Records";
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function Home({setExerciseToEdit}) {

    const navigate = useNavigate();
    const [exercise_history, setExercises] = useState([]);

    const fetchExercises = async () => {
        const response = await fetch('/exercises')
        const data = await response.json()
        setExercises(data)
    }

    useEffect( () => {
        fetchExercises()
    }, []);

    const deleteExercise = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if (response.status === 204) {
            setExercises(exercise_history.filter(e => e._id !== _id))
        } else {
            alert(`Failed to delete exercise.`);
        }
    }

    const editExercise = async(exercise) => {
        setExerciseToEdit(exercise);
        navigate('/editExercise');
    }

    return (
        <>
            <p></p>
            <Records 
                exercises = {exercise_history} 
                deleteExercise = {deleteExercise}
                editExercise = {editExercise}>
            </Records>
            <p></p>
        </>
    );
}
export default Home;