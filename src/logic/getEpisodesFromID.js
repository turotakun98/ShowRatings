import EpisodeInfo from "../classes/episodeInfo";

export default async function getEpisodesFromID(idSeries) {
  const url = "http://localhost:9000/episodesList/" + idSeries;
  const response = await fetch(url);
  const data = await response.json();
  var listEpisodes = {};

  for (let i = 0; i < data.length; i++) {
    var episode = new EpisodeInfo(
      data[i].title,
      data[i].link,
      data[i].imageLink,
      data[i].rating,
      data[i].ratingCount,
      data[i].year,
      data[i].number,
      data[i].season
    );
    if (!listEpisodes[episode.season]) listEpisodes[episode.season] = [episode];
    else listEpisodes[episode.season].push(episode);
  }

  return listEpisodes;
}
