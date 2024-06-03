import React, { useState, useEffect } from "react";
import "../../Styles/CourseDetail.css";
import { useStateValue } from "../../StateProvider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHistory, NavLink } from "react-router-dom";
import api from "../../constants";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function CourseDetails(props) {
  const [{ user }, dispatch] = useStateValue();
  const [userr, setUserr] = useState(null);
  const [course, setCourse] = useState(null);
  const [arrayy, setArrayy] = useState([]);
  const [tfstate, setTfstate] = useState(false);
  const history = useHistory();
  const [percentage, setPercentage] = useState(0);
  const [percentage1, setPercentage1] = useState(0);

  var videocom;
  useEffect(() => {
    const displayCourse = () => {
      fetch(`${api}course/getcourse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          courseid: props.match.params.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCourse(data);
          myFunction(data);
        });
    };

    const bringUser = () => {
      if (localStorage.getItem("email")) {
        fetch(`${api}user/bringuser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("email") || user?.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setUserr(data[0]);
            var objj;
            objj = data[0]?.courses?.find((obj) => {
              if (obj.courseid === props.match.params.value) {
                return obj;
              }
            });
            videocom = objj?.videocompleted.length;
            setPercentage(videocom);
          });
      }
    };

    displayCourse();
    bringUser();
  }, [tfstate]);
  var videosarr = [];
  var totalvideos;
  const myFunction = (course) => {
    if (course) {
      videosarr = course[0].videos;
      totalvideos = course[0].videos.length;
      setPercentage1(totalvideos);
      // console.log(userr?.courses?.find(course => course?.courseid == props.match.params.value)?.videocompleted?.some(completeVideoId => completeVideoId == itemsI?.videoindex));
      videosarr.map((video) => {
        callvideos(video);
      });
      const arr3 = [];
      for (const item in arr) {
        arr3.push(arr[item]);
      }
      setArrayy(arr3);
    }
  };

  const arr = {};
  const callvideos = (video) => {
    if (video.videonum in arr) {
      arr[video.videonum].push(video);
    } else {
      arr[video.videonum] = [];
      arr[video.videonum].push(video);
    }
  };

  const bringUserr = () => {
    if (user) {
      fetch(`${api}user/bringuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserr(data);
        });
    }
  };

  const handleEnroll = () => {
    if (user) {
      fetch(`${api}course/enrollincourse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          courseid: props.match.params.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          bringUserr();
          if (tfstate) {
            setTfstate(false);
          } else {
            setTfstate(true);
          }
        });
    } else {
      history.push("/signup");
    }
  };
  const func = () => {
    return (
      <>
        <CircularProgressbar
          value={(percentage / percentage1) * 100}
          text={`${(percentage / percentage1) * 100}`.slice(0, 4) + "%"}
        />
      </>
    );
  };

  return (
    <div className='mainDivCourseDetail'>
      <div className='ixp'>
        <div className='ixpmain'>
          <div className='courseImageDiv'>
            <img
              className='courseImage'
              src={course && course[0].thumbnaillink}
            />
          </div>

          <div className='courseDescription'>
            <div className='courseDescriptionTitle'>
              <h1>{course && course[0].coursename}</h1>
            </div>

            <div className='courseDescriptionContent mb-3'>
              {course && course[0].description}
            </div>

            <div className=' d-flex justify-content-center'>
              {
                // userr?<>{userr.email}</>:<></>
                // userr?.courses?.includes(props.match.params.value)
                userr?.courses?.find((obj) => {
                  if (obj.courseid === props.match.params.value) {
                    return true;
                  }
                }) ? (
                  <NavLink to={`/coursevideo/${course && course[0].courseid}`}>
                    <span>
                      <button className='btn btn-primary enrollCoursesbutton'>
                        Start Course
                      </button>
                    </span>
                  </NavLink>
                ) : (
                  <span onClick={handleEnroll}>
                    <button className='btn btn-primary enrollCoursesbutton'>
                      Enroll in Course
                    </button>
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
      {/* next division starts */}
      <hr class='style-seven' />
      <MDBContainer>
        <MDBRow>
          <MDBCol md='6' sm='12'>
            <center>
              <div
                style={{ justifyContent: "center" }}
                className='coursedetailsecondmaindiv1'
              >
                <h1>Your Progress</h1>
                <div style={{ width: 250, height: 250, margin: 10 }}>
                  {func()}
                </div>
              </div>
            </center>
          </MDBCol>
          <MDBCol md='6' sm='12'>
            <div className='syllabus'>
              <div className='d-flex justify-content-center mb-3 syl  '>
                <h2>Syllabus</h2>
              </div>

              <div>
                {arrayy ? (
                  <>
                    {arrayy.map((items, index) => (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1a-content'
                          id='panel1a-header'
                        >
                          <Typography>
                            <b>Lesson {index + 1}</b>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {items.map((itemsI, indexI) => {
                            return <div>
                              <Typography>
                                {userr?.courses?.find(course => course?.courseid == props.match.params.value)?.videocompleted?.some(completeVideoId => completeVideoId == itemsI?.videoindex) ?
                                  <CheckCircleOutlineIcon fontSize="inherit" style={{ color: "green" }} />
                                  :
                                  <RadioButtonUncheckedIcon fontSize="inherit" />
                                }{itemsI?.videoname}
                              </Typography>
                            </div>
                          })}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default CourseDetails;
