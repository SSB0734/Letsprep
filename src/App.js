import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar.js";
import { UpdateFcmToken } from './Utils'
import {
  Switch,
  Route,
  Redirect,
  Link,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
import Home from "./Components/Home/Home.js";
import About from "./Components/About/About.js";
import Courses from "./Components/Courses/Courses.js";
import InterviewXP from "./Components/InterviewXP/InterviewXP.js";
import Blogs from "./Components/Blogs/Blogs.js";
import SignUp from "./Components/SignUp/SignUp.js";
// import './App.css';
import { auth, getFCMToken } from "./firebaseApp.js";
import { useStateValue } from "./StateProvider";
import AddCourse from "./Components/Courses/AddCourse.js";
import EditCourse from "./Components/Courses/EditCourse";
import CourseDetails from "./Components/Courses/CourseDetails.js";
import CourseVideo from "./Components/Courses/CourseVideo.js";
import AddXP from "./Components/InterviewXP/AddXP.js";
import ReadMoreXP from "./Components/InterviewXP/ReadMoreXP.js";
import ForgotPassword from "./Components/SignUp/ForgotPassword.js";
import JobOpenings from "./Components/JobOpenings/JobOpenings.js";
import Community from "./Components/Community/Community.js";
import AddBlog from "./Components/Blogs/addBlog.js";
import Addjo from "./Components/JobOpenings/Addjo.js";
import ValidateJob from "./Components/Validate/ValidateJob.js";
import ValidateIE from "./Components/Validate/ValidateIE.js";
import api from "./constants.js";
import firebase from "firebase";
import Profile from "./Components/Profile/Profile.js";
import RoadMap from "./Components/RoadMap/RoadMap";
import Resources from "./Components/Resources/Resources";

const actionCodeSettings = {
  url: 'http://localhost:3000',
  handleCodeInApp: true,
};

function App() {
  const [{ user }, dispatch] = useStateValue();
  // const location = useLocation();
  // const params=useParams();
  const history = useHistory();



  useEffect(() => {
    if ('Notification' in window) {
      Notification?.requestPermission(function (permission) {
        if ('permissions' in navigator) {
          navigator?.permissions?.query({
            name: 'notifications'
          }).then(function (notificationPerm) {
            notificationPerm.onchange = function () {
              if (notificationPerm.state === 'granted') { getFCMToken() }
              if (notificationPerm.state === 'denied') {
                localStorage.removeItem("LETS_PREP_DEVICE_ID")
                UpdateFcmToken(auth?.currentUser?.email)
              }
            };
          });
        }
      });
    }
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //The user just logged in/the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        UpdateFcmToken(authUser.email)
        // console.log("The user is email verification >>> ", authUser.emailVerified);
        localStorage.setItem("email", authUser.email);
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
        localStorage.clear();
        // history.push("/");
      }
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/road-map' component={RoadMap} />
          <Route exact path='/courses' component={Courses} />
          <Route exact path='/interview-experience' component={InterviewXP} />
          <Route exact path='/blogs' component={Blogs} />
          <Route exact path='/SignUp' component={SignUp} />
          <Route exact path='/addcourse' component={AddCourse} />
          <Route exact path='/editcourse/:courseIdFromParams' component={EditCourse} />
          <Route exact path='/coursedetail/:value' component={CourseDetails} />
          <Route exact path='/coursevideo/:valueone' component={CourseVideo} />
          <Route exact path='/add-interview-experience' component={AddXP} />
          <Route exact path='/readmorexp' component={ReadMoreXP} />
          <Route exact path='/fp' component={ForgotPassword} />
          <Route exact path='/job-openings' component={JobOpenings} />
          <Route exact path='/community' component={Community} />
          <Route exact path='/addblog' component={AddBlog} />
          <Route exact path='/add-job-openings' component={Addjo} />
          <Route exact path='/validate-job' component={ValidateJob} />
          <Route exact path='/validate-ie' component={ValidateIE} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/resources' component={Resources} />
          <Redirect to='/' />
        </Switch>
      </header>
    </div>
  );
}

export default App;
