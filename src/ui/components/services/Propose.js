import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link }       from 'react-router'

import {
  propositionsTypes
} from '../../../api/propositionsTypes'

class Propose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      propositionId: 0
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onOptionChange(value) {
    console.log(value)
    this.setState({'propositionId': value})
  }

  render() {
    return(
      <div className="col m6 offset-m3 s12">
        Propose
        <div className="row">
          <div className="col s6">
            Type de proposition :
          </div>
          <div className="col s6">
            <select
                className="browser-default"
                id="work_type"
                value={this.propositionId}
                onChange={(e) => this.onOptionChange(e.target.value)}>

                {Object.keys(propositionsTypes).map((value) => {
                  const label = propositionsTypes[value]
                  let disabled = value == 0 ? "disabled" : ""
                  return <option value={value}
                                 disabled={disabled}
                                 key={value}
                         >{label}</option>
                })}

              </select>
          </div>
        </div>
      </div>
    )
  }
}

export default Propose
