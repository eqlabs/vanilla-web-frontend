import React from "react";
import { Table, ButtonGroup, Button } from "reactstrap";

import { _ } from "../Localize";
import { LocalSpinner } from "../Loading";

export function TemplateActions({ template }) {
  return (
    <ButtonGroup>
      <Button color={"danger"} onClick={template.onShortClick}>
        {_("template.action.short")}
      </Button>
      <Button color={"success"} onClick={template.onLongClick}>
        {_("template.action.long")}
      </Button>
    </ButtonGroup>
  );
}

export function TemplateRow({ template }) {
  return (
    <tr key={`templaterow-${template.id}`}>
      <td>{template.currencyPair}</td>
      <td>{template.leverage}</td>
      <td>{template.duration}</td>
      <td>
        <TemplateActions template={template} />
      </td>
    </tr>
  );
}

export class TemplateListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { templates: [], loading: true };
  }

  async componentWillMount() {
    this.setState({ templates: await this.props.templates, loading: false });
  }

  render() {
    const { loading, templates } = this.state;

    return !loading ? (
      <div>
        <Table>
          <tbody
            children={templates.map(template => TemplateRow({ template }))}
          />
        </Table>
      </div>
    ) : (
      <LocalSpinner />
    );
  }
}
