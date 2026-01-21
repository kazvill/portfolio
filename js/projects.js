const container = document.getElementById("projects");

fetch("https://api.github.com/users/kazvill/repos")
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach(repo => {
        const tile = document.createElement("div");
        tile.className = "project-tile";

        tile.innerHTML = `
            <div class="project-content">
                <h2>${repo.name}</h2>
                <p>${repo.description || "No description provided."}</p>

                <div class="project-meta">
                ${repo.language ? `<span>🛠 ${repo.language}</span>` : ""}
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🕒 ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            </div>

            <div class="project-action">
                <a class="project-link" href="${repo.html_url}" target="_blank">
                View on GitHub →
                </a>
            </div>
            `;


        container.appendChild(tile);
      });
  })
  .catch(err => {
    container.innerHTML = "<p>Failed to load projects.</p>";
    console.error(err);
  });
