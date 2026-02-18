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
  const addTextBtn = document.getElementById('addTextBtn');
  const deleteTextBtn = document.getElementById('deleteTextBtn');

  let image = null;
  let texts = []; // Array of text objects: {id, text, x, y, fontSize, fillColor, strokeColor}
  let selectedTextId = null;
  let nextTextId = 1;
  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  canvas.width = 0;
  canvas.height = 0;

  function setImage(img) {
    image = img;
    placeholder.classList.add('hidden');
    downloadBtn.disabled = false;
    render();
  }

  function createTextObject(text = 'New Text') {
    if (!image) return null;
    return {
      id: nextTextId++,
      text: text,
      x: image.naturalWidth / 2,
      y: image.naturalHeight / 2,
      fontSize: getFontSize(),
      fillColor: textColorEl.value,
      strokeColor: borderColorEl.value
    };
  }

  function addText() {
    if (!image) return;
    const textObj = createTextObject();
    texts.push(textObj);
    selectText(textObj.id);
    render();
  }

  function deleteSelectedText() {
    if (!selectedTextId) return;
    texts = texts.filter(t => t.id !== selectedTextId);
    selectedTextId = null;
    updateControls();
    render();
  }

  function selectText(id) {
    selectedTextId = id;
    updateControls();
  }

  function getSelectedText() {
    return texts.find(t => t.id === selectedTextId);
  }

  function updateControls() {
    const selectedText = getSelectedText();
    if (selectedText) {
      memeTextEl.value = selectedText.text;
      fontSizeEl.value = selectedText.fontSize;
      fontSizeValue.textContent = selectedText.fontSize;
      textColorEl.value = selectedText.fillColor;
      borderColorEl.value = selectedText.strokeColor;
      memeTextEl.disabled = false;
      deleteTextBtn.disabled = false;
      memeTextEl.placeholder = 'Edit selected text (drag on canvas to move)';
    } else {
      memeTextEl.value = '';
      memeTextEl.disabled = true;
      deleteTextBtn.disabled = true;
      memeTextEl.placeholder = 'Select a text or click \'Add Text\' to start';
    }
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

  function getTextHitBox(textObj) {
    if (!hasVisibleText(textObj.text)) return null;
    ctx.font = 'bold ' + textObj.fontSize + 'px Impact, "Arial Black", sans-serif';
    const maxWidth = Math.max(100, canvas.width - wrapPadding);
    const lines = getWrappedLines(ctx, textObj.text, maxWidth);
    if (lines.length === 0) return null;
    const lineHeight = textObj.fontSize * lineHeightMultiplier;
    let maxW = 0;
    for (let i = 0; i < lines.length; i++) {
      const w = ctx.measureText(lines[i]).width;
      if (w > maxW) maxW = w;
    }
    const halfW = maxW / 2 + 8;
    const halfH = (lines.length * lineHeight) / 2 + 8;
    return { 
      left: textObj.x - halfW, 
      right: textObj.x + halfW, 
      top: textObj.y - halfH, 
      bottom: textObj.y + halfH,
      textId: textObj.id
    };
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

  function getTextAtPosition(canvasX, canvasY) {
    // Check texts in reverse order (top to bottom) so the topmost text is selected
    for (let i = texts.length - 1; i >= 0; i--) {
      const textObj = texts[i];
      const box = getTextHitBox(textObj);
      if (box && canvasX >= box.left && canvasX <= box.right && canvasY >= box.top && canvasY <= box.bottom) {
        return textObj;
      }
    }
    return null;
  }

  function isOverText(canvasX, canvasY) {
    return getTextAtPosition(canvasX, canvasY) !== null;
  }

  function render() {
    if (!image) return;
    const w = image.naturalWidth;
    const h = image.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(image, 0, 0, w, h);

    // Draw all text objects
    texts.forEach(textObj => {
      drawText(textObj.text, textObj.x, textObj.y, textObj.fontSize, textObj.fillColor, textObj.strokeColor, w);
    });

    // Draw selection indicator for selected text
    if (selectedTextId) {
      const selectedText = getSelectedText();
      if (selectedText) {
        const box = getTextHitBox(selectedText);
        if (box) {
          ctx.strokeStyle = '#00aaff';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top);
          ctx.setLineDash([]);
        }
      }
    }
  }

  canvas.addEventListener('mousedown', function (e) {
    if (!image) return;
    const pos = screenToCanvas(e.clientX, e.clientY);
    const textAtPos = getTextAtPosition(pos.x, pos.y);
    if (textAtPos) {
      selectText(textAtPos.id);
      dragging = true;
      dragOffsetX = pos.x - textAtPos.x;
      dragOffsetY = pos.y - textAtPos.y;
      canvas.style.cursor = 'grabbing';
      render(); // Re-render to show selection
    } else {
      // Clicked on empty area, deselect
      selectedTextId = null;
      updateControls();
      render();
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
    if (!dragging || !image || !selectedTextId) return;
    const pos = screenToCanvas(e.clientX, e.clientY);
    const selectedText = getSelectedText();
    if (selectedText) {
      selectedText.x = pos.x - dragOffsetX;
      selectedText.y = pos.y - dragOffsetY;
      render();
    }
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

  memeTextEl.addEventListener('input', function() {
    const selectedText = getSelectedText();
    if (selectedText) {
      selectedText.text = this.value;
      render();
    }
  });

  fontSizeEl.addEventListener('input', function () {
    fontSizeValue.textContent = this.value;
    const selectedText = getSelectedText();
    if (selectedText) {
      selectedText.fontSize = parseInt(this.value);
      render();
    }
  });

  textColorEl.addEventListener('input', function() {
    const selectedText = getSelectedText();
    if (selectedText) {
      selectedText.fillColor = this.value;
      render();
    }
  });

  borderColorEl.addEventListener('input', function() {
    const selectedText = getSelectedText();
    if (selectedText) {
      selectedText.strokeColor = this.value;
      render();
    }
  });

  addTextBtn.addEventListener('click', addText);
  deleteTextBtn.addEventListener('click', deleteSelectedText);

  downloadBtn.addEventListener('click', function () {
    if (!image) return;
    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // Initialize controls state
  updateControls();
})();
