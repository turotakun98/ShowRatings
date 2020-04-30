import React from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import PanelEpisodes from "./components/panelEpisodes";
import getEpisodesFromID from "./logic/getEpisodesFromID";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  state = {
    series: null,
    episodesList: [],
  };

  async handleSearch(series) {
    console.log(series.idImdb);
    var eps = await getEpisodesFromID(series.idImdb);

    this.setState({
      episodesList: eps,
      series: series,
    });
  }

  getImage() {
    const { series } = this.state;
    var image = "";

    if (series) {
      var imageLink = series.imageLink;
      image = imageLink;

      var rgb = this.getAverageRGB(document.getElementById("i"));
      console.log("rgb", rgb);
      document.body.style = `background-color: ${rgb}`;
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
              id="i"
              className="seriesCover"
              src={this.getImage()}
              alt={this.state.series != null ? this.state.series.title : ""}
              crossOrigin="anonymous"
            ></img>
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

  getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement("canvas"),
      context = canvas.getContext && canvas.getContext("2d"),
      data,
      width,
      height,
      i = -4,
      length,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);
    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */ alert(e);
      return defaultRGB;
    }

    length = data.data.length;

    var dictVals = {};
    var maxVal = 1;
    var maxRgb = "";

    while ((i += blockSize * 4) < length) {
      ++count;

      rgb.r = data.data[i];
      rgb.g = data.data[i + 1];
      rgb.b = data.data[i + 2];

      var vals = `${rgb.r},${rgb.g},${rgb.b}`;
      if (vals in dictVals) {
        dictVals[vals] += 1;
        if (dictVals[vals] > maxVal) {
          maxVal = dictVals[vals];
          maxRgb = vals;
        }
      } else {
        dictVals[vals] = 1;
      }
    }
    console.log("maxVal", maxVal);
    console.log("maxRgb", maxRgb);
    console.log("dictVals", dictVals);
    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }
}

export default App;
