import React from "react";
import "../../Styles/Cards.css";
import { NavLink } from "react-router-dom";


function CardBlogs2(props) {
  var d = new Date(); // for now
  return (
    <div className='cards-cl1'>
      <div className=' card shadow2'>
        <div className='card-body ' style={{ width: "80%" }}>
          {/*<h5 className='card-title'>Blog Name<h7 style={{float:"right"}}>{d.getUTCDate()}-{d.getUTCMonth()}-{d.getFullYear()} {d.getUTCHours()}:{d.getUTCMinutes()}</h7></h5>
          <p className='card-text ' style={{color:"grey"}}>blogger name</p>*/}
        </div>
        <div style={{ float: "right" }}>
          <img src={props.img} className='card-img-top' alt='...' />
          <NavLink to={`/coursedetail/${props.id}`} className='btn btn-dark'>
            Read Blog
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CardBlogs2;
