const productsActions = {
  GET_PRODUCTS: "GET_PRODUCTS",
  PRODUCTS_LOADED: "PRODUCTS_LOADED",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  SEARCH_PRODUCT: "SEARCH_PRODUCT",
  CREATE_PRODUCT: "CREATE_PRODUCT",
  createProduct: (product) => async (dispatch) => {
    try {
      product.imgSrc = "x.jpg";
      const res = await fetch("/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });

      product.id = (await res.json()).id;

      dispatch({ type: productsActions.CREATE_PRODUCT, payload: product });
    } catch (err) {}
  },
  searchProducts: (search) => ({
    type: productsActions.SEARCH_PRODUCT,
    payload: search,
  }),
  getProducts: () => async (dispatch) => {
    try {
      const res = await fetch("/products");
      const data = await res.json();
      dispatch({ type: productsActions.GET_PRODUCTS, payload: data });
    } catch (err) {}
  },
  deleteProduct: (id) => async (dispatch) => {
    try {
      const res = await fetch("/products/" + id, { method: "DELETE" });

      dispatch({ type: productsActions.DELETE_PRODUCT, payload: id });
    } catch (err) {}
  },
};
export default productsActions;
