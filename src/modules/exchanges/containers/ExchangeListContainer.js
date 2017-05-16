import React from 'react'
import ExchangeHistoryContainer from './ExchangeHistoryContainer'
import {
  userList,
  userData
} from '../../../api/usersData'

export default class DeclarationsList extends React.Component {
  render() {
    const user = userList[0]
    return (
      <div className="row">
        <div className="col s12">
          <h5>Échanges déclarés</h5>
          <ExchangeHistoryContainer />
        </div>
      </div>
    )
  }
}
