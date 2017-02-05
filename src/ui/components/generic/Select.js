import React from 'react';

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }
  render() {
    return(
      <div>
        <div className="col s12 m6">
          { this.props.title }
        </div>
        <div className="col s12 m6">
          <select
              className="browser-default"
              id="work_type"
              value={this.props.value}
              onChange={this.props.onChange}>

              {Object.keys(this.props.option).map((value) => {
                const label = this.props.option[value]
                return <option value={value} key={value}>{label}</option>
              })}

            </select>
        </div>
      </div>
    )
  }
}

export default Select
