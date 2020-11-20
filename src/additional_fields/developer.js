import '../App.css';
import React from 'react';

class Developer extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <label htmlFor="name">Środowiska IDE</label>
            <input type="text"
                   id={"detail1"}
                   className={"form-control"}
                   placeholder={"Środowiska IDE"}
                   value={this.props.state.detail1}
                   onChange={this.props.setInputValue}
            />

            <label htmlFor="name">Języki programowania</label>
            <input type="text"
                   id={"detail2"}
                   className={"form-control"}
                   placeholder={"Języki programowania"}
                   value={this.props.state.detail2}
                   onChange={this.props.setInputValue}
            />

            <label htmlFor="name">zna mysql</label>
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

export default Developer;
