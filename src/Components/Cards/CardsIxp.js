import React from "react";
import "../../Styles/Cards.css";
import "../../Styles/CardsIxp.css";

function CardsIxp(props) {
  return (
    <div className='cardsixpmain'>
      <div className='card shadow2' id='mobilecompanyfix'>
        <img src={props.link} className='cardixpimage' alt='...' />
        <div className='card-body '>
          <h5 className='card-title'>{props.name}</h5>
        </div>
      </div>
    </div>
  );
}

export default CardsIxp;
