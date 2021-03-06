import React, { Component } from 'react';

import PersonListPanel from './personListPanel'
import PersonInfoPanel from './PersonInfoPanel'

class PersonPanel extends Component {

    state = {
        persons: [
            {
                id: 1,
                name: 'Keerthana',
                dob: '05-10-1994',
                gender: 'female'
            },
            {
                id: 2,
                name: 'Prabha',
                dob: '24-07-1995',
                gender: 'female'
            },
            {
                id: 3,
                name: 'Harridha',
                dob: '19-11-1994',
                gender: 'female'
            },
            {
                id: 4,
                name: 'Pratiba',
                dob: '24-07-1994',
                gender: 'female'
            }
        ],
        selectedPerson: {
            id: 1,
            name: 'keerthana',
            dob: '05-10-1994',
            gender: 'female'
        }
    }

    findIndex(persons, id) {
        return persons.map( (person) => person.id ).indexOf(id);
    }

    onSelectPerson = (person) => {
        
        this.setState((prevState) => {
            let persons = [...prevState.persons];
            if (this.findIndex(persons, person.id) === -1) { return; }
            return {
                selectedPerson: person
            }
        });
    }

    onDeletePerson = (personId) => {
        
        let persons = [...this.state.persons];
        let index = this.findIndex(persons, personId);
        persons.splice(index, 1);
        
        let selectedPerson = (persons.length > index) ? persons[index] : persons[index - 1];

        this.setState({
            persons: persons,
            selectedPerson: selectedPerson
        });
    }

    onAddPerson = (person) => {
        let persons = [...this.state.persons];
        persons.push(person);
        this.setState({
            persons: persons
        });
    }

    onUpdatePerson = (person) => {
        let persons = [...this.state.persons];
        persons[this.findIndex(persons, person.id)] = person;
        this.setState({
            persons: persons
        });
    }

    render() {
        return (
            <div>
                <PersonListPanel persons={this.state.persons} 
                                 click={this.onSelectPerson} 
                                 delete={this.onDeletePerson} />
                <PersonInfoPanel selectedPerson={this.state.selectedPerson}
                                 add={this.onAddPerson}
                                 update={this.onUpdatePerson} />
            </div>
        );
    }
}

export default PersonPanel;