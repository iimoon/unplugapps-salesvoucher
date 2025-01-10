import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import detailsReducer from "./features/detailsSlice";
import itemsReducer from "./features/itemSlice";
import saveReducer from "./features/saveSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    details: detailsReducer,
    items: itemsReducer,
    save: saveReducer,
  }
});

export default store;
