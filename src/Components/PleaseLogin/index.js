import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Css/index.module.css'
const PleaseLogin = ({ action = "" }) => {
    const location = useHistory()
    return <div style={{ textAlign: "center", height: "100px" }}>
        {
            action === "" ?
                <div>Please login to continue</div> :
                <div>Please login to view {action}</div>
        }
        <button className={styles.pleaseLoginButtonStyles} onClick={() => { location.push("/signup") }}>Login</button>
    </div>
}

export default PleaseLogin