import React from 'react';

import Balance    from '../components/user/Balance'
import Historical from '../components/user/Historical'

class UserPage extends React.Component {

  render() {

    return(
      <div>
        userpage
        <Balance />
        <Historical />
      </div>
    )
  }
}

export default UserPage
