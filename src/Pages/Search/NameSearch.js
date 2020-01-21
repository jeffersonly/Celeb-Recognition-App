import React, { Component } from 'react';
import '../Styling/Search/Search.css'
import ReactLoading from 'react-loading';
import SearchCard from './SearchCard';
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Row,
    Col,
} from 'reactstrap';
import NavBar from '../../Components/NavBar';
import { API } from 'aws-amplify';
import Select from 'react-select';

class NameSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loaded: false,
            data: {},
            message:[],
            celeb:[],
            pages:1,
            name:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.newSelect= this.newSelect.bind(this);
    }

    //on submitting name, do a search
    onSubmit(e){
        e.preventDefault();
        this.performSearch(this.state.name, this.state.pages);
    }

    //handle text change
    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    //searches based off of a name and page #
    async performSearch(n1,p1){
        let myInit = {
        queryStringParameters: {
              name: n1,
              page: p1
            }
        }
        this.setState({loading:true});
        API.get('searchapi','/search',myInit).then(response => {
          const data = response;
              if(data["error"]){
                this.setState({error:data["message"],loading:false});
                console.log(this.state.error);
              }
              else{
                this.setState({celeb:data, loading:false});
                this.renderPages();
              }
        }).catch(error => {
          console.log(error);
        })
    }

    //finds movies based on page selected
    async newSelect(condition){
        this.setState({ pages: condition.value });
        await this.performSearch(this.state.name,condition.value);
        await this.setState({loading:false});
    }

    //find the celebrity based on name 
    async loadCelebrity(e){
        await this.setState({name:e.target.id});
        let myInit = { // OPTIONAL
          queryStringParameters: {  // OPTIONAL
              name: this.state.name,
              page: this.state.pages
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

    //displays movies
    async renderPages(){
        const items = [];
        for (let i = 1; i <= this.state.celeb.message.pages; i++) {
            items.push({value: i, label: i});
        }
        await this.setState({items:items});
        console.log(this.state.items);
    }
      
    render() {
        return (
            <div className="App">
            <NavBar />
            <header className="App-header">
                <Form onSubmit={this.onSubmit} >
                    <FormGroup className="text-center">
                        <Label sm={2} style={{fontSize: 50}}  for="name">Search</Label>
                    </FormGroup>
                    <FormGroup row className="ml-5">
                        <Col sm={10}>
                            <Input
                            onChange={this.handleChange}
                            sm={2}
                            value={this.state.name}
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Input Celebrity Name Here"
                        />
                        </Col>
                        <Button className="buttonStyle">Search By Name</Button>
                    </FormGroup>
                </Form>
            </header>

            {this.state.celeb.length !== 0 && 
            <div>
                <div>
                    <Row>
                        <Col xs="2" className="ml-5">
                            <a class="thumbnail">
                                <img src={this.state.celeb.message.photo}/>
                            </a>
                        </Col>
                        <Col className="mr-5">
                            <p className="font-weight-bold" style={{fontSize: 20}}>{this.state.celeb.message.name}</p>
                            {this.state.celeb.message.info}
                            
                        </Col>
                    </Row>
                </div>
                <div xs="2" className="mb-2 w-25">
                    <label className="ml-2" for="condition">
                        Page
                    </label>
                    <Select value={ {value : this.state.pages, label: this.state.pages }} 
                    required onChange={this.newSelect} name="condition" id="condition" 
                    className="col-md-8 col-offset-4 flex-none"options = {this.state.items} />
                </div>
                <Row>
                    {this.state.celeb.message.movies.map(item => {
                        if(item.poster_path){
                            return <SearchCard movie={item} />}
                        })
                    }
                </Row>
            </div>
            }
            
            {this.state.loading &&
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReactLoading className="align-middle" type={"bars"} color={"#353A40"} height={'20%'} width={'20%'} /> 
                </div>
            }  
            </div>
        );
    }
}

export default NameSearch;