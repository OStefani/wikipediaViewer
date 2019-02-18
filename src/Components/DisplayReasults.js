import React from 'react';

function DisplayResults(props) {

    return (
        <ul className="articles">
        {
            Object.keys(props.pages).map(index => {
                let link = 'https://en.wikipedia.org/?curid=' + props.pages[index].pageid;
                return <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <h2>{props.pages[index].title}</h2>
                                <p>{props.pages[index].extract}</p>
                            </a>
                        </li>
                })
        }</ul>
        
    )
}
export default DisplayResults;