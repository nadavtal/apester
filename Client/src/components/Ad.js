import React from 'react'

const Ad = ({ad}) => {

    return (
        <div >
            <h3>{ad.description}</h3>
            <div>
                {ad.tags.map(tag => <span key={tag}>{tag}, </span>)}
            </div>
            <div>Distance : {ad.distance}</div>
            <div>Relevant Tags number : {ad.relevance}</div>
        </div>
    )
}

export default Ad