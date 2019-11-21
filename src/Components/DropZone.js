import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import { 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col,
} from 'reactstrap';
import ReactLoading from 'react-loading';
import { API } from 'aws-amplify';
import Select from 'react-select';
import Predictions from '@aws-amplify/predictions';

// In Line Constants for Styling //
//for the previewed image thumbnail container
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};
//style for image thumbnail
const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
};
const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};
//styling of drop zone
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '100px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#343a40',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};
//style for text inside of dropzone
const textStyle = {
  textColor: '#343a40',
}
const disclaimStyle = {
  color: '#bdbdbd',
}
//style for text outside of drop zone
const outerText = {
  textColor: '#343a40',
  textAlign: 'center',
  paddingTop: 15,
  paddingBottom: 5,
}
//styling to make image fit into page
const imgStyle = {
  width: '100%',
  height: '100%',
  maxHeight: '100vh'
}
const loadingStyle = {
  position: 'absolute',
  //top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  color: '#343a40',
  height: '30%',
  width: '30%',
}


export default function Previews() {
  const [files, setFiles] = useState([]);
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(new Map());
  const [message, setMessage] = useState([]);
  const [celeb, setCeleb] = useState([]);
  const [pages, setPages] = useState(1);
  const [name, setName] = useState('');
  const [error, setError] = useState();
  const [items, setItems] = useState();

  //toggle for modal open/close
  function toggle() {
    setModal(!modal);
  }

  //identify celebrity based off of image
  async function identifyFile(acceptedFiles) {
    //const { target: {files}} = event;
    //const [file,] = files || [];
    const file = acceptedFiles[0] || [];
    //set state to empty
    await setLoading(false);
    await setLoaded(false);
    await setData(new Map());
    await setMessage([]);
    await setCeleb([]);
    //used to show that item is being loaded
    await setLoading(true);

    //use aws rekognition/amplify predictions to recognize celebs
    await Predictions.identify({
      entities: {
        source: {
          file,
        },
        celebrityDetection: true
      }
    })
    .then(async res =>  {
      let entitiesToText = JSON.stringify(res.entities);
      let textEntitiesToData = JSON.parse(entitiesToText);
      //set state based on results
      //data is set based on celebrities identified, loaded indicates loading done
      console.log(res.entities);
      await setData(new Map(data.set("data",res.entities)));
      //console.log(data.get("data"));
      //console.log(data.get("data")[0].metadata.name);
      await setLoaded(true);
      await setLoading(false);
      await setModal(true);
    })
    .catch(err => console.log(err));
  };


  //search for celebrity based on name and page
  async function performSearch(n1,p1) {
    let myInit = {
      queryStringParameters: {
        name: n1,
        page: p1
      }
    }
    //used to show that item is being loaded
    await setLoading(true);
    //use search api + api gateway based on the query set by init
    API.get('searchapi','/search',myInit)
      .then(async response => {
          const data = response;
          //if failed data set error message
          if(data["error"]){
            await setError(data["message"]);
          } else {
            //if successful, display celeb data and render items
            await setCeleb(data);
            await setModal(false);
            await renderPages();
          }
      })
      .catch(err => { console.log(err); })
  }

  //displays another page for movies that are shown
  async function newSelect(condition) {
    await setPages(condition.value);
    const data = await performSearch({name},condition.value);
    
    //????????????
    //await this.setState({posts:data, loading:false});
    //setPosts(data);
    await setLoading(false);
  }

  async function loadCelebrity(e) {
    //console.log("event name: " + e.target.id);
    //set the name state to whichever celebrity is selected
    await setName(e.target.id);
    //console.log("updated event name: " + name);
    //console.log("page number: " + pages)
    
    //setting name is undefined.... wtf

    
  }

  useEffect(() => {
    //initialize name and page parameters
    
    console.log("name: " + name);
    console.log("pages: " + pages);
    let nameString = name;
    let pageString = `${pages}`;
    let myInit = {
      queryStringParameters: {
          name: nameString,
          page: pageString
      }
    }

    // let otherInit = {
    //   queryStringParameters: {
    //     name: 'Dwayne Johnson',
    //     page: '1'
    //   }
    // }
    console.log("updated event name: " + name);
    console.log("init: " + myInit);

    //search based on selected celebrity name & page of movies to display
    API.get('searchapi', '/search', myInit)
      .then(async response => {
          const data = response;
          console.log("data: " + myInit.queryStringParameters.name);
          console.log('data from search: ' + data.message);
          //if error set error, otherwise display celebrity info
          if(data["error"]) {
            await setError(data["message"]);
          } else {
            await setCeleb(data);
            await setModal(false);
            console.log("got to here: " + data.message.info);
            //await renderPages();
          }
      })
      .catch(err => { console.log(err); })
  }, [name])

  //different buttons displayed for loading celebrities based off of names taken from rekognition
  function loadOptions() {
    let returns = [];
    let dataOf = data.get("data");
    if(dataOf) {
      for( let i = 0 ; i < dataOf.length; i++) {
        //console.log("data id: " + dataOf[i].metadata.name);
        returns.push (
          <Button 
            id={dataOf[i].metadata.name}
            onClick={e => loadCelebrity(e)}
          >
            {dataOf[i].metadata.name}
          </Button>
        )
      }
    }
    return returns;
  }

  //makes multiple pages for celebrity movie cards loaded
  async function renderPages(){
    const items = [];
    for (let i = 1; i <= {celeb}.message.pages; i++) {
        items.push({value: i, label: i});
    }
    await setItems(items);
  }

  //create cards regarding movies based on celeb
  function generateMovies() {
    let returns = [];
    //for each of the movies loaded
    for (let i = 0; i< {celeb}.message.movies.length; i++) {
      //current movie information
      let current = {celeb}.message.movies[i];
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



  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: async acceptedFiles => {
      //if one file, continue else alert user
      if (acceptedFiles.length === 1) {
        await identifyFile(acceptedFiles);
        // console.log(data.get("data")[0].metadata.name);
        // console.log("loading: " + loading);
        // console.log("loaded: " + loaded);
        // console.log("data:" + data);
        // console.log("message: " + message);
        // console.log("celeb: " + celeb);
        // console.log("pages: " + pages);
        // console.log("name: " + name);
        // console.log("error: " + error);
        // console.log("items: " + items);

        //after files have been accepted, do stuff
        //renders image that was uploaded
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        //call modal toggle on file upload
        toggle();
      } else {
        alert("Only one image is allowed at a time.")
      }
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={imgStyle}
        />
      </div>
    </div>
  ));

  //allows for us to pass css to our drag and drop zone
  const style = useMemo(() => ({
    ...baseStyle,
  }))

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <h4 style={textStyle}>Drag and Drop Photo Here To Identify Celebrities!</h4>
        <em style={disclaimStyle}>Only *.jpeg and *.png images are accepted</em>
      </div>
      {loading &&  <ReactLoading type={"bars"} style={loadingStyle} />  }  
      
      <h4 style={outerText}>The image uploaded will appear below.</h4>
      
      <aside style={thumbsContainer} onClick={toggle}>
        {thumbs}
      </aside>

      <div>
        
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Celebrities Identified</ModalHeader>
          <ModalBody>
            Photo Uploaded:
            {thumbs}
            {loadOptions()}
            Celebrities identified: ...
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </section>
  );
}
