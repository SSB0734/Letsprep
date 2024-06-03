import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import api from '../../constants';
import CirculerLoader from '../Loader';
import { FORM_FIELDS } from './constant';
import useWindowWidth from "../Hook/useWidth";
import CloseIcon from '@mui/icons-material/Close';

const style = (isDesktop) => {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isDesktop ? "70%" : "100%",
        height: isDesktop ? null : "100%",
        // maxwidth: 1000,
        background: "white",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
};

const UserEditModal = ({ userInfo, handleCloseModal }) => {

    const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo })
    const [, isDesktop] = useWindowWidth()
    const [loading, setLoading] = useState(false)
    const handleFormChange = (key, value) => {
        setUpdatedUserInfo({
            ...updatedUserInfo,
            [key]: value
        })
    }
    const submitForm = (e) => {
        e?.preventDefault()
        setLoading(true)
        fetch(`${api}user/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...updatedUserInfo }),
        }).then(() => {
            handleCloseModal()
        }).catch(() => {
            handleCloseModal()
        })
    }
    return <Box sx={style(isDesktop)} >
        <Typography id="modal-modal-title" variant="h4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} component="h2">
            <div>Edit User Profile</div><div onClick={handleCloseModal} style={{ cursor: "pointer" }} ><CloseIcon fontSize='large' /></div>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form id="myform" onSubmit={submitForm}>
                <Grid container spacing={2}>
                    {
                        FORM_FIELDS.map((formField) => {
                            var value = updatedUserInfo[formField?.name]
                            return <Grid item xs={formField?.xs ? formField?.xs : 12} >
                                <TextField
                                    onChangeCapture={(e) => { handleFormChange(formField?.name, e?.target?.value) }}
                                    style={{ width: "100%" }}
                                    focused
                                    label={formField?.lable}
                                    value={value}
                                    required={formField?.required}
                                    disabled={formField?.disabled}
                                />
                            </Grid>
                        })
                    }
                </Grid>
            </form>
            {loading ? <CirculerLoader /> :
                <div style={{ textAlign: "center", margin: "24px" }}>
                    <Button variant="outlined" type="submit" form="myform" >
                        Submit
                    </Button>
                </div>
            }
        </Typography>
    </Box >
}
export default UserEditModal