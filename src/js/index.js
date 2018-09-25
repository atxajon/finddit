// @todo: use webpack or parcel to compress...

import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById('limit').value;

  // Check input.
  if (searchTerm === '') {
    showMessage('Please add a search term', 'alert-danger');
  }
  searchInput.value = '';

  // Search Reddit.
  reddit.search(searchTerm, searchLimit, sortBy).then(
    results => {
      let output = '<div class="card-columns">';
      results.forEach(post => {
        // Check for image
        let image = post.preview
          ? post.preview.images[0].source.url
          : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
        output += `
        <div class="card mb-2">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank
          " class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span> 
          <span class="badge badge-dark">Score: ${post.score}</span>
        </div>
      </div>
        `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
})

const showMessage = (mssg, className) => { 
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(mssg));
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search');
  searchContainer.insertBefore(div, search);

  // Remove alert message after 3 seconds.
  const alertInterval = setInterval(function() {
    const alertDisplay = document.querySelector('.alert');
    // If we have a div.alert remove it and exit the setInterval loop.
    if (alertDisplay !== undefined) {
      document.querySelector('.alert').remove();
      clearInterval(alertInterval);
    }
  }, 3000);
}

const truncateText = (text, limit) => {
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}