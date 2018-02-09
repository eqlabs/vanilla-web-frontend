import React from "react";

import { LocalSpinner } from "../../components/Loading";
import { OrderList } from "../../components/Orders";
import { retrieveOpenOrders } from "../../controllers/Orders";

export default class OpenOrdersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true
    };
  }

  componentWillMount() {
    retrieveOpenOrders().then(orders => {
      this.setState({
        orders,
        loading: false
      });
    });
  }

  render() {
    const { loading, orders } = this.state;

    if (loading) return <LocalSpinner />;

    return <OrderList orders={orders} />;
  }
}
