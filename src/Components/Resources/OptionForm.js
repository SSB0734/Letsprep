import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { TextareaAutosize, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { useState } from 'react';
import { sendBook, sendMaterial, sendPaper } from "./api"
import uploadFileAndGetURL from '../../Utils/upload-file';
import ReactSelect from 'react-select';
import { Redirect, useHistory } from 'react-router-dom';

const EXAMS_CONSTANTS = ["mst1", "mst2", "mst3", "endsem"]

const useStyles = makeStyles({
    container: {
        width: "100%",
        margin: 0,


    },
    select: {
        width: "50%",
        border: "1px solid #919294",
        borderRadius: 2,
        padding: "5px 5px",
        fontSize: 18,
        color: "#919294",
        "& > *": {
            fontSize: 20,
            color: "black",
        },

    },
    padding: {
        " & ,* ": { marginTop: 1, }
    },
    inputlabel: {
        width: "100%",
        color: "grey",
        paddingLeft: 6,
        fontSize: 15,
        fontWeight: "500"
    }
})

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function OptionForm({ handleClose, userr }) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0);
    const history = useHistory()
    const [fileToUpload, setFileToUpload] = useState("")
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // fields states 
    const initialbook = {
        name: "",
        author: "",
        subject: "",
        buylink: "",
        semester: "",
        img: "",
        des: "",
        branch: "",
        library: ""
    }
    const [book, setbook] = useState(initialbook)
    const handleBook = (e) => {
        setbook({
            ...book,
            [e.target.name]: e.target.value,
        })
    }
    //----------------------------------------------------------next--
    const initialMaterial = {
        subject: "",
        semester: "",
        link: "",
        img: "",
        branch: "",

    }
    const [material, setmaterial] = useState(initialMaterial)
    const handleMaterial = (e) => {
        setmaterial({
            ...material,
            [e.target.name]: e.target.value,
        })
    }
    //----------------------------------------------------------next--
    const initialPaper = {
        subject: "",
        semester: "",
        link: "",
        img: "",
        exam: [],
        branch: "",
        year: "",
    }
    const [paper, setpaper] = useState(initialPaper)
    const handlePaper = (e) => {
        setpaper({
            ...paper,
            [e.target.name]: e.target.value,
        })
    }
    function validateSize(input) {
        const fileSize = input.files[0].size / 1024 / 1024; // in MiB
        if (fileSize > 2) {
            alert('File size exceeds 2 MiB');
            // $(file).val(''); //for clearing with Jquery
        } else {
            // Proceed further
        }
    }
    const onChangeFile = async (e) => {
        const file = e.target.files[0]
        if (file?.size / 1024 / 1024 > 5) {
            alert('File size exceeds 5 MiB');
            setFileToUpload("")
            return
        }
        setFileToUpload(file)
    }
    const handleSendBook = async (book) => {
        try {
            if (book.library !== "" && book.name !== "" && book.author !== "" && book.subject !== "" && book.buylink !== "" && book.semester !== "" && book.img !== "" && book.des !== "" && book.branch !== "") {
                await sendBook(book);
                setbook(initialbook)
                handleClose();
            }
            else {
                alert("Fields cannot be empty")
            }
        }
        catch (err) {
            console.log("front end me error hai" + err)
        }

    }
    const handleSendMaterial = async (material) => {
        try {
            if (material.img !== "" && material.semester !== "" && material.link !== "" && material.subject !== "" && material.des !== "" && material.branch !== "") {
                material.link.replace("view?usp=sharing", "preview")
                await sendMaterial(material);
                setmaterial(initialMaterial)
                handleClose();
            }
            else {
                alert("Fields cannot be empty")
            }
        }
        catch (err) {
            console.log("front end me error hai" + err)
        }
    }
    const handleSendPaper = async (paper) => {
        let date = new Date()
        let year = date.getFullYear()
        try {
            if (paper.semester !== "" && fileToUpload?.name !== "" && paper.subject !== "" && paper.exam !== ""
                && paper.branch !== "" && paper.year !== "") {
                if (paper.year >= 2010 && paper.year <= year) {
                    paper.link = await uploadFileAndGetURL(fileToUpload,
                        paper.subject + "-" + paper.year + "-sem-" + paper.semester + "-" + paper.branch + paper.exam.join("-")
                    )
                    await sendPaper(paper);
                    setpaper(initialPaper)
                    handleClose();
                }
                else {
                    alert(`select year between 2010 to ${year} `)
                }
            } else {
                alert("Fields cannot be empty")
            }
        }
        catch (err) { console.log("front end me error hai" + err) }
    }
    return (
        <Box container className={classes.container}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Papers" {...a11yProps(2)} />
                    <Tab label="Study Material" {...a11yProps(1)} />
                    <Tab label="Books" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={2}>
                <Box>
                    <h5 style={{ textAlign: "center", marginTop: "40px" }}>Comming soon..</h5>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box>
                    <h5 style={{ textAlign: "center", marginTop: "40px" }}>Comming soon..</h5>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={0}>
                <Box>
                    {!userr ? <h5 style={{ textAlign: "center", marginTop: "40px" }}>
                        <div>Please login to contribute...</div>
                        <br></br>
                        <button
                            style={{ padding: "3px 5px", background: "#101010", color: "white" }}
                            onClick={() => {
                                history.push("/signup")
                            }}>Login</button>
                    </h5> : <form >
                        <Grid container className={classes.padding}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField onChange={(e) => handlePaper(e)} name="subject" label="Subject" style={{ width: "100%", marginTop: "8px" }} variant="outlined" />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField type='number' onChange={(e) => handlePaper(e)} name="year" label="Year of Examination" style={{ width: "100%", marginTop: "8px" }} variant="outlined" />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <select style={{
                                    color: "grey",
                                    marginTop: 5,
                                }} className={`form-select`} name='semester' onChange={(e) => handlePaper(e)} >
                                    <option value="">Semester</option>
                                    <option value="one">1</option>
                                    <option value="two">2</option>
                                    <option value="three">3</option>
                                    <option value="four">4</option>
                                    <option value="five">5</option>
                                    <option value="six">6</option>
                                    <option value="seven">7</option>
                                    <option value='eight'>8</option>
                                </select>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <select style={{
                                    color: "grey",
                                    marginTop: 5,
                                }} name='branch' className={`form-select`} onChange={(e) => handlePaper(e)} >
                                    <option value="">Branch</option>
                                    <option value="All">All</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Electronics And Telecommunication">Electronics And Telecommunication</option>
                                    <option value="Electronics And Instrumentation">Electronics And Instrumentation</option>
                                    <option value="Civil">Civil</option>
                                    <option value="Mechanical">Mechanical</option>
                                </select>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <ReactSelect isMulti
                                    onChange={(event) => {
                                        setpaper({ ...paper, exam: event?.map(v => v.value) })
                                    }}
                                    value={paper.exam.map(cat => { return { label: cat, value: cat } })}
                                    options={EXAMS_CONSTANTS.map(option => { return { label: option, value: option } })} />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <input style={{
                                    color: "grey",
                                    marginTop: 5,
                                }} accept="image/*, application/pdf"
                                    type="file" id="myFile"
                                    name="filename" multiple={false} onChange={onChangeFile} />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Button onClick={() => {
                                    handleSendPaper(paper)
                                }} style={{ marginTop: 5 }} type="button"
                                    variant="contained" color="primary" >Submit</Button>
                            </Grid>
                        </Grid>
                    </form>}
                </Box>
            </TabPanel>
        </Box>
    );
}