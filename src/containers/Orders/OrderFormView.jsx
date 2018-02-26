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
      userEmail: "",
      isValidUserEmail: null,
      order: null
    };
  }

  validateWithdrawAddress(withdrawAddress) {
    return validateAddress(withdrawAddress);
  }

  validateEmailAddress(email) {
    // TODO
    return true;
  }

  onInputChange(event, field) {
    if (field === "withdrawAddress") {
      const withdrawAddress = event.target.value;
      if (this.validateWithdrawAddress(withdrawAddress)) {
        this.setState({ withdrawAddress, isValidWithdrawAddress: true });
      } else {
        this.setState({ isValidWithdrawAddress: false });
      }
    } else if (field === "userEmail") {
      const userEmail = event.target.value;
      if (this.validateEmailAddress(userEmail)) {
        this.setState({ userEmail, isValidUserEmail: true });
      } else {
        this.setState({ isValidUserEmail: false });
      }
    }
  }

  async onSubmit(event) {
    const { withdrawAddress, userEmail } = this.state;
    const { template, longshort } = this.props.childProps;

    if (this.validateWithdrawAddress(withdrawAddress)) {
      const data = {
        withdrawAddress,
        userEmail,
        longshort: "longshort.type." + longshort,
        ...template
      };

      const order = await createOrder(data);

      this.setState({ order });
    }
  }

  render() {
    const { isValidWithdrawAddress, isValidUserEmail, order } = this.state;
    const { Child, childProps } = this.props;

    if (order && order.orderId) {
      return <Redirect push to={`/orders/${order.orderId}`} />;
    }

    return (
      <Child
        onInputChange={this.onInputChange.bind(this)}
        inputValidations={{
          withdrawAddress: isValidWithdrawAddress,
          userEmail: isValidUserEmail
        }}
        formIsValid={isValidWithdrawAddress}
        submitLabel={_("order.actions.proceed")}
        cancelLabel={_("order.actions.cancel")}
        onSubmit={this.onSubmit.bind(this)}
        {...childProps}
      />
    );
  }
}
