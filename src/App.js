import React from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import PanelEpisodes from "./components/panelEpisodes";
import getEpisodesFromID from "./logic/getEpisodesFromID";
import getSeriesInfoFromID from "./logic/getSeriesInfoFromID";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  state = {
    series: null,
    seriesInfo: null,
    episodesList: [],
  };

  async handleSearch(series) {
    console.log(series.idImdb);
    var eps = await getEpisodesFromID(series.idImdb);
    var seriesInfo = await getSeriesInfoFromID(series.idImdb);
    console.log("seriesInfo", seriesInfo);
    this.setState({
      episodesList: eps,
      series: series,
      seriesInfo: seriesInfo,
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

  render() {
    return (
      <div className="App">
        <div className="row head">
          <div className="column left"></div>
          <div className="column middle">
            <SearchBar onSearch={this.handleSearch} />
          </div>
          <div className="column right"></div>
        </div>

        <div className="row body">
          <div className="column left">
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
            <br />
          </div>
          <div className="column middle">
            <PanelEpisodes
              episodesList={this.state.episodesList}
            ></PanelEpisodes>
          </div>
          <div className="column right"></div>
        </div>
      </div>
    );
  }
}

export default App;
