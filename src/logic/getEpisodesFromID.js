import EpisodeInfo from "../classes/episodeInfo";

export default async function getEpisodesFromID(idSeries) {
  const url = "http://localhost:9000/seriesInfo/" + idSeries;
  console.log(url);
  const response = await fetch(url);
  console.log("response");
  const data = await response.json();

  var listEpisodes = {};

  for (let i = 0; i < data.length; i++) {
    var episode = new EpisodeInfo(
      data[i].title,
      data[i].link,
      data[i].rating,
      data[i].year,
      data[i].number,
      data[i].season
    );
    if (!listEpisodes[episode.season]) listEpisodes[episode.season] = [episode];
    else listEpisodes[episode.season].push(episode);
  }
  console.log("matrix", listEpisodes);

  return listEpisodes;
}
