import { useState } from "react";
import ReactDOM from "react-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../../Styles/AddCourse.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import api from "../../constants";
import Select from 'react-select'
import { OPTIONS_FOR_COURSE_CATEGORY_FILTER } from "./CategoryConstants";

function AddCourse() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [courseid, setCourseid] = useState(Number);
  const [coursename, setCoursename] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnaillink, setThumbnaillink] = useState("");
  const [category, setCategory] = useState([]);

  const [videos, setVideos] = useState([
    {
      videoindex: 0,
      videonum: "",
      videoname: "",
      videolink: "",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}course/addcourse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        courseid: courseid,
        coursename: coursename,
        instructor: instructor,
        description: description,
        thumbnaillink: thumbnaillink,
        videos: videos,
        category: category.map(c => c.value),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // do what you want with the response here
        //console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    history.push("/");
  };
  const handleVideo = (e, type) => {
    var index = parseInt(e.target.name);
    let arr = [...videos];
    arr[index][type] = e.target.value;
    setVideos(arr);
  };

  const hS = (event) => {
    event.preventDefault();
  };

  const admins = ["letsprep.ajs@gmail.com", "earthboxer@gmail.com"];
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
  return (
    <>
      {admins.includes(user?.email) ? (
        <>
          <MDBContainer>
            <MDBRow className='cl1'>
              <MDBCol md='6' sm='12'>
                <form onSubmit={hS}>
                  <br />
                  <div className='mb-3'>
                    <label class='form-label' for='courseid'>
                      Course Id:
                    </label>
                    <input
                      id='courseid'
                      name='courseid'
                      type='text'
                      class='form-control'
                      placeholder='Enter Course Id'
                      value={courseid}
                      onChange={(e) => setCourseid(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label class='form-label' for='courseName'>
                      Course name:
                    </label>
                    <input
                      id='coursename'
                      name='coursename'
                      type='text'
                      class='form-control'
                      placeholder='Enter course name'
                      value={coursename}
                      onChange={(e) => setCoursename(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label class='form-label' for='instructor'>
                      Instructor
                    </label>
                    <input
                      id='instructor'
                      name='instructor'
                      class='form-control'
                      placeholder='Enter Instructor Name'
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                    ></input>
                  </div>
                  <div className='mb-3'>
                    <label class='form-label' for='instructor'>
                      Categories
                    </label>
                    <Select styles={customStyles} isMulti
                      onChange={(e) => { setCategory(e.map(v => { return v.value })) }}
                      value={category.map(cat => { return { label: cat, value: cat } })}
                      options={OPTIONS_FOR_COURSE_CATEGORY_FILTER.map(option => { return { label: option, value: option } })} />
                  </div>
                  <div className='mb-3'>
                    <label class='form-label' for='description'>
                      Description
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      class='form-control'
                      placeholder='Enter course description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='mb-3'>
                    <label class='form-label' for='thumbnaillink'>
                      Thumbnail link
                    </label>
                    <input
                      id='thumbnaillink'
                      name='thumbnaillink'
                      class='form-control'
                      placeholder='Enter thumbnail link'
                      value={thumbnaillink}
                      onChange={(e) => setThumbnaillink(e.target.value)}
                    ></input>
                  </div>
                  {videos.map((video, idx) => {
                    return (
                      <MDBRow key={idx}>
                        <MDBCol md='2' sm='12'>
                          <div className='mb-3'>
                            <label class='form-label' for='videoindex'>
                              Index:
                            </label>
                            <input
                              id='videoindex'
                              name={idx}
                              type='number'
                              class='form-control'
                              placeholder='Enter video index'
                              value={video.videoindex}
                              onChange={(e) => handleVideo(e, "videoindex")}
                            />
                          </div>
                        </MDBCol>
                        <MDBCol md='2' sm='12'>
                          <div className='mb-3'>
                            <label class='form-label' for='videonum'>
                              Lesson:
                            </label>
                            <input
                              id='videonum'
                              name={idx}
                              type='text'
                              class='form-control'
                              placeholder='Enter video number'
                              value={video.videonum}
                              onChange={(e) => handleVideo(e, "videonum")}
                            />
                          </div>
                        </MDBCol>
                        <MDBCol md='4' sm='12'>
                          <div className='mb-3'>
                            <label class='form-label' for='videoname'>
                              Video name:
                            </label>
                            <input
                              id='videoname'
                              name={idx}
                              type='text'
                              class='form-control'
                              placeholder='Enter video name'
                              value={video.videoname}
                              onChange={(e) => handleVideo(e, "videoname")}
                            />
                          </div>
                        </MDBCol>
                        <MDBCol md='4' sm='12'>
                          <div className='mb-3'>
                            <label class='form-label' for='courseName'>
                              Video link:
                            </label>
                            <input
                              id='videolink'
                              name={idx}
                              type='text'
                              class='form-control'
                              placeholder='Enter video link'
                              value={video.videolink}
                              onChange={(e) => handleVideo(e, "videolink")}
                            />
                          </div>
                        </MDBCol>
                        <div className='mb-3 d-flex justify-content-end'>
                          <button
                            className='btn btn-danger'
                            onClick={() => {
                              setVideos((pre) => {
                                return pre.filter((ele, idxx) => {
                                  return idxx != idx;
                                });
                              });
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </MDBRow>
                    );
                  })}
                  <div class='d-flex justify-content-center mb-3'>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        setVideos((pre) => {
                          return [
                            ...pre,
                            { videonum: "", videoname: "", videolink: "" },
                          ];
                        });
                      }}
                    >
                      Add Video
                    </button>
                  </div>

                  <div class='d-flex justify-content-center'>
                    <button
                      id='uplaodbutton'
                      type='submit'
                      onClick={handleSubmit}
                      className='btn btn-warning'
                    >
                      Upload Course
                    </button>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default AddCourse;
