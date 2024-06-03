import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import "../../Styles/AddXP.css";
import api from "../../constants";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function AddXP() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [subject, setSubject] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [institutename, setInstitutename] = useState("");
  const [yop, setYop] = useState(2020);
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [fullname, setFullname] = useState("");
  const [pemail, setPemail] = useState("");
  const [opportunity, setOpportunity] = useState("on campus");
  const [links, setLinks] = useState([
    {
      linkname: "",
      linkurl: "",
    },
  ]);
  const [lp, setLp] = useState("");
  const [leveli, setLeveli] = useState(null);
  const [levela, setLevela] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // const [description, setDescription] = useState("");
  const [role, setRole] = useState("");

  const handleLink = (e, type) => {
    var index = parseInt(e.target.name);
    let arr = [...links];
    arr[index][type] = e.target.value;
    setLinks(arr);
  };

  const handleOpportunity = (event) => {
    setOpportunity(event.target.value);
  };

  const hS = (event) => {
    event.preventDefault();
    handleSubmit()
  };

  const editorRef = useRef(null);

  const handleSubmit = () => {

    fetch(`${api}ixp/addixp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyname: companyname,
        email: user?.email,
        description: editorRef.current.getContent(),
        role: role,
        institutename: institutename,
        yop: yop,
        course: course,
        branch: branch,
        fullname: fullname,
        pemail: pemail,
        opportunity: opportunity,
        links: links,
        lp: lp,
        leveli: leveli,
        levela: levela,
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
    alert(
      "Interview experience uploaded successfully, please wait for approval.."
    );
    history.push("/interview-experience");
  };

  return (
    <div className='bg'>
      <div className='addxpmaindiv'>
        <center>
          <h2 className='addxpmaindivheading' style={{ margin: "20px" }}>
            Add Your Interview Experience
          </h2>
        </center>
        <div className='addxpmaindivform'>
          <MDBContainer>
            <MDBRow className='cl1'>
              <MDBCol md='6' sm='12'>
                <form onSubmit={hS}>
                  <center>
                    <div>
                      You have to fill every field (links field is optional)
                    </div>
                  </center>

                  <br />
                  <div className='mb-3'>
                    <label class='form-label' for='fullname'>
                      Full name
                    </label>
                    <input
                      id='fullname'
                      name='fullname'
                      type='text'
                      required
                      class='form-control'
                      placeholder='Enter full name'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  {user == null ? (
                    <>
                      <div className='mb-3'>
                        <label class='form-label' for='email'>
                          Email
                        </label>
                        <input
                          id='email'
                          name='email'
                          type='email'
                          required
                          class='form-control'
                          placeholder="Enter email (we won't disclose your email to anyone)"
                          value={pemail}
                          onChange={(e) => setPemail(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className='mb-3'>
                    <label class='form-label' for='lp'>
                      LinkedIn Profile
                    </label>
                    <input
                      id='lp'
                      name='lp'
                      type='text'
                      // required
                      class='form-control'
                      placeholder='Enter linkedin profile url'
                      value={lp}
                      onChange={(e) => setLp(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='institutename'>
                      Institute name
                    </label>
                    <input
                      id='institutename'
                      name='institutename'
                      type='text'
                      required
                      class='form-control'
                      placeholder='Enter institute name'
                      value={institutename}
                      onChange={(e) => setInstitutename(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='yop'>
                      Graduation Year
                    </label>
                    <input
                      id='yop'
                      name='yop'
                      type='text'
                      required
                      class='form-control'
                      placeholder='Enter year of graduation'
                      value={yop}
                      onChange={(e) => setYop(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='course'>
                      Degree
                    </label>
                    <input
                      id='course'
                      name='course'
                      type='text'
                      required
                      class='form-control'
                      placeholder='e.g. - B.E. , B.tech. , MBA , etc'
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='branch'>
                      Branch / Major
                    </label>
                    <input
                      id='branch'
                      name='branch'
                      type='text'
                      required
                      class='form-control'
                      placeholder='e.g. - Computer Science, Information Technology, Mechanical , etc'
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='companyname'>
                      Company name
                    </label>
                    <input
                      id='companyname'
                      name='companyname'
                      type='text'
                      required
                      class='form-control'
                      placeholder='Enter company name'
                      value={companyname}
                      onChange={(e) => setCompanyname(e.target.value)}
                      list='companies'
                    />
                  </div>

                  <datalist id='companies'>
                    <option value='Amazon' />
                    <option value='Google' />
                    <option value='Infosys' />
                    <option value='ZS Associates' />
                    <option value='Groww' />
                    <option value='VMware' />
                    <option value='Wipro' />
                    <option value='Cognizant' />
                    <option value='Quantiphi' />
                    <option value='Credit Suisse' />
                    <option value='FactSet' />
                    <option value='Facebook' />
                    <option value='Avalara' />
                    <option value='Quest Global' />
                    <option value='Myntra' />
                    <option value='Persistent Systems' />
                    <option value='Capillary Technologies' />
                    <option value='LTI' />
                    <option value='Accenture' />
                    <option value='Yash Technologies' />
                    <option value='TCS' />
                    <option value='Fico' />
                    <option value='Adobe' />
                    <option value='Visa' />
                    <option value='Goldman Sachs' />
                    <option value='Cisco' />
                    <option value='Atlassian' />
                    <option value='Capgemini' />
                    <option value='Arista Network' />
                    <option value='Principal Global' />
                    <option value='Impetus' />
                    <option value='IBM' />
                    <option value='Samsung' />
                    <option value='App Dynamics' />
                    <option value='DBS Bank' />
                    <option value='Sprinklr' />
                    <option value='Incedo' />
                    <option value='Morgan Stanley' />
                    <option value='LinkedIn' />
                    <option value='Twitter' />
                    <option value='ShareChat' />
                    <option value='47Billion' />
                    <option value='Gammastack' />
                    <option value='BrowserStack' />
                    <option value='Cerium System' />
                    <option value='PwC' />
                    <option value='Deloitte' />
                    <option value='Salesforce' />
                    <option value='Intellicus' />
                    <option value='Paytm' />
                    <option value='Directi' />
                    <option value='PhonePe' />
                    <option value='Juspay' />
                    <option value='Razorpay' />
                    <option value='Upstox' />
                    <option value='InMobi' />
                    <option value='PayPal' />
                    <option value='Cognam' />
                    <option value='Metafic' />
                    <option value='Systango' />
                    <option value='Josh Software' />
                    <option value='Hexaview Technologies' />
                    <option value='Disney+Hotstar' />
                    <option value='Red Hat' />
                    <option value='Microsoft' />
                    <option value='Apple' />
                    <option value='Netflix' />
                    <option value='Optum' />
                    <option value='CRED' />
                    <option value='Intuit' />
                    <option value='Walmart' />
                    <option value='Rakuten' />
                    <option value='Bloomberg' />
                    <option value='Deqode' />
                    <option value='Persistent' />
                  </datalist>

                  <div className='mb-3'>
                    <label class='form-label' for='role'>
                      Role
                    </label>
                    <input
                      type='text'
                      name='role'
                      required
                      // className="slidedown_input"
                      class='form-control'
                      placeholder='Enter Role'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      list='roles'
                    />
                  </div>

                  <datalist id='roles'>
                    <option value='Software Development Engineer' />
                    <option value='SDE1' />
                    <option value='SDE2' />
                    <option value='SDE3' />
                    <option value='SDET' />
                    <option value='Software Developer' />
                    <option value='Member of Technical Staff' />
                    <option value='Business Analyst' />
                    <option value='Product Manager' />
                    <option value='Product Analyst' />
                    <option value='SRE' />
                    <option value='Software Engineer' />
                    <option value='System Engineer' />
                    <option value='Power Programmer' />
                    <option value='Intern' />
                    <option value='Technology Analyst' />
                    <option value='Business Technology Analyst' />
                    <option value='Graduate Trainee' />
                    <option value='Trainee Programmer' />
                    <option value='SDE' />
                    <option value='Associate Software Engineer' />
                    <option value='Associate Engineer' />
                  </datalist>

                  <FormLabel component='legend'>Opportunity</FormLabel>
                  <RadioGroup
                    aria-label='gender'
                    name='controlled-radio-buttons-group'
                    value={opportunity}
                    onChange={handleOpportunity}
                  >
                    <FormControlLabel
                      value='on campus'
                      control={<Radio />}
                      label='on campus'
                    />
                    <FormControlLabel
                      value='off campus'
                      control={<Radio />}
                      label='off campus'
                    />
                  </RadioGroup>

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
                      // placeholder="Enter the interview process in detail.."

                      init={{
                        height: 500,
                        placeholder:
                          "Enter your interview experience in detail..",

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
                  <div className='mb-3'>
                    <label class='form-label' for='links'>
                      Links to the questions asked
                    </label>
                    {links.map((link, idx) => {
                      return (
                        <MDBRow key={idx}>
                          <MDBCol md='6' sm='12'>
                            <input
                              id='linkname'
                              name={idx}
                              type='text'
                              class='form-control'
                              placeholder='enter the name of question'
                              value={link.linkname}
                              onChange={(e) => handleLink(e, "linkname")}
                            />
                          </MDBCol>
                          <MDBCol md='6' sm='12'>
                            <input
                              id='linkurl'
                              name={idx}
                              type='text'
                              class='form-control'
                              placeholder='enter the link of question'
                              value={link.linkurl}
                              onChange={(e) => handleLink(e, "linkurl")}
                            />
                          </MDBCol>
                          <div className='mb-3 d-flex justify-content-end'>
                            <button
                              className='btn btn-danger'
                              onClick={() => {
                                setLinks((pre) => {
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
                        // type="normal"
                        className='btn btn-primary'
                        onClick={() => {
                          setLinks((pre) => {
                            return [...pre, { linkname: "", linkurl: "" }];
                          });
                        }}
                      >
                        Add Question
                      </button>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='levela'>
                      Level of online assessment<br></br>
                      easy=1 -----2-----3-----4----- 5=hard
                    </label>
                    <input
                      id='levela'
                      name='levela'
                      type='text'
                      required
                      class='form-control'
                      placeholder='eg - 1 , 2 , 3 , 4 , 5'
                      value={levela}
                      onChange={(e) => setLevela(e.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label class='form-label' for='leveli'>
                      Overall level of interview process<br></br>
                      easy=1 -----2-----3-----4----- 5=hard
                    </label>
                    <input
                      id='leveli'
                      name='leveli'
                      type='text'
                      required
                      class='form-control'
                      placeholder='eg - 1 , 2 , 3 , 4 , 5'
                      value={leveli}
                      onChange={(e) => setLeveli(e.target.value)}
                    />
                  </div>

                  <div class='d-flex justify-content-center'>
                    <button
                      id='uplaodbutton'
                      type='submit'
                      // onClick={handleSubmit}
                      className='btn btn-warning'
                    >
                      Upload Interview Experience
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

export default AddXP;
