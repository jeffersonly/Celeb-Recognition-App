import React from 'react';
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Row,Col
} from 'reactstrap';
class SearchCard extends React.Component {

    render() {
        const movie = this.props.movie;
        return(
        <Col sm="3">
        <Card body>
        <a class="thumbnail">
                  <img src={'https://image.tmdb.org/t/p/w1280'+ movie.poster_path}/>
              </a>  
          <CardTitle>{movie.title}</CardTitle>
          <CardText>{movie.overview}</CardText>
        </Card>
      </Col>
      );
    }
}
export default SearchCard;
