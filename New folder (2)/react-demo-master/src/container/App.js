import React, { Component } from 'react';
import Lsp from '../component/lsp';
import './App.css';

import PersonPanel from '../component/Person/PersonPanel';

class App extends Component {
    
    state = {
        entitySelected: 'person'
    }

    onEntitySelected = (entity) => this.setState({ entitySelected: entity });
  
    render() {
        
        let entityPanel = (this.state.entitySelected === 'person') ? <PersonPanel /> : <div>Hi I am address</div>;

        return (
            <div className="App">
                <Lsp onEntitySelection={this.onEntitySelected}/>
                { entityPanel }
            </div>
        );
  }
}

export default App;
