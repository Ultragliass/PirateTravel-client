import { reducer } from "./reducer";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

export function createReduxStore() {
  const logger = createLogger();
  const middleware = composeWithDevTools(applyMiddleware(logger, thunk));
  return createStore(reducer, middleware);
}
