import React from "react";
import axios from 'axios';
import './FileUpload.css';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  } // constructor

  // On file select (from the pop up)
  handleFileChange(e) { 
    this.setState({ 
      selectedFile: e.target.files[0] 
    }); 
  } // handleFileChange

  // On file upload (click the upload button) 
  handleFileUpload(e) {  
    // Create an object of formData 
    const formData = new FormData(); 
     
    // Update the formData object 
    formData.append( 
      "uploadedFile", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
   
    // Details of the uploaded file 
    console.log(this.state.selectedFile); 
   
    // Request made to the backend api 
    // Send formData object 
    axios.post("api/post", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  }

  displayFileData() {
    if (this.state.selectedFile) { 
      return( 
        <div> 
          <h2>File Details:</h2> 
          <p>File Name: {this.state.selectedFile.name}</p> 
          <p>File Type: {this.state.selectedFile.type}</p> 
          <p> 
            Last Modified:{" "} 
            {this.state.selectedFile.lastModifiedDate.toDateString()} 
          </p>
        </div> 
      );
    } // if
    else { 
      return( 
        <div><br /><h4>Choose before Pressing the Upload button</h4></div> 
      );
    } // else
  } // displayFileData
  
  render() {
    return(
      <div> 
        <h1>DataMarketPlace</h1> 
        <h3>File Uploaded!</h3> 
        <div> 
            <input type="file" onChange={this.handleFileChange} /> 
            <button onClick={this.handleFileUpload}> 
              Upload
            </button> 
        </div>
        {this.displayFileData()} 
      </div>
    ); // return
  } // render
} // FileUpload

export default FileUpload;
