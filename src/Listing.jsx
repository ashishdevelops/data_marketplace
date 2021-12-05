import React from "react";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './Listing.css';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  } // constructor

  componentDidMount() {
    axios.get("api/listings")
      .then((response) => {
        // handle success
        this.setState({
          data: response.data.contextList,
        });
        console.log(response);
      }) // then
      .catch((error) => console.log(error));
  } // componentDidMount

  render() {
    const { data } = this.state;
    return(
        <div>
          <Grid container spacing={2}>
            {data.map((i) => 
              <Card key={i.id}
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  width: 300,
                  margin: 2,
                  padding:1,
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {i.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {i.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {i.price}
                  </Typography>
                  <Typography variant="body2">
                    {i.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            )}
          </Grid>
        </div>
    ); // return
  } // render
} // Listing

export default Listing;
