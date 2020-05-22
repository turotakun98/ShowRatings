import React, { Component } from "react";
import "./utilityBar.css";
import RangePicker from "../classes/rangePicker";

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
    this.handleCountVisibility = this.handleCountVisibility.bind(this);
  }

  state = {
    zoom: 100,
    rotate: false,
    visible: false,
    baseHeight: 0,
    baseWidth: 0,
    divWidth: 0,
    countVisible: true,
    rangePickers: [
      new RangePicker(0.1, 4.9, "#49525e"),
      new RangePicker(5, 6.5, "#c92913"),
      new RangePicker(6.6, 7.5, "#ffaa00"),
      new RangePicker(7.6, 8.5, "#f5e033"),
      new RangePicker(8.6, 10, "#7ecf4c"),
    ],
  };

  render() {
    return (
      <div
        id="tableContainer"
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
        <input
          type="checkbox"
          checked={this.state.countVisible}
          onChange={this.handleCountVisibility}
        ></input>
        <ul>
          {this.state.rangePickers.map((item, i) => (
            <li key={item.colorRGB}>
              <input
                type="number"
                value={item.minValue}
                onChange={this.increaseMinMaxValue}
              ></input>
              <input
                type="number"
                value={item.maxValue}
                onChange={this.increaseMinMaxValue}
              ></input>
              <input type="text" value={item.colorRGB}></input>
            </li>
          ))}
        </ul>
        <div
          style={{
            height: this.state.baseHeight,
            width: this.state.baseWidth,
            margin: "0 auto",
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
              countVisible: this.state.countVisible,
            })}
          </div>
        </div>
      </div>
    );
  }

  increaseMinMaxValue(eventa) {
    console.log(eventa, eventa.target.value);
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

    var widthD = document.getElementById("tableContainer").offsetWidth;
    this.setState({ baseWidth: widthL, baseHeight: heightL, divWidth: widthD });
  }

  handleCountVisibility(event) {
    this.setState({ countVisible: event.target.checked });
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
