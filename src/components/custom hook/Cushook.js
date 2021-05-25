import { useState, useCallback } from 'react';

const useCushook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(async (request, datas) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : 'GET',
        headers: request.headers ? request.headers : {},
        body: request.body ? JSON.stringify(request.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      datas(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    makeRequest,
  };
};

export default useCushook;