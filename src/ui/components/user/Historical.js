import React from 'react';
import ServicesList from '../services/ServicesList'

import {
  declarations,
  declarationsTypes,
  announces,
  announcesTypes,
  announcesCategory
} from '../../../api/servicesData'


class Historical extends React.Component {

  render() {
    let declarationsTab = []
    let announcesTab = []
    declarations.forEach(service => {
      if (( service.from === this.props.user.username ) || ( service.for === this.props.user.username ) ) {
        declarationsTab.push(service)
      }
    })
    announces.forEach(service => {
      if ( service.from === this.props.user.username ) {
        announcesTab.push(service)
      }
    })

    return(
      <div>
        <div className="row">
          <h5>Historique Annonces</h5>
          <ServicesList  type="announces" list={announcesTab} types={announcesTypes} category={announcesCategory} user={this.props.user}/>
        </div>
        <div className="row">
          <h5>Historique Declarations</h5>
          <ServicesList  type="declarations" list={declarationsTab} types={declarationsTypes} category={announcesCategory} user={this.props.user}/>
        </div>
      </div>
    )
  }
}

export default Historical
