import React, { useState, useEffect } from 'react'
import { Grid, Box, } from "@mui/material"
import { makeStyles } from '@mui/styles'
import Switch from '@mui/material/Switch';
import { TextField, Select, InputLabel, MenuItem, FormHelperText, FormControl } from '@mui/material';

import { PaperCard } from './ResourceCards';

import { getAllpaper } from './api';
import useWindowWidth from '../Hook/useWidth';

const useStyles = makeStyles({
    content: {
        width: "100%",
    },

    about: (width1) => {
        return {
            marginTop: 5,
            backgroundColor: "white",
            width: width1 < 700 && "90vw",
            position: width1 < 700 && "relative",
            left: width1 < 700 && "-10%"
        }
    },

    box: {

        textAlign: "center",
        marginBottom: 10
    }


});

function Papers({ show, userr }) {
    const [width,] = useWindowWidth()
    const classes = useStyles(width)
    const [subsearch, setsubsearch] = useState("")
    const [semsearch, setsemsearch] = useState("")
    const [examsearch, setexamsearch] = useState("")
    const [examyearsearch, setexamyearsearch] = useState("")
    const [branchsearch, setbranchsearch] = useState("")
    const [papers, setpapers] = useState([])
    const [verified, setVerifed] = useState(true)
    const fetchdata = async () => {
        const alldata = await getAllpaper(verified)
        setpapers(alldata.data)
    }
    useEffect(() => {
        fetchdata()
    }, [show, verified])
    return (
        <Box className={classes.content}>
            <Box className={classes.box}>
                <Grid container spacing={1} direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid item lg={2} md={6} sm={12} xs={12}>
                        <TextField style={{ width: "100%", borderRadius: 5, backgroundColor: "white" }} size='small' onChange={(e) => { setsubsearch(e.target.value) }} label="Subject" variant="outlined" />
                    </Grid>
                    <Grid item lg={2} md={6} sm={12} xs={12}>
                        <TextField type={"number"} style={{ width: "100%", borderRadius: 5, backgroundColor: "white" }} size='small' onChange={(e) => { setexamyearsearch(e.target.value) }} label="Exam year" variant="outlined" />
                    </Grid>
                    <Grid item lg={2} md={6} sm={12} xs={12}>
                        <select className="form-select" style={{ color: "grey" }}
                            aria-label="Default select example"
                            onChange={(e) => { setexamsearch(e.target.value) }} >
                            <option value="">exam</option>
                            <option value="mst1">mst1</option>
                            <option value="mst2">mst2</option>
                            <option value="mst3">mst3</option>
                            <option value='endsem'>endsem</option>
                        </select>
                    </Grid>
                    <Grid item lg={2} md={6} sm={12} xs={12}>
                        <select className="form-select" style={{ color: "grey" }} aria-label="Default select example" onChange={(e) => { setsemsearch(e.target.value) }}  >
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
                    <Grid item lg={2} md={12} sm={12} xs={12} >
                        <select className="form-select" style={{ color: "grey" }} aria-label="Default select example" name='branch' onChange={(e) => { setbranchsearch(e.target.value) }} >
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
                    {userr?.role === 'admin' && <Grid item lg={2} md={6} sm={12} xs={12}>
                        Verified<Switch checked={verified} onChange={e => { setVerifed(e.target.checked) }} />
                    </Grid>}
                </Grid>

            </Box>

            <Grid container spacing={3}>

                {papers.filter(val => {
                    console.log(val.exam.includes(examsearch));
                    console.log(val.exam);
                    console.log(examsearch);
                    if (examyearsearch === "" && subsearch === "" && examsearch === "" && semsearch === "" && branchsearch === "") {
                        return val
                    } else if (
                        val.year.toString().toLowerCase().includes(examyearsearch.toString().toLowerCase()) &&
                        val.branch.toLowerCase().includes(branchsearch.toLowerCase()) &&
                        val.subject.toLowerCase().includes(subsearch.toLowerCase()) &&
                        val.semester.toLowerCase().includes(semsearch.toLowerCase()) &&
                        (examsearch === "" || val.exam.includes(examsearch))
                    ) {
                        return val;
                    }
                }).map(item => {
                    return (
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <PaperCard key={item._id} paper={item} userr={userr} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box >
    )
}

export default Papers
