import React from 'react'
import useWindowWidth from '../Hook/useWidth';
import Cards from '../Cards/Cards'
import { Grid, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Link } from 'react-router-dom';

const RoadMapDetails = ({ items = {}, courses = {} }) => {
    const [, isDesktop] = useWindowWidth()
    const stepConstructor = (step, index) => {
        console.log(index !== items?.steps?.length - 1);
        return <TimelineItem>
            <TimelineOppositeContent style={{ flex: 0, padding: "0px" }} />
            <TimelineSeparator>
                <TimelineDot color="grey" variant="outlined">
                    <LaptopMacIcon />
                </TimelineDot>
                {index !== items?.steps?.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
                <MuiAccordion style={{ width: "100%" }}>
                    <MuiAccordionSummary style={{ width: "100%" }}>
                        <Typography fontWeight={700}>{step?.title}</Typography>
                    </MuiAccordionSummary>
                    <MuiAccordionDetails>
                        <div style={{ width: "100%" }}>
                            <div>{step?.description}</div>
                            <div>
                                {step?.courseMapped?.length > 0 && <h5>Courses:-</h5>}
                                <Grid container justifyContent="space-around" >
                                    {
                                        step?.courseMapped?.map(courseId => {
                                            const courseToDisplay = courses[courseId]
                                            if (courseToDisplay) {
                                                return <Grid sm={5} xs={12} style={{ minWidth: "200px", maxWidth: "280px" }}>
                                                    {
                                                        isDesktop ?
                                                            <Cards
                                                                link={courseToDisplay?.thumbnaillink}
                                                                name={courseToDisplay?.coursename}
                                                                instructor={courseToDisplay?.instructor}
                                                                desc={courseToDisplay.description}
                                                                id={courseToDisplay?.courseid}
                                                            /> : <Link to={`/coursedetail/${courseToDisplay?.courseid}`}>
                                                                {courseToDisplay?.coursename}
                                                            </Link>
                                                    }
                                                </Grid>
                                            }
                                            return null
                                        })
                                    }
                                </Grid>
                            </div>
                        </div>
                    </MuiAccordionDetails>
                </MuiAccordion>
            </TimelineContent>
        </TimelineItem>
    }
    const itemsConstructor = () => {
        return items?.steps?.map((step, index) => {
            return stepConstructor(step, index)
        })
    }
    return <div style={{ width: "100%" }}>
        <Timeline position="right">
            {itemsConstructor()}
        </Timeline>
    </div>
}

export default RoadMapDetails