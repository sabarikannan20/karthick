import React from 'react';

const PersonListPanel = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Dob</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
                {
                    props.persons.map( (person) => {
                        return ( 
                        <tr onClick={() => props.click(person)} key={person.id}>
                            <td>{ person.id }</td>
                            <td>{ person.name }</td>
                            <td>{ person.dob }</td>
                            <td>{ person.gender }</td>
                            <td>
                                <button onClick={() => props.delete(person.id)}>Delete</button>
                            </td>
                        </tr>)
                    } )
                }
            </tbody>
        </table>
    )
}

export default PersonListPanel;