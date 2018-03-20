import React from "react";
import { withRouter } from "react-router-dom";
import "./formOtherBox.less";

@withRouter
class FormOtherBox extends React.Component {
  render() {
    const { otherOne, otherTwo = null } = this.props;
    return (
      <div className="other-box">
        {otherTwo ? (
          <div>
            <p
              style={{ float: "left" }}
              onClick={() => this.props.history.push(otherOne.router)}
            >
              {otherOne.textValue}
            </p>
            <p
              style={{ float: "right" }}
              onClick={() => this.props.history.push(otherTwo.router)}
            >
              {otherTwo.textValue}
            </p>
          </div>
        ) : (
          <div>
            <p onClick={() => this.props.history.push(otherOne.router)}>
              {otherOne.textValue}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default FormOtherBox;
