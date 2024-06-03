import React, { useState } from "react";
import { makeStyles } from '@mui/styles'
import "../../Styles/Cards.css";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import api from "../../constants";
import { ExamType } from "../../Utils";
import { useStateValue } from "../../StateProvider";
import PleaseLogin from "../PleaseLogin";
const useStyles = makeStyles({
  container: {
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
    paddingBottom: "1px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",

  },
  sliderdown: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    color: "white",
    transition: "all 1s  ease",
    backgroundColor: "rgba(0 ,0 ,0 ,0.8)",

    textAlign: "start",
    wordBreak: "break-word",
    overflow: "hidden",
    zIndex: "2",
    "& > * ": {
      width: "100%", height: "100% ", border: "none", backgroundColor: "rgba(0,0,0,0.4)", color: "white",
      fontWeight: "500",
    }

  },
  sliderup: {
    position: "absolute",
    left: "0%",
    transition: "all 0.5s ease",
    color: "white",
    top: "-100%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0 ,0 ,0 ,0.1)",
    textAlign: "start",
    wordBreak: "break-word",
    overflow: "hidden",
    zIndex: "2",
    "& > * ": {
      width: "100%", height: "100% ", border: "none", backgroundColor: "rgba(0,0,0,0.4)", color: "white",
      fontWeight: "500",
    }

  },

  img: {
    width: "100%",
    objectFit: "cover",
  },
  headingtext: {
    fontSize: "2.2vh",
    color: "Black",
    margin: 0,
    marginBottom: 2,
    wordWrap: "break"
  },

  textcontainer: {
    width: "100%",
    textAlign: "start",
    padding: "2px 10px ",
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "white",

  },

  para: {
    fontSize: "2vh",
    color: "grey",
    margin: 0,
    textAlign: "start",
    justifyItems: "start",
    padding: "0px 5px"

  },
  btn: {
    textAlign: "center",

  }
});

export const PaperCard = (props) => {
  const [pdState, setpdState] = useState(true);
  const [show, setShow] = useState(false);
  const [{ user },] = useStateValue();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = useStyles();
  const deletePaper = (id) => {
    fetch(`${api}resources/paper/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DONE");
      });
  }
  const verifyPaper = (id, bool = false) => {
    fetch(`${api}resources/paper/${id}/${bool}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DONE");
      });
  }

  return (
    <div className={classes.container}>
      <div className="card" >
        <img className={`${classes.img} card-img-top`} src={props.paper.img} alt="Card cap" ></img>
        <div className="card-body">
          <h5 className="card-title">{props.paper.subject.length <= 40 ? props.paper.subject : props.paper.subject.substring(0, 40) + "..."}</h5>
          <p className={` card-subtitle text-muted`}>
            {props.paper.branch}
          </p>
          <p className={` card-subtitle text-muted`}>
            Sem : {props.paper.semester}
          </p>
          <p className={` card-subtitle text-muted`}>
            Year :
            {props.paper.year}
          </p>
          <p className={` card-subtitle text-muted`}>
            {props.paper.exam.map((exam) => { return ExamType(exam) }).join(", ")}
          </p>
          <div className={`${classes.btn}`}>
            <Button onClick={() => {
              setpdState(false);
              handleShow();
            }} style={{
              padding: "5px 20px ",
            }} variant="contained" >View</Button>
            {props?.userr?.role === 'admin' && < Button className={classes.btn} style={{ marginLeft: "5px" }} onClick={() => {
              deletePaper(props.paper._id)
            }} variant="contained" color="error">
              Delete
            </Button>}
            {props?.userr?.role === 'admin' && < Button className={classes.btn} style={{ marginLeft: "5px" }} onClick={() => {
              verifyPaper(props.paper._id, !props.paper.verified)
            }} variant="contained" color="warning">
              {props.paper.verified ? "Unverify" : "Varify"}
            </Button>}
          </div>
          <Modal
            centered
            size='xl'
            show={show}
            onHide={handleClose}
            keyboard={true}
          >
            <Modal.Body  >
              {
                user ?
                  <iframe src={props.paper.link} title="paper" width="100%" height="580em" allow="autoplay"></iframe>
                  :
                  <PleaseLogin action="Question Papers" />
              }
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div >
  );
};
export const BookCard = (props) => {
  const [slide, setslide] = useState(false)
  const classes = useStyles();
  var d = new Date(); // for now
  const handleslidedown = () => {
    setslide(true)
  }
  const handleslideup = () => {
    setslide(false)
  }

  return (
    <div className={classes.container}>
      <div className={slide ? classes.sliderdown : classes.sliderup}>
        <button onClick={handleslideup} ><h6>Description</h6> {props.bookdetails.des}</button>
      </div>

      <div className="card">
        <img className={`${classes.img} card-img-top`} src={props.bookdetails.img} alt="Card img" />
        <div className="card-body">
          <h5 className="card-title"> {props.bookdetails.name.length <= 25 ? props.bookdetails.name : props.bookdetails.name.substring(0, 20) + "..."}</h5>
          <p className={` card-subtitle text-muted`}>
            {props.bookdetails.author}
          </p>
          <p className={` card-subtitle text-muted`}>
            Branch: {props.bookdetails.branch}
          </p>
          {/* <p className={classes.subtext}>
            Subject: {props.bookdetails.subject}
          </p>
          <p className={classes.subtext}>
            Sem: {props.bookdetails.semester}
          </p> */}
          <p className={` card-subtitle text-muted`}>
            {props.bookdetails.library}
          </p>
          <button onClick={handleslidedown} style={{ border: "none", background: "transparent", width: "100%", textAlign: "start", color: "grey", fontWeight: "500", fontSize: "2vh" }}>Read more...</button>
          <div className={`${classes.btn}`}>
            <a
              href={props.bookdetails.buylink}
              className={classes.link}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
              >
                Buy Now
              </Button>
            </a>
          </div>

        </div>
      </div>
    </div >
  );
};
export const StudyMaterialCard = ({ study }) => {
  const classes = useStyles();
  const [pdState, setpdState] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={classes.container}>
      <div className="card" >
        <img className={`${classes.img} card-img-top`} src={study.img} alt="Card cap" ></img>
        <div className="card-body">
          <h5 className="card-title"> {study.subject.length <= 25 ? study.subject : study.subject.substring(0, 20) + "..."}</h5>
          <p className={` card-subtitle text-muted`}>
            {study.branch}
          </p>
          <p className={` card-subtitle text-muted`}>
            Sem :
            {study.semester}
          </p>
          <div className={`${classes.btn}`}>
            <button onClick={() => {
              // setpresentDescription(props.desc);
              setpdState(false);
              handleShow();
            }} className={` btn btn-primary`}>Get Material </button>
          </div>
          <Modal
            centered
            size='lg'
            show={show}
            onHide={handleClose}
            // backdrop='static'
            keyboard={false}
          >

            <Modal.Body  >
              <iframe title="Study material" src={study.link.replace("view?usp=sharing", "preview")} width="100%" height="580em" allow="autoplay"></iframe>
            </Modal.Body>

          </Modal>
        </div>
      </div >
    </div >
  );
};

