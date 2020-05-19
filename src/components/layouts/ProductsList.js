import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import productsActions from "../../redux/actions/productsActions";
const { getProducts, deleteProduct } = productsActions;
class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    this.props.getProducts();
    // this.props.deleteProduct();
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <Row>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <Col lg="2" className="mb-2" key={product.id}>
                <Card>
                  <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                  </CardBody>
                  <img
                    className="card-img-top"
                    width="200px"
                    height="200px"
                    src={`/assets/${product.imgSrc}`}
                  />
                  {/* <CardImg top width="100%" /> */}
                  <CardBody>
                    <CardTitle>{product.price} $</CardTitle>
                    <CardSubtitle>
                      {product.quantity > 0
                        ? "Qty: " + product.quantity
                        : "Out of order"}
                    </CardSubtitle>
                    <CardText>{product.colour}</CardText>
                    <Button
                      color="danger"
                      onClick={() => this.props.deleteProduct(product.id)}
                    >
                      X
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
        </Row>
        {products && products.length === 0 && (
          <Row>
            <Alert color="danger">Product Not Found</Alert>
          </Row>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ products: state.products.products });
export default connect(mapStateToProps, { getProducts, deleteProduct })(
  ProductsList
);
