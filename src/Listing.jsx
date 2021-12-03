import React from "react";
import axios from 'axios';
import './Listing.css';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }
  } // constructor

  componentDidMount() {
    axios.get("api/listings")
      .then((response) => {
        // handle success
        this.setState({
          data: response.data,
        });
        console.log(response);
      }) // then
      .catch((error) => console.log(error));
  } // componentDidMount

  render() {
    const { data } = this.state;
    return(
        <div>
          <h3>{data.name}</h3>
          <h2>{data.title}</h2>
          <div>{data.body}</div>
          <h3>{data.price}</h3>
        </div>
    ); // return
  } // render
} // Listing

export default Listing;
