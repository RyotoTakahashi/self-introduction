document.addEventListener("DOMContentLoaded", function() {
  const loadingText = document.getElementById('loading_text');
  const loaderCovers = document.querySelectorAll('.loader_cover');
  const loadingContainer = document.getElementById('loading');
  const content = document.getElementById('content');
  const progressBar = document.querySelector('.progress_bar');
  const progressWrap = document.querySelector('.progress_wrap');

  const startTime = new Date().getTime();
  let dots = 0;
  const maxDots = 3;

  // ピリオドアニメーション
  const dotInterval = setInterval(() => {
    dots = (dots + 1) % (maxDots + 1);
    loadingText.textContent = "Loading" + ".".repeat(dots);
  }, 250);

  // 進捗チェックループ
  const progressCheck = setInterval(() => {
    const resources = window.performance.getEntriesByType('resource');
    const total = resources.length;
    let loaded = 0;

    resources.forEach(res => {
      if (res.responseEnd > 0) loaded++;
    });

    const resourceProgress = total === 0 ? 1 : loaded / total;
    const elapsedTime = new Date().getTime() - startTime;
    const timeProgress = Math.min(elapsedTime / 2000, 1);

    const progress = Math.min(resourceProgress, timeProgress);
    progressBar.style.transform = `scaleX(${progress})`;

    if (progress >= 1) {
      progressBar.classList.add('split');
    }

    if (resourceProgress >= 1 && timeProgress >= 1) {
      clearInterval(progressCheck);
      clearInterval(dotInterval);

      // 背景をLimeに変える
      loadingContainer.classList.add('covered');

      setTimeout(() => {
        // 割れるアニメーション開始
        loaderCovers.forEach(cover => cover.classList.add('coveranime'));
        progressWrap.style.transform = "scaleX(0)";

        // ←★同時にローディング全体をフェードアウト
        loadingContainer.classList.add('fadeout');

      }, 100);

      // フェードアウト + 割れアニメーション後に完全非表示
      setTimeout(() => {
        loadingContainer.style.display = 'none';
        content.style.display = 'block';
      }, 800);  // 割れ+フェードアウトが0.7秒なので余裕を持って800ms
    }
  }, 50);
});
