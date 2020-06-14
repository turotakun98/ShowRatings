import React, { Component } from "react";
import "./searchBar.css";
import getSeriesListByTitle from "../logic/getSeriesListByTitle";
import iconImageNotFound from "../iconImageNotFound.png";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

class SearchBar extends Component {
  state = {
    text: "",
    suggestions: [],
    showSuggestions: true,
  };

  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
  }

  render() {
    return (
      <div
        className="SearchBar"
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        style={this.props.style}
      >
        <div>
          <input
            autoFocus
            ref={(input) => {
              this.searchInput = input;
            }}
            type="text"
            placeholder="Search TV show ..."
            onChange={this.handleTextChange}
            value={this.state.text}
          />
          <IconButton
            onClick={this.cancelSearch}
            style={{ width: 40, height: 40, float: "right" }}
          >
            <CancelIcon />
          </IconButton>
        </div>
        {this.renderSuggestion()}
      </div>
    );
  }

  cancelSearch() {
    this.setState({ text: "", suggestions: [], showSuggestions: false }, () => {
      this.searchInput.focus();
    });
  }

  handleFocus = (event) => {
    this.setState({ showSuggestions: true });
  };

  handleBlur = (event) => {
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
                src={item.imageLink || iconImageNotFound}
                key={"img" + item.idImdb}
                alt={item.imageLink ? item.title : ""}
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
