import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import "../../Styles/AddXP.css";
import api from "../../constants";
import Select from "react-dropdown-select";

function AddBlog() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [blogtitle, setBlogtitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [values, setValues] = useState("");

  const hS = (event) => {
    event.preventDefault();
  };

  const editorRef = useRef(null);
  const log = () => { };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editorRef.current) {
      // alert(editorRef.current.getContent());
      // setDescription(editorRef.current.getContent());
    }
    // alert(`user ${user.email}`);
    // fetch("https://letsprep-backend.herokuapp.com/addixp", {
    fetch(`${api}addblog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogtitle: blogtitle,
        email: user.email,
        description: editorRef.current.getContent(),
        role: role,
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
  const options = [
    {
      id: "c4fcc02b-c0fe-4350-98e7-2e20a216e6a9",
      name: "Ottilie Pouros",
      username: "Roman.Schumm",
      email: "Grover20@yahoo.com",
      address: {
        street: "Lubowitz Passage",
        suite: 97296,
        city: "Georgeborough",
        zipcode: "50771",
        geo: {
          lat: "30.7419",
          lng: "-38.5250",
        },
      },
      phone: "837-407-1228 x93690",
      website: "jessika.name",
      company: {
        name: "Kilback - Mann",
        catchPhrase: "Ergonomic well-modulated hardware",
        bs: "seamless cultivate deliverables",
      },
    },
    {
      id: "d47c91b9-5a74-4839-b1ca-be56d0e03bed",
      name: "Jamie Ledner",
      username: "Josefina3",
      email: "Delpha.Quigley34@gmail.com",
      address: {
        street: "McClure Path",
        suite: 14130,
        city: "West Dameon",
        zipcode: "37933",
        geo: {
          lat: "45.1467",
          lng: "25.2470",
        },
      },
      phone: "1-599-274-3715 x14458",
      website: "oda.org",
      company: {
        name: "Satterfield - Miller",
        catchPhrase: "Visionary foreground knowledge base",
        bs: "leading-edge repurpose content",
      },
    },
    {
      id: "0458f96f-5961-48b5-9eac-ff369f777f8a",
      name: "Danny Abbott",
      username: "Kyra.Halvorson75",
      email: "Cara.Gislason67@yahoo.com",
      address: {
        street: "Antonina Villages",
        suite: 77028,
        city: "Caliberg",
        zipcode: "32164-0467",
        geo: {
          lat: "70.3097",
          lng: "56.4890",
        },
      },
      phone: "739.319.5293 x69152",
      website: "mohammed.com",
      company: {
        name: "Weber - Witting",
        catchPhrase: "Customer-focused zero administration middleware",
        bs: "extensible implement web-readiness",
      },
    },
  ];
  return (
    <div className='bg'>
      <div className='addxpmaindiv' style={{ marginTop: "20px" }}>
        <center>
          <h2 className='addxpmaindivheading'>Add Your Blog</h2>
        </center>
        <div className='addxpmaindivform'>
          <MDBContainer>
            <MDBRow className='cl1'>
              <MDBCol md='6' sm='12'>
                <form onSubmit={hS}>
                  <br />

                  <div className='mb-3'>
                    <label class='form-label' for='companyname'>
                      Blog Title:
                    </label>
                    <input
                      id='companyname'
                      name='companyname'
                      type='text'
                      class='form-control'
                      placeholder='Enter Blog Title'
                      value={blogtitle}
                      onChange={(e) => setBlogtitle(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='category'>
                      Category
                    </label>
                    <input
                      id='role'
                      name='role'
                      class='form-control'
                      placeholder='Enter Role'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    ></input>
                    <Select
                      options={options}
                      values={values}
                      onChange={(values) => setValues(values)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='description'>
                      Description
                    </label>
                    {/* <textarea
                    id="description"
                    name="description"
                    class="form-control"
                    placeholder="Enter company description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea> */}
                    <Editor
                      apiKey='zwx8zn2r8btbnst76ddgyqfdbw0o3swhopvxnz4ajbtd6sty'
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue='<p>This is the initial content of the editor.</p>'
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>

                  <div class='d-flex justify-content-center'>
                    <button
                      id='uplaodbutton'
                      type='submit'
                      onClick={handleSubmit}
                      className='btn btn-warning'
                    >
                      Upload Blog
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

export default AddBlog;
