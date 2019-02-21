import React from "react";
// import Button from "../components/Button";
import axios from "axios";
import { Link } from "react-router-dom";

const limit = 25;

class Home extends React.Component {
  state = {
    offers: [],
    count: 0,
    page: 1,
    totalPages: 0
  };
  getOffers = async pageCliked => {
    const skip = (pageCliked - 1) * limit;

    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=${skip}&limit=${limit}`
    );
    this.setState({
      offers: response.data.offers,
      page: pageCliked,
      count: response.data.count,
      totalPages: Math.ceil(response.data.count / limit)
    });
  };
  render() {
    const pagesLink = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      pagesLink.push(
        <li
          onClick={() => this.getOffers(i + 1)}
          key={i}
          style={{ color: i + 1 === this.state.page ? "pink" : "black" }}
        >
          {i + 1}
        </li>
      );
    }

    return (
      <>
        <h1>Home</h1>
        <ul className="offers-list">
          {this.state.offers.map((offer, index) => {
            return (
              <li key={offer.id} className="offers-list-item">
                <Link to={"/offer/" + offer._id}>
                  {offer.title}
                  <br />
                  {offer.price}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul>{pagesLink}</ul>
        <Link to="offer/1">Lien vers annonces</Link>
      </>
    );
  }
  async componentDidMount() {
    const response = await axios.get(
      "https://leboncoin-api.herokuapp.com/api/offer/with-count"
    );
    this.setState({
      offers: response.data.offers,
      count: response.data.count,
      totalPages: Math.ceil(response.data.count / limit)
    });
  }
}
export default Home;
