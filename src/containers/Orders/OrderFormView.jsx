import React from "react";

import { _ } from "../../components/Localize";

const validHex = /^(0x|0X)?[a-fA-F0-9]+$/;

export class OrderFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { withdrawAddress: null, isValidWithdrawAddress: null };
  }

  validateWithdrawAddress(withdrawAddress) {
    return withdrawAddress.length === 42 && validHex.test(withdrawAddress);
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

  render() {
    const { isValidWithdrawAddress } = this.state;
    const { Child, childProps } = this.props;

    return (
      <Child
        onInputChange={this.onInputChange.bind(this)}
        inputValidations={{ withdrawAddress: isValidWithdrawAddress }}
        formIsValid={isValidWithdrawAddress}
        submitLabel={_("order.actions.proceed")}
        cancelLabel={_("order.actions.cancel")}
        {...childProps}
      />
    );
  }
}
