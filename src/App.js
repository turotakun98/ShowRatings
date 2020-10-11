import React from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import PanelEpisodes from "./components/panelEpisodes";
import LoadingSpinner from "./components/loadingSpinner";
import UtilityBar from "./components/utilityBar";
import getEpisodesFromID from "./logic/getEpisodesFromID";
import getSeriesInfoFromID from "./logic/getSeriesInfoFromID";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import iconImageNotFound from "./iconImageNotFound.png";
import Collapse from "@material-ui/core/Collapse";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.clickCollapse = this.clickCollapse.bind(this);
        this.handleHideScroll = this.handleHideScroll.bind(this);
        this.handleChangeMaxScrollSize = this.handleChangeMaxScrollSize.bind(this);
    }

    state = {
        series: null,
        seriesInfo: null,
        episodesList: [],
        loading: false,
        collapse: false,
        hideScroll: false,
        maxScrollSize: 20,
    };

    async handleSearch(series) {
        this.setState({ loading: true });

        var seriesInfo = await getSeriesInfoFromID(series.idImdb);
        var epsPromise = getEpisodesFromID(series.idImdb, seriesInfo.totalSeasons);

        var epsTmp = await epsPromise;
        //var seriesInfo = await seriesInfoPromise;
        const maxScroll = this.state.maxScrollSize;
        this.setState({
            episodesList: epsTmp,
            episodesListShort: this.resizeTableScroll(epsTmp, maxScroll),
            series: series,
            seriesInfo: seriesInfo,
            loading: false,
        });
    }

    getImage() {
        const { series } = this.state;
        var image = "";

        if (series) {
            var imageLink = series.imageLink;
            image = imageLink;
        }

        return image;
    }

    clickCollapse(event) {
        this.setState({ collapse: !this.state.collapse });
    }

    handleHideScroll(event) {
        this.setState({ hideScroll: event.target.checked });
    }

    handleChangeMaxScrollSize(event) {
        this.setState({ maxScrollSize: parseInt(event.target.value) }, () => {
            this.setState({
                episodesListShort: this.resizeTableScroll(this.state.episodesList, this.state.maxScrollSize),
            });
        });
    }

    resizeTableScroll(episodes, maxScroll) {
        const epsTmp = episodes;
        var eps = {};

        Object.keys(epsTmp).map((season) => {
            for (let i = 0; i < epsTmp[season].length; i += maxScroll) {
                var seasonNumber = i / maxScroll >= 1 ? `${season}.${i / maxScroll}` : season;
                eps[seasonNumber] = epsTmp[season].slice(i, i + maxScroll);
            }
        });

        return eps;
    }

    render() {
        return (
            <div className="App">
                <LoadingSpinner loading={this.state.loading} />
                <div className="row" style={{ margin: 0 }}>
                    <div className="col-md-4" />
                    <div className="col-md-4">
                        <SearchBar onSearch={this.handleSearch} style={{ marginTop: 20 }} />
                    </div>
                </div>

                <div
                    className="row"
                    style={{
                        height: this.state.pnlH ? this.state.pnlH : "",
                        margin: 0,
                    }}
                >
                    <div className="col-md-2">
                        {this.state.series && (
                            <button
                                className="btn btn-primary d-sm-none"
                                style={{ margin: 20 }}
                                onClick={this.clickCollapse}
                            >
                                {this.state.collapse ? "Expand" : "Collapse"}
                            </button>
                        )}
                        <Collapse in={!this.state.collapse}>
                            {this.state.series && (
                                <SeriesInfoCard series={this.state.series} seriesInfo={this.state.seriesInfo} />
                            )}
                        </Collapse>
                    </div>

                    <UtilityBar
                        hideScroll={this.state.hideScroll}
                        onHideScroll={this.handleHideScroll}
                        onChangeMaxScrollSize={this.handleChangeMaxScrollSize}
                    >
                        <PanelEpisodes
                            id="pnlEpisodes"
                            episodesList={
                                this.state.hideScroll ? this.state.episodesListShort : this.state.episodesList
                            }
                        />
                    </UtilityBar>
                </div>
            </div>
        );
    }
}

function SeriesInfoCard(props) {
    return (
        <Card>
            <CardMedia
                classes={{ media: "seriesCover" }}
                component="img"
                src={props.series && (props.series.imageLink || iconImageNotFound)}
                // alt={this.state.series != null ? this.state.series.title : ""}
            />
            <CardContent className="card-title">
                <Typography variant="body2" align="left" display="block">
                    <b>Genres: </b>
                    {props.seriesInfo ? `${props.seriesInfo.genres}` : ""}
                </Typography>
                <Typography variant="body2" align="left" display="block">
                    <b>Rate: </b>
                    {props.seriesInfo ? `${props.seriesInfo.rate}/10 (${props.seriesInfo.rateCount} votes)` : ""}
                </Typography>
                <Typography variant="body2" align="left" display="block">
                    <b>Plot: </b>
                    {props.seriesInfo ? `${props.seriesInfo.plot}` : ""}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default App;
