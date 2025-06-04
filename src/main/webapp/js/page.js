document.addEventListener('DOMContentLoaded', function() {
  const defaultSection = document.getElementById('top');
  defaultSection.classList.add('active');
});

document.querySelectorAll('.tab_menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#', '');
    const articles = document.querySelectorAll('.article');

    articles.forEach(article => {
      if (article.id === targetId) {
        article.classList.add('active');
      } else {
        article.classList.remove('active');
      }
    });
  });
});
