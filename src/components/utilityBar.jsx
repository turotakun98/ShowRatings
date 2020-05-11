import React, { Component } from "react";
import "./utilityBar.css";

const constants = {
  maxZoom: 150,
  minZoom: 50,
  deltaHeight: 50,
};

class UtilityBar extends Component {
  constructor(props) {
    super(props);

    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.rotateTable = this.rotateTable.bind(this);
    this.episodesLoaded = this.episodesLoaded.bind(this);
    this.resizePanel = this.resizePanel.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }
  state = {
    zoom: 100,
    rotate: false,
    pnlHeight: null,
    visible: false,
  };

  render() {
    return (
      <div
        className={
          "col-md-10 panelContainer" + (this.state.visible ? "" : " d-none")
        }
      >
        <button onClick={this.rotateTable}>r</button>
        <button onClick={this.zoomIn}>+</button>
        <button onClick={this.zoomOut}>-</button>
        <input
          type="range"
          min={constants.minZoom}
          max={constants.maxZoom}
          value="100"
          value={this.state.zoom}
          onChange={this.handleZoom}
        ></input>
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
      visible: true,
    });
  }

  handleZoom(event) {
    console.log("zoom", event.target.value);
    this.setState({ zoom: Math.floor(event.target.value) }, () =>
      this.resizePanel()
    );
  }

  zoomIn() {
    const { zoom } = this.state;
    console.log("zoom in");
    if (zoom < constants.maxZoom)
      this.setState({ zoom: zoom + 5 }, () => this.resizePanel());
  }

  zoomOut() {
    const { zoom } = this.state;
    console.log("zoom out");
    if (zoom > constants.minZoom)
      this.setState({ zoom: zoom - 5 }, () => this.resizePanel());
  }

  rotateTable() {
    const { rotate } = this.state;
    console.log("rotate");
    this.setState({ rotate: !rotate }, () => this.resizePanel());
  }

  resizePanel() {
    console.log("resize!!", this.state.zoom);
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
      pnlH = (height * this.state.zoom) / 100 + constants.deltaHeight;
    }

    this.setState({ pnlHeight: pnlH });
  }
}

export default UtilityBar;
