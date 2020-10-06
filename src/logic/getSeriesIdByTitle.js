import TitleInfo from "../classes/titleInfo";
import config from "../config/config";

export default async function getSeriesIdByTitle(title) {
    var titleWithoutSpaces = title.replace(/\s/g, "+");
    const urlOmdb = "https://www.omdbapi.com/?type=series&apikey=" + config.omdbApiKey + "&s=" + titleWithoutSpaces;
    const response = await fetch(urlOmdb);
    const data = await response.json();

    if (data && data.Response === "True" && data.Search)
        return new TitleInfo(data.Search[0].imdbID, data.Search[0].Title, data.Search[0].Year, data.Search[0].Poster !== "N/A" ? data.Search[0].Poster : "");
}
