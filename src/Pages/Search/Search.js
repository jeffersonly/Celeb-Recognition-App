import React, { Component } from 'react';
import '../Styling/Search/Search.css'
import ReactLoading from 'react-loading';
import { Button, Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import NavBar from '../../Components/NavBar';
import { API } from 'aws-amplify';
import Select from 'react-select';
import Predictions from '@aws-amplify/predictions';
import Popup from "reactjs-popup";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            loading: false,
            loaded: false,
            data: {},
            message:[],
            celeb:[],
            pages:1
        };
        this.identifyFile = this.identifyFile.bind(this);
        this.openModal = this.openModal.bind(this); //not needed later
        this.closeModal = this.closeModal.bind(this); //not needed later
        this.newSelect= this.newSelect.bind(this);
      }

//open modal  - not needed later
openModal() {
  this.setState({ opened: true }); 
}
//close modal - not needed later
closeModal() {
  this.setState({ opened: false });
}





    //identify celebrity based off of image
    async identifyFile(event) {
      const { target: {files}} = event;
      const [file,] = files || [];
      
      //if not a file return.... dont need this 
      if(!file) {
        return;
      }

      //set state 
      await this.setState({            
        opened: false, //opened prob not needed
        loading: false,
        loaded: false,
        data: {},
        message:[],
        celeb:[],
      });

      //used to show that item is being loaded
      this.setState({loading:true});

      //use aws rekognition/amplify predictions to recognize celebs
      Predictions.identify({
        entities: {
          source: {
            file,
          },
          celebrityDetection: true
        }
      })
      .then(res =>  {
        console.log(res.entities);
        //set state based on results
        //data is set based on celebrities identified, loaded indicates loading done
        this.setState({data:res.entities, loaded:true, loading:false, opened:true});
      })
      .catch(err => console.log(err));
    }




    //search for celebrity based on name and page
    async performSearch(n1,p1) {

        let myInit = {
          queryStringParameters: {
            name: n1,
            page: p1
          }
        }

        //used to show that item is being loaded
        this.setState({loading:true});

        //use search api + api gateway based on the query set by init
        API.get('searchapi','/search',myInit)
          .then(response => {
              const data = response;

              //if failed data set error message
              if(data["error"]){
                this.setState({error:data["message"]});
              } else {
                //if successful, display celeb data and render items
                this.setState({celeb:data, opened:false});
                this.renderPages();
              }
          })
          .catch(err => { console.log(err); })
    }






      //displays another page for movies that are shown
      async newSelect(condition) {
          this.setState({ pages: condition.value });
          const data = await this.performSearch(this.state.name,condition.value);
          await this.setState({posts:data, loading:false});
      }







      async loadCelebrity(e) {
        //set the name state to whichever celebrity is selected
        await this.setState({name:e.target.id});

        //initialize name and page parameters
        let myInit = {
          queryStringParameters: {
              name: this.state.name,
              page: this.state.pages
          }
        }

        //search based on selected celebrity name & page of movies to display
        API.get('searchapi', '/search', myInit)
          .then(response => {
              const data = response;
              //if error set error, otherwise display celebrity info
              if(data["error"]) {
                this.setState({error:data["message"]});
              } else {
                this.setState({celeb:data,opened:false});
                this.renderPages();
              }
          })
          .catch(err => { console.log(err); })
      }








      //different buttons displayed for loading celebrities based off of names taken from rekognition
      loadOptions() {
        let returns = [];
        let data = this.state.data;
        console.log(data);
        //for each of the celebrities identified, render a button w/ their name
        for (let i = 0; i < data.length; i++) {
          returns.push (
            <Button 
              id={data[i].metadata.name} 
              onClick={e => this.loadCelebrity(e)}
            >
              {data[i].metadata.name}
            </Button>
          )
        }
        return returns;
      }


      //makes multiple pages for celebrity movie cards loaded
      async renderPages(){
        const items = [];
        for (let i = 1; i <= this.state.celeb.message.pages; i++) {
            items.push({value: i, label: i});
        }
        await this.setState({items:items});
      }







      //create cards regarding movies based on celeb
      generateMovies() {
        let returns = [];
        //for each of the movies loaded
        for (let i =0; i< this.state.celeb.message.movies.length; i++) {
          //current movie information
          let current = this.state.celeb.message.movies[i];
          returns.push(
            <Col sm="3">
                <Card body>
                    <a class="thumbnail">
                      <img src={'https://image.tmdb.org/t/p/w1280'+ current.poster_path}/>
                    </a>  
                    <CardTitle>{current.title}</CardTitle>
                    <CardText>{current.overview}</CardText>
                </Card>
            </Col>)
        }
        return returns;
      }

    
    render() {
        return (
            <div className="App">
                <NavBar />
                <header className="App-header">
                  <input type="file" onChange={this.identifyFile}></input>
                </header>

                <div>
                    { this.state.loaded &&
                        <Popup
                          open={this.state.opened}
                          closeOnDocumentClick
                          onClose={this.closeModal}
                        >
                            <div>
                                <a className="close cursor-pointer" onClick={this.closeModal} >
                                  &times;
                                </a>
                                {this.loadOptions()}
                            </div>
                          </Popup>
                    }
                </div>

                {this.state.celeb.length !== 0 && 
                    <div>
                        <div>
                            <Card>
                                <a class="thumbnail">
                                    <img src={this.state.celeb.message.photo}/>
                                 </a>        

                                <CardBody>
                                    <CardTitle>{this.state.celeb.message.name}</CardTitle>
                                    <CardText>{this.state.celeb.message.info}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                    <div>

                    <label for="condition">Page</label>
                    <Select value={ {value : this.state.pages, label: this.state.pages }} required onChange={this.newSelect} name="condition" id="condition" className="col-md-8 col-offset-4 flex-none"options = {this.state.items} />
                </div>
                <Row>
                    {this.generateMovies()}
                </Row>
            </div>
        }
      
      {this.state.loading &&
        <ReactLoading type={"bars"} color={"#38a169"} height={'20%'} width={'20%'} /> 
        }  
            </div>
        );
    }
}

export default Search;