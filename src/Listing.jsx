import React from "react";
import axios from 'axios';
import './Listing.css';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  } // constructor

  componentDidMount() {
    axios.get("api/listings")
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  } // componentDidMount

  render() {
    return(
        <div>
          Hello world
        </div>
    ); // return
  } // render
} // Listing

export default Listing;
