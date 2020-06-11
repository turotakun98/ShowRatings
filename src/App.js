import React from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import PanelEpisodes from "./components/panelEpisodes";
import LoadingSpinner from "./components/loadingSpinner";
import UtilityBar from "./components/utilityBar";
import getEpisodesFromID from "./logic/getEpisodesFromID";
import getSeriesInfoFromID from "./logic/getSeriesInfoFromID";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import iconImageNotFound from "./iconImageNotFound.png";

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

  async handleSearch(series) {
    this.setState({ loading: true });

    var epsPromise = getEpisodesFromID(series.idImdb);
    var seriesInfoPromise = getSeriesInfoFromID(series.idImdb);

    var eps = await epsPromise;
    var seriesInfo = await seriesInfoPromise;

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
      console.log("image", image);
    }

    return image;
  }
  getVisibility() {
    if (this.state.collapse) {
      return "hideBlock";
    } else {
      return "showBlock card";
    }
  }

  clickCollapse(event) {
    this.setState({ collapse: !this.state.collapse });
  }

  handleResize(height) {
    this.setState({ pnlH: height });
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <SearchBar
              onSearch={this.handleSearch}
              style={{ marginTop: 20, width: 616 }}
            />
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
            <Card>
              <CardMedia
                classes={{ media: "seriesCover" }}
                component="img"
                src={
                  this.state.series &&
                  (this.state.series.imageLink || iconImageNotFound)
                }
                // alt={this.state.series != null ? this.state.series.title : ""}
              ></CardMedia>
              <CardContent className="card-title">
                <Typography variant="body2">
                  {this.state.seriesInfo
                    ? `${this.state.seriesInfo.genres.join(", ")} ${
                        this.state.seriesInfo.rate
                      } (${this.state.seriesInfo.rateCount})`
                    : ""}
                </Typography>

                <Typography paragraph className="card-text">
                  {this.state.seriesInfo ? this.state.seriesInfo.plot : ""}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <UtilityBar onResize={this.handleResize}>
            <PanelEpisodes
              id="pnlEpisodes"
              episodesList={this.state.episodesList}
            />
          </UtilityBar>
        </div>
      </div>
    );
  }
}

export default App;
