import React from 'react';

import {
  servicesList,
  servicesTypes,
  servicesCategory
} from '../../../api/servicesData'

class ListOfType extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        { this.props.title }

      </div>
    )
  }

}

export default ListOfType
