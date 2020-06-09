import React, { Component } from "react";
import "./utilityBar.css";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";

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
        <div style={{ float: "left", width: "110px" }}>
          <IconButton
            type="button"
            onClick={this.rotateTable}
            color="inherit"
            // className="rotateButton"
          >
            <AutorenewIcon />
          </IconButton>
          <br />
          <IconButton onClick={this.zoomIn}>
            <ZoomInIcon color="inherit" />
          </IconButton>
          <br />
          <PrettoSlider
            valueLabelDisplay="auto"
            orientation="vertical"
            value={this.state.zoom || constants.defZoom}
            onChange={this.handleZoom}
            min={constants.minZoom}
            max={constants.maxZoom}
          />
          <br />
          <IconButton onClick={this.zoomOut}>
            <ZoomOutIcon color="inherit" />
          </IconButton>
          <br />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.countVisible}
                onChange={this.handleCountVisibility}
                name="checkedB"
                color="primary"
              />
            }
            label="Counter"
          />
        </div>
        <div style={{ width: "calc(100% - 110px)", overflow: "auto hidden" }}>
          <div
            style={{
              height: this.state.baseHeight,
              width: this.state.baseWidth,
              margin: "0",
            }}
          >
            <div
              className="transformContainer"
              style={{
                width: `calc(100% / ${this.state.zoom / 100})`,
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

    var widthD = document.getElementById("tableContainer").offsetWidth;
    this.setState({ baseWidth: widthL, baseHeight: heightL, divWidth: widthD });
  }

  handleCountVisibility(event) {
    this.setState({ countVisible: event.target.checked });
  }

  handleZoom(event, newValue) {
    this.setState({ zoom: Math.floor(newValue) }, () => this.getHeightWidth());
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

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: "200px !important",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: "-11px !important",
    transform: "rotate(90deg) !important",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "auto",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
