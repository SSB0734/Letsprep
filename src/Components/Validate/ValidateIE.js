import React, { useEffect, useState } from 'react'
import api from '../../constants';
import DisplayIxp from '../InterviewXP/DisplayIxp';

const ValidateIE = () => {
    const [ixps, setIxps] = useState([]);
    const [loading, setLoading] = useState(true);
    const displayIxps = () => {
        fetch(`${api}ixp/validate`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setIxps(data);
                setLoading(false);
            });
    };
    const onClickApproveButton = (ixpId) => {
        setLoading(true)
        fetch(`${api}ixp/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: ixpId }),
        })
            .then((response) => {
                displayIxps();
            })
    }
    useEffect(() => {
        displayIxps()
    }, [])
    return <div>
        {loading ? <div>Loading...</div> : !ixps.length ? <div>No IXP to approve</div> : ixps.map((ixp, index) => <DisplayIxp
            showApproveButton={true}
            onClickApproveButton={onClickApproveButton}
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
            cmail={ixp.contibutoremail}
        />)}

    </div>
}
export default ValidateIE