import React from "react";
import axios from "axios";

class Offer extends React.Component {
  state = {
    offer: {},
    isLoading: true
  };
  render() {
    if (this.state.isLoading === true) {
      return <p>Page en cour de chargement...</p>;
    }

    return (
      <>
        <h1>Annonces</h1>
        <p>{this.state.offer.creator.account.username}</p>
        <p>{this.state.offer.title}</p>
        <p>{this.state.offer.price}</p>
        <p>{this.state.offer.description}</p>
      </>
    );
  }
  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.offerId
      );
      this.setState({
        offer: response.data,
        isLoading: false
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
export default Offer;
