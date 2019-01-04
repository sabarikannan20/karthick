import React, { Component } from 'react';
import AddressList from './AddressList';
import AddressInfo from './AddressInfo';
import Aux from '../Auxilary/Aux';
import axios from 'axios';

class AddressPanel extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
        addressList: null,
        addressToPopulate: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/res/do/address')
         .then(response => {
           this.setState({
             addressList: response.data,
             addressToPopulate: response.data[0]
           })
         })
  }

  populateInForm = address => {
    this.setState({
        addressToPopulate: address
    });
  }

  render() {

    let addressDetails = null;
    if(this.state.addressList) {
        addressDetails = <div>
                           <AddressList addressList={this.state.addressList} 
                                        onItemSelect={this.populateInForm}/>
                           <AddressInfo addressToPopulate={this.state.addressToPopulate}/>
                         </div>
    }

    return (
      <Aux>
        {addressDetails}
      </Aux>
    );
  }
}

export default AddressPanel;