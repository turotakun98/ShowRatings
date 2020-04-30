class EpisodeInfo {
  constructor(title, link, rating, year, number, season) {
    this.title = title;
    this.link = link;
    this.rating = rating;
    this.year = year;
    this.number = number;
    this.season = season;
  }
}

EpisodeInfo.prototype.toString = function episodeToString() {
  var ret = `S${this.season}, Ep${this.number}, Date ${this.airdate} ${this.rating} : '${this.title}'`;
  return ret;
};

module.exports = EpisodeInfo;
