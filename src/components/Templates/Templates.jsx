import React from "react";
import { Table, ButtonGroup, Button } from "reactstrap";

import { _ } from "../Localize";
import { LocalSpinner } from "../Loading";

export function TemplateActions({ template, templateActions }) {
  return (
    <ButtonGroup>
      <Button color={"danger"} onClick={() => templateActions.short(template)}>
        {_("template.action.short")}
      </Button>
      <Button color={"success"} onClick={() => templateActions.long(template)}>
        {_("template.action.long")}
      </Button>
    </ButtonGroup>
  );
}

export function TemplateRow({ template, templateActions }) {
  return (
    <tr key={`templaterow-${template.id}`}>
      <td>{_(template.currencyPair)}</td>
      <td>{_(template.leverage)}</td>
      <td>{_(template.duration)}</td>
      <td>
        <TemplateActions
          template={template}
          templateActions={templateActions}
        />
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
    const { templateActions } = this.props;

    return !loading ? (
      <div>
        <Table>
          <tbody
            children={templates.map(template =>
              TemplateRow({ template, templateActions })
            )}
          />
        </Table>
      </div>
    ) : (
      <LocalSpinner />
    );
  }
}
