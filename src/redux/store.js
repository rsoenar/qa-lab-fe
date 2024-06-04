import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = import("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
