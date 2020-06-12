import React, { Component } from "react";
import "./panelEpisodes.css";
import CellEpisode from "./cellEpisode";

class PanelEpisodes extends Component {
  render() {
    return this.renderEpisodesSeasons();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.rotate === nextProps.rotate &&
      this.props.episodesList != null &&
      this.props.episodesList === nextProps.episodesList &&
      this.props.countVisible === nextProps.countVisible
    ) {
      return false;
    } else {
      if (this.props.episodesList !== nextProps.episodesList) {
        this.props.onLoad();
      }
      return true;
    }
  }

  renderEpisodesSeasons() {
    const { episodesList } = this.props;
    if (!episodesList || episodesList.length === 0) {
      return <h1> </h1>;
    } else {
      var table = (
        <table id={this.props.id} className={this.getClassName()}>
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
    return this.props.className ? this.props.className : "";
  }

  renderHeader() {
    var vals = this.getMinMaxEpisodeNumber();
    var min = vals[0];
    var max = vals[1];

    var rows = [];
    rows.push(
      <th key="ESHseparator" className={this.props.rotate ? "cellRotated" : ""}>
        <div className="cellSquare"></div>
      </th>
    );
    for (var i = min; i <= max; i++) {
      rows.push(
        <th key={"EH" + i} className={this.props.rotate ? "cellRotated" : ""}>
          <div className="cellSquare">
            <h6 className="headerLabel">E{i}</h6>
          </div>
        </th>
      );
    }

    return rows;
  }

  getMinMaxEpisodeNumber() {
    const { episodesList } = this.props;
    let max = -Infinity;
    let min = 1;

    for (let s in episodesList) {
      let episodeNr = episodesList[s].length;
      if (episodeNr > max) max = episodeNr;
    }
    return [min, max];
  }

  renderSeason() {
    const { episodesList } = this.props;

    const retVal = Object.keys(episodesList).map((season) => (
      <tr key={season}>
        <th
          key={"S" + season}
          className={this.props.rotate ? "cellRotated" : ""}
        >
          <div className="cellSquare">
            <h6 className="headerLabel">S{season}</h6>
          </div>
        </th>
        {this.renderEpisodes(this.props.episodesList[season])}
      </tr>
    ));

    return retVal;
  }

  renderEpisodes(episodes) {
    const episodesSorted = episodes.sort(
      (a, b) => Math.floor(a.number) - Math.floor(b.number)
    );

    const retVal = episodesSorted.map((item) => (
      <CellEpisode
        key={"S" + item.season + "E" + item.number}
        episodeInfo={item}
        rotated={this.props.rotate}
        countVisible={this.props.countVisible}
      />
    ));

    return retVal;
  }
}

export default PanelEpisodes;
