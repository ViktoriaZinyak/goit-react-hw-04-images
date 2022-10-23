import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    request: '',
  };

  handleInputChange = e => {
    this.setState({ request: e.target.value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.request.trim() === '') {
      alert('Введите ваш запрос');
      return;
    }
    this.props.onSubmit(this.state.request);
    this.reset();
  };

  reset = () => {
    this.setState({ request: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <ImSearch />
            <span className={css.SearchForm__button_label}>Search</span>
          </button>
          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.request}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
