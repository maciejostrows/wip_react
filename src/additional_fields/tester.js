import '../App.css';
import React from 'react';

class Tester extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <label htmlFor="name">Systemy testujące</label>
            <input type="text"
                   id={"detail1"}
                   className={"form-control"}
                   placeholder={"Systemy testujące"}
                   value={this.props.state.detail1}
                   onChange={this.props.setInputValue}
            />

            <label htmlFor="name">Systemy raportowe</label>
            <input type="text"
                   id={"detail2"}
                   className={"form-control"}
                   placeholder={"Systemy raportowe"}
                   value={this.props.state.detail2}
                   onChange={this.props.setInputValue}
            />

            <label htmlFor="name">zna selenium</label>
            <input type="checkbox"
                   className={"form-control"}
                   id={"detail3"}
                   checked={this.props.state.detail3}
                   onChange={this.props.setCheckboxValue}
            />
        </div>
    );
  }
}

export default Tester;
