import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Form from './components/Form';
import './App.scss';
import Login from './components/Login';
import DevelopersList from './components/DevelopersList';
import NewProcess from './components/NewProcess';
//import Form from './components/Form';
import { devAsignation } from './components/Data';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      email: '',
      rol: '',
      developer: '',
      emailDev: '',
      client: '',
      project: '',
      rate: '',
      date: '',
      id: '',
      code: '',
      description: '',
      task: '',
      ambassador: '',
      sendChecked: false,
      dataChecked: false,
      devAsignation: devAsignation,

    };
    this.getUserData = this.getUserData.bind(this);
    this.changeSteps = this.changeSteps.bind(this);
    this.createProject = this.createProject.bind(this);
    this.login = this.login.bind(this);
  }

  getUserData(event) {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;
    if (id === 'sendChecked') {
      this.setState((prevState) => {
        const newSendChecked = prevState.sendChecked;
        console.log(newSendChecked);
        return {
          sendChecked: !newSendChecked
        }
      })
    } else if (id === 'dataChecked') {
      this.setState((prevState) => {
        const newDataChecked = prevState.dataChecked;
        return {

          dataChecked: !newDataChecked
        }
      })
    } else {
      this.setState({ [id]: value });
    }
  }

  changeSteps(event) {
    event.preventDefault();
    const id = event.currentTarget.id;
    const idUser = event.currentTarget.getAttribute('data-userid');
    this.setState(prevState => {
      const newDevAsignation = [...prevState.devAsignation];
      const index = newDevAsignation.findIndex((user) => user.id === idUser);
      newDevAsignation[index].steps[id] = true;
      return {
        devAsignation: newDevAsignation
      }
    })
  }

  createProject(event) {
    event.preventDefault();
    this.setState(prevState => {
      const newDevAsignation = [...prevState.devAsignation];
      const { developer, emailDev, client, project, rate, date } = this.state;
      const newId = project + developer;
      newDevAsignation.push({
        developer: developer,
        emailDev: emailDev,
        client: client,
        project: project,
        rate: rate,
        date: date,
        id: newId,
        code: '',
        description: '',
        task: '',
        ambassador: '',
        sendChecked: false,
        dataChecked: false,
        steps: {
          headfirst: true,
          operations: false,
          talent: false,
          ambassador: false,
          headend: false,
        }

      });
      return {
        devAsignation: newDevAsignation
      }
    })
  }

  login(event) {
    this.setState({ logged: true })
  }

  render() {
    const { email, devAsignation, rol, logged, code, description, task, ambassador, sendChecked, dataChecked } = this.state;
    return (
      <div className="app">
        <Header
          email={email}
          logged={logged} />

        <Switch>
          <Route exact
            path="/"
            render={() => {
              return (
                <Login
                  login={this.login}
                  email={email}
                  getUserData={this.getUserData}
                />
              );
            }} />
          <Route
            path="/developerlist"
            render={() => {
              return (
                <DevelopersList
                  rol={rol}
                  devAsignation={devAsignation}

                />
              );
            }} />
          <Route path="/newprocess" render={() => {
            return (
              <NewProcess
                rol={rol}
                createProject={this.createProject}
                getUserData={this.getUserData}
                changeSteps={this.changeSteps}

              />
            );
          }} />
          <Route
            path="/form/:asignationId"
            render={routerProps => {
              return (
                <Form
                  devAsignation={devAsignation}
                  routerProps={routerProps}
                  rol={rol}
                  getUserData={this.getUserData}

                  createProject={this.createProject}
                  changeSteps={this.changeSteps}
                  codeState={code}
                  descriptionState={description}
                  taskState={task}
                  ambassadorState={ambassador}
                  sendCheckedState={sendChecked}
                  dataCheckedState={dataChecked}
                />
              );
            }} />

        </Switch>
      </div>
    );
  }
}

export default App;
