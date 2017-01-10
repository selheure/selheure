import React from 'react';

import {
  servicesCategory
} from '../../../api/servicesData'


const ServiceRow = ({title, contenu}) => {
  return(
    <div className="row">
      <div className="col s12 m6">
        {title}
      </div>
      <div className="col s12 m6">
        { contenu }
      </div>
    </div>
  )
}

const ServiceDeclare = ({service}) => {
  return(
    <div className="row">
      <ServiceRow title="Type de service :" contenu={ servicesCategory[service.service] }/>
      <ServiceRow title=" Par :" contenu={ service.from }/>
      <ServiceRow title=" Pour :" contenu={ service.for }/>
    </div>
  )
}


const ServiceRequest = ({service}) => {
  return(
    <div className="row">
      <ServiceRow title="Type de service :" contenu={ servicesCategory[service.service] }/>
      <ServiceRow title="Proposer par :" contenu={ service.from }/>
    </div>
  )
}


const ServicePropose = ({service}) => {
  return(
    <div className="row">
      <ServiceRow title="Type de service :" contenu={ servicesCategory[service.service] }/>
      <ServiceRow title="Proposer par :" contenu={ service.from }/>
    </div>
  )
}

class Service extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const service = this.props.service

    let contenu
    if ( servicesCategory[service.service] == 'Propose' ){
      contenu = <ServicePropose service={ this.props.service }/>
    }
    else if ( servicesCategory[service.service] == 'Propose' ){
      contenu = <ServiceRequest service={ this.props.service }/>
    }
    else {
      contenu = <ServiceDeclare service={ this.props.service }/>
    }

    return(
      <div className="col s12 m10 offset-m1" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>{ service.type }</h5>

        { contenu }

      </div>
    )
  }

}

export default Service
