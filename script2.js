function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

async function searchOMDb() {
      const term = document.getElementById("searchTerm").value.trim();
      if (!term) {
        alert("Please enter a make, model, or keyword");
        return;
      }

      const apiKey = "e16f3220"; // Replace with your OMDb API key
      const url = `https://www.omdbapi.com/?s=${encodeURIComponent(term)}&apikey=${apiKey}`;

      try {
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();
        console.log(data)

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if (data.Response === "True") {
          data.Search.forEach(item => {
            resultsDiv.innerHTML += `
              <div class="movie-card">
                <div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h3 style="font-size: 30px;">Search results for:"${item.Title}"</h3>
                  <!-- Price slider -->
  <label for="priceRange">Price:
  <span id="priceValue">$100,000</span>
  <input type="range" id="priceRange" min="0" max="100000" step="1000" value="0" oninput="updatePriceLabel()">
  </label>
  </div>
                  <p style="color: rgba(11, 11, 12, 1); font-size: 30px; font-weight: bold;">${item.Year} — ${item.Type}</p>
                </div>
              </div>
               <img style="width: 50%"; src="${item.Poster !== "N/A" ? item.Poster : 'https://via.placeholder.com/80'}" alt="Poster">
              
            `;
          });

        } else {
          resultsDiv.innerHTML = `<p style="color:red;">No results found for "${term}".</p>`;
        }
      } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = `<p style="color:red;">Error fetching data</p>`;
      }
    }


     function updatePriceLabel() {
      const slider = document.getElementById("priceRange");
      document.getElementById("priceValue").textContent = `$${parseInt(slider.value).toLocaleString()}`;
    }



 