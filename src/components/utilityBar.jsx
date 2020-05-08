import React, { Component } from "react";
import "./utilityBar.css";

class UtilityBar extends Component {
  constructor(props) {
    super(props);

    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.rotateTable = this.rotateTable.bind(this);
    this.episodesLoaded = this.episodesLoaded.bind(this);
    this.resizePanel = this.resizePanel.bind(this);
  }

  state = {
    zoom: 100,
    rotate: false,
    pnlHeight: null,
  };

  render() {
    return (
      <div className="col-md-10 panelContainer">
        <button onClick={this.zoomIn}>+</button>
        <button onClick={this.zoomOut}>-</button>
        <button onClick={this.rotateTable}>r</button>
        <div
          style={{
            height: this.state.pnlHeight ? this.state.pnlHeight : "",
          }}
        >
          {React.cloneElement(this.props.children, {
            scaleFactor: this.state.zoom / 100,
            rotate: this.state.rotate,
            onLoad: this.episodesLoaded,
          })}
        </div>
      </div>
    );
  }

  episodesLoaded() {
    this.setState({
      zoom: 100,
      rotate: false,
      pnlHeight: null,
    });
  }

  zoomIn() {
    const { zoom } = this.state;
    console.log("zoom in");
    this.setState({ zoom: zoom + 5 }, () => this.resizePanel());
  }

  zoomOut() {
    const { zoom } = this.state;
    console.log("zoom out");
    this.setState({ zoom: zoom - 5 }, () => this.resizePanel());
  }

  rotateTable() {
    const { rotate } = this.state;
    console.log("rotate");
    this.setState({ rotate: !rotate }, () => this.resizePanel());
  }

  resizePanel() {
    console.log("resize!!");
    const { rotate } = this.state;
    var pnlH = null;

    if (rotate) {
      var width = document.getElementById(this.props.children.props.id)
        .clientWidth;
      var height = document.getElementById(this.props.children.props.id)
        .clientHeight;
      pnlH = (Math.max(width, height) * this.state.zoom) / 100 + 50;
    } else {
      var height = document.getElementById(this.props.children.props.id)
        .clientHeight;
      pnlH = (height * this.state.zoom) / 100;
    }

    this.setState({ pnlHeight: pnlH });
  }
}

export default UtilityBar;
