let articles = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    articles = data.articles;

    // latest article first
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    buildMenu(articles);
    loadArticle(articles[0]);
  });

function buildMenu(list) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  list.forEach(article => {
    const li = document.createElement("li");
    li.textContent = article.title;
    li.onclick = () => loadArticle(article);
    menu.appendChild(li);
  });
}

function loadArticle(article) {
  document.getElementById("title").textContent = article.title;
  document.getElementById("date").textContent = article.date;
  document.getElementById("articleFrame").src = article.file;
}

/* Search */
document.getElementById("search").addEventListener("input", function () {
  const q = this.value.toLowerCase();
  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(q)
  );
  buildMenu(filtered);
});