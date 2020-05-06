import React, { Component } from "react";
import "./panelEpisodes.css";
import CellEpisode from "./cellEpisode";

class PanelEpisodes extends Component {
  state = {
    tableRotated: false,
  };

  render() {
    return this.renderEpisodesSeasons();
  }

  renderEpisodesSeasons() {
    const { episodesList } = this.props;
    if (!episodesList || episodesList.length === 0) {
      return <h1> </h1>;
    } else {
      var table = (
        <table
          style={{
            transform:
              `scale(${this.props.scaleFactor}) ` +
              (this.state.tableRotated ? " scaleX(-1) rotate(90deg)" : ""),
          }}
          className={this.getClassName()}
        >
          <thead>
            <tr>{this.renderHeader()}</tr>
          </thead>
          <tbody>{this.renderSeason()}</tbody>
        </table>
      );
      return table;
    }
  }

  getClassName() {
    return this.props.className ? this.props.className : ""; //+
    //" " +
    //(this.state.tableRotated ? "tableRotated" : "")
  }

  renderHeader() {
    var vals = this.getMinMaxEpisodeNumber();
    var min = vals[0];
    var max = vals[1];

    var rows = [];
    rows.push(
      <th
        key="ESHseparator"
        onClick={this.rotateTable}
        className={this.state.tableRotated ? "cellRotated" : null}
      >
        +
      </th>
    );
    for (var i = min; i <= max; i++) {
      rows.push(
        <th
          key={"EH" + i}
          className={this.state.tableRotated ? "cellRotated" : null}
        >
          E{i}
        </th>
      );
    }

    //const retVal = distEpisodes.map((i) => <th>Ep{i}</th>);
    return rows;
  }

  rotateTable = () => {
    console.log("rotate");
    const { tableRotated } = this.state;
    this.setState({ tableRotated: !tableRotated });
  };

  getMinMaxEpisodeNumber() {
    const { episodesList } = this.props;
    console.log("getMinMaxEpisodeNumber", episodesList);
    let max = -Infinity;
    let min = Infinity;

    for (let s in episodesList) {
      for (let e = 0; e < episodesList[s].length; e++) {
        let episodeNr = Math.floor(episodesList[s][e].number);
        if (episodeNr > max) max = episodeNr;
        if (episodeNr < min) min = episodeNr;
      }
    }
    console.log("MM", max, min);
    return [min, max];
  }

  renderSeason() {
    const { episodesList } = this.props;
    console.log("renderSeason", episodesList);

    const retVal = Object.keys(episodesList).map((season) => (
      <tr key={season}>
        <th
          key={"S" + season}
          className={this.state.tableRotated ? "cellRotated" : null}
        >
          S{season}
        </th>
        {this.renderEpisode(this.props.episodesList[season])}
      </tr>
    ));
    return retVal;
  }

  renderEpisode(episodes) {
    const episodesSorted = episodes.sort(
      (a, b) => Math.floor(a.number) - Math.floor(b.number)
    );

    const retVal = episodesSorted.map((item) => (
      <CellEpisode
        key={/*item.title +*/ "S" + item.season + "E" + item.number}
        episodeInfo={item}
        rotated={this.state.tableRotated}
      />
    ));

    return retVal;
  }
}

export default PanelEpisodes;
