import React, { Component } from 'react';
import './App.css';
import ShinobiItem from './ShinobiItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      rank: "",
      shinobis: []
    }
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:58624/api/Shinobi')
      .then(response => response.json())
      .then(response => (this.setState({shinobis: response})))
      .catch(error => console.log(error))
  }

  onAdd = () => {
    //copy array
    let shinobisNew = this.state.shinobis;
    let index = shinobisNew[shinobisNew.length - 1].Id + 1;
    shinobisNew.push({
      Id: index,
      Name: this.state.name, 
      Age: this.state.age,
      Rank: this.state.rank
    })
    //set new array to state
    this.setState({shinobis: shinobisNew });

    //send new data to database
    let url = 'http://localhost:58624/api/Shinobi';
    let data = shinobisNew[shinobisNew.length - 1];
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  onEditSubmit = (id, name, age, rank) => {
    //copy array
    let editedShinobis = this.state.shinobis;
    editedShinobis = editedShinobis.map(shinobi => {
      if(shinobi.Id === id) {
        shinobi.Name = name;
        shinobi.Age = age;
        shinobi.Rank = rank;
      }
      return shinobi;
    });
    //set new array to state
    this.setState({shinobis: editedShinobis});

    //send new data to database
    let url = 'http://localhost:58624/api/Shinobi';
    let data = {Id: id, Name: name, Age: age, Rank: rank};
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.text())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  onDelete = (id) => {
    //copy array
    let shinobis = this.state.shinobis;
    let filteredShinobis = shinobis.filter(shinobi => {
      return shinobi.Id !== id;
    });
    //set new array to state
    this.setState({
      shinobis: filteredShinobis
    });
    //send delete request to database
    let url = 'http://localhost:58624/api/Shinobi?id='+id;
    fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.text())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  generate() {
    console.log('generate');
  }

  render() {
    const { classes } = this.props;
    let shinobiList = this.state.shinobis.map(shinobi => (
      <ShinobiItem
        key={shinobi.Id}
        id={shinobi.Id}
        name={shinobi.Name}
        age={shinobi.Age} 
        rank={shinobi.Rank} 
        onDelete={this.onDelete}
        onEditSubmit={this.onEditSubmit}
      />
    ));
    return (
      <div className="App">
        <h2>Shinobis del mundo</h2>
        <div className={classes.container}>
          <TextField
            id="outlined-name"
            label="Nombre del shinobi"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Edad del shinobi"
            className={classes.textField}
            value={this.state.age}
            onChange={this.handleChange('age')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Rango ninja"
            className={classes.textField}
            value={this.state.rank}
            onChange={this.handleChange('rank')}
            margin="normal"
            variant="outlined"
          />
          </div>
        <Button variant="contained" className={classes.button} onClick={this.onAdd}>
          Agregar
        </Button>
        <ul>
          {shinobiList}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(App);