async function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  if (!query) {
    container.innerHTML = "<p>Please enter a movie title.</p>";
    return;
  }

  const apiKey = "84c9e178"; // Replace with your OMDb API key
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      data.Search.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x260?text=No+Image'}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = `<p>No results found for "${query}".</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    container.innerHTML = "<p>Error fetching movie data. Please try again.</p>";
  }
}
