'use strict';

// 各種要素の取得
const headNumber = document.querySelector('.number1');
const headNumberList = headNumber.querySelectorAll('li');
const headNumber1 = document.querySelector('.number2');
const headNumberList1 = headNumber1.querySelectorAll('li');
const allBoatLeft = document.getElementById('left-go');


//カーテンのアニメーション
headNumberList.forEach(item => {
  const carten = item.querySelector('.carten');
  const index = item.querySelector('.index');

  item.addEventListener('mouseover', () => carten.classList.add('active'));
  item.addEventListener('mouseout', () => carten.classList.remove('active'));
  item.addEventListener('mouseover', () => index.classList.add('active'));
  item.addEventListener('mouseout', () => index.classList.remove('active'));
});

//全体を左へ移動
allBoatLeft.addEventListener('click', () => {
  const allCurrentLeft = parseFloat(getComputedStyle(headNumber1).left) || 0;// 現在のleft値を取得(getComputedStyleで現在値をとる)
  const moveAmount = window.innerWidth * 0.01; // 画面幅の1%動かす
  headNumber1.style.left = `${allCurrentLeft + moveAmount}px`;//左へ移動する
});


// ======================
//ここから説明10/31
// ======================
for (let i = 0; i < headNumberList1.length; i++) {
  headNumberList[i].addEventListener('click', () => {
    const currentLeft = parseFloat(getComputedStyle(headNumberList1[i]).left) || 0;
    const moveAmount = window.innerWidth * 0.01; // デバイス幅1%移動
    headNumberList1[i].style.left = `${currentLeft + moveAmount}px`;
  });
}

// ======================
// ④ ドラッグ & ドロップ機能（PC・スマホ両対応）
// ======================
headNumberList1.forEach((boat) => {
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  const startDrag = (e) => {
    e.preventDefault();
    isDragging = true;
    const rect = boat.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  };

  const moveDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // 画面サイズに合わせて座標調整
    const parentRect = headNumber1.getBoundingClientRect();
    const newLeft = clientX - parentRect.left - offsetX;
    const newTop = clientY - parentRect.top - offsetY;

    boat.style.left = `${newLeft}px`;
    boat.style.top = `${newTop}px`;
  };

  const endDrag = () => {
    isDragging = false;
  };

  // イベント登録（マウス + タッチ両対応）
  boat.addEventListener('mousedown', startDrag);
  boat.addEventListener('touchstart', startDrag);
  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('touchmove', moveDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
});

// ======================
// ⑤ 画面遷移ボタン
// ======================
document.getElementById('top').addEventListener('click', () => {
  window.location.href = '../top/home.html';
});

document.getElementById('top-next').addEventListener('click', () => {
  window.location.href = '../first turn/turn.html';
});
