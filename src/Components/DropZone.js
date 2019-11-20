import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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

export default function Previews(props) {
  const [files, setFiles] = useState([]);

  const [modal, setModal] = useState(false);

  //toggle for modal open/close
  function toggle() {
    setModal(!modal);
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: acceptedFiles => {
      //if one file, continue else alert user
      if (acceptedFiles.length === 1) {

        //after files have been accepted, do stuff
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
      
      <h4 style={outerText}>The image uploaded will appear below.</h4>
      
      <aside style={thumbsContainer} onClick={toggle}>
        {thumbs}
      </aside>

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Celebrities Identified</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
