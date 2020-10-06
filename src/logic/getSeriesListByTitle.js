import TitleInfo from "../classes/titleInfo";
import config from "../config/config";

export default async function getSeriesListByTitle(title) {
    var titleEncoded = encodeURI(title);
    const urlTmdb = `https://api.themoviedb.org/3/search/tv?api_key=${config.tmdbApiKey}&language=en-US&page=1&query=${titleEncoded}&include_adult=false`;
    const responseTitles = await fetch(urlTmdb);
    const dataTitles = await responseTitles.json();

    var listSeries = [];

    if (dataTitles && dataTitles.results && dataTitles.results) {
        for (let i = 0; i < dataTitles.results.length; i++) {
            var series = new TitleInfo(
                dataTitles.results[i].id,
                dataTitles.results[i].name,
                dataTitles.results[i].first_air_date ? dataTitles.results[i].first_air_date.substring(0, 4) : "N.A.",
                dataTitles.results[i].poster_path ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + dataTitles.results[i].poster_path : ""
            );
            listSeries.push(series);
        }
    }

    return listSeries.slice(0, 5);
}
