import React from 'react';


class ListOfType extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const service = this.props.service
    console.log(service)
    return(
      <div className="col s12 m10 offset-m1" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>{ service.type }</h5>
        <div className="row">
          <div className="col s12 m6">
            Type de service :
          </div>
          <div className="col s12 m6">
            { service.service }
          </div>
        </div>
      </div>
    )
  }

}

export default ListOfType
