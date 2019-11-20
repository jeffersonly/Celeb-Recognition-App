import React, { Component } from 'react';
import '../Styling/Search/Search.css'
import ReactLoading from 'react-loading';
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Row,Col
} from 'reactstrap';

import { Auth, API } from 'aws-amplify';
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
        this.handleChange = this.handleChange.bind(this);
        this.identifyFile = this.identifyFile.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.newSelect= this.newSelect.bind(this);

      }
      async componentDidMount(){
        let info = {content:"Lindsay Lohan",page:1};
        let myInit = { // OPTIONAL
          queryStringParameters: {  // OPTIONAL
              name: "Lindsay Lohan",
              page:1
          }
      }
        API.get('searchapi','/search',myInit).then(response => {
          this.setState({message:response});
          console.log(this.state);
        }).catch(error=>{
          console.log(error);
        })
      }
      openModal() {
        this.setState({ opened: true });
      }
      closeModal() {
        this.setState({ opened: false });
      }
    //handle text change
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    async identifyFile(event) {

        const { target: {files}} = event;
        const [file,] = files || [];
        console.log("HI");
        if(!file) {
          return;
        }
        await this.setState({            
          opened: false,
          loading: false,
          loaded: false,
          data: {},
          message:[],
          celeb:[],});
        this.setState({loading:true});
        Predictions.identify({
          entities: {
            source: {
              file,
            },
            celebrityDetection: true
          }
        })
        .then(res =>  {
            console.log("entities: " + JSON.stringify(res.entities));
            this.setState({data:res.entities, loaded:true, opened:true, loading:false});
            console.log(this.state);
            console.log(this.state.data[0].metadata.name);
    })
        .catch(err => console.log(err));

      }
      async performSearch(n1,p1){
        let myInit = { // OPTIONAL
          queryStringParameters: {  // OPTIONAL
              name: n1,
              page: p1
          }
      }
      this.setState({loading:true});
        API.get('searchapi','/search',myInit).then(response => {
          const data = response;
              if(data["error"]){
                this.setState({error:data["message"]});
                console.log(this.state.error);
              }
              else{
                this.setState({celeb:data,opened:false});
                this.renderPages();
                console.log(this.state.celeb);
              }
            
          
        }).catch(error=>{
          console.log(error);
        })
      }
      async newSelect(condition){
        console.log(condition.value);
        this.setState({ pages: condition.value });
        const data = await this.performSearch(this.state.name,condition.value);
        await this.setState({posts:data,loading:false});
        console.log(data);
    }
      async loadCelebrity(e){
        await this.setState({name:e.target.id});
        let myInit = { // OPTIONAL
          queryStringParameters: {  // OPTIONAL
              name: this.state.name,
              page: this.state.page
          }
      }
        API.get('searchapi','/search',myInit).then(response => {
          const data = response;
              if(data["error"]){
                this.setState({error:data["message"]});
                console.log(this.state.error);
              }
              else{
                this.setState({celeb:data,opened:false});
                this.renderPages();
                console.log(this.state.celeb);
              }
            
          
        }).catch(error=>{
          console.log(error);
        })
      }
      loadOptions(){
        let returns = [];
        let data = this.state.data;
        for (let i =0; i< data.length; i++) {
         returns.push(

          <Button id={data[i].metadata.name} onClick={e => this.loadCelebrity(e)}>{data[i].metadata.name}</Button>
         )
        }
        return returns;
      }
      async renderPages(){
        console.log("HI");
    const items = [];

      for (let i = 1; i <= this.state.celeb.message.pages; i++) {
        items.push({value: i, label: i});
      }
    await this.setState({items:items});
    console.log(this.state.items);
    }
      generateMovies(){
        let returns = [];
        for (let i =0; i< this.state.celeb.message.movies.length; i++) {
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
            <header className="App-header">
              <input type="file" onChange={this.identifyFile}></input>
            </header>

            <div>
            
        {this.state.loaded &&
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
        </Popup>}
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
      </div>}
      {this.state.loading &&
        <ReactLoading type={"bars"} color={"#38a169"} height={'20%'} width={'20%'} /> 
        }  
            </div>
        );
    }
}

export default Search;