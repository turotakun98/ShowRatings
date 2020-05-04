import React, { Component } from "react";
import "./searchBar.css";
import getSeriesListByTitle from "../logic/getSeriesListByTitle";

class SearchBar extends Component {
  state = {
    text: "",
    suggestions: [],
    showSuggestions: true,
  };

  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

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

  async handleTextChange(event) {
    this.setState({ text: event.target.value }, async () => {
      if (this.state.text) {
        var listSeries = await getSeriesListByTitle(
          this.state.text.toLowerCase()
        );

        this.setState({ suggestions: listSeries });
      } else {
        this.setState({ suggestions: [] });
      }
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
