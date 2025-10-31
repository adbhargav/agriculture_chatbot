import React from "react";

/**
 * MessageBubble
 * - updated to match the dark navy / slate theme used across the app
 * - improved handling for:
 *   - paragraphs, bullets, numbered lists
 *   - horizontal rules
 *   - headers
 *   - inline code and fenced code blocks
 *   - simple link detection
 *
 * Styling notes:
 * - bot bubbles: slate-800 background with cyan accents for links/code
 * - user bubbles: cyan-400 background with dark text for contrast
 * - more padding, softer corners, and improved max width for readability
 */

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  // Detect fenced code blocks ```lang\n...\n```
  const parseFencedCode = (block) => {
    const fencedRegex = /```([\w-+]*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    const parts = [];
    let match;

    while ((match = fencedRegex.exec(block)) !== null) {
      const [full, lang, code] = match;
      const index = match.index;

      if (index > lastIndex) {
        parts.push({
          type: "text",
          content: block.slice(lastIndex, index),
        });
      }

      parts.push({
        type: "code",
        lang: lang || "",
        content: code,
      });

      lastIndex = index + full.length;
    }

    if (lastIndex < block.length) {
      parts.push({
        type: "text",
        content: block.slice(lastIndex),
      });
    }

    return parts;
  };

  // Format a plain text block into React elements (handles inline code and links)
  const inlineFormat = (str, keyBase = "") => {
    if (!str) return null;

    // replace simple markdown inline code `code`
    // and detect links (http(s)://...) and email-like patterns
    const tokens = [];
    const inlineCodeRegex = /`([^`]+)`/g;
    let last = 0;
    let m;
    let idx = 0;

    // First we split by inline code occurrences
    while ((m = inlineCodeRegex.exec(str)) !== null) {
      if (m.index > last) {
        tokens.push({ type: "text", content: str.slice(last, m.index) });
      }
      tokens.push({ type: "inline-code", content: m[1] });
      last = m.index + m[0].length;
    }
    if (last < str.length) {
      tokens.push({ type: "text", content: str.slice(last) });
    }

    // For each text token detect links and split further
    const elements = tokens.flatMap((t) => {
      if (t.type !== "text") return [t];

      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = [];
      let last2 = 0;
      let mm;
      while ((mm = urlRegex.exec(t.content)) !== null) {
        if (mm.index > last2) {
          parts.push({ type: "text", content: t.content.slice(last2, mm.index) });
        }
        parts.push({ type: "link", content: mm[0] });
        last2 = mm.index + mm[0].length;
      }
      if (last2 < t.content.length) {
        parts.push({ type: "text", content: t.content.slice(last2) });
      }
      return parts;
    });

    // Map to React nodes
    return elements.map((el, i) => {
      const key = `${keyBase}-${i}`;
      if (el.type === "inline-code") {
        return (
          <code
            key={key}
            className="bg-slate-900/40 text-cyan-200 px-1 rounded-sm font-mono text-xs"
          >
            {el.content}
          </code>
        );
      }
      if (el.type === "link") {
        return (
          <a
            key={key}
            href={el.content}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            {el.content}
          </a>
        );
      }
      // plain text
      return <span key={key}>{el.content}</span>;
    });
  };

  // Main formatter: splits by fenced code blocks first, then by lines/paragraphs
  const formatText = (raw) => {
    if (!raw && raw !== "") return null;

    // Normalize CRLF to LF
    const text = String(raw).replace(/\r\n/g, "\n");

    // Parse fenced code blocks (returns array of {type, content})
    const parts = parseFencedCode(text);

    const nodes = parts.map((part, partIdx) => {
      if (part.type === "code") {
        return (
          <pre
            key={`fcode-${partIdx}`}
            className="bg-slate-900 border border-slate-700 rounded-md p-3 overflow-auto text-xs sm:text-sm font-mono text-slate-200 my-2"
          >
            <code>{part.content}</code>
          </pre>
        );
      }

      // For text parts, split into paragraphs by blank lines
      const paragraphs = part.content.split(/\n{2,}/g);
      return paragraphs.map((para, pIdx) => {
        // For each paragraph, split into lines and detect list items
        const lines = para.split("\n");
        // Detect if paragraph is a list (all lines start with bullet or numbered)
        const isBulletList = lines.every((l) => l.trim().startsWith("• ") || /^\s*[-*]\s+/.test(l));
        const isNumberedList = lines.every((l) => /^\s*\d+\.\s+/.test(l));

        if (isBulletList) {
          const items = lines.map((l, li) => {
            const content = l.replace(/^\s*(?:•|[-*])\s+/, "");
            return (
              <li key={`b-${partIdx}-${pIdx}-${li}`} className="mb-1">
                {inlineFormat(content, `b-${partIdx}-${pIdx}-${li}`)}
              </li>
            );
          });
          return (
            <ul
              key={`ul-${partIdx}-${pIdx}`}
              className="list-disc ml-5 text-slate-300 mb-2"
            >
              {items}
            </ul>
          );
        }

        if (isNumberedList) {
          const items = lines.map((l, li) => {
            const content = l.replace(/^\s*\d+\.\s+/, "");
            return (
              <li key={`n-${partIdx}-${pIdx}-${li}`} className="mb-1">
                {inlineFormat(content, `n-${partIdx}-${pIdx}-${li}`)}
              </li>
            );
          });
          return (
            <ol
              key={`ol-${partIdx}-${pIdx}`}
              className="list-decimal ml-5 text-slate-300 mb-2"
            >
              {items}
            </ol>
          );
        }

        // Handle horizontal rule lines (---)
        if (para.trim() === "---") {
          return <hr key={`hr-${partIdx}-${pIdx}`} className="my-3 border-slate-700" />;
        }

        // Handle headers (#, ##, ###)
        const headerMatch = para.trim().match(/^(#{1,3})\s+(.*)/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const content = headerMatch[2];
          if (level === 1) {
            return (
              <h1 key={`h1-${partIdx}-${pIdx}`} className="text-lg sm:text-xl font-bold text-slate-100 my-2">
                {inlineFormat(content, `h1-${partIdx}-${pIdx}`)}
              </h1>
            );
          }
          if (level === 2) {
            return (
              <h2 key={`h2-${partIdx}-${pIdx}`} className="text-md sm:text-lg font-semibold text-slate-100 my-2">
                {inlineFormat(content, `h2-${partIdx}-${pIdx}`)}
              </h2>
            );
          }
          return (
            <h3 key={`h3-${partIdx}-${pIdx}`} className="text-sm font-semibold text-slate-100 my-2">
              {inlineFormat(content, `h3-${partIdx}-${pIdx}`)}
            </h3>
          );
        }

        // Normal paragraph: also convert lines starting with "Sources:" or "Source:" into a subtle label
        const trimmed = para.trim();
        if (/^sources?:/i.test(trimmed)) {
          // Render sources block with monospace for links and lighter background
          const after = para.replace(/^sources?:\s*/i, "");
          return (
            <div key={`src-${partIdx}-${pIdx}`} className="bg-slate-900/40 border border-slate-700 rounded-md p-3 text-xs text-slate-300 mb-2">
              <strong className="text-slate-200 mr-1">Sources:</strong>
              <div className="mt-1 whitespace-pre-wrap">{inlineFormat(after, `src-${partIdx}-${pIdx}`)}</div>
            </div>
          );
        }

        // Fallback paragraph - preserve line breaks within paragraph
        const linesNodes = lines.map((ln, li) => (
          <span key={`ln-${partIdx}-${pIdx}-${li}`}>
            {inlineFormat(ln, `ln-${partIdx}-${pIdx}-${li}`)}
            {li < lines.length - 1 ? <br /> : null}
          </span>
        ));

        return (
          <p key={`p-${partIdx}-${pIdx}`} className="text-slate-200 mb-2 leading-relaxed">
            {linesNodes}
          </p>
        );
      });
    });

    // Flatten nodes array
    return nodes.flat();
  };

  // Bubble styles
  const bubbleBase =
    "max-w-[85%] p-3 md:p-4 rounded-xl text-sm md:text-base leading-relaxed break-words";
  const userStyles =
    "bg-cyan-400 text-slate-900 rounded-br-none shadow-md";
  const botStyles =
    "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-3`}>
      <div className={`${bubbleBase} ${isUser ? userStyles : botStyles}`}>
        <div className="whitespace-pre-wrap">{formatText(text)}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
