import React, { Component } from "react";
import "./cellEpisode.css";

class CellEpisode extends Component {
  render() {
    return (
      <td
        className={
          this.setBackgroundColorRating() +
          (this.props.rotated ? " cellRotated" : "")
        }
      >
        <div className="cellSquare">{this.renderEpisodeCell()}</div>
      </td>
    );
  }

  renderEpisodeCell() {
    var cell = (
      <a
        href={this.props.episodeInfo.link}
        target="_blank"
        rel="noopener noreferrer"
        className="noUnderline"
      >
        <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
          <h6
            //className={this.setBackgroundColorRating()}
            title={`S${this.props.episodeInfo.season}, E${this.props.episodeInfo.number}, ${this.props.episodeInfo.ratingCount}`}
            style={{ height: "50%" }}
          >
            {this.props.episodeInfo.rating
              ? this.props.episodeInfo.rating
              : "N.A"}
          </h6>
          <h6 style={{ height: "50%", fontSize: "0.5em" }}>
            {this.props.episodeInfo.ratingCount
              ? this.props.episodeInfo.ratingCount
              : "N.A"}
          </h6>
        </div>
      </a>
    );

    return cell;
  }

  setBackgroundColorRating() {
    const { episodeInfo } = this.props;
    const rating = episodeInfo.rating;
    var className = "";

    if (rating >= 8.6) {
      //great
      className = "rateGreat";
    } else if (rating >= 7.6 && rating <= 8.5) {
      //good
      className = "rateGood";
    } else if (rating >= 6.6 && rating <= 7.5) {
      //regular
      className = "rateRegular";
    } else if (rating >= 5.0 && rating <= 6.5) {
      //bad
      className = "rateBad";
    } else if (rating >= 0.1 && rating <= 4.9) {
      //garbage
      className = "rateGarbage";
    } else {
      //Invalid or unavailable data
      className = "rateUndefined";
    }

    return className;
  }
}

export default CellEpisode;
