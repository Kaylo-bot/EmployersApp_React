import { Component } from 'react';

import AppFilter from '../app-filter/app-filter';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';


class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    data: [
      {name: 'John Markov', salary: 700, increase: false, rise: false, id: 1},
      {name: 'Mike Levis', salary: 950, increase: false, rise: false, id: 2},
      {name: 'Sandy Bloom', salary: 1200, increase: false, rise: false, id: 3},
      {name: 'Nicolas Saint', salary: 1050, increase: false, rise: false, id: 4},
      {name: 'Samanta Mount', salary: 2100, increase: false, rise: false, id: 5},
    ],
    term: '',
    filter: 'all'
  }
  this.maxId = this.state.data.length + 1;
  
}
deleteItem = (id) => {
  this.maxId--;
  this.setState(({data}) => {
    // const index = data.findIndex(elem => elem.id === id);
    // console.log(`Kaylo ${index} is here`);
    return { data: data.filter(elem => elem.id !== id)}
  })
}

addItem = (name,salary) => {
  const newItem = {
    name,
    salary,
    increase: false,
    raise: false,
    id: this.maxId++
  }
  this.setState(({data}) => {
    const newArray = [...data, newItem];
    return {
      data: newArray
    }
  })
}
// onToggleIncrease = (id) => {
//   this.setState(({data}) => ({
//     data: data.map(item => {
//       if(item.id === id){
//         // console.log({...data, increase: !item.increase});
//         return {...item, increase: !item.increase};
//       }
//       return item;
//     })
//   }));
// }
// onToggleRise = (id) => {
//   this.setState(({data}) => ({
//     data: data.map(item => {
//       if(item.id === id){
//         // console.log({...data, increase: !item.increase});
//         return {...item, rise: !item.raise};
//       }
//       return item;
//     })
//   }));
// }
onToggleType = (id, type) => {
  this.setState(({data}) => ({
    data: data.map(item => {
      if(item.id === id){
        // console.log({...data, increase: !item.increase});
        return {...item, [type]: !item[type]};
      }
      return item;
    })
  }));
}
filterPost = (items, filter) => {
  switch (filter) {
    case 'rise':
      return items.filter(item => item.rise);
    case 'moreThen1000':
      return items.filter(item => item.salary >= 1000);
    default:
      return items;
  }
}

onFilterSelect = (filter) => {
  this.setState({filter});
}

onUpdateSearch = (term) => {
  this.setState({term: term});
}
serchEmp = (items, term) => {
  if(items.length === 0){
    return items;
  }
  return items.filter(item => {
    return item.name.indexOf(term) > -1;
  })
}

render(){
  const {data, term, filter} = this.state;
  const employees =this.state.data.length;
  const increased =this.state.data.filter(item => item.increase).length;
  const visibleData = this.filterPost(this.serchEmp(data, term),filter);

  return (
    <div className="app">
      <AppInfo employees={employees}
               increased={increased}/>

      <div className="search-panel">
        <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
        <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
      </div>

      <EmployersList 
          data={visibleData}
          onDelete={this.deleteItem}
          // onToggleIncrease={this.onToggleIncrease}
          // onToggleRise={this.onToggleRise}
          onToggleType={this.onToggleType}
          />
      <EmployersAddForm 
      onAdd={this.addItem}
      />
    </div>
  );
}
};

export default App;