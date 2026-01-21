const container = document.getElementById("projects");

fetch("https://api.github.com/users/kazvill/repos")
  .then(response => response.json())
  .then(repos => {
    repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach(repo => {
        const tile = document.createElement("div");
        tile.className = "project-tile";

        // Base HTML (without languages yet)
        tile.innerHTML = `
          <div class="project-content">
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description provided."}</p>

            <div class="project-meta" id="langs-${repo.id}">
              <span>⭐ ${repo.stargazers_count}</span>
              <span>🕒 ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div class="project-action">
            <a class="project-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="View project on GitHub">
              View on GitHub →
            </a>
          </div>
        `;

        container.appendChild(tile);

        // Fetch ALL languages for this repo
        fetch(repo.languages_url)
          .then(response => response.json())
          .then(languages => {
            const langContainer = document.getElementById(`langs-${repo.id}`);
            const langNames = Object.keys(languages);

            // If GitHub detected languages, show them
            if (langNames.length > 0) {
              langNames.forEach(lang => {
                const span = document.createElement("span");
                span.className = "lang-tag";
                span.textContent = lang;
                langContainer.prepend(span);
              });
            }
          });
      });
  })
  .catch(error => {
    container.innerHTML = "<p>Failed to load projects.</p>";
    console.error(error);
  });
