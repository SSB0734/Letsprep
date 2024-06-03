import React, { useState, useEffect } from 'react'
import { Grid, Box, } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { TextField } from '@mui/material';
import { StudyMaterialCard } from './ResourceCards';
import { getAllmaterial } from './api';
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
        marginBottom:10
    }

});

function StudyMaterial({ show }) {
    const [width,] = useWindowWidth()
    const classes = useStyles(width)
    const [sub, setsub] = useState("")
    const [semsearch, setsemsearch] = useState("")
    const [branchsearch, setbranchsearch] = useState("")
    const [allmaterial, setallmaterial] = useState([])
    const fetchdata = async () => {
        const alldata = await getAllmaterial()
        setallmaterial(alldata.data)
    }
    useEffect(() => {
        fetchdata()
    }, [show])

    return (
        <Box className={classes.container}>
            <Box className={classes.box} direction="row"
                    alignItems="center"
                    justifyContent="center">
                <Grid container spacing={1} direction="row"
                alignItems="center"
                justifyContent="center" >
                    <Grid item lg={2} md={2} sm={12} xs={12} >
                        <TextField style={{ width: "100%", borderRadius: 5, backgroundColor: "white" }} size='small' onChange={(e) => { setsub(e.target.value) }} label="Subject " variant="outlined" />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12} >
                        <select className="form-select" style={{color :"grey"}} onChange={(e) => { setsemsearch(e.target.value) }} >
                            <option value="" >Semester</option>
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
                    <Grid item lg={2} md={2} sm={12} xs={12} >
                        <select className="form-select" style={{color :"grey"}} name='branch' onChange={(e) => { setbranchsearch(e.target.value) }} >
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


                </Grid>


            </Box>
            <Grid  container spacing={3}>

                {allmaterial.filter(val => {
                    if (sub === "" && semsearch === "" && branchsearch === "") {
                        return val;
                    }
                    else if (val.branch.toLowerCase().includes(branchsearch.toLowerCase()) && val.subject.toLowerCase().includes(sub.toLowerCase()) && val.semester.toLowerCase().includes(semsearch.toLowerCase())) {
                        return val
                    }
                }).map(item => {
                    return (
                        <Grid className={classes.grid_item} item lg={3} md={2} sm={6} xs={12}>
                                <StudyMaterialCard key={item._id} study={item} />
                        </Grid>
                    )
                })}


            </Grid>

        </Box >
    )
}

export default StudyMaterial
