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
    this.handleZoom = this.handleZoom.bind(this);
  }
  state = {
    zoom: 100,
    rotate: false,
    visible: false,
    baseHeight: 0,
    baseWidth: 0,
    divWidth: 0,
  };

  render() {
    return (
      <div
        id="divv"
        className={
          //"col-md-10 panelContainer" + (this.state.visible ? "" : " d-none")
          "col-md-10" +
          (this.state.visible ? "" : " d-none") +
          (this.state.baseWidth > this.state.divWidth ? " panelContainer" : "")
        }
      >
        <button onClick={this.rotateTable}>r</button>
        <button onClick={this.zoomIn}>+</button>
        <button onClick={this.zoomOut}>-</button>
        <input
          type="range"
          min={constants.minZoom}
          max={constants.maxZoom}
          value={this.state.zoom ? this.state.zoom : constants.defZoom}
          onChange={this.handleZoom}
        ></input>
        <div
          style={{
            height: this.state.baseHeight,
            width: this.state.baseWidth,
          }}
        >
          <div
            className="transformContainer"
            style={{
              transform:
                `scale(${this.state.zoom / 100}) ` +
                (this.state.rotate ? " scaleX(-1) rotate(90deg)" : ""),
            }}
          >
            {React.cloneElement(this.props.children, {
              scaleFactor: this.state.zoom / 100,
              rotate: this.state.rotate,
              onLoad: this.episodesLoaded,
            })}
          </div>
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
    var heightL = document
      .getElementById(this.props.children.props.id)
      .getBoundingClientRect().height;
    var widthL = document
      .getElementById(this.props.children.props.id)
      .getBoundingClientRect().width;

    var widthD = document.getElementById("divv").offsetWidth;
    this.setState({ baseWidth: widthL, baseHeight: heightL, divWidth: widthD });
  }

  handleZoom(event) {
    this.setState({ zoom: Math.floor(event.target.value) }, () =>
      this.getHeightWidth()
    );
  }

  zoomIn() {
    const { zoom } = this.state;
    if (zoom < constants.maxZoom)
      this.setState({ zoom: zoom + 5 }, () => this.getHeightWidth());
  }

  zoomOut() {
    const { zoom } = this.state;
    if (zoom > constants.minZoom)
      this.setState({ zoom: zoom - 5 }, () => this.getHeightWidth());
  }

  rotateTable() {
    const { rotate } = this.state;
    this.setState({ rotate: !rotate }, () => this.getHeightWidth());
  }
}

export default UtilityBar;
