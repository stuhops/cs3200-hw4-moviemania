import React from 'react';
import { Col, Row} from 'react-native-easy-grid';
import { Container, Text, Button } from 'native-base';

export default class HomePage1 extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Text>Welcome to the info section</Text>
          </Col>
        </Row>
      </Container>
    );
  }
}
