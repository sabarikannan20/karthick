import React from 'react';

const addressList = (properties) => {

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Street</th>
              <th>City</th>
              <th>PostalCode</th>
            </tr>
            {properties.addressList.map(address => {
                return(<tr key={address.id} 
                           onClick={properties.onItemSelect
                                              .bind(this, address)}>
                         <td>{address.id}</td>
                         <td>{address.street}</td>
                         <td>{address.city}</td>
                         <td>{address.postalCode}</td>
                         <td><button>Delete</button></td>
                       </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
}

export default addressList;