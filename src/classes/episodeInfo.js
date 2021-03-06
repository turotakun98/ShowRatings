class EpisodeInfo {
    constructor(title, link, imageLink, rating, ratingCount, year, number, season) {
        this.title = title;
        this.link = link;
        this.imageLink = imageLink;
        this.rating = rating;
        this.ratingCount = ratingCount;
        this.year = year;
        this.number = number;
        this.season = season;
    }
}

EpisodeInfo.prototype.toString = function episodeToString() {
    var ret = `S${this.season}, Ep${this.number}, Date ${this.airdate} ${this.rating} : '${this.title}'`;
    return ret;
};

export default EpisodeInfo;
