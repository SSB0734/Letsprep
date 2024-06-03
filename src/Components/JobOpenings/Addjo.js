import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useHistory } from "react-router-dom";
import "../../Styles/AddXP.css";
import api from "../../constants";
import Select from 'react-select'
// import Select from "react-dropdown-select";

function Addjo() {
  const history = useHistory();
  const [jobcompanyname, setJobcompanyname] = useState("");
  const [role, setRole] = useState("");
  const [applylink, setApplylink] = useState("");
  const [batch, setBatch] = useState([]);
  const [start, setStart] = useState();
  const [expireAt, setExpireAt] = useState();
  const getBatchArray = () => {
    const date = new Date().getFullYear()
    return Array.from(Array(8).keys()).map(v => date + v - 2)
  }

  const hS = (event) => {
    event.preventDefault();
    handleSubmit()
  };
  const handleSubmit = () => {
    // event.preventDefault();
    fetch(`${api}job/add-job-openings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobcompanyname,
        role,
        applylink,
        batch: batch.sort(function (a, b) { return a - b }),
        start,
        expireAt,
        approved: false,
      }),
    })
      .then((response) => {
        alert("Job opening posted successfully, kindly wait for approval");
        history.push("/job-openings");
        response.json();
      })
      .then((responseJson) => {
        // do what you want with the response here
        // //console.log(responseJson);
      })
      .catch((error) => {
        alert("error in posting");
      });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      textAlign: "left"
    }),
  }
  console.log(batch);
  return (
    <div className='bg'>
      <div className='addxpmaindiv' style={{ marginTop: "20px" }}>
        <center>
          <h2 className='addxpmaindivheading'>Add Job Opening</h2>
        </center>
        <div className='addxpmaindivform'>
          <MDBContainer>
            <MDBRow className='cl1'>
              <MDBCol md='6' sm='12'>
                <form onSubmit={hS}>
                  <br />

                  <div className='mb-3'>
                    <label class='form-label' for='companyname'>
                      Company name:
                    </label>
                    <input
                      required
                      id='companyname'
                      name='companyname'
                      type='text'
                      class='form-control'
                      placeholder='Enter name of the company'
                      value={jobcompanyname}
                      onChange={(e) => setJobcompanyname(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='category'>
                      Role
                    </label>
                    <input
                      required
                      id='role'
                      name='role'
                      class='form-control'
                      placeholder='Enter Role'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    ></input>
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='applylink'>
                      Apply link
                    </label>
                    <input
                      required
                      id='applylink'
                      name='applylink'
                      class='form-control'
                      placeholder='Enter Apply Link'
                      value={applylink}
                      onChange={(e) => setApplylink(e.target.value)}
                    ></input>
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' style={{ marginBottom: "5px" }} for='batch'>
                      Batch
                    </label>
                    <Select styles={customStyles} isMulti
                      onChange={(e) => { setBatch(e.map(b => b.value)); }}
                      value={batch.map(b => { return { label: b, value: b } })}
                      options={getBatchArray().map(b => {
                        return { label: b, value: b }
                      })} />
                  </div>

                  <div className='md-6 sm-6 mb-3'>
                    <label class='form-label' for='start'>
                      Job posting date
                    </label>
                    <input
                      id='start'
                      name='start'
                      class='form-control'
                      type='datetime-local'
                      //   placeholder='Enter job posting date'
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                    ></input>
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='expireAt'>
                      Enter apply before date if exists
                    </label>
                    <input
                      id='expireAt'
                      name='expireAt'
                      class='form-control'
                      type='datetime-local'
                      //   placeholder='Enter Apply Link'
                      value={expireAt}
                      onChange={(e) => setExpireAt(e.target.value)}
                    ></input>
                  </div>

                  <div class='d-flex justify-content-center'>
                    <button
                      id='uplaodbutton'
                      type='submit'
                      // onClick={handleSubmit}
                      className='btn btn-warning'
                    >
                      Post Job Opening
                    </button>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}

export default Addjo;
