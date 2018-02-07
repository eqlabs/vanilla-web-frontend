import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

import { BasicModal } from "./BasicModal";
import { _ } from "../Localize";

export function OrderModalHeader({ template, longshort }) {
  return `Template #${template.id} ${longshort}`;
}

export class OrderModalBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { withdrawAddress: null, isValidWithdrawAddress: null };

    this.validateWithdrawAddress = this.validateWithdrawAddress.bind(this);
  }

  validateWithdrawAddress(withdrawAddress) {
    // TODO: Check what acculy makes a valid address
    return withdrawAddress.indexOf("0x") === 0 && withdrawAddress.length === 42;
  }

  onWithdrawAddressChange(event) {
    const withdrawAddress = event.target.value;
    if (this.validateWithdrawAddress(withdrawAddress)) {
      this.setState({ withdrawAddress, isValidWithdrawAddress: true });
    } else {
      this.setState({ isValidWithdrawAddress: false });
    }
  }

  render() {
    const { template } = this.props;
    const { isValidWithdrawAddress } = this.state;

    return (
      <div>
        {template.leverage} <br />
        {template.currencyPair} <br />
        {template.duration}
        <br />
        <br />
        <Form>
          <FormGroup>
            <Label for="withdrawAddress">
              {_("order.form.withdrawAddress.label")}
            </Label>
            <Input
              valid={isValidWithdrawAddress}
              onChange={this.onWithdrawAddressChange.bind(this)}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export function OrderModal(props) {
  const { template, longshort, ...rest } = props;
  return (
    <BasicModal
      header={<OrderModalHeader template={template} longshort={longshort} />}
      body={<OrderModalBody template={template} longshort={longshort} />}
      {...rest}
    />
  );
}
