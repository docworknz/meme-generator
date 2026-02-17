(function () {
  const TEMPLATES = ['1.jpg', 'test_Cows_1_1766203490208.png'];

  const canvas = document.getElementById('memeCanvas');
  const ctx = canvas.getContext('2d');
  const imageInput = document.getElementById('imageInput');
  const templateList = document.getElementById('templateList');
  const placeholder = document.getElementById('placeholder');
  const memeTextEl = document.getElementById('memeText');
  const fontSizeEl = document.getElementById('fontSize');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const textColorEl = document.getElementById('textColor');
  const borderColorEl = document.getElementById('borderColor');
  const downloadBtn = document.getElementById('downloadBtn');

  let image = null;
  let textX = 0;
  let textY = 0;
  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  canvas.width = 0;
  canvas.height = 0;

  function setImage(img) {
    image = img;
    textX = img.naturalWidth / 2;
    textY = img.naturalHeight / 2;
    placeholder.classList.add('hidden');
    downloadBtn.disabled = false;
    render();
  }

  function getFontSize() {
    return Math.max(16, Math.min(120, Number(fontSizeEl.value)));
  }

  const lineHeightMultiplier = 1.2;
  const wrapPadding = 48;

  function getLines(text) {
    return text.split('\n').map(function (s) { return s.trim(); });
  }

  function hasVisibleText(text) {
    return getLines(text).some(function (line) { return line.length > 0; });
  }

  function breakWordToWidth(ctx, word, maxWidth) {
    const chunks = [];
    let rest = word;
    while (rest && ctx.measureText(rest).width > maxWidth) {
      let fit = '';
      for (let c = 0; c < rest.length; c++) {
        if (ctx.measureText(fit + rest[c]).width <= maxWidth) {
          fit += rest[c];
        } else break;
      }
      if (fit) {
        chunks.push(fit);
        rest = rest.slice(fit.length);
      } else {
        chunks.push(rest[0]);
        rest = rest.slice(1);
      }
    }
    if (rest) chunks.push(rest);
    return chunks;
  }

  function wrapLineToWidth(ctx, line, maxWidth) {
    if (maxWidth <= 0 || !line) return [''];
    const words = line.split(/\s+/);
    if (words.length === 0) return [''];
    const result = [];
    let current = words[0];
    const flushCurrent = function () {
      if (ctx.measureText(current).width <= maxWidth) {
        result.push(current);
        current = '';
      } else {
        const chunks = breakWordToWidth(ctx, current, maxWidth);
        for (let k = 0; k < chunks.length - 1; k++) result.push(chunks[k]);
        current = chunks[chunks.length - 1] || '';
      }
    };
    flushCurrent();
    for (let i = 1; i < words.length; i++) {
      const next = current ? current + ' ' + words[i] : words[i];
      if (ctx.measureText(next).width <= maxWidth) {
        current = next;
      } else {
        if (current) flushCurrent();
        current = words[i];
        flushCurrent();
      }
    }
    if (current) result.push(current);
    return result;
  }

  function getWrappedLines(ctx, text, maxWidth) {
    const raw = getLines(text);
    const out = [];
    for (let i = 0; i < raw.length; i++) {
      const wrapped = wrapLineToWidth(ctx, raw[i], maxWidth);
      for (let j = 0; j < wrapped.length; j++) {
        out.push(wrapped[j]);
      }
    }
    return out;
  }

  function drawText(text, x, y, fontSize, fillColor, strokeColor, canvasWidth) {
    if (!hasVisibleText(text)) return;
    ctx.font = 'bold ' + fontSize + 'px Impact, "Arial Black", sans-serif';
    const maxWidth = Math.max(100, (canvasWidth || 0) - wrapPadding);
    const lines = getWrappedLines(ctx, text, maxWidth);
    if (lines.length === 0) return;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(2, Math.round(fontSize / 12));
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    const lineHeight = fontSize * lineHeightMultiplier;
    const totalHeight = (lines.length - 1) * lineHeight;
    const startY = y - totalHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      const lineY = startY + i * lineHeight;
      ctx.strokeText(lines[i], x, lineY);
      ctx.fillText(lines[i], x, lineY);
    }
  }

  function getTextHitBox() {
    if (!hasVisibleText(memeTextEl.value)) return null;
    const fontSize = getFontSize();
    ctx.font = 'bold ' + fontSize + 'px Impact, "Arial Black", sans-serif';
    const maxWidth = Math.max(100, canvas.width - wrapPadding);
    const lines = getWrappedLines(ctx, memeTextEl.value, maxWidth);
    if (lines.length === 0) return null;
    const lineHeight = fontSize * lineHeightMultiplier;
    let maxW = 0;
    for (let i = 0; i < lines.length; i++) {
      const w = ctx.measureText(lines[i]).width;
      if (w > maxW) maxW = w;
    }
    const halfW = maxW / 2 + 8;
    const halfH = (lines.length * lineHeight) / 2 + 8;
    return { left: textX - halfW, right: textX + halfW, top: textY - halfH, bottom: textY + halfH };
  }

  function screenToCanvas(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function isOverText(canvasX, canvasY) {
    const box = getTextHitBox();
    if (!box) return false;
    return canvasX >= box.left && canvasX <= box.right && canvasY >= box.top && canvasY <= box.bottom;
  }

  function render() {
    if (!image) return;
    const w = image.naturalWidth;
    const h = image.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(image, 0, 0, w, h);

    const fontSize = getFontSize();
    const fillColor = textColorEl.value;
    const strokeColor = borderColorEl.value;
    drawText(memeTextEl.value, textX, textY, fontSize, fillColor, strokeColor, w);
  }

  canvas.addEventListener('mousedown', function (e) {
    if (!image) return;
    const pos = screenToCanvas(e.clientX, e.clientY);
    if (isOverText(pos.x, pos.y)) {
      dragging = true;
      dragOffsetX = pos.x - textX;
      dragOffsetY = pos.y - textY;
      canvas.style.cursor = 'grabbing';
    }
  });

  canvas.addEventListener('mousemove', function (e) {
    if (!image) return;
    if (dragging) return;
    const pos = screenToCanvas(e.clientX, e.clientY);
    canvas.style.cursor = isOverText(pos.x, pos.y) ? 'grab' : 'default';
  });

  canvas.addEventListener('mouseleave', function () {
    canvas.style.cursor = 'default';
  });

  document.addEventListener('mousemove', function (e) {
    if (!dragging || !image) return;
    const pos = screenToCanvas(e.clientX, e.clientY);
    textX = pos.x - dragOffsetX;
    textY = pos.y - dragOffsetY;
    render();
  });

  document.addEventListener('mouseup', function () {
    if (dragging) {
      dragging = false;
      canvas.style.cursor = 'default';
    }
  });

  document.addEventListener('mouseleave', function () {
    dragging = false;
  });

  TEMPLATES.forEach(function (filename) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'template-thumb';
    item.setAttribute('aria-label', 'Use template ' + filename);
    const thumb = document.createElement('img');
    thumb.src = 'assets/' + filename;
    thumb.alt = '';
    thumb.loading = 'lazy';
    item.appendChild(thumb);
    item.addEventListener('click', function () {
      const img = new Image();
      img.onload = function () {
        setImage(img);
      };
      img.onerror = function () {
        placeholder.textContent = 'Failed to load template';
        placeholder.classList.remove('hidden');
      };
      img.src = 'assets/' + filename;
    });
    templateList.appendChild(item);
  });

  imageInput.addEventListener('change', function () {
    const file = this.files && this.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = function () {
      setImage(img);
    };
    img.onerror = function () {
      placeholder.textContent = 'Failed to load image';
      placeholder.classList.remove('hidden');
    };
    img.src = URL.createObjectURL(file);
  });

  memeTextEl.addEventListener('input', render);

  fontSizeEl.addEventListener('input', function () {
    fontSizeValue.textContent = this.value;
    render();
  });

  textColorEl.addEventListener('input', render);
  borderColorEl.addEventListener('input', render);

  downloadBtn.addEventListener('click', function () {
    if (!image) return;
    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
})();
