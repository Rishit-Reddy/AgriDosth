// src/redux/totalPrice/totalPriceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TotalPriceState {
  totalPrice: number;
}

const initialState: TotalPriceState = {
  totalPrice: 0,
};

const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { setTotalPrice } = totalPriceSlice.actions;
export default totalPriceSlice.reducer;
