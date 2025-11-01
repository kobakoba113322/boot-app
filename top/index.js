const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  // スリット予想画面に移動
  window.location.href = '../start-slit/slit.html';
});

const boatBg = document.getElementById('boat-bg');

// ボート画像のURL（好きな画像に差し替え可能）

function createBoat() {

  const boatRandom = Math.floor(Math.random() * 6) + 1;
  const boatImg = `../img/boat${boatRandom}.png`; // 例：自作のボートイラスト


  const boat = document.createElement('img');
  boat.src = boatImg;
  boat.classList.add('boat');

  // ランダムな高さ（画面下から）
  const bottom = Math.random() * 550;
  boat.style.bottom = `${bottom}px`;

  // ランダムな速度
  const duration = Math.random() * 4 + 6; // 6〜10秒
  boat.style.animationDuration = `${duration}s`;

  boatBg.appendChild(boat);

  // アニメーションが終わったら削除
  boat.addEventListener('animationend', () => {
    boat.remove();
  });
}

// 数秒おきにボート生成
setInterval(createBoat, 1000);
