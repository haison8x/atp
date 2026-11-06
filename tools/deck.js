(function () {
  var deck = document.querySelector('.deck');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var counter = document.querySelector('.counter');
  var progress = document.querySelector('.progress');
  var notesText = document.querySelector('.notes-text');
  var current = 0;

  function fit() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    deck.style.transform = 'scale(' + s + ')';
  }

  function shrinkToFit(slide) {
    var content = slide.querySelector('.content');
    if (!content || slide.classList.contains('cover')) return;
    var f = 1.25;
    slide.style.setProperty('--fit', f);
    var guard = 0;
    while (content.scrollHeight > content.clientHeight + 2 && f > 0.55 && guard++ < 40) {
      f -= 0.03;
      slide.style.setProperty('--fit', f.toFixed(2));
    }
  }

  function show(n, push) {
    current = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    counter.textContent = (current + 1) + ' / ' + slides.length;
    progress.style.width = ((current + 1) / slides.length * 100) + '%';
    var notes = slides[current].querySelector('.notes');
    notesText.innerHTML = notes && notes.innerHTML ? notes.innerHTML : '<i>Trang này không có ghi chú.</i>';
    if (push !== false) history.replaceState(null, '', '#' + (current + 1));
    document.title = document.title.split(' — ')[0] + ' — ' + (current + 1);
  }

  function fromHash() {
    var n = parseInt(location.hash.slice(1), 10);
    return isNaN(n) ? 0 : n - 1;
  }

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter') { show(current + 1); e.preventDefault(); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { show(current - 1); e.preventDefault(); }
    else if (k === 'Home') show(0);
    else if (k === 'End') show(slides.length - 1);
    else if (k === 'n' || k === 'N') document.body.classList.toggle('show-notes');
    else if (k === 'f' || k === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
      else document.exitFullscreen && document.exitFullscreen();
    }
  });
  document.querySelector('.next').addEventListener('click', function () { show(current + 1); });
  document.querySelector('.prev').addEventListener('click', function () { show(current - 1); });
  document.querySelector('.notes-toggle').addEventListener('click', function () { document.body.classList.toggle('show-notes'); });

  var x0 = null;
  document.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', function () { show(fromHash(), false); });

  fit();
  function layout() { slides.forEach(shrinkToFit); }
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  show(fromHash(), false);
})();
