import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../constants';
import { useStateValue } from "../../StateProvider";
import CoursesInfo from './CoursesInfo';
import UserInfo from './UserInfo';
import UserIXPs from './UserIXPs';
import Grid from '@mui/material/Grid';
import '../../Styles/Profile/Profile.css'
import Meta from '../Meta'
import CommunityProfile from './CommunityProfile'
const Profile = () => {
    const history = useHistory()
    const [{ user }, dispatch] = useStateValue();
    const [userInfo, setUserInfo] = useState(null)
    const [userFetchedOnce, setUserFetchedOnce] = useState(false)
    const [userIXPs, setuserIXPs] = useState(false)
    const [coursesInfo, setCoursesInfo] = useState(null)
    const getuserIXPs = (email = null) => {
        if (email) {
            fetch(`${api}ixp/getIXP/${email}`, { method: "GET", })
                .then((response) => response.json())
                .then((data) => {
                    setuserIXPs(data)
                })
                .catch(err => { console.log(err); })
        } else {
            history.push("/")
        }
    }
    const getRegisteredCources = (courseId = []) => {
        if (courseId.length === 0) {
            setCoursesInfo([])
            return
        }
        fetch(`${api}course/getCourseByIdsArray`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coursesIdArray: courseId }),
        }).then((response) => response.json())
            .then((data) => {
                setCoursesInfo(data)
            })
            .catch(err => { console.log(err); })

    }
    useEffect(() => {
        if (user && !userFetchedOnce) {
            fetch(`${api}user/bringuser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user?.email,
                }),
            }).then((response) => response.json())
                .then((data) => {
                    if (data?.length > 0) {
                        setUserFetchedOnce(true)
                        setUserInfo({ ...data[0] })
                        getuserIXPs(data[0]?.email)
                        getRegisteredCources(data[0]?.courses?.map(course => parseInt(course?.courseid)))
                    } else {
                        history.push("/")
                    }
                })
                .catch(err => {
                    console.log(err);
                    history.push("/")
                })
        }
    }, [user, history, userFetchedOnce])
    return <>
        <Meta />
        <Grid className="profilemaindiv" container spacing={2} style={{ padding: "16px" }} >
            <Grid item md={3} sx={12} style={{ width: "100%" }} >
                <center><UserInfo setUserFetchedOnce={setUserFetchedOnce} userInfo={userInfo} /></center>
                {/* <center><CommunityProfile setUserFetchedOnce={setUserFetchedOnce} userInfo={userInfo} /></center> */}
            </Grid>
            <Grid item md={9} sx={12} style={{ width: "100%" }}>
                {/* Cources */}
                <CoursesInfo
                    coursesInfo={coursesInfo}
                    userCoursesInfo={userInfo?.courses}
                />
                {/* ixp */}
                <UserIXPs userIXPs={userIXPs} />
            </Grid>
        </Grid>
    </>
}

export default Profile