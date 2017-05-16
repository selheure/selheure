import React      from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Select from './Select'

import {
  categories
} from '../modules/announces/config'

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


export default class FilteredList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeSelected: "0",
      categorySelected: "1",
      subCat : "1",
      list: this.props.list,
    }
  }

  onChange(value) {
    console.log(value)
    this.setState(value)
  }

  render() {
    const subTab = categories['sub_categories']
    const subTab2 = subTab[this.state.categorySelected]
    const announceType = this.state.typeSelected
    const announceCategory = this.state.categorySelected

    const {columns} = this.props
    const {list}    = this.state
    return(
      <div className="col s10 offset-s1" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '5px' }}>
        {/*}<div className="row">
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
              option={categories['categories']}
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
        </div>*/}
        <ReactTable
          data={list}
          columns={columns}
        />
      </div>
    )
  }
}
