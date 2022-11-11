import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { UserReducer } from "./userReducer";


const rootReducer = combineReducers({
 user:UserReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>

const composeEnhancers = composeWithDevToolsDevelopmentOnly({
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;