import React, { Component, useEffect } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  state = {
    plants: [],
    searchTerm: '',
    searchResults: [],

  }

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    })
  };
  

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    console.log("PlantList: Component Did Mount");
    axios.get('http://localhost:3333/plants')
      .then((res) => {
        this.setState({
          plants: res.data.plantsData
        })
        // console.log(res.data.plantsData)
      })
      .catch((err) => {
        console.log(err);
      })
      const resultsMap = this.state.plants.filter(plant =>
        plant.name.toLowerCase().includes(this.state.searchTerm))
        console.log('results filter', resultsMap);
  }

  


 componentDidUpdate(prevProps, prevState) {
  const resultsMap = this.state.plants.filter(plant =>
    plant.name.toLowerCase().includes(this.state.searchTerm))
    console.log('results filter', resultsMap);

    console.log('prevprop', prevProps)
    console.log('prevstate', prevState)

    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        searchResults: resultsMap,
        plants: resultsMap
      })
    }

 }

  

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
     <div>
        <div className='searchbar'>
          <h1>Search</h1>
          <input type='text' placeholder='search' value={this.state.searchTerm} onChange={this.handleChange}/>
          <ul>
            {this.state.searchResults.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
        </div>
        <main className="plant-list">
          {this.state?.plants?.map((plant) => (
            <div className="plant-card" key={plant.id} data-testid="plant-card">
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
