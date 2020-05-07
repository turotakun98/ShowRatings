import React from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import PanelEpisodes from "./components/panelEpisodes";
import LoadingSpinner from "./components/loadingSpinner";
import getEpisodesFromID from "./logic/getEpisodesFromID";
import getSeriesInfoFromID from "./logic/getSeriesInfoFromID";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.clickCollapse = this.clickCollapse.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.rotateTable = this.rotateTable.bind(this);
  }

  state = {
    series: null,
    seriesInfo: null,
    episodesList: [],
    loading: false,
    collapse: false,
    zoom: 100,
    rotate: false,
    pnlHeight: null,
  };

  zoomIn() {
    const { zoom } = this.state;
    this.setState({ zoom: zoom + 5 });
  }

  zoomOut() {
    const { zoom } = this.state;
    this.setState({ zoom: zoom - 5 });
  }

  rotateTable() {
    const { rotate } = this.state;

    var pnlH = null;
    if (!rotate) {
      var width = document.getElementById("pnlEpisodes").clientWidth;
      var height = document.getElementById("pnlEpisodes").clientHeight;
      pnlH = Math.max(width, height) + 50;
      console.log(width, height, Math.max(width, height), pnlH);
    }

    this.setState({ rotate: !rotate });
    this.setState({ pnlHeight: pnlH });
  }

  async handleSearch(series) {
    console.log(series.idImdb);
    this.setState({ loading: true });
    var eps = await getEpisodesFromID(series.idImdb);
    var seriesInfo = await getSeriesInfoFromID(series.idImdb);
    console.log("seriesInfo", seriesInfo);
    this.setState({
      episodesList: eps,
      series: series,
      seriesInfo: seriesInfo,
      loading: false,
    });
  }

  getImage() {
    const { series } = this.state;
    var image = "";

    if (series) {
      var imageLink = series.imageLink;
      image = imageLink;
    }

    return image;
  }
  getVisibility() {
    if (this.state.collapse) {
      return "hideBlock";
    } else {
      return "showBlock ";
    }
  }

  clickCollapse(event) {
    this.setState({ collapse: !this.state.collapse });
  }

  // getClassPanel() {
  //   const { rotate } = this.state;
  //   if (rotate) {
  //     return "col-md-10 panelContainerRotate";
  //   } else {
  //     return "col-md-10 panelContainer";
  //   }
  // }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <SearchBar onSearch={this.handleSearch} />
            <LoadingSpinner loading={this.state.loading} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <button
              className="btn btn-primary d-sm-none"
              onClick={this.clickCollapse}
            >
              Collapse
            </button>
            <div className={this.getVisibility()}>
              <img
                className="seriesCover"
                src={this.getImage()}
                alt={this.state.series != null ? this.state.series.title : ""}
              ></img>
              <br />
              <p>
                {this.state.seriesInfo
                  ? `${this.state.seriesInfo.genres} ${this.state.seriesInfo.rate}(${this.state.seriesInfo.rateCount})`
                  : ""}
              </p>
              <br />
              <p>{this.state.seriesInfo ? this.state.seriesInfo.plot : ""}</p>
            </div>
          </div>

          <div
            className="col-md-10 panelContainer"
            style={{
              height: this.state.pnlHeight ? this.state.pnlHeight : "",
            }} /*{this.getClassPanel()}*/
          >
            <button onClick={this.zoomIn}>+</button>
            <button onClick={this.zoomOut}>-</button>
            <button onClick={this.rotateTable}>r</button>
            <PanelEpisodes
              id="pnlEpisodes"
              scaleFactor={this.state.zoom / 100}
              rotate={this.state.rotate}
              episodesList={this.state.episodesList}
            ></PanelEpisodes>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
