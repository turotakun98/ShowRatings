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
        <div title={this.getTitleValue()} className="cellContainer">
          <h6
            className={this.props.countVisible ? "rateLabel" : "rateLabelFull"}
          >
            {this.props.episodeInfo.rating
              ? this.props.episodeInfo.rating
              : "N.A"}
          </h6>
          {this.props.countVisible ? (
            <h6 className="rateCountLabel">{this.getRatingCountValue()}</h6>
          ) : (
            <span></span>
          )}
        </div>
      </a>
    );

    return cell;
  }

  getTitleValue() {
    return `S${this.props.episodeInfo.season}, E${this.props.episodeInfo.number}, ${this.props.episodeInfo.title}`;
  }

  getRatingCountValue() {
    var { ratingCount } = this.props.episodeInfo;
    if (ratingCount) {
      if (ratingCount.length > 3) {
        return ratingCount.substring(0, 4) + "k";
      } else {
        return ratingCount;
      }
    } else {
      return "N.A.";
    }
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
