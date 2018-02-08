import React from "react";

import { _ } from "../../components/Localize";
import { TemplateListing } from "../../components/Templates";
import { OrderModal } from "../../components/Modals";
import { getTemplates } from "../../controllers/Templates";
import { OrderFormView } from "../Orders";

export class TemplateListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderModalOpen: false,
      activeTemplate: null,
      longshort: null
    };
  }

  openOrderModal(longshort, activeTemplate) {
    this.setState({
      orderModalOpen: true,
      activeTemplate,
      longshort
    });
  }

  toggleOrderModal() {
    // If the modal is currently open, set these 2 to null so they are null
    // when the modal is closed
    const activeTemplate = this.state.orderModalOpen
      ? null
      : this.state.activeTemplate;

    const longshort = this.state.orderModalOpen ? null : this.state.longshort;

    this.setState({
      orderModalOpen: !this.state.orderModalOpen,
      activeTemplate,
      longshort
    });
  }

  render() {
    const { activeTemplate, longshort, orderModalOpen } = this.state;

    const templateActions = {
      short: this.openOrderModal.bind(this, "short"),
      long: this.openOrderModal.bind(this, "long")
    };

    const modalProps = {
      isOpen: orderModalOpen,
      toggle: this.toggleOrderModal.bind(this),
      template: activeTemplate,
      longshort: longshort
    };

    return (
      <div>
        <TemplateListing templates={getTemplates({ templateActions })} />
        {activeTemplate && (
          <OrderFormView Child={OrderModal} childProps={modalProps} />
        )}
      </div>
    );
  }
}
