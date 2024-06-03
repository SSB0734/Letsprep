import React from "react";
import "../../Styles/Cards.css";
import { NavLink } from "react-router-dom";


function CardBlogs(props) {
  var d = new Date(); // for now
  return (
    <div className='cards-cl1'>
      <div className=' card shadow2'>
        <img src={props.img} className='card-img-top' alt='...' />
        <div className='card-body '>
          <h5 className='card-title'>Blog Name<h7 style={{ float: "right" }}>{d.getUTCDate()}-{d.getUTCMonth()}-{d.getFullYear()} {d.getUTCHours()}:{d.getUTCMinutes()}</h7></h5>
          <p className='card-text ' style={{ color: "grey" }}>blogger name</p>
          <NavLink to={`/coursedetail/${props.id}`} className='btn btn-dark'>
            Read Blog
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CardBlogs;
