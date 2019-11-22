import React from 'react';
import { Card, CardText, CardTitle, Col } from 'reactstrap';

//card that gets displayed containing pictures of movies w/ their title and description
class SearchCard extends React.Component {
    render() {
        const movie = this.props.movie;
        return (
            <Col sm="3" style={{display: 'flex', justifyContent: 'center'}}>
                <Card body>
                    <a class="thumbnail">
                        <img src={'https://image.tmdb.org/t/p/w1280'+ movie.poster_path}/>
                    </a>  
                    <CardTitle className="cardTitleStyle">{movie.title}</CardTitle>
                    <CardText> {movie.overview}</CardText>
                </Card>
            </Col>
        );
    }
}

export default SearchCard;
