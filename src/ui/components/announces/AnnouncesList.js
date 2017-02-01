import React from 'react';

import Select from '../generic/Select'

import DeclarationView       from './ListComponents/DeclarationView'
import AnnounceView          from './ListComponents/AnnounceView'

const AnnounceHead = () => (
  <div className="row">
    <div className="col s3">
      Type
    </div>
    <div className="col s3">
      Categorie
    </div>
    <div className="col s3">
      Proposer par
    </div>
    <div className="col s3">
      Message
    </div>
  </div>
)

const DeclarationHead = () => (
  <div className="row">
    <div className="col s2">
      Categorie
    </div>
    <div className="col s2">
      Effectuer par
    </div>
    <div className="col s2">
      Valider
    </div>
    <div className="col s2">
      Effectuer pour
    </div>
    <div className="col s2">
      Valider
    </div>
    <div className="col s2">
      Solde
    </div>
  </div>
)

class AnnouncesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeSelected: 0,
      categorySelected: 0
    }
  }

  onChange(value) {
    console.log(value)
    this.setState(value)
  }


  render() {
    const index = []
    let head

    if (this.props.type === "announces"){
      head = <AnnounceHead />
    }
    else {
      head = <DeclarationHead />
    }
    this.props.list.forEach(announce => {
      let contenu
      const announceType = this.props.types[this.state.typeSelected]
      const announceCategory = this.props.category[this.state.categorySelected]

      if( ( announce.type === announceType ) || ( announceType === 'Tous' ) ) {

        if( ( announce.service === announceCategory ) || ( announceCategory === 'Tous' ) ) {

          if (( announce.type === 'Propose' ) || ( announce.type === 'Recherche' )) {
            contenu = <AnnounceView announce={announce} user={this.props.user}/>

          }
          else if (( announce.type === 'Declaration' ) || ( announce.type === 'Declaration a valider' )) {
            contenu = <DeclarationView announce={announce} user={this.props.user}/>
          }

          index.push({'key': announce.idService, 'contenu': contenu })
        }
      }
    })
    return(
      <div className="col s10 offset-s1" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px' }}>
        <div className="row">
          <div className="col s6">
            <Select
              title="Type de service :"
              option={this.props.types}
              onChange={(e) => this.onChange({'typeSelected': e.target.value})}
              value={this.state.typeSelected}/>
          </div>
          <div className="col s6">
            <Select
              title="Categorie :"
              option={this.props.category}
              onChange={(e) => this.onChange({'categorySelected': e.target.value})}
              value={this.state.categorySelected}/>
          </div>
        </div>
        <div className="row">
          { head }
        </div>
        {
          index.map(contenu => {
            return (
              <div className="row" key={ contenu.key } style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px'}}>
                { contenu.contenu }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default AnnouncesList
