import React from 'react';

const addressInfo = (properties) => {

    return(
        <div>
            <label>Id</label>
            <input type='text' value={properties.addressToPopulate.id}/>
            <label>Street</label>
            <input type='text' value={properties.addressToPopulate.street}/>
            <label>City</label>
            <input type='text' value={properties.addressToPopulate.city}/>
            <label>PostalCode</label>
            <input type='text' value={properties.addressToPopulate.postalCode}/>
        </div>
    );
}

export default addressInfo;