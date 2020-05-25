import React, { useDebugValue } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import PanelEpisodes from "./components/panelEpisodes";
import LoadingSpinner from "./components/loadingSpinner";
import UtilityBar from "./components/utilityBar";
import getEpisodesFromID from "./logic/getEpisodesFromID";
import getSeriesInfoFromID from "./logic/getSeriesInfoFromID";

import { increment } from "./redux/actions/incerement";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.clickCollapse = this.clickCollapse.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  state = {
    series: null,
    seriesInfo: null,
    episodesList: [],
    loading: false,
    collapse: false,
    pnlH: null,
  };

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

        <div
          className="row"
          style={{
            height: this.state.pnlH ? this.state.pnlH : "",
          }}
        >
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

          <UtilityBar onResize={this.handleResize}>
            <PanelEpisodes
              id="pnlEpisodes"
              episodesList={this.state.episodesList}
            />
          </UtilityBar>
          <button onClick={() => this.props.increment()}>+</button>
        </div>
      </div>
    );
  }

  async handleSearch(series) {
    this.setState({ loading: true });
    var eps = await getEpisodesFromID(series.idImdb);
    var seriesInfo = await getSeriesInfoFromID(series.idImdb);
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

  handleResize(height) {
    this.setState({ pnlH: height });
  }
}

export default connect(null, { increment })(App);
