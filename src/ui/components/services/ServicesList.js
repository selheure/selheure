import React from 'react';

import ListOfType from './ListOfType'



class ServicesList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        ServicesList

        {this.props.list.map(service =>
          <div key={ service.type }>
            <ListOfType title={ service.type } />
          </div>
          )}

      </div>
    )
  }

}

export default ServicesList
