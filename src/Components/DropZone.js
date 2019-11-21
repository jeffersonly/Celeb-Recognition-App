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
import {Redirect} from 'react-router-dom';
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
  cursor: 'pointer'
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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  color: '#343a40',
  height: '25%',
  width: '25%',
}

const celebButtonStyle = {
  backgroundColor: '#343a40',
  color: 'white',
}

const buttonStyle = {
  backgroundColor: '#343a40',
  color: 'white',
  margin: '10px',
}

const modalText = {
  fontSize: '16px',
}

export default function Previews() {
  const [files, setFiles] = useState([]);
  const [modal, setModal] = useState(false);
  const [newpage, changePage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(new Map());
  const [message, setMessage] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState();

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

  //passes the celebrity name as props to another page to render info
  async function goTo(e) {
    await setName(e.target.id);
    changePage(true);
  }

  function listOfCelebs() {
    let namesReturns = 'Celebrities Identified: ';
    let listData = data.get("data");
    if(listData) {
      for(let i = 0; i < listData.length; i++) {
        let aName = listData[i].metadata.name;
        namesReturns += aName + ", "
      }
    }
    //console.log("celeb names: " + listOfCelebs());
    return namesReturns;
  }

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
            onClick={e => goTo(e)}
            style={celebButtonStyle}
          >
            {dataOf[i].metadata.name}
          </Button>
        )
      }
    }
    return returns;
  }

  //drop zone stuff for accepting images
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: async acceptedFiles => {
      //if one file, continue else alert user
      if (acceptedFiles.length === 1) {
        await identifyFile(acceptedFiles);

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
    <>
    {newpage ? <Redirect to= {{ pathname: '/search', state: {n: name}}}/> : null}
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
            <span style={modalText}>
              Photo Uploaded:
              {thumbs}
              {listOfCelebs()}
              <br/><br/>
              Click on an actor to view more information about them!
              <br/><br/>
              {loadOptions()}
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle} style={buttonStyle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </section>
  </>
  );
}
