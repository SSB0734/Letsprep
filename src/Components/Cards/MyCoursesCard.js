import React, { useEffect, useState } from "react";
import "../../Styles/Cards.css";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import api from "../../constants";

function Card(props) {
  const [course, setCourse] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const getcourse = () => {
      fetch(`${api}course/getcourseusingid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email || localStorage.getItem("email"),
          id: props.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log("course", data);
          setCourse(data[0]);
        });
    };
    getcourse();
  }, []);
  return (
    course && (
      <div className='cards-cl1 mb-3 mt-3'>
        <div className=' card shadow2'>
          <img src={course.thumbnaillink} className='card-img-top' alt='...' />
          <div className='card-body '>
            <h5 className='card-title'>{course.coursename}</h5>
            <p className='card-text '>{course.instructor}</p>
            <NavLink to={`/coursedetail/${props.id}`} className='btn btn-dark'>
              Continue..
            </NavLink>
          </div>
        </div>
      </div>
    )
  );
}

export default Card;
