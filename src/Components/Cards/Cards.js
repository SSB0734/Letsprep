import React from "react";
import "../../Styles/Cards.css";
import { NavLink, useHistory } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

function Card(props) {
  const history = useHistory()
  return (
    <div className='cards-cl1 mb-3 mt-3'>
      <div className=' card shadow2'>
        <img src={props.link} className='card-img-top' alt='...' />
        <div className='card-body '>
          <h5 className='card-title'>{props.name}</h5>
          <p className='card-text '>{props.instructor}</p>
          <div style={{
            display: "flex",
            justifyContent: props?.userr?.role === "admin" ? "space-between" : "left"
          }}
          >
            <NavLink to={`/coursedetail/${props.id}`} className='btn btn-dark'>
              Go to course
            </NavLink>
            {
              props?.userr?.role === "admin" && <EditIcon
                id="pencil-on-hover-for-edit"
                onClick={() => { history.push("/editcourse/" + props.id) }} style={{ cursor: "pointer" }}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
