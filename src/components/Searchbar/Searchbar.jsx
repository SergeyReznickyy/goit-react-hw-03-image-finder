import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = ({ currentTarget: { value } }) => {
    this.setState({ inputValue: value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = this.state.inputValue.trim().toLowerCase();
    if (!query) {
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again',
        { autoClose: 1500 }
      );
    }
    this.props.onSubmit(query);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <AiOutlineSearch color="black" size="25px" />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={inputValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
