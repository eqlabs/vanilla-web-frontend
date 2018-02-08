import React from "react";
import { Redirect } from "react-router";

import { _ } from "../../components/Localize";
import { createOrder } from "../../controllers/Orders";
import { validateAddress } from "../../util/eth";

export default class OrderFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      withdrawAddress: null,
      isValidWithdrawAddress: null,
      order: null
    };
  }

  validateWithdrawAddress(withdrawAddress) {
    return validateAddress(withdrawAddress);
  }

  onInputChange(event, field) {
    if (field === "withdrawAddress") {
      const withdrawAddress = event.target.value;
      if (this.validateWithdrawAddress(withdrawAddress)) {
        this.setState({ withdrawAddress, isValidWithdrawAddress: true });
      } else {
        this.setState({ isValidWithdrawAddress: false });
      }
    }
  }

  async onSubmit(event) {
    const { withdrawAddress } = this.state;
    const { template, longshort } = this.props.childProps;

    if (this.validateWithdrawAddress(withdrawAddress)) {
      const data = {
        withdrawAddress,
        longshort,
        ...template
      };

      const order = await createOrder(data);

      this.setState({ order });
    }
  }

  render() {
    const { isValidWithdrawAddress, order } = this.state;
    const { Child, childProps } = this.props;

    if (order && order.orderId) {
      return <Redirect push to={`/order/${order.orderId}`} />;
    }

    return (
      <Child
        onInputChange={this.onInputChange.bind(this)}
        inputValidations={{ withdrawAddress: isValidWithdrawAddress }}
        formIsValid={isValidWithdrawAddress}
        submitLabel={_("order.actions.proceed")}
        cancelLabel={_("order.actions.cancel")}
        onSubmit={this.onSubmit.bind(this)}
        {...childProps}
      />
    );
  }
}
