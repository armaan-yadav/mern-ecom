import { Product } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface ProductsSliceInitialState {
  loading: boolean;
  products: Product[];
}

const initialState: ProductsSliceInitialState = {
  loading: true,
  products: [],
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default productsSlice;
export const {} = productsSlice.actions;
