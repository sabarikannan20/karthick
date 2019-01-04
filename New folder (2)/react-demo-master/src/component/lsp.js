import React from 'react';

const lsp = (props) => {
    return (
        <div>
            <button onClick={ () => props.onEntitySelection('person') }>Person</button>
            <button onClick={ () => props.onEntitySelection('address') }>Address</button>
        </div>
    )
}

export default lsp;