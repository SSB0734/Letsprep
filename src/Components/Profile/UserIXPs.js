import React from 'react'
import { useHistory } from 'react-router-dom'
import DisplayIxp from '../InterviewXP/DisplayIxp'
import CirculerLoader from '../Loader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const UserIXPs = ({ userIXPs }) => {
    const history = useHistory()
    return <div className="profilecard" >
        <center><h3>Contributed Interview Experiences</h3></center>
        {!userIXPs ? <CirculerLoader /> :
            userIXPs?.length === 0 ?
                <div style={{ textAlign: "center", margin: "30px" }}>
                    <AddCircleOutlineIcon onClick={() => history.push('add-interview-experience')} style={{ fontSize: "40px", cursor: "pointer" }} />
                    <div onClick={() => history.push('add-interview-experience')} style={{ cursor: "pointer" }}>Add Interview Experience</div>
                </div> :
                userIXPs.map((ixp, index) => <DisplayIxp
                    showApprovedOrNot={true}
                    showApproveButton={false}
                    id={ixp?._id}
                    desc={ixp.description}
                    role={ixp.role}
                    email={ixp.contributoremail}
                    iname={ixp.institutename}
                    lp={ixp.lp}
                    fullname={ixp.fullname}
                    yop={ixp.yop}
                    course={ixp.course}
                    branch={ixp.branch}
                    oprt={ixp.opportunity}
                    leveli={ixp.leveli}
                    levela={ixp.levela}
                    links={ixp.links}
                    approved={ixp.approved}
                    cmail={ixp.contibutoremail}
                />
                )
        }</div>
}

export default UserIXPs