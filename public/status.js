

<script>
// 定義一個函數來更新Footer badge的內容和樣式
function updateFooterBadge(status) {
  const badge = document.getElementById('footer-badge');

  badge.textContent = status === 'UP' ? '正常運行' : '異常';
  badge.className = status.toLowerCase();
}

// 從您的JSON代碼中讀取系統狀態並更新Footer badge
fetch('https://status.ssangyongsports.org/summary.json')
  .then(response => response.json())
  .then(data => {
    const status = data.page.status;
    updateFooterBadge(status);
    badge.href = data.page.url;
  })
  .catch(error => {
    console.error('無法讀取系統狀態', error);
  });
</script>
