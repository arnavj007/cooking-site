import { useState, useEffect } from "react"

// ! useFetch modified to work with other http requests [POST, PUT, DELETE]

export const useFetch = (url, method='GET') => { // * default method is GET, for retrieving data, but we can pass in POST
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  // * data to post will be passed in at the component, as an argument, as this function is returned by the useFetch hook
  // * on running it, function will then run here, which will set options, which is a dependency of the useEffect hook
  // * that will then trigger useEffect code to run again, and since everything is now set, POST request will be made
  const postData = (postingData) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postingData)
    });
  };

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal }) // ! fetchOptions added for POST request
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    if (method === 'GET')
      fetchData();
    if (method === 'POST' && options) // ! in case of POST request, only make fetch request IF OPTIONS are set
      fetchData(options);

    return () => {
      controller.abort()
    }

  }, [url, options, method]); // ! options and method added as dependency as we must re-run this code once they are set/change

  return { data, isPending, error, postData } // ! returning 'postData' function as well to use
}