import React, { Component } from "react";

import {
  Container,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import Dropper from "./components/layouts/Dropper";
import ProductsList from "./components/layouts/ProductsList";
import { UncontrolledTooltip } from "reactstrap";
import productsActions from "./redux/actions/productsActions";
const { searchProducts, getProducts, createProduct } = productsActions;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: "",
      modalOpen: false,
      newProduct: {},
    };
  }
  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      newProduct: {},
    });
  };
  handleTextChange = (e) => {
    this.setState({ searchTxt: e.target.value }, () => {
      if (this.state.searchTxt === "") this.props.getProducts();
    });
  };
  handleModelTextChange = (e) => {
    let newProd = this.state.newProduct;
    newProd[e.target.name] = e.target.value;
    this.setState({ newProduct: newProd });
  };
  saveProduct = () => {
    this.props.createProduct(this.state.newProduct);
    this.toggle();
  };
  render() {
    return (
      <div className="mt-5">
        <div>
          <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Add a product</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Dropper />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Product Name:</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="ex: 'Apple'"
                    onChange={(e) => this.handleModelTextChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Quantity:</Label>
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="ex: '2'"
                    onChange={(e) => this.handleModelTextChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Price: ($)</Label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="ex: '5'"
                    min="0"
                    max="10"
                    onChange={(e) => this.handleModelTextChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Colour:</Label>
                  <Input
                    type="text"
                    name="colour"
                    placeholder="ex: 'Red'"
                    onChange={(e) => this.handleModelTextChange(e)}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.saveProduct()}>
                Save
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <Container>
          <Row className="mb-5">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search icon"></i>
                </InputGroupText>
              </InputGroupAddon>

              <Input
                id="searchText"
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  this.handleTextChange(e);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.props.searchProducts(this.state.searchTxt);
                  }
                }}
              />
              <UncontrolledTooltip placement="right" target="searchText">
                Click Enter to search!
              </UncontrolledTooltip>
            </InputGroup>{" "}
          </Row>
          <Row>
            <Col lg="2">
              <Button
                size="md"
                color="primary"
                onClick={() => this.setState({ modalOpen: true })}
              >
                Add Product
              </Button>
            </Col>
            <Col lg="10">
              <Dropper />
            </Col>
          </Row>
        </Container>

        <hr style={{ marginLeft: "120px", marginRight: "120px" }} />

        <Container>
          <Row className="mb-3">
            <ProductsList />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.products.products });
export default connect(mapStateToProps, {
  searchProducts,
  getProducts,
  createProduct,
})(App);
