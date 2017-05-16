import React, {PropTypes} from 'react'
import ExchangeHistoryComponent from '../components/ExchangeHistoryComponent'

import {
  exchanges,
} from '../../../api/servicesData'


export default class ExchangeHistoryContainer extends React.Component {
  static propTypes = {
    userId: PropTypes.string
  }

  render() {
    const exchanges = getRemoteData(this.props)

    return (
      <ExchangeHistoryComponent
        {...{exchanges}}
      />
    )
  }
}


function getRemoteData(props) {
  const {username} = props.user || {}
  if(!props.userId) return exchanges
  return exchanges.filter(exchange => {
    return exchange.from === username || exchange.for === username
  })
}
