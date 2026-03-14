import '../App.css';
import {MdOutlineDeleteForever} from 'react-icons/md';

function DeleteEntry({exerciseID, deleteExercise}) {
    return(
        <div className = "row-delete-button">
            <MdOutlineDeleteForever onClick={e => {
                e.preventDefault(); deleteExercise(exerciseID);}} />
        </div>
    );
}

export default DeleteEntry;