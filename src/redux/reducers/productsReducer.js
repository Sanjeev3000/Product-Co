import productsActions from "../actions/productsActions";

const iniState = {
  products: [],
};

export default (state = iniState, action) => {
  switch (action.type) {
    case productsActions.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case productsActions.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((x) => x.id !== action.payload),
      };
    case productsActions.SEARCH_PRODUCT:
      let search = action.payload;

      let newArray = state.products.filter((x) =>
        x.name.toString().toUpperCase().includes(search.toUpperCase())
      );

      return { ...state, products: newArray };
    case productsActions.CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};
