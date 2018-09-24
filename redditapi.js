export default {
  search: async (searchTerm, searchLimit, sortBy) => {
    const urlToFetch = `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`;
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        // console.log(jsonResponse.data.children);
        return jsonResponse.data.children.map(data => data.data);
      }
      else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }
}
