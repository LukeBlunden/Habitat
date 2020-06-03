import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  identifier: null,
  extra: null,
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        identifier: action.identifier,
        extra: null,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.data,
        extra: action.extra,
      };
    case "ERROR":
      return {
        loading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback((url, method, body, identifier, extra) => {
    dispatchHttp({ type: "SEND", identifier: identifier });
    fetch(url, {
      method: method,
      body: body,
      header: {
        "Content-Type": "application/json",
      },
    })  
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatchHttp({ type: "RESPONSE", data: resData, extra: extra });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", error: err });
      });
  }, []);

  return {
    httpLoading: httpState.loading,
    httpData: httpState.data,
    httpError: httpState.error,
    httpIdentifier: httpState.identifier,
    httpExtra: httpState.extra,
    sendRequest: sendRequest,
  };
};

export default useHttp;