import React, { Component } from "react";
import "./loadingSpinner.css";

class LoadingSpinner extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="lds-container">
          <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    } else return <spans />;
  }
}

export default LoadingSpinner;
