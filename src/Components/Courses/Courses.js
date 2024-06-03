import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Card from "../Cards/Cards";
import "../../Styles/Courses.css";
import { useStateValue } from "../../StateProvider";
import api from "../../constants";
import Grid from '@mui/material/Grid';
import Meta from "../Meta";
import Switch from '@mui/material/Switch';
import Select from 'react-select'
import { OPTIONS_FOR_COURSE_CATEGORY_FILTER } from "./CategoryConstants.js";
import useWindowWidth from "../Hook/useWidth";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Courses() {
  const [{ user },] = useStateValue();
  const [courses, setCourses] = useState([]);
  const [, isDesktop] = useWindowWidth()
  const [userr, setUserr] = useState(null);
  const [checkedForEnrolledCourse, setCheckedForEnrolledCourse] = useState(false);
  const [textSearchForCourse, setTextSearchForCourse] = useState("");
  const [categorySearchForCourse, setCategorySearchForCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalNumberOfPage, setTotalNumberOfPage] = useState(1)
  useEffect(() => {
    const displayEncourses = () => {
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
    };
    displayCourses();
    displayEncourses();
  }, []);

  const displayCourses = () => {
    fetch(`${api}course/getcourses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((response) => response.json())
      .then((data) => { setCourses(data); setTotalNumberOfPage(Math.ceil(data.length / 8)) });
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
  const getFilteredCourse = () => {
    var courseToReturn = []
    if (checkedForEnrolledCourse) {
      courseToReturn = courses.filter((course) => {
        if (
          String(course?.coursename).toLowerCase().includes(String(textSearchForCourse).toLowerCase()) &&
          userr?.courses.some(cFromUser => cFromUser.courseid == course.courseid) &&
          (course?.category?.some(value => categorySearchForCourse.some(c => c === value)) || categorySearchForCourse.length === 0)
        ) {
          return course
        }
        return null
      })
    } else {
      courseToReturn = courses.filter((course) => {
        if (String(course?.coursename)?.toLowerCase()?.includes(String(textSearchForCourse).toLowerCase()) &&
          (course?.category?.some(value => categorySearchForCourse.some(c => c === value)) || categorySearchForCourse.length === 0)
        ) {
          return course
        }
        return null
      })
    }
    if (Math.ceil(courseToReturn.length / 8) != totalNumberOfPage) {
      setTotalNumberOfPage(Math.ceil(courseToReturn.length / 8))
      setCurrentPage(1)
    }
    return courseToReturn
  }
  return (
    <div className="mainCourseDiv">
      <Meta
        title="LetsPrep - Courses"
        description={`Provide you with the Best Courses so that you 
      invest more time in studying instead of wasting it in searching.`}
      />
      <Grid style={{ margin: "0px auto", paddingTop: "30px", width: isDesktop ? "70%" : "90%" }} container spacing={2} >
        <Grid md={4} xs={12} item style={{ textAlign: "center", paddingLeft: !(isDesktop) && "0px" }}>
          <input placeholder="search for course"
            class="form-control"
            style={{ border: "1px solid lightgray", borderRadius: "4px", width: "100%", height: "38px" }} onChange={(e) => { setTextSearchForCourse(e.target.value) }} />
        </Grid>
        <Grid md={4} xs={12} item style={{ textAlign: "center", paddingLeft: !(isDesktop) && "0px" }} >
          <Select styles={customStyles} isMulti
            onChange={(e) => { setCategorySearchForCourse(e.map(v => { return v.value })) }}
            value={categorySearchForCourse.map(cat => { return { label: cat, value: cat } })}
            options={OPTIONS_FOR_COURSE_CATEGORY_FILTER.map(option => { return { label: option, value: option } })} />
        </Grid>
        <Grid md={4} xs={12} item style={{ textAlign: "center", paddingLeft: !(isDesktop) && "0px" }} > <strong style={{ color: "grey" }}>Enrolled Courses</strong>
          <Switch color="success"
            onChange={() => { setCheckedForEnrolledCourse(!checkedForEnrolledCourse) }}
            value={checkedForEnrolledCourse} />
        </Grid>
      </Grid>
      <div className='coursesdiv1'>
        <center>
          <div className='coursesdiv1heading'>{checkedForEnrolledCourse ? "Enrolled Courses" : "Explore Courses"}</div>
        </center>
        <div className='coursesdiv1content'>
          <MDBContainer className='courses-cl1'>
            <MDBRow className='courses-cl2'>
              {getFilteredCourse().map((courseToShow, index) => {
                if (index < (currentPage - 1) * 8 || index >= ((currentPage - 1) * 8) + 8) {
                  return null
                }
                return <MDBCol lg='3' md='4' sm='6'>
                  <Card
                    name={courseToShow.coursename}
                    id={courseToShow.courseid}
                    instructor={courseToShow.instructor}
                    desc={courseToShow.description}
                    link={courseToShow.thumbnaillink}
                    userr={userr}
                  />
                </MDBCol>
              }
              )}
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
      <Stack spacing={2} alignItems="center">
        <Pagination count={totalNumberOfPage} page={currentPage} onChange={(e, v) => { setCurrentPage(v); }} />
      </Stack>
    </div>
  );
}

export default Courses;

