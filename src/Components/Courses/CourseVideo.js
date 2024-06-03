import React, { useState, useEffect } from "react";
import "../../Styles/CourseVideo.css";
import { useStateValue } from "../../StateProvider";
import { useHistory, useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactPlayer from "react-player";
import api from "../../constants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "black",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  background: "gray",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function CourseVideo(props) {
  const [{ user },] = useStateValue();
  const [tfstate, setTfstate] = useState(false);
  const [userr, setUserr] = useState(null);
  const [course, setCourse] = useState(null);
  const [arrayy, setArrayy] = useState([]);
  const history = useHistory();
  const [video, setVideo] = useState(null);
  const [presentIndex, setpresentIndex] = useState(0);
  const params = useParams();
  const [presentVideoName, setpresentVideoName] = useState("LetsPrep!");
  console.log(video);
  const setLatestCompleteVideo = () => {
    if (userr && arrayy.length > 0) {
      const videosCompletedByUser = userr?.courses?.find(course => course?.courseid == params.valueone)?.videocompleted
      var latestCompleteVideo = 0
      var latestPresentIndex = 0
      arrayy.forEach(arrayyItems => {
        arrayyItems?.forEach(arrayyItemsItem => {
          if (videosCompletedByUser.some(videoIdCompletedByUser => videoIdCompletedByUser == arrayyItemsItem[2])) {
            latestCompleteVideo = arrayyItemsItem[1]
            latestPresentIndex = arrayyItemsItem[2]
          }
        })
      });
      setpresentIndex(latestPresentIndex)
      setVideo(latestCompleteVideo)
    }
  }
  useEffect(() => {
    if (!video) {
      setLatestCompleteVideo()
    }
  }, [arrayy, userr])
  useEffect(() => {
    var abc = document.getElementById("mainmainnavbar");
    if (params.valueone && params.valueone != undefined) {
      abc.style.display = "none";
    }
    return () => {
      abc.style.display = "block";
    };
  }, []);
  useEffect(() => {
    const displayCourse = () => {
      fetch(`${api}course/getcourse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          courseid: props.match.params.valueone,
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
            setLatestCompleteVideo(arrayy, data[0])
            setUserr(data[0]);
          });
      }
    };

    displayCourse();
    bringUser();
  }, [tfstate]);
  var videosarr = [];
  const [newvideos, setnewvideos] = useState([]);
  const myFunction = (course) => {
    if (course) {
      videosarr = course[0].videos;
      setLatestCompleteVideo(videosarr, userr)
      setnewvideos(videosarr);
      videosarr.forEach((video) => {
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
      arr[video.videonum].push([
        video.videoname,
        video.videolink,
        video.videoindex,
      ]);
    } else {
      arr[video.videonum] = [];
      arr[video.videonum].push([
        video.videoname,
        video.videolink,
        video.videoindex,
      ]);
    }
  };

  const handleclick = (linkarray) => {
    setpresentIndex(linkarray[2]);
    setVideo(newvideos[linkarray[2]].videolink);
    setpresentVideoName(newvideos[linkarray[2]].videoname);
  };

  const handlePrev = () => {
    var pii = parseInt(presentIndex) - 1;
    setpresentIndex(pii);
    setVideo(newvideos[pii].videolink);
    setpresentVideoName(newvideos[pii].videoname);
  };
  const handleNext = () => {
    var pi = parseInt(presentIndex) + 1;
    setpresentIndex(pi);
    setVideo(newvideos[pi].videolink);
    setpresentVideoName(newvideos[pi].videoname);
  };
  const handleMac = () => {
    fetch(`${api}course/mac`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user?.email,
        courseid: props.match.params.valueone,
        index: parseInt(presentIndex),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (tfstate) {
          setTfstate(false);
        } else {
          setTfstate(true);
        }
      });
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant='h6' noWrap component='div'>
              {presentVideoName}
            </Typography>
            <div className='videoplayerbuttons'>
              {video ? (
                <>
                  <div className='videoplayerbuttonsdiv1'>
                    {presentIndex > 0 ? (
                      <button onClick={handlePrev} className='prevbutton'>
                        Prev
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className='videoplayerbuttonsdiv2'>
                    {userr?.courses?.find((obj) => {
                      if (obj.courseid === props.match.params.valueone) {
                        return !obj.videocompleted.includes(
                          parseInt(presentIndex)
                        );
                      }
                    }) ? (
                      <button onClick={handleMac} className='macbutton'>
                        Mark as Completed
                      </button>
                    ) : (
                      <button disabled className='cbutton'>
                        Completed
                      </button>
                    )}
                    {newvideos.length - 1 > presentIndex ? (
                      <button onClick={handleNext} className='nextbutton'>
                        Next
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{ color: "white", background: "black" }}
        className='mainmaindrawer'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <div className='titlediv' style={{ width: "100%" }}>
            <div
              className=''
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                style={{ cursor: "pointer", margin: "auto" }}
                onClick={() => history.goBack()}
              >
                <ArrowBack />
              </div>
              <div style={{ margin: "auto" }}>
                {course && course[0].coursename}
              </div>
              <div>
                <IconButton
                  style={{ color: "white" }}
                  onClick={handleDrawerClose}
                >
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
            </div>
          </div>
        </DrawerHeader>

        <div className='videosdiv'>
          {arrayy ? (
            <div className='cvideocl2 ' style={{ maxHeight: "80vh" }}>
              {arrayy.map((items, index) => (
                <Accordion defaultExpanded={!Boolean(index)}>
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
                      return <div className='taplink' onClick={() => { handleclick(items[indexI]); }}>
                        {
                          userr?.courses?.find(course => course?.courseid == params.valueone)?.videocompleted?.some(completeVideoId => completeVideoId == itemsI[2]) ?
                            <CheckCircleOutlineIcon fontSize="inherit" style={{ color: "green" }} />
                            :
                            <RadioButtonUncheckedIcon fontSize="inherit" />
                        }
                        {/* <div>{itemsI[0]}</div> */}
                        <span>
                          &nbsp;{itemsI[0]}
                        </span>
                      </div>
                    })}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>

        <Divider />

        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div style={{ height: "100%", background: "black" }}>
          <div className='videoPlayerMainDiv'>
            <ReactPlayer
              url={video}
              height='100%'
              width='100%'
              controls={true}
            />
          </div>
        </div>
        <div className='videoplayerbuttonsmobile'>
          {video ? (
            <>
              <div className='videoplayerbuttonsdiv1'>
                {presentIndex > 0 ? (
                  <>
                    <button onClick={handlePrev} className='prevbutton'>
                      Prev
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className='videoplayerbuttonsdiv2'>
                {userr?.courses?.find((obj) => {
                  if (obj.courseid === props.match.params.valueone) {
                    return !obj.videocompleted.includes(parseInt(presentIndex));
                  }
                }) ? (
                  <button onClick={handleMac} className='macbutton'>
                    Mark as Completed
                  </button>
                ) : (
                  <>
                    <button disabled className='cbutton'>
                      Completed
                    </button>
                  </>
                )}
                {newvideos.length - 1 > presentIndex ? (
                  <button onClick={handleNext} className='nextbutton'>
                    Next
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Main>
    </Box>
  );
}

export default CourseVideo;
