import React from 'react';

const UserInfo = ({user}) => (
  <ul>
    <li>
      <div className="col s5 offset-s1 right-align"><span>e-mail :</span></div>
      <div className="col s5 left-align" >{ user.eMail }</div>
    </li>
    <li>
      <div className="col s5 offset-s1 right-align"><span>telephone :</span></div>
      <div className="col s5 left-align" >{ user.phone }</div>
    </li>
  </ul>
)

export default UserInfo
