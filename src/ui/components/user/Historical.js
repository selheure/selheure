import React from 'react';
import AnnouncesList from '../announces/AnnouncesList'

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
    declarations.forEach(announce => {
      if (( announce.from === this.props.user.username ) || ( announce.for === this.props.user.username ) ) {
        declarationsTab.push(announce)
      }
    })
    announces.forEach(announce => {
      if ( announce.from === this.props.user.username ) {
        announcesTab.push(announce)
      }
    })

    return(
      <div>
        <div className="row">
          <h5>Historique Annonces</h5>
          <AnnouncesList genre="announces" list={announcesTab} types={announcesTypes} user={this.props.user}/>
        </div>
        <div className="row">
          <h5>Historique Declarations</h5>
          <AnnouncesList genre="declarations" list={declarationsTab} types={declarationsTypes} user={this.props.user}/>
        </div>
      </div>
    )
  }
}

export default Historical
