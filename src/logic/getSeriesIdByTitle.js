import TitleInfo from "../classes/titleInfo";
import config from "../config/config";

export default async function getSeriesIdByTitle(title, year) {
    var titleWithoutSpaces = title.replace(/\s/g, "+");
    const urlOmdb = "https://www.omdbapi.com/?type=series&apikey=" + config.omdbApiKey + "&s=" + titleWithoutSpaces;
    const response = await fetch(urlOmdb);
    const data = await response.json();
    var tmpTitleInfo;

    if (data && data.Response === "True" && data.Search) {
        tmpTitleInfo = new TitleInfo(
            data.Search[0].imdbID,
            data.Search[0].Title,
            data.Search[0].Year,
            data.Search[0].Poster !== "N/A" ? data.Search[0].Poster : ""
        );

        for (let i = 0; i < data.Search.length; i++) {
            if (data.Search[i].Title.toLowerCase() === title.toLowerCase()) {
                tmpTitleInfo = new TitleInfo(
                    data.Search[i].imdbID,
                    data.Search[i].Title,
                    data.Search[i].Year,
                    data.Search[i].Poster !== "N/A" ? data.Search[i].Poster : ""
                );
                if (tmpTitleInfo.years === null || year === "N.A" || tmpTitleInfo.years.split("–")[0] === year) {
                    return tmpTitleInfo;
                }
            }
        }
    }

    return tmpTitleInfo;
}
