import '../App.css'
import ResourceList from "../components/ResourceList";
import { useState, useEffect } from 'react';

function Resources () {
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
    
    const todays_date = new Date();
    const [revealAddResource, setRevealAddResource] = useState(false);
    const [title, setTitle] = useState();
    const [source, setSource] = useState();
    const [url, setURL] = useState();
    
    const addResource = async () => {
        const newResource = {title, source, url, todays_date}
        const response = await fetch ('/resources', {
            method: 'POST',
            body: JSON.stringify(newResource),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status === 201) {
            alert(`Successfully added ${title}`);
        } else {
            alert(`Failed to add ${title}, status code: ${response.status}`);
        }
        location.reload();
    }

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