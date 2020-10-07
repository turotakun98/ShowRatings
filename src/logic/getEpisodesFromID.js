import EpisodeInfo from "../classes/episodeInfo";
import config from "../config/config";

export default async function getEpisodesFromID(idSeries, totalSeasons) {
    const url = "https://www.omdbapi.com/?apikey=" + config.omdbApiKey + "&i=" + idSeries + "&Season=";
    var listEpisodes = {};
    for (let seas = 1; seas <= totalSeasons; seas++) {
        const urlSeason = url + seas;
        const response = await fetch(urlSeason);
        const data = await response.json();
        if (data.Response === "True") {
            for (let ep = 0; ep < data.Episodes.length; ep++) {
                var episode = new EpisodeInfo(
                    data.Episodes[ep].Title,
                    "https://www.imdb.com/title/" + data.Episodes[ep].imdbID,
                    "", //data.Episodes[ep].Poster,
                    data.Episodes[ep].imdbRating,
                    0, //data.Episodes[i].imdbVotes
                    data.Episodes[ep].Released.substring(0, 4),
                    data.Episodes[ep].Episode,
                    seas
                );
                if (!listEpisodes[episode.season]) listEpisodes[episode.season] = [episode];
                else listEpisodes[episode.season].push(episode);
            }
        }
    }

    return listEpisodes;
}
