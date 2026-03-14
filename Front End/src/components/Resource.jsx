import '../App.css'

function Resource ({resource}) {
    const url = resource.url

    return (    
        <div className = "resource-item" onClick={() => window.open(url, '_blank')}>
            <h2>{resource.title}</h2>
            <p>{resource.source}</p>
        </div>
    );
}

export default Resource;