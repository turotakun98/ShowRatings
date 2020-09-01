import TitleInfo from "../classes/titleInfo";
import config from "../config/config";

export default async function getSeriesListByTitle(title) {
    var titleWithoutSpaces = title.replace(/\s/g, "+");
    const url = "https://www.omdbapi.com/?type=series&apikey=" + config.omdbApiKey + "&s=" + titleWithoutSpaces;
    const response = await fetch(url);
    const data = await response.json();
    var listSeries = [];

    if (data && data.Response === "True" && data.Search)
        for (let i = 0; i < data.Search.length; i++) {
            var series = new TitleInfo(
                data.Search[i].imdbID,
                data.Search[i].Title,
                data.Search[i].Year,
                data.Search[i].Poster !== "N/A" ? data.Search[i].Poster : ""
            );
            listSeries.push(series);
        }
    return listSeries;
}
