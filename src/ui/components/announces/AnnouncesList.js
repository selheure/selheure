import React from 'react';

import Select from '../generic/Select'

import DeclarationView       from './ListComponents/DeclarationView'
import AnnounceView          from './ListComponents/AnnounceView'

import {
  announcesCategory
} from '../../../api/servicesData'

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
      typeSelected: "0",
      categorySelected: "1",
      subCat : "1"
    }
  }

  onChange(value) {
    console.log(value)
    this.setState(value)
  }

  render() {
    const subTab = announcesCategory['sub_categories']
    const subTab2 = subTab[this.state.categorySelected]
    const announceType = this.state.typeSelected
    const announceCategory = this.state.categorySelected

    const index = []
    let HeadBar
    let contenu

    if (this.props.genre === "announces"){
        HeadBar = () => (<AnnounceHead />)

        this.props.list.forEach(announce => {
          if (( announce.type === announceType ) && ( announce.category === announceCategory )) {
              contenu = <AnnounceView announce={announce} user={this.props.user}/>
              index.push({'key': announce._id, 'contenu': contenu })
          }
        })

    }
    else {
      HeadBar = () => (<DeclarationHead />)

        this.props.list.forEach(announce => {
          if ( announce.type === announceType ) {
            if( announce.category === announceCategory )  {
              contenu = <DeclarationView announce={announce} user={this.props.user}/>
              index.push({'key': announce._id, 'contenu': contenu })
            }
          }
        })

    }

    return(
      <div className="col s10 offset-s1" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '5px' }}>
        <div className="row">
          <div className="col s4">
            <Select
              title="Type de service :"
              option={this.props.types}
              onChange={(e) => this.onChange({'typeSelected': e.target.value})}
              value={this.state.typeSelected}/>
          </div>
          <div className="col s4">
            <Select
              title="Categorie :"
              option={announcesCategory['categories']}
              onChange={(e) => this.onChange({'categorySelected': e.target.value})}
              value={this.state.categorySelected}/>
          </div>
          <div className="col s4">
            <Select
              title="Sous cat. :"
              option={subTab2}
              onChange={(e) => this.onChange({'subCat': e.target.value})}
              value={this.state.subCat}/>
          </div>
        </div>
        <div className="row">
          <HeadBar />
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
