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
      <h6
        //className={this.setBackgroundColorRating()}
        title={`S${this.props.episodeInfo.season}, E${this.props.episodeInfo.number}`}
      >
        <a
          href={this.props.episodeInfo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="noUnderline"
        >
          {this.props.episodeInfo.rating
            ? this.props.episodeInfo.rating
            : "N.A"}
        </a>
      </h6>
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
