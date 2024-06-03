import React, { useState, useEffect } from 'react'
import { Button } from "@mui/material"
import { makeStyles } from '@mui/styles'
import Books from './Books'
import { Modal } from "react-bootstrap";
import StudyMaterial from './StudyMaterial'
import api from "../../constants";
import Papers from './Papers'
import AddCircle from '@mui/icons-material/AddCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NoteIcon from '@mui/icons-material/Note';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import OptionForm from './OptionForm';
import { useStateValue } from "../../StateProvider";

const useStyles = makeStyles({
  container: {
    width: "100%",
  }

})
function ResponsiveTabs() {
  const classes = useStyles()
  const [pdState, setpdState] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [{ user },] = useStateValue();
  const [userr, setUserr] = useState(null);
  useEffect(() => {
    fetch(`${api}course/getencourses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user?.email || localStorage.getItem("email"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserr(data[0]);
      });
  }, []);
  return (
    <div className={classes.container} >
      <main id="jatinresources_main" className={classes.container}>
        <input className='jatinresources_input' id="jatinresources_tab3" defaultChecked type="radio" name="tabs" />
        <label className='jatinresources_label' for="jatinresources_tab3"> <AttachFileIcon /> Question Paper</label>

        <input className='jatinresources_input' id="jatinresources_tab1" type="radio" name="tabs" />
        <label className='jatinresources_label' for="jatinresources_tab1"> <LibraryBooksIcon /> Books</label>

        <input className='jatinresources_input' id="jatinresources_tab2" type="radio" name="tabs" />
        <label className='jatinresources_label' for="jatinresources_tab2"><NoteIcon /> Study Material</label>

        <Button style={{ marginLeft: 5, }}
          onClick={() => {
            // setpresentDescription(props.desc);
            setpdState(false);
            handleShow();
          }}
          type='button'
        >
          <AddCircle color='primary' />
        </Button>

        <section className='jatinresources_section' id="jatinresources_content1">
          {/* <Books show={show} />  */}
          <h2 style={{ textAlign: "center", position: "relative", top: "150px" }}> Coming soon..</h2>
        </section>

        <section className='jatinresources_section' id="jatinresources_content2">
          {/* <StudyMaterial show={show} /> */}
          <h2 style={{ textAlign: "center", position: "relative", top: "150px" }}>Coming soon..</h2>
        </section>

        <section className='jatinresources_section' id="jatinresources_content3">
          <Papers show={show} userr={userr} />
        </section>
        <Modal
          style={{
            width: "100%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50% ,-50%)",
          }}
          size='md'
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Body >
            <OptionForm handleClose={handleClose} userr={userr} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='outlined'
              onClick={() => {
                handleClose();
              }}
              color="secondary"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </main>
    </div >
  )
}

export default ResponsiveTabs
