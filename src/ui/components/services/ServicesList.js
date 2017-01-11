import React from 'react';

import Select from '../generic/Select'

import ServiceDeclare   from './servicesView/ServiceDeclare'
import ServicePropose   from './servicesView/ServicePropose'
import ServiceRequest   from './servicesView/ServiceRequest'
import ServiceWaitValid from './servicesView/ServiceWaitValid'

class ServicesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeSelected: 0
    }
  }

  onChange(value) {
    this.setState({'typeSelected': value})
  }

  render() {
    const index = []

    this.props.list.forEach(service => {
      let contenu
      const typeService = this.props.types[this.state.typeSelected]
        console.log(typeService)
      if( ( service.type === typeService ) || ( typeService === 'Tous' ) ) {

        if ( service.type === 'Propose' ){
          contenu = <ServicePropose service={service} category={this.props.category}/>
        }
        else if ( service.type === 'Recherche' ){
          contenu = <ServiceRequest service={service} category={this.props.category}/>
        }
        else if ( service.type === 'Declaration' ){
          contenu = <ServiceDeclare service={service} category={this.props.category}/>
        }
        else{
          contenu = <ServiceWaitValid service={service} category={this.props.category}/>
        }

        index.push({'key': service.idService, 'contenu': contenu })
      }
    })


    return(
      <div className="col s10 offset-s1" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px' }}>
        <div className="row">
          <Select
            title="Type de service :"
            option={this.props.types}
            onChange={(e) => this.onChange(e.target.value)}
            value={this.state.typeSelected}/>
        </div>

        {
          index.map(contenu => {
            console.log(contenu)
            return (
              <div className="row" key={ contenu.key } style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px'}}>
                { contenu.contenu }
              </div>
            )
          })
        }

      </div>
    )
  }

}

export default ServicesList
