import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    console.log("cdm");
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
    // console.log(deck);
  }

  async getCard() {
    // console.log(this.state.deck);
    //make request using card_id
    // console.log(this.state.deck.deck_id);

    try {
      let deck_id = this.state.deck.deck_id;
      let cardRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/?count=1`);
      if (!cardRes.data.success) {
        throw new Error("no cards remaining");
      }
      // console.log(cardRes);
      let card = cardRes.data.cards[0];
      // console.log(card);
      //SET STATE USING THE NEW CARD

      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
    //set state using new card id
  }
  render() {
    const cards = this.state.drawn.map((card) => (
      <Card key={card.id} img={card.image} name={card.name} />
    ));
    return (
      <div>
        <h1 className="deck-title">card dealer</h1>
        <h2 className="deck-subtitle">a little demo with react </h2>
        <button className="deck-btn" onClick={this.getCard}>
          get card
        </button>
        <div className="deck-container">{cards}</div>
      </div>
    );
  }
}
