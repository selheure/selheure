import React from 'react';
import ExchangeHistoryContainer from '../../transactions/components/ExchangeHistoryComponent'

import {userList} from '/src/api/userData.js'

export default class UserHistoryContainer extends React.Component {

  render() {
    const user = userList[0]
    return(
      <div>
        <div className="row">
          <h5>Historique Annonces</h5>
          {/*<AnnouncesList genre="announces" list={announcesTab} types={announcesTypes} user={this.props.user}/>*/}
        </div>
        <div className="row">
          <h5>Historique Declarations</h5>
          <ExchangeHistoryContainer
            userId={user.id}
            user={user}
          />
        </div>
      </div>
    )
  }
}
