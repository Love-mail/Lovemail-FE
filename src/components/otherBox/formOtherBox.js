import React from "react";
import history from "../../config/history"
import "./formOtherBox.less";

const FormOtherBox = ({ otherOne, otherTwo = null }) => {
  return(
    <div className="other-box fadeInDown">
        {otherTwo ? (
          <div>
            <p
              style={{ float: "left" }}
              onClick={() => history.push(otherOne.router)}
            >
              {otherOne.textValue}
            </p>
            <p
              style={{ float: "right" }}
              onClick={() => history.push(otherTwo.router)}
            >
              {otherTwo.textValue}
            </p>
          </div>
        ) : (
          <div>
            <p onClick={() => history.push(otherOne.router)}>
              {otherOne.textValue}
            </p>
          </div>
        )}
      </div>
  )
}

export default FormOtherBox;
