const menu = document.getElementById("menu");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const dateEl = document.getElementById("date");

let latestArticle = null;

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    data.categories.forEach(category => {
      const li = document.createElement("li");
      li.className = "dropdown";

      const a = document.createElement("a");
      a.href = "#";
      a.textContent = category.name + " ▾";

      const ul = document.createElement("ul");
      ul.className = "dropdown-menu";

      category.articles.forEach(article => {
        // latest article check
        if (!latestArticle || article.date > latestArticle.date) {
          latestArticle = article;
        }

        const subLi = document.createElement("li");
        const subA = document.createElement("a");
        subA.href = "#";
        subA.textContent = article.title;

        subA.onclick = () => loadArticle(article);

        subLi.appendChild(subA);
        ul.appendChild(subLi);
      });

      li.appendChild(a);
      li.appendChild(ul);
      menu.appendChild(li);
    });

    // auto-load latest article
    if (latestArticle) {
      loadArticle(latestArticle);
    }
  });

function loadArticle(article) {
  titleEl.textContent = article.title;
  dateEl.textContent = article.date;

  fetch(article.file)
    .then(res => res.text())
    .then(html => {
      textEl.innerHTML = html;
    });
}