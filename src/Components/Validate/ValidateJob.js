import React, { useEffect, useState } from 'react'
import api from '../../constants';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const Validate = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchjobc, setSearchjobc] = useState("");
    const [searchjobr, setSearchjobr] = useState("");
    const [searchjobb, setSearchjobb] = useState("");
    const func = (d) => {
        var obj = new Date(d);
        var y = obj.getUTCMonth() + 1;
        var x = obj.getUTCDate() + "-" + y + "-" + obj.getFullYear();
        return x;
    };
    const displayJobs = () => {
        fetch(`${api}job/validate`, { method: "GET" })
            .then((response) => response.json())
            .then((data) => { setJobs(data); setLoading(false); });

    };
    const filteredJob = () => jobs.filter(job => {
        return job.jobcompanyname?.toLowerCase()?.indexOf(searchjobc.toLowerCase()) !== -1 &&
            job.role?.toLowerCase()?.indexOf(searchjobr.toLowerCase()) !== -1 &&
            job.batch?.toString()?.toLowerCase().indexOf(searchjobb) !== -1
    })

    const onClickApprove = (jobOpeningId) => {
        setLoading(true)
        fetch(`${api}job/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobOpeningId }),
        })
            .then((response) => {
                displayJobs();
            })

    }
    useEffect(() => {
        displayJobs()
    }, [])
    return (
        <div>
            <MDBContainer className='jobopeningsdiv1'>
                <MDBRow>
                    <MDBCol md='4' sm='12'>
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
                    <MDBCol md='4' sm='12'>
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
                    <MDBCol md='4' sm='12'>
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
                </MDBRow>
            </MDBContainer>
            <MDBContainer>
                {loading ? <div>Loading</div> : !jobs.length ? <div>No Job To Validate</div> : filteredJob()?.map((job) => {
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
                                        <div className='jobopeningsapprove'>
                                            <button onClick={() => { onClickApprove(job?._id) }} className='btn btn-success'>
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </>
                    );
                })}
            </MDBContainer>
        </div>
    )
}
export default Validate