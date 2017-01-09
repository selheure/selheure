import React from 'react';


class Compteur extends React.Component {

  render() {
    return(
      <div>
        { this.props.title }
        { this.props.value }
        { this.props.unite }
      </div>
    )
  }
}

export default Compteur
