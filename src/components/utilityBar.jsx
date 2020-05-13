import React, { Component } from "react";
import "./utilityBar.css";

const constants = {
  maxZoom: 150,
  minZoom: 50,
  deltaHeight: 50,
  defZoom: 100,
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
    heightGreaterWidth: false,
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
          value={constants.defZoom}
          value={this.state.zoom}
          onChange={this.handleZoom}
        ></input>
        <div
          style={{
            height:
              this.state.pnlHeight &&
              (this.state.rotate || this.state.zoom >= constants.defZoom)
                ? this.state.heightGreaterWidth &&
                  this.state.rotate &&
                  this.state.zoom < constants.defZoom
                  ? ""
                  : this.state.pnlHeight
                : "",
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
    this.setState(
      {
        visible: true,
      },
      () => this.getHeightWidth()
    );
  }

  getHeightWidth() {
    var height = document.getElementById(this.props.children.props.id)
      .clientHeight;
    var width = document.getElementById(this.props.children.props.id)
      .clientWidth;
    this.setState({ heightGreaterWidth: height > width }, () =>
      this.resizePanel()
    );
  }

  handleZoom(event) {
    this.setState({ zoom: Math.floor(event.target.value) }, () =>
      this.resizePanel()
    );
  }

  zoomIn() {
    const { zoom } = this.state;
    if (zoom < constants.maxZoom)
      this.setState({ zoom: zoom + 5 }, () => this.resizePanel());
  }

  zoomOut() {
    const { zoom } = this.state;
    if (zoom > constants.minZoom)
      this.setState({ zoom: zoom - 5 }, () => this.resizePanel());
  }

  rotateTable() {
    const { rotate } = this.state;
    this.setState({ rotate: !rotate }, () => this.resizePanel());
  }

  resizePanel() {
    const { rotate } = this.state;
    var pnlH = null;

    if (rotate) {
      var width = document.getElementById(this.props.children.props.id)
        .clientWidth;
      var height = document.getElementById(this.props.children.props.id)
        .clientHeight;
      pnlH =
        (Math.max(width, height) * this.state.zoom) / 100 +
        constants.deltaHeight;
    } else {
      var height = document.getElementById(this.props.children.props.id)
        .clientHeight;
      pnlH = (height * this.state.zoom) / 100 + constants.deltaHeight;
    }

    this.setState({ pnlHeight: pnlH }, () => {
      this.props.onResize(this.state.pnlHeight);
    });
  }
}

export default UtilityBar;
