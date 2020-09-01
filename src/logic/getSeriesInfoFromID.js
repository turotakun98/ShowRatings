import SeriesInfo from "../classes/seriesInfo";
import config from "../config/config";

export default async function getSeriesInfoFromID(idSeries) {
    const url = "https://www.omdbapi.com/?apikey=" + config.omdbApiKey + "&i=" + idSeries;
    const response = await fetch(url);
    const data = await response.json();
    var series = new SeriesInfo(data.Title, data.Genre, data.Plot, data.imdbRating, data.imdbVotes, data.totalSeasons);
    console.log("series", series);
    return series;
}
