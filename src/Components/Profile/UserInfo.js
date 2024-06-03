import { Avatar, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useStateValue } from '../../StateProvider'
import CirculerLoader from '../Loader'
import UserEditModal from './UserEditModal'

const UserInfo = ({ userInfo, setUserFetchedOnce }) => {
    const [{ user },] = useStateValue();
    const [editUserModalOpen, setEditUserModalOpen] = useState(false)
    const handleCloseModal = () => {
        setEditUserModalOpen(false)
        setUserFetchedOnce(false)
    }
    const editUserModal = () => {
        return <Modal
            open={editUserModalOpen}
            onClose={() => { setEditUserModalOpen(false) }}
        >
            <UserEditModal
                handleCloseModal={handleCloseModal}
                userInfo={userInfo}
            />
        </Modal>
    }

    return <div className="profilecard userinfo_div" >{
        !userInfo ? <CirculerLoader /> : <div>
            {/* <h2>Profile</h2> */}
            <Avatar src={user?.photoURL} style={{ width: "200px", height: "200px", marginBottom: "20px" }} />
            <div className="profilefields"><div style={{ width: "80px" }}>Name</div> {userInfo.firstName} {userInfo.lastName}</div>
            <div className="profilefields"><div style={{ width: "80px" }}>Email</div> {userInfo.email}</div>
            {/* <div className="profilefields"><div style={{ width: "80px" }}>LinkedIn</div> <a style={{ textDecoration: "none" }} target="_blank" href="https://www.linkedin.com/in/jatin-karla11/"><LinkedInIcon /></a></div> */}

            <button onClick={() => { setEditUserModalOpen(true) }} style={{ width: "100%", marginTop: "15px" }} className='btn btn-dark'>Edit</button>
            {editUserModal()}
        </div>
    }</div>
}
export default UserInfo