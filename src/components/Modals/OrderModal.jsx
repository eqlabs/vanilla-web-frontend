import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

import { BasicModal } from "./BasicModal";
import { _ } from "../Localize";

export function OrderModalHeader({ template, longshort }) {
  return `Template #${template.id} ${longshort}`;
}

export function OrderModalBody(props) {
  const { template, onInputChange, inputValidations } = props;

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
            valid={inputValidations["withdrawAddress"]}
            onChange={e => onInputChange(e, "withdrawAddress")}
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
