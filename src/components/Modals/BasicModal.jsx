import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export function BasicModal(props) {
  const { body, header, submitLabel, cancelLabel, toggle, ...rest } = props;
  return (
    <div>
      <Modal toggle={toggle} {...rest}>
        <ModalHeader toggle={toggle}>{header}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {submitLabel}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            {cancelLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
