import React from 'react';

import Select from '../generic/Select'

import ServiceDeclare   from './servicesView/ServiceDeclare'
import Service          from './servicesView/Service'
import ServiceWaitValid from './servicesView/ServiceWaitValid'

class ServicesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeSelected: 0,
      serviceSelected: 0
    }
  }

  onChange(value) {
    console.log(value)
    this.setState(value)
  }


  render() {
    const index = []

    this.props.list.forEach(service => {
      let contenu
      const typeService = this.props.types[this.state.typeSelected]
      const categoryService = this.props.category[this.state.serviceSelected]

      if( ( service.type === typeService ) || ( typeService === 'Tous' ) ) {

        if( ( service.service === categoryService ) || ( categoryService === 'Tous' ) ) {
          if (( service.type === 'Propose' ) || ( service.type === 'Recherche' )) {
            contenu = <Service service={service}/>
          }
          else if ( service.type === 'Declaration' ){
            contenu = <ServiceDeclare service={service}/>
          }
          else if ( service.type === 'Declaration a valider' ){
            contenu = <ServiceWaitValid service={service} user={this.props.user}/>
          }

          index.push({'key': service.idService, 'contenu': contenu })
        }

      }
    })

    return(
      <div className="col s10 offset-s1" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px' }}>
        <div className="row">
          <div className="col s6">
            <Select
              title="Type de service :"
              option={this.props.types}
              onChange={(e) => this.onChange({'typeSelected': e.target.value})}
              value={this.state.typeSelected}/>
          </div>
          <div className="col s6">
            <Select
              title="Categorie :"
              option={this.props.category}
              onChange={(e) => this.onChange({'serviceSelected': e.target.value})}
              value={this.state.serviceSelected}/>
          </div>
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
