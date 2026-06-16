import { useState } from 'react';

export const useApiCall = (apiFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  return [execute, { isLoading, error }];
};
