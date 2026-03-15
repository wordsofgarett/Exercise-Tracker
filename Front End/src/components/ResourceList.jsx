import '../App.css'
import Resource from "./Resource"

function ResourceList ({resources}) {
    return (
        <div>
            {resources.map((resource,i) => <Resource resource = {resource} key = {i} />)}
        </div>
    )
}

export default ResourceList;