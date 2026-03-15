import '../App.css'
import ResourceList from '../components/ResourceList';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function Resources () {
    const [revealAddResource, setRevealAddResource] = useState(false);
    const [title, setTitle] = useState();
    const [source, setSource] = useState();
    const [url, setURL] = useState();

    const [resources, setResources] = useState([]);
    
    const fetchResources = async () => {
        const response = await fetch('/resources')
        await console.log(response)
        const data = await response.json()
        setResources(data)
    }

    useEffect( () => {
        fetchResources()
    }, []);
    
    // const addResource = () => {
    //     const newResource = {title, source, url}
    //     ResourceList.push(newResource)
    // }

    return (
        <>
        <div>
            <ResourceList resources = {resources} />
        </div>

        <div>
            <button className="add-resource-button" onClick ={() => 
                setRevealAddResource(!revealAddResource)
            }>Add New Resource</button>
        </div>

        {revealAddResource && (
            <form>
            <fieldset>
                <legend>Add Resource</legend>
                <label>Title: 
                    <input type="text" value={title}
                        onChange={e => setTitle(e.target.value)} />
                </label>
                <br/>
                <label>Source: 
                    <input type="text" value={source}
                        onChange={e => setSource(e.target.value)} />
                </label>
                <br/>
                <label>URL: 
                    <input type="text" value={url}
                        onChange={e => setURL(e.target.value)} />
                </label>
            </fieldset>
            <button className="submit-button" onClick={e => {
                addResource();
                e.preventDefault();
                alert(`Notice: functionality not fully implemented and does not save new resource in a persistant way. My actual React App that I will use (I had been planning to build an exercise tracker anyway) will save to my MongoDB, which has a separate Resources collection. I added this to see if I could get the form to appear and disappear, rather than navigating to a new page.`);
                setRevealAddResource(!revealAddResource);
                setTitle('');
                setSource('');
                setURL('');
                }}
                >Submit</button>    
        </form>
        )}
        </>
    );
}

export default Resources;