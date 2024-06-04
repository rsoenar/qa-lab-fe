import React, { PureComponent, Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import { Separator } from '../../components/Layouts';

export default class Dashboards extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <Fragment>
        <Row>
          <Col xxs="12">
            <Breadcrumb heading="Dashboards" match={match} />
            <Separator className="mb-5" />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
