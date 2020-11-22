import './App.css';
import React from 'react';
import {
  Link
} from "react-router-dom";
import createLink from "./createLink";

class Admin extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      users: null
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(createLink('get_data'), {
      method: 'GET',
      mode: 'cors',
    }).then(response => response.json()).then(data => {
      this.setState({
        users: data.users
      })
    })
  }

  deleteUser = (id) => {
    if(window.confirm("Na pewno chcesz usunąć tego użytkownika?")) {
      fetch(createLink(`delete_user/${id}`), {
        method: 'POST',
        mode: 'cors',
      }).then(() => {
        this.getData();
      })
    }
  }

  render() {
    if (this.state.users === null) {
      return null
    } else {
      return (
          <div className={'App-admin'}>
              {this.state.users.map((user, index) => {
                return(
                    <div className={'admin-user'} key={index}>
                    <p>Imię: {user.name}</p>
                    <p>Nazwisko: {user.surname}</p>
                    <p>Email: {user.email}</p>
                    <p>Opis: {user.description}</p>
                    <p>Stanowisko: {user.position}</p>
                    <p>Detail1: {user.detail_1}</p>
                    <p>Detail2: {user.detail_2}</p>
                    <p>Detail3: {user.detail_3 ? <span>Tak</span> : <span>Nie</span>}</p>
                      <Link to={`/admin/edit/${user.id}`} className={'btn btn-success btn-with-margins'}>Edytuj</Link>
                      <button onClick={() => {this.deleteUser(user.id)}} className={'btn btn-danger btn-with-margins'}>Usuń</button>
                      <hr/>
                    </div>
                )
              })}
          </div>

      );
    }
  }
}

export default Admin;
