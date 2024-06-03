import React, { useState } from "react";
import "../../Styles/DisplayIxp.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import { useStateValue } from "../../StateProvider";
import PleaseLogin from "../PleaseLogin";
/*                name={ixp.companyname}
                  desc={ixp.description}
                  role={ixp.role}
                  email={ixp.contributoremail}*/
function DisplayIxp(props) {
  const [{ user },] = useStateValue();
  //console.log(props);
  // const [presentDescription, setpresentDescription] = useState(
  //   props.desc.slice(0, 120) + "..."
  // );
  const [pdState, setpdState] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const func = (level) => {
    var colorr = "";
    var l = "";
    var textcolorr = "";

    if (level === 1) {
      colorr = "darkgreen";
      l = "Easy";
      textcolorr = "white";
    } else if (level === 2) {
      colorr = "lightgreen";
      l = "Easy-medium";
      textcolorr = "white";
    } else if (level === 3) {
      colorr = "yellow";
      l = "Medium";
      textcolorr = "black";
    } else if (level === 4) {
      colorr = "orange";
      l = "Medium-hard";
      textcolorr = "white";
    } else {
      colorr = "red";
      l = "Hard";
      textcolorr = "white";
    }

    return (
      <>
        <div
          style={{
            padding: "2px 10px",
            background: `${colorr}`,
            color: `${textcolorr}`,
          }}
        >
          <Tooltip title='Overall level of interview' placement='bottom'>
            <strong>{l}</strong>
          </Tooltip>
        </div>
      </>
    );
  };

  const func1 = (levela) => {
    var colorr1 = "";
    var l = "";

    if (levela === 1) {
      colorr1 = "darkgreen";
      l = "Easy";
    } else if (levela === 2) {
      colorr1 = "lightgreen";
      l = "Easy-medium";
    } else if (levela === 3) {
      colorr1 = "yellow";
      l = "Medium";
    } else if (levela === 4) {
      colorr1 = "orange";
      l = "Medium-hard";
    } else {
      colorr1 = "red";
      l = "Hard";
    }

    return (
      <>
        <div
          style={{
            // padding: "2px 10px",
            // background: `${colorr1}`,
            color: `${colorr1}`,
            // height:"",
            // width:"100px"
          }}
        >
          <strong>
            <span style={{ color: "black" }}>
              Level of Online Assessment :{" "}
            </span>
            {l}
          </strong>
        </div>
      </>
    );
  };

  return (
    <div className='masterdixp mb-3'>
      <div className='headingdixp'>{props.role}</div>
      <div className='authordixp'>Contributor: {props.fullname}</div>
      <div
        className='descriptiondixp'
        dangerouslySetInnerHTML={{ __html: props.desc.slice(0, 120) + "..." }}
      ></div>
      {/* <div>{presentDescription}</div> */}
      <div className='readmoreixpbutton d-flex justify-content-end'>
        <Modal
          size='lg'
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header>
            {/* <AccountBalanceIcon fontSize='large' /> */}
            <Modal.Title style={{ color: "black", margin: "auto" }}>
              <h1>
                <strong>{props.name}</strong>
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              user ? <>
                <div
                  style={{
                    color: "grey",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3>
                      <strong>{props.role}</strong>
                    </h3>
                  </div>
                  <div>{func(props.leveli)}</div>
                </div>
                <div style={{ color: "grey" }}>
                  <p>
                    <strong>
                      Contributor : &nbsp;
                      <a
                        class='btn btn-light'
                        data-bs-toggle='collapse'
                        href='#multiCollapseExample1'
                        role='button'
                        aria-expanded='false'
                        aria-controls='multiCollapseExample1'
                      >
                        {props.fullname}
                      </a>
                    </strong>
                  </p>
                  <div class='row'>
                    <div class='col'>
                      <div
                        class='collapse multi-collapse'
                        id='multiCollapseExample1'
                      >
                        <div class='card card-body'>
                          <strong>Institute : {props.iname}</strong>
                          <strong>Degree : {props.course}</strong>
                          <strong>Branch : {props.branch}</strong>
                          <strong>Graduation Year : {props.yop}</strong>
                          {props.lp ? <>
                            <a
                              href={props.lp}
                              target='_blank'
                              title='LinkedIn'
                              class='btn btn-linkedin btn-sm'
                            >
                              <i class='fa fa-linkedin fa-fw'></i> LinkedIn
                            </a>
                          </> : <></>}
                        </div>
                      </div>
                    </div>
                    {/* <div class="col">
                  <div
                    class="collapse multi-collapse"
                    id="multiCollapseExample2"
                  >
                    <div class="card card-body"></div>
                  </div>
                </div> */}
                  </div>
                </div>
                <p style={{ color: "grey" }}>
                  <strong>Opportunity Type: {props.oprt}</strong>
                </p>
                <div>{func1(props.levela)}</div>
                <br />
                <div>
                  <strong>Description</strong>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: props.desc }}
                  style={{ textAlign: "justify" }}
                ></div>
                <div>
                  {props?.links[0]?.linkname === "" ? (
                    <></>
                  ) : (
                    <>
                      <strong>Links to questions asked:</strong>
                    </>
                  )}
                  <p>
                    {props.links.map((link, idx) => {
                      return (
                        <div>
                          <a href={link.linkurl} target='_blank'>
                            {link.linkname}
                          </a>
                        </div>
                      );
                    })}
                  </p>
                </div>
              </> : <PleaseLogin action="Interview Experience" />
            }
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                // setpresentDescription(props.desc.slice(0, 120) + "...");
                handleClose();
              }}
              style={{ background: "black", color: "white" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {
          props.showApprovedOrNot && <div class='btn '>
            Is Approved : {props?.approved ? "Yes" : "Not Yet"}
          </div>
        }
        <button
          onClick={() => {
            // setpresentDescription(props.desc);
            setpdState(false);
            handleShow();
          }}
          type='button'
          class='btn btn-outline-secondary'
        >
          Read More
        </button>
        {props.showApproveButton && <button
          onClick={() => { props.onClickApproveButton(props.id); }}
          type='button'
          class='btn btn-outline-secondary'
        >
          Approve
        </button>}
      </div>
    </div>
  );
}

export default DisplayIxp;
