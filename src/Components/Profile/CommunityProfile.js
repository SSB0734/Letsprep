import { Modal } from '@mui/material'
import React, { useState } from 'react'
import CirculerLoader from '../Loader'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import UserCommunityEditModal from './UserCommunityEditModal'

const CommunityProfile = ({ userInfo, setUserFetchedOnce }) => {
    const [editUserModalOpen, setEditUserModalOpen] = useState(false)
    const handleCloseModal = () => {
        setEditUserModalOpen(false)
        setUserFetchedOnce(false)
    }
    const editUserCommunityModal = () => {
        return <Modal
            open={editUserModalOpen}
            onClose={() => { setEditUserModalOpen(false) }}
        >
            <UserCommunityEditModal
                handleCloseModal={handleCloseModal}
                userInfo={userInfo}
            />
        </Modal>
    }

    return <div className="profilecard userinfo_div" >{
        !userInfo ? <CirculerLoader /> : <div>
            <h4 style={{ textAlign: "center" }}>Profile Card</h4>
            <div className="profilefields"><div style={{ width: "120px" }}>User Name</div> {userInfo.contact}</div>
            <div className="profilefields"><div style={{ width: "120px" }}>Contact</div> {userInfo.contact}</div>
            <div className="profilefields"><div style={{ width: "120px" }}>LinkedIn</div> <a style={{ textDecoration: "none" }} target="_blank" href="https://www.linkedin.com/in/jatin-karla11/"><LinkedInIcon /></a></div>
            <div className="profilefields"><div style={{ width: "120px" }}>Technical skills</div> {userInfo.contact}</div>
            <div className="profilefields"><div style={{ width: "120px" }}>Branch/Section</div>  {userInfo.college}</div>
            <div className="profilefields"><div style={{ width: "120px" }}>College</div>  {userInfo.college}</div>
            <div className="profilefields"><div style={{ width: "120px" }}>Current Year</div>  {userInfo.college}</div>

            <button onClick={() => { setEditUserModalOpen(true) }} style={{ width: "100%", marginTop: "15px" }} className='btn btn-dark'>Edit</button>
            {editUserCommunityModal()}
        </div >
    }</div >
}
export default CommunityProfile