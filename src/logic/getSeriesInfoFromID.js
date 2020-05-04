import SeriesInfo from "../classes/seriesInfo";

export default async function getSeriesInfoFromID(idSeries) {
  const url = "http://localhost:9000/seriesInfo/" + idSeries;
  const response = await fetch(url);
  const data = await response.json();

  var series = new SeriesInfo(
    data.idImdb,
    data.genres,
    data.plot,
    data.rate,
    data.rateCount
  );
  console.log(series);
  return series;
}
