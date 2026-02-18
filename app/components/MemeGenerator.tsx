"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { db } from "@/lib/db";
import { id } from "@instantdb/react";

const TEMPLATES: string[] = [];
const LINE_HEIGHT = 1.2;
const WRAP_PADDING = 48;
const BOX_PADDING = 8;
const MIN_WRAP = 100;
const HANDLE_SIZE = 10;
const HANDLE_HIT = 10;
const SELECTION_STROKE = "#e0e0e0";

type ResizeHandle = "nw" | "ne" | "sw" | "se";

interface TextObj {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fillColor: string;
  strokeColor: string;
  wrapWidth: number;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function MemeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const nextIdRef = useRef(1);
  const dragState = useRef({ active: false, offsetX: 0, offsetY: 0 });
  const resizeState = useRef<{
    active: boolean;
    handle: ResizeHandle | null;
    anchor: { left: number; right: number } | null;
  }>({ active: false, handle: null, anchor: null });

  const user = db.useUser();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [texts, setTexts] = useState<TextObj[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [posting, setPosting] = useState(false);

  const selectedText = texts.find((t) => t.id === selectedId);

  const getDefaultWrap = useCallback(() => {
    const img = imageRef.current;
    if (!img) return 240;
    return clamp(480, MIN_WRAP, Math.max(MIN_WRAP, img.naturalWidth - WRAP_PADDING));
  }, []);

  const addText = useCallback(() => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    const t: TextObj = {
      id: nextIdRef.current++,
      text: "New Text",
      x: img.naturalWidth / 2,
      y: img.naturalHeight / 2,
      fontSize: 48,
      fillColor: "#ffffff",
      strokeColor: "#000000",
      wrapWidth: getDefaultWrap(),
    };
    setTexts((prev) => [...prev, t]);
    setSelectedId(t.id);
  }, [getDefaultWrap]);

  const deleteSelected = useCallback(() => {
    if (selectedId == null) return;
    setTexts((prev) => prev.filter((t) => t.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const updateText = useCallback((id: number, patch: Partial<TextObj>) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  }, []);

  const getLines = (text: string) =>
    text.split("\n").map((s) => s.trim());
  const hasVisible = (text: string) =>
    getLines(text).some((line) => line.length > 0);

  const breakWord = (ctx: CanvasRenderingContext2D, word: string, maxW: number) => {
    const chunks: string[] = [];
    let rest = word;
    while (rest && ctx.measureText(rest).width > maxW) {
      let fit = "";
      for (let c = 0; c < rest.length; c++) {
        if (ctx.measureText(fit + rest[c]).width <= maxW) fit += rest[c];
        else break;
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
  };

  const wrapLine = (ctx: CanvasRenderingContext2D, line: string, maxW: number) => {
    if (maxW <= 0 || !line) return [""];
    const words = line.split(/\s+/);
    if (words.length === 0) return [""];
    const result: string[] = [];
    let current = words[0];
    const flush = () => {
      if (ctx.measureText(current).width <= maxW) {
        result.push(current);
        current = "";
      } else {
        const ch = breakWord(ctx, current, maxW);
        for (let k = 0; k < ch.length - 1; k++) result.push(ch[k]);
        current = ch[ch.length - 1] || "";
      }
    };
    flush();
    for (let i = 1; i < words.length; i++) {
      const next = current ? current + " " + words[i] : words[i];
      if (ctx.measureText(next).width <= maxW) current = next;
      else {
        if (current) flush();
        current = words[i];
        flush();
      }
    }
    if (current) result.push(current);
    return result;
  };

  const getWrappedLines = (ctx: CanvasRenderingContext2D, text: string, maxW: number) => {
    const out: string[] = [];
    getLines(text).forEach((line) => {
      wrapLine(ctx, line, maxW).forEach((l) => out.push(l));
    });
    return out;
  };

  const getWrapW = (canvasW: number, t: TextObj) => {
    const maxAllowed = Math.max(MIN_WRAP, canvasW - WRAP_PADDING);
    return clamp(
      Number.isFinite(t.wrapWidth) ? t.wrapWidth : getDefaultWrap(),
      MIN_WRAP,
      maxAllowed
    );
  };

  const drawText = (
    ctx: CanvasRenderingContext2D,
    t: TextObj,
    canvasW: number
  ) => {
    if (!hasVisible(t.text)) return;
    const wrapW = Math.max(MIN_WRAP, getWrapW(canvasW, t));
    ctx.font = `bold ${t.fontSize}px Impact, "Arial Black", sans-serif`;
    const lines = getWrappedLines(ctx, t.text, wrapW);
    if (lines.length === 0) return;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(2, Math.round(t.fontSize / 12));
    ctx.strokeStyle = t.strokeColor;
    ctx.fillStyle = t.fillColor;
    const lh = t.fontSize * LINE_HEIGHT;
    const totalH = (lines.length - 1) * lh;
    const startY = t.y - totalH / 2;
    lines.forEach((line, i) => {
      const lineY = startY + i * lh;
      ctx.strokeText(line, t.x, lineY);
      ctx.fillText(line, t.x, lineY);
    });
  };

  const getHitBox = (
    ctx: CanvasRenderingContext2D,
    t: TextObj,
    canvasW: number
  ) => {
    if (!hasVisible(t.text)) return null;
    ctx.font = `bold ${t.fontSize}px Impact, "Arial Black", sans-serif`;
    const wrapW = getWrapW(canvasW, t);
    const lines = getWrappedLines(ctx, t.text, wrapW);
    if (lines.length === 0) return null;
    const lh = t.fontSize * LINE_HEIGHT;
    const halfW = wrapW / 2 + BOX_PADDING;
    const halfH = (lines.length * lh) / 2 + BOX_PADDING;
    return {
      left: t.x - halfW,
      right: t.x + halfW,
      top: t.y - halfH,
      bottom: t.y + halfH,
    };
  };

  const getResizeHandle = (
    box: { left: number; right: number; top: number; bottom: number },
    x: number,
    y: number
): ResizeHandle | null => {
    const handles: { id: ResizeHandle; x: number; y: number }[] = [
      { id: "nw", x: box.left, y: box.top },
      { id: "ne", x: box.right, y: box.top },
      { id: "sw", x: box.left, y: box.bottom },
      { id: "se", x: box.right, y: box.bottom },
    ];
    for (const h of handles) {
      if (Math.abs(x - h.x) <= HANDLE_HIT && Math.abs(y - h.y) <= HANDLE_HIT)
        return h.id;
    }
    return null;
  };

  const getTextAt = (
    ctx: CanvasRenderingContext2D,
    canvasW: number,
    x: number,
    y: number
  ): TextObj | null => {
    for (let i = texts.length - 1; i >= 0; i--) {
      const t = texts[i];
      const box = getHitBox(ctx, t, canvasW);
      if (
        box &&
        x >= box.left &&
        x <= box.right &&
        y >= box.top &&
        y <= box.bottom
      )
        return t;
    }
    return null;
  };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);
    texts.forEach((t) => drawText(ctx, t, w));
    if (selectedText) {
      const box = getHitBox(ctx, selectedText, w);
      if (box) {
        ctx.strokeStyle = SELECTION_STROKE;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top);
        ctx.setLineDash([]);
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#111111";
        ctx.lineWidth = 2;
        [box.left, box.right].forEach((bx) =>
          [box.top, box.bottom].forEach((by) => {
            ctx.fillRect(bx - HANDLE_SIZE / 2, by - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
            ctx.strokeRect(bx - HANDLE_SIZE / 2, by - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
          })
        );
      }
    }
  }, [texts, selectedText]);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      setImageReady(true);
      render();
    };
    img.onerror = () => {
      setImageSrc(null);
      setImageReady(false);
    };
    img.src = imageSrc;
    return () => {
      img.src = "";
      setImageReady(false);
      if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  useEffect(() => {
    render();
  }, [render]);

  const screenToCanvas = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      if (!img || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const pos = screenToCanvas(e.clientX, e.clientY);
      const w = canvas.width;

      if (selectedText) {
        const box = getHitBox(ctx, selectedText, w);
        if (box) {
          const handle = getResizeHandle(box, pos.x, pos.y);
          if (handle) {
            resizeState.current = {
              active: true,
              handle,
              anchor: { left: box.left, right: box.right },
            };
            canvas.style.cursor =
              handle === "nw" || handle === "se" ? "nwse-resize" : "nesw-resize";
            return;
          }
        }
      }

      const textAt = getTextAt(ctx, w, pos.x, pos.y);
      if (textAt) {
        setSelectedId(textAt.id);
        dragState.current = {
          active: true,
          offsetX: pos.x - textAt.x,
          offsetY: pos.y - textAt.y,
        };
        canvas.style.cursor = "grabbing";
        return;
      }
      setSelectedId(null);
    },
    [selectedText, screenToCanvas]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e: MouseEvent) => {
      const img = imageRef.current;
      if (!img) return;
      const pos = screenToCanvas(e.clientX, e.clientY);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = canvas.width;

      if (resizeState.current.active && selectedText && resizeState.current.handle) {
        const { handle, anchor } = resizeState.current;
        const minBox = MIN_WRAP + BOX_PADDING * 2;
        let left = anchor?.left ?? selectedText.x - getWrapW(w, selectedText) / 2 - BOX_PADDING;
        let right = anchor?.right ?? selectedText.x + getWrapW(w, selectedText) / 2 + BOX_PADDING;
        if (handle === "ne" || handle === "se") {
          left = anchor?.left ?? left;
          right = pos.x;
          if (right - left < minBox) right = left + minBox;
        } else {
          right = anchor?.right ?? right;
          left = pos.x;
          if (right - left < minBox) left = right - minBox;
        }
        left = clamp(left, 0, w - minBox);
        right = clamp(right, left + minBox, w);
        const halfH =
          (selectedText.fontSize * LINE_HEIGHT * 2) / 2 + BOX_PADDING;
        updateText(selectedText.id, {
          wrapWidth: Math.max(MIN_WRAP, right - left - BOX_PADDING * 2),
          x: (left + right) / 2,
          y:
            handle === "nw" || handle === "ne"
              ? pos.y + halfH
              : pos.y - halfH,
        });
        return;
      }

      if (dragState.current.active && selectedText) {
        updateText(selectedText.id, {
          x: pos.x - dragState.current.offsetX,
          y: pos.y - dragState.current.offsetY,
        });
      }
    };
    const onUp = () => {
      resizeState.current = { active: false, handle: null, anchor: null };
      dragState.current = { active: false, offsetX: 0, offsetY: 0 };
      if (canvas) canvas.style.cursor = "default";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [selectedText, screenToCanvas, updateText]);

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      if (!img || !canvas) return;
      const pos = screenToCanvas(e.clientX, e.clientY);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (dragState.current.active || resizeState.current.active) return;
      if (selectedText) {
        const box = getHitBox(ctx, selectedText, canvas.width);
        if (box) {
          const h = getResizeHandle(box, pos.x, pos.y);
          if (h) {
            canvas.style.cursor = h === "nw" || h === "se" ? "nwse-resize" : "nesw-resize";
            return;
          }
        }
      }
      const at = getTextAt(ctx, canvas.width, pos.x, pos.y);
      canvas.style.cursor = at ? "grab" : "default";
    },
    [selectedText, screenToCanvas]
  );

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setTexts([]);
    setSelectedId(null);
    e.target.value = "";
  }, []);

  const postToGallery = useCallback(async () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !user?.id) return;
    setPosting(true);
    try {
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/png")
      );
      if (!blob) throw new Error("Failed to create image");
      const file = new File([blob], `meme-${Date.now()}.png`, { type: "image/png" });
      const path = `memes/${id()}.png`;
      const { data: uploadData } = await db.storage.uploadFile(path, file, {
        contentType: "image/png",
      });
      const fileId = uploadData?.id;
      if (!fileId) throw new Error("File not found after upload");
      const memeId = id();
      await db.transact([
        db.tx.memes[memeId]
          .update({ createdAt: Date.now() })
          .link({ image: fileId, author: user.id }),
      ]);
      setImageSrc(null);
      setTexts([]);
      setSelectedId(null);
      imageRef.current = null;
      window.location.href = "/gallery";
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  }, [user?.id]);

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      <div className="flex flex-1 min-h-0">
        <aside className="w-[72px] shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col">
          <div className="p-3 flex flex-col items-center gap-2 border-b border-[var(--border)]">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              Templates
            </span>
            <label className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#333] cursor-pointer text-xs text-[var(--text)] hover:bg-[#3d3d3d] transition-colors">
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute w-0 h-0 opacity-0 overflow-hidden"
              />
            </label>
          </div>
          <div className="flex-1 overflow-y-auto p-2 flex flex-col items-center gap-2">
            {TEMPLATES.map((filename) => (
              <button
                key={filename}
                type="button"
                className="block w-14 h-14 rounded-lg border-2 border-[#3a3a3a] bg-[#2a2a2a] overflow-hidden shrink-0 hover:border-[#555] focus:outline-none focus:border-[#666]"
                onClick={() => {
                  setImageSrc(`/assets/${filename}`);
                  setTexts([]);
                  setSelectedId(null);
                }}
              >
                <img
                  src={`/assets/${filename}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 flex items-center justify-center p-6 min-h-0">
          <div className="relative bg-[#2a2a2a] rounded-xl overflow-hidden max-w-full max-h-full flex items-center justify-center min-w-[200px] min-h-[160px] shadow-lg">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[calc(100vh-12rem)]"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={() => {
                if (canvasRef.current) canvasRef.current.style.cursor = "default";
              }}
            />
            {!imageSrc && (
              <p className="absolute m-0 text-[var(--muted)] text-sm">
                Select a template or upload an image
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="flex items-center justify-center pb-4">
        <div className="flex items-center flex-wrap gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-lg max-w-[min(96vw,720px)]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={addText}
              disabled={!imageReady}
              className="px-3.5 py-2 text-sm font-medium text-[var(--text)] bg-transparent border-none rounded-lg cursor-pointer hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Text
            </button>
            <button
              type="button"
              onClick={deleteSelected}
              disabled={!selectedId}
              className="px-3.5 py-2 text-sm font-medium text-[var(--text)] bg-transparent border-none rounded-lg cursor-pointer hover:bg-red-900/25 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
          <div className="w-px h-7 bg-[#3a3a3a] mx-2" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
              Text
            </span>
            <textarea
              value={selectedText?.text ?? ""}
              onChange={(e) =>
                selectedText && updateText(selectedText.id, { text: e.target.value })
              }
              placeholder={selectedText ? "Edit selected text" : "Select text or Add Text"}
              rows={1}
              maxLength={300}
              disabled={!selectedText}
              className="w-40 min-h-7 max-h-14 px-2 py-1 text-sm border border-[#3a3a3a] rounded-md bg-[#1e1e1e] text-[var(--text)] placeholder:text-[var(--muted)] resize-none focus:outline-none focus:border-[#555] disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>
          <div className="w-px h-7 bg-[#3a3a3a] mx-2" />
          <label className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <span>Size</span>
            <output className="min-w-[2ch] tabular-nums">
              {selectedText?.fontSize ?? 48}
            </output>
            <input
              type="range"
              min={16}
              max={120}
              value={selectedText?.fontSize ?? 48}
              onChange={(e) =>
                selectedText &&
                updateText(selectedText.id, { fontSize: parseInt(e.target.value, 10) })
              }
              className="w-20 h-1.5 accent-[var(--muted)]"
            />
          </label>
          <div className="w-px h-7 bg-[#3a3a3a] mx-2" />
          <label className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <span>Fill</span>
            <input
              type="color"
              value={selectedText?.fillColor ?? "#ffffff"}
              onChange={(e) =>
                selectedText && updateText(selectedText.id, { fillColor: e.target.value })
              }
              className="w-7 h-7 p-0.5 border border-[#3a3a3a] rounded-md bg-[#2a2a2a] cursor-pointer"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <span>Stroke</span>
            <input
              type="color"
              value={selectedText?.strokeColor ?? "#000000"}
              onChange={(e) =>
                selectedText && updateText(selectedText.id, { strokeColor: e.target.value })
              }
              className="w-7 h-7 p-0.5 border border-[#3a3a3a] rounded-md bg-[#2a2a2a] cursor-pointer"
            />
          </label>
          <div className="w-px h-7 bg-[#3a3a3a] mx-2" />
          <button
            type="button"
            onClick={() => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              const link = document.createElement("a");
              link.download = `meme-${Date.now()}.png`;
              link.href = canvas.toDataURL("image/png");
              link.click();
            }}
            disabled={!imageReady}
            className="px-3.5 py-2 text-sm font-medium text-white bg-[#2d2d2d] border-none rounded-lg cursor-pointer hover:bg-[#3d3d3d] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download
          </button>
          <button
            type="button"
            onClick={postToGallery}
            disabled={!imageRef.current || posting}
            className="px-3.5 py-2 text-sm font-medium text-black bg-[var(--accent)] border-none rounded-lg cursor-pointer hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {posting ? "Posting..." : "Post to gallery"}
          </button>
        </div>
      </div>
    </div>
  );
}
