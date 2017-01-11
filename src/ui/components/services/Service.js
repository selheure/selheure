import React from 'react';



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

const ServiceDeclare = ({service, category}) => {
  return(
    <div className="row">
      <ServiceRow title="Type de service :" contenu={ category[service.service] }/>
      <ServiceRow title=" Par :" contenu={ service.from }/>
      <ServiceRow title=" Pour :" contenu={ service.for }/>
    </div>
  )
}


const ServiceRequest = ({service, category}) => {
  return(
    <div className="row">
      <ServiceRow title="Type de service :" contenu={ category[service.service] }/>
      <ServiceRow title="Rechercher par :" contenu={ service.from }/>
    </div>
  )
}


const ServicePropose = ({service, category}) => {
  return(
    <div className="row">
      <ServiceRow title="Type de service :" contenu={ category[service.service] }/>
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

    let title
    if ( this.props.seeTitle === true ){
      title = <h6>{ service.type }</h6>
    }

    let contenu
    if ( service.type === 'Propose' ){
      contenu = <ServicePropose service={service} category={this.props.category}/>
    }
    else if ( service.type === 'Recherche' ){
      contenu = <ServiceRequest service={service} category={this.props.category}/>
    }
    else {
      contenu = <ServiceDeclare service={service} category={this.props.category}/>
    }

    return(
      <div className="col s12 m10 offset-m1" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px' }}>

        { title }
        { contenu }

      </div>
    )
  }

}

export default Service
