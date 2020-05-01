import React, { Component } from "react";
import SeriesInfo from "../classes/seriesInfo";
import "./searchBar.css";
import axios from "axios";

class SearchBar extends Component {
  state = {
    text: "",
    suggestions: [],
    showSuggestions: true,
  };

  render() {
    return (
      <div
        className="SearchBar"
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        <input
          type="text"
          placeholder="Search TV show ..."
          onChange={this.handleTextChange}
          value={this.state.text}
        />
        {this.renderSuggestion()}
      </div>
    );
  }

  handleFocus = (event) => {
    this.setState({ showSuggestions: true });
  };

  handleBlur = (event) => {
    console.log("blur");
    this.setState({ showSuggestions: false });
  };

  handleTextChange = (event) => {
    this.setState({ text: event.target.value }, () => {
      if (this.state.text) {
        this.getSeriesListByTitle(this.state.text.toLowerCase());
      } else {
        this.setState({ suggestions: [] });
      }
    });
  };

  /*async getSeriesListByTitle(title) {
    var titleWithoutSpaces = title.replace(/\s/g, "_");
    const url = "http://localhost:9000/titleList/" + titleWithoutSpaces;
    const response = await fetch(url);
    const data = await response.json();
    var listSeries = [];

    for (let i = 0; i < data.length; i++) {
      var series = new SeriesInfo(
        data[i].idImdb,
        data[i].title,
        data[i].years,
        data[i].imageLink
      );

      listSeries.push(series);
      //console.log(series);
    }

    this.setState({ suggestions: listSeries });
    return data;
  }*/

  async getSeriesListByTitle(title) {
    var listSeries = [];

    var url = `/suggests/${title[0]}/${title}.json`;
    var callResp = await this.callHttpMethod(url);
    console.log("callResp", callResp.data);
    var respBody = callResp.data;
    var replHead = "imdb$" + title + "(";
    respBody = respBody.replace(replHead, "");
    respBody = respBody.substring(0, respBody.length - 1);
    var respJson = JSON.parse(respBody).d;
    respJson.forEach((el) => {
      if (el["q"] == "TV series") {
        var image = null;
        if (el["i"]) image = el["i"][0];

        var series = new SeriesInfo(el["id"], el["l"], el["yr"], image);
        listSeries.push(series);
      }
    });

    this.setState({ suggestions: listSeries });
  }

  async callHttpMethod(url) {
    return new Promise((result) => {
      console.log("Requesting api");
      const response = axios.get(url);
      result(response);
    });
  }

  handleClick(index) {
    const { suggestions } = this.state;
    var selectedSuggestion = suggestions[index];
    //console.log("selectedSuggestion", selectedSuggestion);
    this.setState({
      text: selectedSuggestion.title,
    });
    this.props.onSearch(selectedSuggestion /*.idImdb*/);
  }

  renderSuggestion() {
    const { suggestions } = this.state;
    const { showSuggestions } = this.state;
    if (suggestions.length === 0 || !showSuggestions) {
      return null;
    }

    return (
      //this.loadSeriesInfo.bind(this, item)
      <ul>
        {this.state.suggestions.map((item, i) => (
          <li onMouseDown={() => this.handleClick(i)} key={"li" + item.idImdb}>
            <div className="BasicContainer">
              <img
                src={item.imageLink}
                key={"img" + item.idImdb}
                alt={item.title}
              />
              <div className="TitleContainer">
                <h4>{`${item.title}`}</h4>
                <h5>{`${item.years}`}</h5>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default SearchBar;
