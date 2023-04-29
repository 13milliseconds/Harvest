
import { useState } from "react";

export default (apiFunc, successFunc, loadingFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const request = async (...args) => {
    loadingFunc(true);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
        loadingFunc(false);
    }
  };

  return {
    data,
    error,
    request
  };
};