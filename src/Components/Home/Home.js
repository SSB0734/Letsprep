import React, { useState, useEffect } from "react";
import "../../Styles/Home.css";
import { useStateValue } from "../../StateProvider";
import api from "../../constants";
import Meta from "../Meta";
import { Link } from 'react-router-dom'
import useWindowWidth from "../Hook/useWidth";

function Home() {
  const [{ user }, dispatch] = useStateValue();
  const [, isDesktop] = useWindowWidth()
  const [userr, setUserr] = useState(null);
  useEffect(() => {
    const bringUser = () => {
      if (user) {
        fetch(`${api}user/bringuser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(" useffect user", data);
            setUserr(data[0]);
            // cout<<""
          });
      }
    };
    bringUser();
  }, []);
  return <div>
    <Meta />

    <div className="parallax" id="trans1" style={{ textAlign: !isDesktop && "center", justifyContent: !isDesktop && "start" }}>
      <div className="txt" style={{ marginTop: !isDesktop && "130px" }}>
        We believe in making you tough, prepared and fearless..
      </div>
      <div className="txt">
        So <span style={{ fontSize: "50px" }}>LetsPrep</span>
      </div>
    </div>
    {/*  */}
    <div className="parallax" id="trans2">
      <div style={{ fontSize: "25px", maxWidth: isDesktop ? "700px" : "100%", marginRight: !isDesktop && "0px", textAlign: !isDesktop && "center" }} className="txt right">
        <span style={{ fontSize: "50px", fontWeight: 700 }}> Our aim</span> <br />
        We aim to provide a platform where we can enhance your knowledge,
        learn from others' experiences & turn opportunities into outcomes.
      </div>
    </div>
    {/*  */}
    <div className="parallax" id="trans3">
      <div style={{ fontSize: "25px", maxWidth: isDesktop ? "700px" : "100%", marginLeft: !isDesktop && "0px", textAlign: !isDesktop && "center" }} className="txt left">
        <div>
          <span style={{ fontSize: "50px", fontWeight: 700 }}>Prepare you for Interview</span> by providing detailed interview experiences of others so that you are well acquainted of your battle before the actual fight.
        </div>
        <div style={{ textAlign: !isDesktop && "center" }}>
          <Link to='/interview-experience'>
            <button className='homeCoursesbutton'>Go to Interiew Experiences</button>
          </Link>
        </div>
      </div>
    </div>
    {/*  */}
    <div className="parallax" id="trans4">
      <div style={{ fontSize: "25px", maxWidth: isDesktop ? "700px" : "100%", marginRight: !isDesktop && "0px", textAlign: !isDesktop && "center" }} className="txt right">
        <div>
          <span style={{ fontSize: "50px", fontWeight: 700 }}>Update you with best job openings</span> to make you aware of all opportunities, so that none is missed as nothing is more expensive than a missed opportunity.
        </div>
        <div style={{ textAlign: !isDesktop && "center" }}>
          <Link to='/job-openings'>
            <button className='homeCoursesbutton'>Go to Job Portal</button>
          </Link>
        </div>
      </div>
    </div>
    {/*  */}
    <div className="parallax" id="trans5">
      <div style={{ fontSize: "25px", maxWidth: isDesktop ? "700px" : "100%", marginLeft: !isDesktop && "0px", textAlign: !isDesktop && "center" }} className="txt left">
        <div>
          <span style={{ fontSize: "50px", fontWeight: 700 }}>Provide you with the Best Courses</span> so that you invest more time in studying instead of wasting it in searching.
        </div>
        <div style={{ textAlign: !isDesktop && "center" }}>
          <Link to='/courses'>
            <button className='homeCoursesbutton'>Go to Courses</button>
          </Link>
        </div>
      </div>
    </div>
  </div >
}

export default Home;
