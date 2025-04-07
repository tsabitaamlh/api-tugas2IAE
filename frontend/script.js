const API_URL = 'http://127.0.0.1:5000/movies';

const form = document.getElementById('movie-form');
const movieList = document.getElementById('movie-list');

async function fetchMovies() {
  const res = await fetch(API_URL);
  const movies = await res.json();
  renderMovies(movies);
}

function renderMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.className = "border p-3 rounded flex justify-between items-center";
    li.innerHTML = `
      <div>
        <strong>${movie.title}</strong> (${movie.year}) - Rating: ${movie.rating}
      </div>
      <div class="space-x-2">
        <button onclick="editMovie(${movie.id})" class="text-yellow-500">Edit</button>
        <button onclick="deleteMovie(${movie.id})" class="text-red-500">Hapus</button>
      </div>
    `;
    movieList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const year = document.getElementById('year').value;
  const rating = document.getElementById('rating').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, year, rating })
  });

  form.reset();
  fetchMovies();
});

async function deleteMovie(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchMovies();
}

async function editMovie(id) {
  const title = prompt("Judul baru:");
  const year = prompt("Tahun baru:");
  const rating = prompt("Rating baru:");
  if (title && year && rating) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, year, rating })
    });
    fetchMovies();
  }
}

fetchMovies();
