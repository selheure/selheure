import React from 'react';

const Button = ({announce, user}) => {

  if (user) {
    return(
      <div className="row">
        <div className="col s4 center">
          <a className="waves-effect waves-light btn">Postuler</a>
        </div>
      </div>
    )
  }
  return (
    <div></div>
  )
}

const AnnounceView = ({announce, user}) => (
  <div>
    <div className="row">
      <div className="col s3">
        { announce.type }
      </div>
      <div className="col s3">
        { announce.service }
      </div>
      <div className="col s3">
        { announce.from }
      </div>
      <div className="col s3">
        { announce.message }
      </div>
    </div>
    <Button announce={announce} user={user}/>
  </div>
)

export default AnnounceView
