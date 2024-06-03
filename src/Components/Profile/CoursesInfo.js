import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../Loader/index';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { NavLink, useHistory } from "react-router-dom";
import "../../Styles/Cards.css";
import "../../Styles/Courses.css";
import Grid from '@mui/material/Grid';
import { Box, Typography } from "@mui/material";

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {props.text}
                </Typography>
            </Box>
        </Box>
    );
}


const CoursesInfo = ({ coursesInfo, userCoursesInfo = [] }) => {
    const history = useHistory()
    const getTextForCircularProgressWithLabel = (cId, count) => {
        return `${userCoursesInfo.find(userCoursesInfoObject => userCoursesInfoObject?.courseid == cId)?.videocompleted?.length
            }/${count}`
    }
    const courseCard = (course = {}) => {
        return (
            <Grid md={4} sm={5} xs={12} style={{ padding: "10px" }}>
                <div style={{ background: "#ededeec9" }} className=' profilecard shadow2'>
                    <img src={course.thumbnaillink} className='card-img-top' alt='...' />
                    <div className='profilecard-body '>
                        <h5 className='profilecard-title'>{course.coursename}</h5>
                        <p className='profilecard-text '>{course.instructor}</p>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <NavLink to={`/coursedetail/${course?.courseid}`} className='btn btn-dark'>
                                Continue..
                            </NavLink>
                            <CircularProgressWithLabel text={getTextForCircularProgressWithLabel(course?.courseid, course?.count)}
                                value={userCoursesInfo.find(userCoursesInfoObject => userCoursesInfoObject?.courseid === course?.courseid)?.videocompleted?.length / course?.count}
                            />
                        </div>
                    </div>
                </div>
            </Grid>)
    }
    return <div className="profilecard" >
        <center><h3>Enrolled Courses</h3></center>
        {!coursesInfo ? <Loader /> :
            coursesInfo?.length === 0 ?
                <div style={{ textAlign: 'center' }}>
                    <MenuBookIcon onClick={() => history.push('courses')} style={{ fontSize: "40px", cursor: "pointer" }} />
                    <div onClick={() => history.push('courses')}>See all courses</div>
                </div> :
                <Grid container spacing={2} >
                    {coursesInfo.map(course => courseCard(course))}
                </Grid>
        }
    </div >
}

export default CoursesInfo