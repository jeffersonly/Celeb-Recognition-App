import React, { Component } from 'react';
import '../Styling/Search/Search.css'
import ReactLoading from 'react-loading';
import SearchCard from './SearchCard';
import { 
  Row, Col
} from 'reactstrap';
import NavBar from '../../Components/NavBar';
import { API } from 'aws-amplify';
import Select from 'react-select';
import {withRouter} from 'react-router-dom';

class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
          loading: false,
          loaded: false,
          data: {},
          message:[],
          celeb:[],
          pages:1
      };
      this.handleChange = this.handleChange.bind(this);
      this.newSelect= this.newSelect.bind(this);
    }


    //on component mount get data that was passed in from dropzone celeb 
    async componentDidMount(){
      if(!this.props.location.state){
        this.props.history.push('/Home');
        return;
      }

      //load celebrity
      this.loadCelebrity(this.props.location.state.n);
      let myInit = {
        queryStringParameters: {
            name: this.props.location.state.n,
            page:1
        }
      }

      //find celebrity info
      API.get('searchapi','/search',myInit).then(response => {
        this.setState({message:response});
      }).catch(error=>{
        console.log(error);
      })
    }

    //handle text change
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    //search for celebrities based on page and name
    async performSearch(n1,p1) {
      let myInit = { // OPTIONAL
        queryStringParameters: {  // OPTIONAL
            name: n1,
            page: p1
        }
      }
      this.setState({loading:true});
      //find celebrities data
      API.get('searchapi','/search',myInit).then(response => {
        const data = response;
          if(data["error"]){
            this.setState({error:data["message"]});
            console.log(this.state.error);
          }
          else{
            this.setState({celeb:data,opened:false});
            this.renderPages();
          }
      }).catch(error=>{
        console.log(error);
      })
    }

    //search for movies based on page selected
    async newSelect(condition){
      this.setState({ pages: condition.value });
      await this.performSearch(this.state.name,condition.value);
      await this.setState({loading:false});
    }

    //load celebrities data
    async loadCelebrity(e){
      await this.setState({name:e});
      let myInit = {
        queryStringParameters: {
            name: this.state.name,
            page: this.state.pages
        }
      }
      API.get('searchapi','/search',myInit).then(response => {
        const data = response;
          if(data["error"]){
            this.setState({error:data["message"]});
            console.log(this.state.error);
          } else {
            this.setState({celeb:data,opened:false});
            this.renderPages();
            console.log(this.state.celeb);
          }
        }).catch(error=>{ console.log(error); })
      }

    //display the movies and information for celebrity
    async renderPages(){
      const items = [];
      for (let i = 1; i <= this.state.celeb.message.pages; i++) {
        items.push({value: i, label: i});
      }
      await this.setState({items:items});
    }
      
    render() {
      return (
        <div className="App">
          <NavBar />
          {this.state.celeb.length !== 0 && 
          <div>
            <div>
              <Row className="mt-2">
                <Col xs="2" className="ml-5">
                  <a class="thumbnail">
                    <img src={this.state.celeb.message.photo}/>
                  </a>
                </Col>
                <Col className="mr-5">
                    <p className="font-weight-bold" style={{fontSize: 26, fontWeight: 500,}}>
                      {this.state.celeb.message.name}
                    </p>
                    {this.state.celeb.message.info}
                </Col>
              </Row>
            </div>
            <div xs="2" className="mb-2 w-25">
              <label className="ml-3 font-weight-bold" for="condition">Page</label>
              <Select 
                value={ {value : this.state.pages, label: this.state.pages }} 
                required onChange={this.newSelect} name="condition" id="condition" 
                className="col-md-8 col-offset-4 flex-none"options = {this.state.items} 
              />
            </div>
            <Row>
              {this.state.celeb.message.movies.map(item => {
              if(item.poster_path) {
                return <SearchCard movie={item} />
              }})}
            </Row>
          </div>
        }
        {this.state.loading &&
          <ReactLoading type={"bars"} color={"#343a40"} height={'20%'} width={'20%'} /> 
        }  
      </div>
    );
  }
}

export default withRouter(Search);