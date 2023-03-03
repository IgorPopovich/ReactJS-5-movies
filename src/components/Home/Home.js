import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from './Home.module.css';

export default class Home extends Component {
  state = {
    items: null,
    showLoader: false,
  }

  updateId = (name) => {
    this.props.getId(name)
  }

  componentDidMount() {
    this.setState({ showLoader: true })
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=d3f7b1c0656b5d6ae1aec003a1724af6`)
    .then(response => response.json())
    .then(data => {
      this.setState({ items: data.results })
    })
    this.setState({ showLoader: false })
  }
  
  render () {
    return (
    <div className={css.container}>
      <ul className={css.items}>
        {this.state.showLoader && <Loader />}
            {this.state.items && this.state.items.map(( item, index ) => (
              <Link onClick={() => this.updateId(item.id)} to={`/movies/:${item.id}`} className={css.item} key={index}>
                {item.title}
              </Link>
            ))}
      </ul>
    </div>
    )
  }
}

Home.propTypes = {
  getId: PropTypes.func,
  showLoader: PropTypes.bool,
  items: PropTypes.array,
};