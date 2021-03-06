import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

import { BasicModal } from "../Modals";
import { _ } from "../Localize";

export function OrderModalHeader({ template, longshort }) {
  return `You are about to create a ${longshort} order`;
}

export function OrderModalBody(props) {
  const { template, onInputChange, inputValidations } = props;

  return (
    <div>
      {_(template.leverage)} <br />
      {_(template.currencyPair)} <br />
      {_(template.duration)}
      <br />
      <br />
      <Form>
        <FormGroup>
          <Label for="withdrawAddress">
            {_("order.form.withdrawAddress.label")}
          </Label>
          <Input
            autoFocus
            valid={inputValidations["withdrawAddress"]}
            onChange={e => onInputChange(e, "withdrawAddress")}
          />
          <br />
          <Label for="email">{_("order.form.email.label")}</Label>
          <Input
            type="email"
            valid={inputValidations["userEmail"]}
            onChange={e => onInputChange(e, "userEmail")}
          />
        </FormGroup>
      </Form>
    </div>
  );
}

export function OrderModal(props) {
  const {
    template,
    longshort,
    formIsValid,
    inputValidations,
    onInputChange,
    ...rest
  } = props;
  return (
    <BasicModal
      header={<OrderModalHeader template={template} longshort={longshort} />}
      body={
        <OrderModalBody
          template={template}
          longshort={longshort}
          onInputChange={onInputChange}
          inputValidations={inputValidations}
        />
      }
      submitEnabled={formIsValid}
      backdrop={"static"}
      {...rest}
    />
  );
}
