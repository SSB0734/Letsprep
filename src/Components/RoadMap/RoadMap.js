import React, { useEffect, useState } from 'react'
import { ALL_RAOD_MAPS } from './constants'
import '../../Styles/RoadMap/RoadMap.css'
import RoadMapDetails from './RoadMapDetails'
import useWindowWidth from '../Hook/useWidth'
import api from "../../constants";
import { Grid } from '@mui/material'

const RoadMap = () => {

    const [currectRoadMapId, setCurrentRoadMapId] = useState(Object.keys(ALL_RAOD_MAPS)[0])
    const [roadMapToShow, setRoadMapToShow] = useState(null)
    useEffect(() => {
        fetch(`${api}road-map/${currectRoadMapId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setRoadMapToShow(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])
    console.log(roadMapToShow);
    return <Grid container style={{ marginTop: "18px" }}>
        Comming Soon...
        {/* <Grid md={4} style={{ padding: "18px", width: "100%" }}>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "9px" }}>
                <h1>Available Road Maps</h1>
                <div style={{ padding: "18px" }}>
                    {Object.keys(ALL_RAOD_MAPS).map(nodeId => {
                        return <div className='roadMapCard'
                            style={{ background: nodeId === currectRoadMapId && "#ededeec9" }}
                            onClick={() => { setCurrentRoadMapId(nodeId); }}>
                            <div>{ALL_RAOD_MAPS[nodeId]?.title}</div>
                            <div>
                                <span style={{ color: "rgb(201 203 203)", margin: "0 8px" }}>|</span>
                                <span>{ALL_RAOD_MAPS[nodeId]?.steps?.length} </span>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </Grid>
        <Grid md={8} style={{ padding: "18px", width: "100%" }}>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <h3 style={{ padding: "18px" }}>Road Map: {currectRoadMapId}</h3>
                <div style={{ padding: "0px 18px" }}>
                    {roadMapToShow?.roadMap?.description}
                </div>
                {
                    roadMapToShow ?
                        <RoadMapDetails
                            id={currectRoadMapId}
                            items={roadMapToShow?.roadMap}
                            courses={roadMapToShow?.courseArrayMap} />
                        :
                        <div>Loading</div>
                }
            </div>
        </Grid> */}
    </Grid>

}

export default RoadMap