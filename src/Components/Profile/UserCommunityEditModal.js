import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import api from '../../constants';
import CirculerLoader from '../Loader';
import { FORM_FIELDS_EDIT_COMMUNITY } from './constant';
import useWindowWidth from "../Hook/useWidth";
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select'
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

const UserCommunityEditModal = ({ userInfo, handleCloseModal }) => {

    const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo })
    const [, isDesktop] = useWindowWidth()
    const [loading, setLoading] = useState(false)
    const handleFormChange = (key, value) => {
        setUpdatedUserInfo({
            ...updatedUserInfo,
            [key]: value
        })
    }
    console.log(updatedUserInfo)
    const submitForm = (e) => {
        e?.preventDefault()
        setLoading(true)
        // fetch(`${api}user/update`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ ...updatedUserInfo }),
        // }).then(() => {
        //     handleCloseModal()
        // }).catch(() => {
        //     handleCloseModal()
        // })
    }
    return <Box sx={style(isDesktop)} >
        <Typography id="modal-modal-title" variant="h4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} component="h2">
            <div>Edit User Profile</div><div onClick={handleCloseModal} style={{ cursor: "pointer" }} ><CloseIcon fontSize='large' /></div>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form id="myform" onSubmit={submitForm}>
                <Grid container spacing={2}>
                    {
                        FORM_FIELDS_EDIT_COMMUNITY.map((formField) => {
                            var value = updatedUserInfo[formField?.name] || null
                            if (formField?.isSelect) {
                                value = function () {
                                    if (formField.isMulti) {
                                        if (updatedUserInfo[formField?.name]) {
                                            return updatedUserInfo[formField?.name]?.map(b => { return { label: b, value: b } })
                                        }
                                        return []
                                    }
                                    if (updatedUserInfo[formField?.name]) {
                                        return { label: updatedUserInfo[formField?.name], value: updatedUserInfo[formField?.name] }
                                    }
                                    return null
                                }()
                            }
                            return formField.isSelect ? <Grid item xs={formField?.xs ? formField?.xs : 12} >
                                <Select
                                    options={formField?.options?.map(b => { return { label: b, value: b } })}
                                    value={value}
                                    isMulti={formField.isMulti || false}
                                    onChange={(e) => {
                                        if (formField.isMulti) {
                                            handleFormChange(formField?.name, e.map(b => b.value))
                                            return
                                        }
                                        handleFormChange(formField?.name, e?.value)
                                    }}
                                />
                            </Grid>
                                : <Grid item xs={formField?.xs ? formField?.xs : 12} >
                                    <input
                                        onChange={(e) => { handleFormChange(formField?.name, e?.target?.value) }}
                                        style={{ width: "100%" }}
                                        placeholder={formField?.lable}
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
export default UserCommunityEditModal