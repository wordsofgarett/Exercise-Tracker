import '../App.css';
import {MdEdit} from 'react-icons/md';

function EditEntry({exercise, editExercise}) {
    return(
        <div className = "row-edit-button">
            <MdEdit onClick={e => {
                e.preventDefault(); editExercise(exercise);}} />
        </div>
    );
}

export default EditEntry;