import React from 'react'

export default class UserInfoComponent extends React.Component {
  static PropTypes = {

  }

  render() {
    const {user} = this.props
    return (
      <ul>
        <li>
          <div className="col s5 offset-s1 right-align"><span>e-mail :</span></div>
          <div className="col s5 left-align" >{ user.email }</div>
        </li>
        <li>
          <div className="col s5 offset-s1 right-align"><span>telephone :</span></div>
          <div className="col s5 left-align" >{ user.phone }</div>
        </li>
      </ul>
    )
  }
}
