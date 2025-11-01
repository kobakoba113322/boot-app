'use strict';

const move2 = document.getElementById('move2');
const move3 = document.getElementById('move3');
const ul = document.getElementById('boat-move');
const boatMoves = ul.children;

[...boatMoves].forEach(boat => {
  let offsetX, offsetY;
  let rotation = 0;

  const startDrag = (e) => {
    e.preventDefault();
    const rect = boat.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    document.addEventListener(e.touches ? 'touchmove' : 'mousemove', moveDrag);
    document.addEventListener(e.touches ? 'touchend' : 'mouseup', endDrag);
  };

  const moveDrag = (e) => {
    const figureRect = ul.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - figureRect.left - offsetX) / figureRect.width) * 100;
    const y = ((clientY - figureRect.top - offsetY) / figureRect.height) * 100;

    boat.style.left = `${x}%`;
    boat.style.top = `${y}%`;
  };

  const endDrag = (e) => {
    document.removeEventListener(e.touches ? 'touchmove' : 'mousemove', moveDrag);
    document.removeEventListener(e.touches ? 'touchend' : 'mouseup', endDrag);
  };

  boat.addEventListener('click', () => {
    rotation -= 45;
    boat.style.transition = 'transform 0.3s ease';
    boat.style.transform = `rotate(${rotation}deg)`;
  });

  boat.addEventListener('mousedown', startDrag);
  boat.addEventListener('touchstart', startDrag);
});

move3.addEventListener('click', () => {
  location.reload();
});

move2.addEventListener('click', () => {
  window.location.href = '../start-slit/slit.html';
});
