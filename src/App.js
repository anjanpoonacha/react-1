import React, { Component } from 'react';

import './App.css'
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/searchBox/SearchBox.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  handleChange = e => this.setState({searchField: e.target.value})

  async componentDidMount() {
    const users = await (
      await fetch('https://jsonplaceholder.typicode.com/users')
    ).json();

    this.setState({ monsters: users });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <SearchBox
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
