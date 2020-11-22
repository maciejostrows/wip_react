import './App.css';
import React from 'react';
import Tester from './additional_fields/tester'
import Developer from './additional_fields/developer'
import ProjectManager from './additional_fields/project_manager'
import createLink from "./createLink";

class Edit extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: "",
      surname: "",
      email: "",
      description: "",
      position: "0",
      detail1: "",
      detail2: "",
      detail3: false,
      submit: false,
      requiredFields: ['name', 'surname', 'email'],
      sendingDataSuccess: false,
      fieldsToSend: ['name',
        'surname',
        'email',
        'description',
        'position',
        'detail1',
        'detail2',
        'detail3']
    }
  }

  componentDidMount() {
      fetch(createLink(`get_user/${this.props.match.params.userId}`), {
        method: 'GET',
        mode: 'cors',
      }).then(response => response.json()).then(data => {
        let user = data.user[0];
        if(user.position === ""){
          user.position = "0";
        }
        this.setState({
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          description: user.description,
          position: user.position,
          detail1: user.detail_1,
          detail2: user.detail_2,
          detail3: user.detail_3,
        })
      })
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  setInputValue = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  setCheckboxValue = () => {
    if(!this.state.detail3){
      this.setState({
        detail3: true
      })
    } else {
      this.setState({
        detail3: false
      })
    }
  }

  clearDetailsValues = () => {
    this.setState({
      detail1: "",
      detail2: "",
      detail3: false
    })
  }

  sendData = () => {
    let formData = new FormData();
    this.state.fieldsToSend.forEach(field => {
      formData.append(field, this.state[field])
    })
    fetch(createLink(`edit_user/${this.state.id}`), {
      method: 'POST',
      mode: 'cors',
      body: formData
    }).then(() => {
      this.props.history.push("/admin");
    })
  }

  validate = (event) => {
    let validated = true;
    this.state.requiredFields.forEach((field) => {
      if(this.state[field] === ""){
        validated = false;
      }
    })

    if(!this.validateEmail(this.state.email)){
      validated = false;
    }

    if(this.state.position === "0"){
      validated = false;
    }
    return validated;
  }

  startSubmit = (event) => {
    event.preventDefault();
    this.setState({
      submit: true
    }, () => {
      if(this.validate()){
        this.sendData();
      }
    })
  }

  render() {
    let additionalFields = null;
    switch (this.state.position) {
      case "tester":
        additionalFields = <Tester state={this.state}
                                   setInputValue={this.setInputValue}
                                   setCheckboxValue={this.setCheckboxValue}
        />;
        break;
      case "developer":
        additionalFields = <Developer state={this.state}
                                   setInputValue={this.setInputValue}
                                   setCheckboxValue={this.setCheckboxValue}
        />;
        break;
      case "projectManager":
        additionalFields = <ProjectManager state={this.state}
                                   setInputValue={this.setInputValue}
                                   setCheckboxValue={this.setCheckboxValue}
        />;
        break;



    }
    return (
        <div className="App">
          <form className={"form-width"}>
            <label htmlFor="name">Imię</label>
            <input type="text"
                   id={"name"}
                   className={"form-control"}
                   placeholder={"Imię"}
                   value={this.state.name}
                   onChange={this.setInputValue}
            />
            {(this.state.submit && this.state.name === "") && <p className={'text-danger message-font'}>Proszę uzupełnić pole!</p>}

            <label htmlFor="name">Nazwisko</label>
            <input type="text"
                   id={"surname"}
                   className={"form-control"}
                   placeholder={"Nazwisko"}
                   value={this.state.surname}
                   onChange={this.setInputValue}
            />
            {(this.state.submit && this.state.surname === "") && <p className={'text-danger message-font'}>Proszę uzupełnić pole!</p>}

            <label htmlFor="name">E-mail</label>
            <input type="email"
                   id={"email"}
                   className={"form-control"}
                   placeholder={"E-mail"}
                   value={this.state.email}
                   onChange={this.setInputValue}
            />
            {(this.state.submit && this.state.email === "") && <p className={'text-danger message-font'}>Proszę uzupełnić pole!</p>}
            {(this.state.submit && this.state.email !== "" && !this.validateEmail(this.state.email)) && <p className={'text-danger message-font'}>Błędny adres e-mail!</p>}

            <label htmlFor="name">Opis</label>
            <input type="text"
                   id={"description"}
                   className={"form-control"}
                   placeholder={"Opis"}
                   value={this.state.description}
                   onChange={this.setInputValue}
            />

            <label htmlFor="name">Stanowisko</label>
            <select id="position"
                    className={"form-control"}
                    value={this.state.position}
                    onChange={(event) => {this.setInputValue(event); this.clearDetailsValues();}}
            >
              <option value="0">Wybierz</option>
              <option value="tester">Tester</option>
              <option value="developer">Developer</option>
              <option value="projectManager">Project manager</option>
            </select>
            {(this.state.submit && this.state.position === "0") && <p className={'text-danger message-font'}>Proszę uzupełnić pole!</p>}

            {additionalFields}
            <button className={"btn btn-primary margin-top"} onClick={this.startSubmit}>Wyślij</button>
            {this.state.sendingDataSuccess && <p className={'text-success'}>Dane wysłane poprawnie</p>}
          </form>
        </div>
    );
  }
}

export default Edit;
