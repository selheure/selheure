import React from 'react';


class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  onChange(value) {
    console.log(this.state.selected)
    this.setState({'selected': value})
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
              value={this.state.selected}
              onChange={(e) => this.onChange(e.target.value)}>

              {Object.keys(this.props.option).map((value) => {
                const label = this.props.option[value]
                let disabled = value == 0 ? "disabled" : ""
                return <option value={value}
                               disabled={disabled}
                               key={value}
                       >{label}</option>
              })}

            </select>
        </div>
      </div>
    )
  }
}

export default Select
