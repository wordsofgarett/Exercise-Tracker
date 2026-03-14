import '../App.css';
import {Link} from 'react-router-dom'

function Navigation() {
    return (
        <nav className="app-nav">
            <Link to="/" className = "app-button">Home Page & Records</Link>
            <Link to="/createExercise" className = "app-button">Record an Exercise</Link>
            <Link to="/resources" className = "app-button">More Resources</Link>
        </nav>
    );
    }
export default Navigation;