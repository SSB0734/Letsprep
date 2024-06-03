import React, { useEffect, useState } from "react";
import "../../Styles/JobOpenings.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import api from "../../constants";
import Meta from "../Meta";

function JobOpenings() {
  const [{ user }, dispatch] = useStateValue();
  const [jobs, setJobs] = useState([]);
  const [searchjobc, setSearchjobc] = useState("");
  const [searchjobr, setSearchjobr] = useState("");
  const [searchjobb, setSearchjobb] = useState("");

  const displayJobs = () => {
    //console.log("display jobs called")
    fetch(`${api}job/getjobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => setJobs(data));
  };

  useEffect(() => {
    displayJobs();
  }, []);

  const func = (d) => {
    var obj = new Date(d);
    var y = obj.getUTCMonth() + 1;
    var x = obj.getUTCDate() + "-" + y + "-" + obj.getFullYear();
    return x;
  };

  const job1 = jobs.filter((product1) => {
    return (
      product1.jobcompanyname
        .toLowerCase()
        .indexOf(searchjobc.toLowerCase()) !== -1 &&
      product1.role.toLowerCase().indexOf(searchjobr.toLowerCase()) !== -1 &&
      product1.batch.toString().toLowerCase().indexOf(searchjobb) !== -1
    );
  });

  return (
    <div className='jobopeningsmaindiv'>
      <Meta
        title="LetsPrep - Job Opening"
        description={`Update you with best job opening to make you aware of all opportunities,
         so that none is missed as nothing is more expensive than a missed opportunity.`}
      />
      {/* <div> */}
      <MDBContainer className='jobopeningsdiv1'>
        <MDBRow>
          <MDBCol md='3' sm='12'>
            <div className='jobopeningsdiv11'>
              <input
                className='jobopeningsdiv11search form-control'
                type='text'
                aria-label='Search'
                onChange={(e) => {
                  setSearchjobc(e.target.value);
                }}
                placeholder='Search for company..'
              />
            </div>
          </MDBCol>
          <MDBCol md='3' sm='12'>
            <div className='jobopeningsdiv12'>
              <input
                className='jobopeningsdiv11search form-control'
                type='text'
                aria-label='Search'
                onChange={(e) => {
                  setSearchjobr(e.target.value);
                }}
                placeholder='Search for role..'
              />
            </div>
          </MDBCol>
          <MDBCol md='3' sm='12'>
            <div className='jobopeningsdiv13'>
              <input
                className='jobopeningsdiv11search form-control'
                type='text'
                aria-label='Search'
                onChange={(e) => {
                  setSearchjobb(e.target.value);
                }}
                placeholder='Search for batch..'
              />
            </div>
          </MDBCol>
          <MDBCol md='3' sm='12'>
            <div className='jobopeningsdiv14'>
              {
                user ? <Link to='/add-job-openings'>
                  <button className='jobopeningsdiv14button btn btn-dark'>
                    Add Job Opening
                  </button>
                </Link> : <Link to='/signup'>
                  <button onClick={() => alert("You have to signup to add job opening")} className='jobopeningsdiv14button btn btn-dark'>
                    Add Job Opening
                  </button>
                </Link>
              }
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* </div> */}
      <div className='jb'>
        <MDBContainer>
          {searchjobc === "" && searchjobr === "" && searchjobb === "" ? (
            <>
              {jobs
                .slice(0)
                .reverse()
                .map((job, index) => {
                  return (
                    <>
                      <MDBRow className='mb-3 jobopeningsdiv2'>
                        <MDBCol md='12' sm='12'>
                          <div className='jobopeningsdiv21'>
                            <div className='jobopeningsdiv21company'>
                              <h2>
                                <b>{job.jobcompanyname}</b>
                              </h2>
                            </div>
                            <div className='jobopeningsdiv21batch'>
                              <b>Batch - {job?.batch?.join(" | ")}</b>
                            </div>
                          </div>
                          <div className='jobopeningsdiv22'>
                            <div className='jobopeningsdiv22role'>
                              <b>Role :</b>{" "}
                              <>
                                <b style={{ color: "blue" }}>{job.role}</b>
                              </>
                            </div>
                          </div>
                          <div className='jobopeningsdiv23'>
                            <div className='jobopeningsdiv23jobpostdate'>
                              <b> Job posted on</b> : {func(job.start)}
                            </div>
                            <div className='jobopeningsdiv23jobpostdate'>
                              <b> Apply before</b> : {func(job.expireAt)}
                            </div>
                            <div className='jobopeningsdiv23jobpostdate'>
                              <a href={job.applylink} target='_blank'>
                                <button className='btn btn-success'>
                                  Apply
                                </button>
                              </a>
                            </div>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </>
                  );
                })}
            </>
          ) : (
            <>
              {job1
                .slice(0)
                .reverse()
                .map((job, index) => {
                  return (
                    <>
                      <MDBRow className='mb-3 jobopeningsdiv2'>
                        <MDBCol md='12' sm='12'>
                          <div className='jobopeningsdiv21'>
                            <div className='jobopeningsdiv21company'>
                              <h2>
                                <b>{job.jobcompanyname}</b>
                              </h2>
                            </div>
                            <div className='jobopeningsdiv21batch'>
                              <b>Batch - {job?.batch?.join(" | ")}</b>
                            </div>
                          </div>
                          <div className='jobopeningsdiv22'>
                            <div className='jobopeningsdiv22role'>
                              <b>Role :</b>{" "}
                              <>
                                <b style={{ color: "blue" }}>{job.role}</b>
                              </>
                            </div>
                          </div>
                          <div className='jobopeningsdiv23'>
                            <div className='jobopeningsdiv23jobpostdate'>
                              <b> Job posted on</b> : {func(job.start)}
                            </div>
                            <div className='jobopeningsdiv23jobpostdate'>
                              <b> Apply before</b> : {func(job.expireAt)}
                            </div>
                            <div className='jobopeningsdiv23jobpostdate'>
                              <a href={job.applylink} target='_blank'>
                                <button className='btn btn-success'>
                                  Apply
                                </button>
                              </a>
                            </div>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </>
                  );
                })}
            </>
          )}
        </MDBContainer>
      </div>
    </div>
  );
}

export default JobOpenings;
