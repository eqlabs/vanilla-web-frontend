import React from "react";

import { _ } from "../../components/Localize";
import { TemplateListing } from "../../components/Templates";
import { OrderModal } from "../../components/Modals";
import { getTemplates } from "../../controllers/Templates";

export class TemplateListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderModalOpen: false, activeTemplate: null };

    this.toggleOrderModal = this.toggleOrderModal.bind(this);
  }

  openOrderModal(longshort, template) {
    this.setState({
      orderModalOpen: true,
      activeTemplate: template,
      longshort
    });
  }

  toggleOrderModal() {
    this.setState({ orderModalOpen: !this.state.orderModalOpen });
  }

  render() {
    const { activeTemplate, longshort, orderModalOpen } = this.state;

    const templateActions = {
      short: this.openOrderModal.bind(this, "short"),
      long: this.openOrderModal.bind(this, "long")
    };

    return (
      <div>
        <TemplateListing templates={getTemplates({ templateActions })} />
        {activeTemplate && (
          <OrderModal
            isOpen={orderModalOpen}
            toggle={this.toggleOrderModal}
            submitLabel={_("order.actions.proceed")}
            cancelLabel={_("order.actions.cancel")}
            template={activeTemplate}
            longshort={longshort}
          />
        )}
      </div>
    );
  }
}
