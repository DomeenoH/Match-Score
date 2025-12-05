/* empty css                                  */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BGTwoHLf.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_ogGX1N73.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as QUESTIONS, d as decodeSoul, Q as Questionnaire } from '../chunks/Questionnaire_MisYFolm.mjs';
export { renderers } from '../renderers.mjs';

function MatchInput({ onMatch }) {
  const [inputHash, setInputHash] = useState("");
  const extractHash = (text) => {
    const urlMatch = text.match(/[?&]host=([a-zA-Z0-9\-_]+)/);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
    const words = text.split(/[\s\n\r]+/);
    const potentialHashes = words.filter((w) => /^[a-zA-Z0-9\-_]{10,}$/.test(w));
    if (potentialHashes.length > 0) {
      const nonUrlHashes = potentialHashes.filter((h) => !h.startsWith("http"));
      if (nonUrlHashes.length > 0) {
        return nonUrlHashes[nonUrlHashes.length - 1];
      }
      return potentialHashes[potentialHashes.length - 1];
    }
    return text.trim();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const rawInput = inputHash.trim();
    if (rawInput) {
      const extracted = extractHash(rawInput);
      onMatch(extracted);
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    setInputHash(text);
    const extracted = extractHash(text);
    if (extracted !== text && extracted.length > 0) {
      setInputHash(extracted);
    } else {
      setInputHash(text);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "输入对方的 Match Score" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "粘贴邀请函、链接或直接输入 Hash 编码" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "hash-input", className: "sr-only", children: "Match Score" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "hash-input",
            value: inputHash,
            onChange: (e) => setInputHash(e.target.value),
            onPaste: handlePaste,
            placeholder: "在此粘贴...",
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all min-h-[120px] text-sm font-mono resize-none",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-full px-6 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
          children: "开始匹配分析"
        }
      )
    ] })
  ] });
}

function AnalysisReport({ result, hostName, guestName, hostHash, guestHash }) {
  const rawText = result.details;
  const nameA = hostName || "A";
  const nameB = guestName || "B";
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  console.log("Analysis Report Raw Text:", rawText);
  const extractSection = (text, keyword, nextKeyword) => {
    const pattern = "(?:^|\\n)[#*\\s]*\\d*[\\.\\、]?\\s*" + keyword + ".*?(?:\\n|$)";
    const keywordRegex = new RegExp(pattern, "i");
    const match = text.match(keywordRegex);
    if (!match) return null;
    const startIndex = match.index + match[0].length;
    let endIndex = text.length;
    if (nextKeyword) {
      const remainingText = text.slice(startIndex);
      const nextPattern = "(?:^|\\n)[#*\\s]*\\d*[\\.\\、]?\\s*" + nextKeyword;
      const nextKeywordRegex = new RegExp(nextPattern, "i");
      const nextMatch = remainingText.match(nextKeywordRegex);
      if (nextMatch) {
        endIndex = startIndex + nextMatch.index;
      }
    }
    let content = text.slice(startIndex, endIndex).trim();
    return content.replace(/^[-—]+/, "").replace(/[-—]+$/, "").trim();
  };
  const conclusion = extractSection(rawText, "核心结论", "关键优势") || "暂无结论";
  const strengths = extractSection(rawText, "关键优势", "潜在雷区");
  const conflicts = extractSection(rawText, "潜在雷区", "长期相处");
  const advice = extractSection(rawText, "长期相处");
  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return /* @__PURE__ */ jsx("strong", { className: "font-bold text-gray-900", children: part.slice(2, -2) }, `bold-${index}`);
      }
      if (!part) return null;
      const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = `(${escapeRegExp(nameA)}|${escapeRegExp(nameB)})`;
      const nameRegex = new RegExp(pattern, "g");
      const subParts = part.split(nameRegex);
      return /* @__PURE__ */ jsx("span", { children: subParts.map((subPart, subIndex) => {
        if (subPart === nameA) {
          return /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block px-1.5 rounded bg-indigo-50 text-indigo-800 font-semibold border border-indigo-100 mx-0.5 transform hover:scale-105 transition-transform cursor-default",
              children: subPart
            },
            `nameA-${subIndex}`
          );
        }
        if (subPart === nameB) {
          return /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block px-1.5 rounded bg-rose-50 text-rose-800 font-semibold border border-rose-100 mx-0.5 transform hover:scale-105 transition-transform cursor-default",
              children: subPart
            },
            `nameB-${subIndex}`
          );
        }
        return subPart;
      }) }, `text-${index}`);
    });
  };
  const renderList = (text) => {
    if (!text) return /* @__PURE__ */ jsx("p", { className: "text-gray-500 italic", children: "暂无显著数据" });
    return /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: text.split("\n").map((line, i) => {
      const cleanLine = line.trim();
      if (!cleanLine || cleanLine.startsWith("---")) return null;
      const content = cleanLine.replace(/^[*•-]\s*/, "").replace(/^\d+[\.\、]\s*/, "");
      return /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx("span", { className: "mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-60" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm leading-relaxed", children: formatText(content) })
      ] }, i);
    }) });
  };
  const handleCopyLink = () => {
    if (hostHash && guestHash) {
      const url = `${window.location.origin}/match?host=${hostHash}&guest=${guestHash}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2e3);
      });
    }
  };
  const handleCopyHash = () => {
    if (guestHash) {
      const text = `【Match Score 邀请函】
朋友，我已完成我的灵魂契合度测试。点击下方链接，完成你的问卷，看看我们的相性如何：

${window.location.origin}/match?host=${guestHash}

或直接复制我的 Match Score 编码：
${guestHash}`;
      navigator.clipboard.writeText(text).then(() => {
        setCopiedHash(true);
        setTimeout(() => setCopiedHash(false), 2e3);
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6 sm:p-10 bg-white border border-gray-200 rounded-2xl shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block p-3 rounded-full bg-black text-white mb-4", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" }) }) }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mb-2", children: [
        nameA,
        " & ",
        nameB,
        " 的灵魂共鸣分析"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-sm tracking-wider uppercase", children: "AI 驱动的深度契合度报告" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-12", children: /* @__PURE__ */ jsxs("div", { className: "relative w-40 h-40", children: [
      /* @__PURE__ */ jsxs("svg", { className: "w-full h-full transform -rotate-90", children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "80",
            cy: "80",
            r: "70",
            stroke: "#f3f4f6",
            strokeWidth: "12",
            fill: "transparent"
          }
        ),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "80",
            cy: "80",
            r: "70",
            stroke: "currentColor",
            strokeWidth: "12",
            fill: "transparent",
            strokeDasharray: 440,
            strokeDashoffset: 440 - 440 * result.compatibilityScore / 100,
            className: "text-black transition-all duration-1000 ease-out",
            strokeLinecap: "round"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-4xl font-black tracking-tighter", children: [
          result.compatibilityScore,
          "%"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mt-1", children: "契合度" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 text-white p-8 rounded-xl shadow-lg transform hover:scale-[1.01] transition-transform", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold mb-3 flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: "💡" }),
          " 核心结论"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed font-medium opacity-90", children: formatText(conclusion) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-6 rounded-xl border border-green-100", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-green-800 font-bold mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-green-200 text-green-800 p-1 rounded mr-2 text-xs", children: "契合点" }),
            "关键优势"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-green-900", children: renderList(strengths) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-red-50 p-6 rounded-xl border border-red-100", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-red-800 font-bold mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-red-200 text-red-800 p-1 rounded mr-2 text-xs", children: "冲突点" }),
            "潜在雷区"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-red-900", children: renderList(conflicts) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-8 rounded-xl border border-blue-100", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-blue-900 font-bold mb-4", children: "🔮 长期相处建议" }),
        /* @__PURE__ */ jsx("div", { className: "text-blue-800 leading-relaxed", children: renderList(advice) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-xl border border-gray-200 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 mb-2", children: "分享这份报告" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-4", children: "生成包含双方数据的永久链接" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCopyLink,
            className: "w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2",
            children: copiedLink ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              "已复制链接"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
                /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
              ] }),
              "复制报告链接"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-indigo-900 mb-2", children: "我也要发起测试" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-indigo-600 mb-4", children: "获取你的专属邀请函，寻找其他共鸣" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCopyHash,
            className: "w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2",
            children: copiedHash ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              "已复制邀请函"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                /* @__PURE__ */ jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
              ] }),
              "复制我的邀请函"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => window.location.href = "/",
        className: "text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors",
        children: "返回首页"
      }
    ) })
  ] });
}

const calculateDistance = (profileA, profileB) => {
  let totalDifference = 0;
  const numQuestions = QUESTIONS.length;
  for (let i = 0; i < numQuestions; i++) {
    const answerA = profileA.answers[i];
    const answerB = profileB.answers[i];
    totalDifference += Math.abs(answerA - answerB);
  }
  const maxTotalDifference = numQuestions * 4;
  const matchScore = Math.round((1 - totalDifference / maxTotalDifference) * 100);
  return matchScore;
};
const generateAIContext = (hostProfile, guestProfile) => {
  const matchScore = calculateDistance(hostProfile, guestProfile);
  const comparisonMatrix = QUESTIONS.map((q, index) => {
    const A_answer = hostProfile.answers[index];
    const B_answer = guestProfile.answers[index];
    const A_option = q.options.find((opt) => opt.value === A_answer);
    const B_option = q.options.find((opt) => opt.value === B_answer);
    return {
      id: q.id,
      dimension: q.dimension,
      question: q.text,
      A_answer,
      B_answer,
      A_label: A_option?.label || "N/A",
      B_label: B_option?.label || "N/A",
      difference: Math.abs(A_answer - B_answer)
    };
  });
  return {
    hostProfile,
    guestProfile,
    matchScore,
    comparisonMatrix
  };
};
const createAIPrompt = (context) => {
  const { matchScore, comparisonMatrix, hostProfile, guestProfile } = context;
  const nameA = hostProfile.name || "A";
  const nameB = guestProfile.name || "B";
  const strengths = comparisonMatrix.filter((c) => c.difference <= 1);
  const conflicts = comparisonMatrix.filter((c) => c.difference >= 3);
  let prompt = `你是一位阅人无数的“资深情感观察员”，擅长用最直白、接地气的大白话分析人际关系。你的任务是根据 ${nameA} 和 ${nameB} 两个人的50个维度问卷结果，生成一份“一针见血”但又充满温度的相性分析报告。两人基础匹配度为 ${matchScore}%。请从三个维度（优势、雷区、长期建议）分析，并使用中文分点作答。

请注意：
1. **说人话**：不要用心理学术语，要像老朋友聊天一样自然。
2. **直击痛点**：不要模棱两可，好的坏的都要直接指出来。
3. **结构清晰**：严格按照下方的格式输出。
4. **代入名字**：在分析中自然地提到 ${nameA} 和 ${nameB} 的名字，不要只说“A”和“B”。`;
  prompt += "\n\n--- 优势维度（Difference <= 1）：两人天然契合点 ---";
  strengths.slice(0, 5).forEach((c) => {
    prompt += `
- [${c.dimension}]: Q.${c.id} (${c.question}) 两人答案几乎一致，${nameA}: ${c.A_label}, ${nameB}: ${c.B_label}。`;
  });
  prompt += "\n\n--- 核心雷区（Difference >= 3）：未来潜在的冲突爆发点 ---";
  conflicts.slice(0, 5).forEach((c) => {
    prompt += `
- [${c.dimension}]: Q.${c.id} (${c.question}) 差异巨大 (${nameA}:${c.A_label} vs ${nameB}:${c.B_label})。这是硬性矛盾，需要深入关注。`;
  });
  prompt += "\n\n--- 维度总结 ---";
  prompt += "\n\n请根据上述数据和风格要求，生成报告的最终内容，报告应包含以下结构：\n";
  prompt += "1. 核心结论（一句话总结，直指本质，不要废话）\n";
  prompt += "2. 关键优势分析（列点阐述，说明这些默契在生活中意味着什么）\n";
  prompt += "3. 潜在雷区预警（列点阐述，直接指出如果不注意会吵什么架）\n";
  prompt += "4. 长期相处建议（给出马上能用的实操建议）\n";
  return prompt;
};
const retryFetch = async (url, options, retries = 3, backoff = 1e3, onRetry) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) return response;
    if ([429, 500, 502, 503, 504].includes(response.status) && retries > 0) {
      const currentRetry = 4 - retries;
      console.warn(`Request failed with status ${response.status}. Retrying in ${backoff}ms... (Attempt ${currentRetry})`);
      if (onRetry) onRetry(currentRetry);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return retryFetch(url, options, retries - 1, backoff * 2, onRetry);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      const currentRetry = 4 - retries;
      console.warn(`Request failed with error. Retrying in ${backoff}ms... (Attempt ${currentRetry})`, error);
      if (onRetry) onRetry(currentRetry);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return retryFetch(url, options, retries - 1, backoff * 2, onRetry);
    }
    throw error;
  }
};
const fetchAIAnalysis = async (profileA, profileB, onRetry, onStream, config) => {
  const context = generateAIContext(profileA, profileB);
  const prompt = createAIPrompt(context);
  const endpoint = "/api/analyze";
  try {
    const response = await retryFetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, stream: true, config })
        // Signal streaming and pass config
      },
      3,
      1e3,
      onRetry
    );
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`AI Analysis request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        if (onStream) onStream(accumulatedText);
      }
    } else {
      const data = await response.json();
      accumulatedText = data.reportText;
    }
    return {
      compatibilityScore: context.matchScore,
      summary: `基于数据的灵魂契合度：${context.matchScore}%`,
      details: accumulatedText
    };
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      compatibilityScore: context.matchScore,
      summary: `基于数据的灵魂契合度：${context.matchScore}% (离线模式)`,
      details: `[系统提示：AI 服务暂时不可用，以下是基于原始数据的分析预览]

${prompt}`
    };
  }
};

function MatchFlow() {
  const [hostHash, setHostHash] = useState(null);
  const [myHash, setMyHash] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiConfig, setAiConfig] = useState({
    endpoint: "",
    apiKey: "",
    model: ""
  });
  const [showSettings, setShowSettings] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const handleMatchStart = (hash) => {
    setHostHash(hash);
  };
  useEffect(() => {
    const savedConfig = localStorage.getItem("soul_match_ai_config");
    if (savedConfig) {
      try {
        setAiConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, []);
  const handleSaveConfig = (newConfig) => {
    setAiConfig(newConfig);
    localStorage.setItem("soul_match_ai_config", JSON.stringify(newConfig));
    setShowSettings(false);
  };
  const runAnalysis = async (hHash, mHash) => {
    setLoading(true);
    setError(null);
    setRetryCount(0);
    try {
      const hostProfile = decodeSoul(hHash);
      const myProfile = decodeSoul(mHash);
      if (hostProfile && myProfile) {
        const result = await fetchAIAnalysis(
          hostProfile,
          myProfile,
          (count) => setRetryCount(count),
          (partialText) => {
            setAnalysis({
              compatibilityScore: calculateDistance(hostProfile, myProfile),
              summary: "正在生成分析报告...",
              details: partialText
            });
          },
          aiConfig
          // Pass user config
        );
        setAnalysis(result);
      } else {
        setError("解析灵魂档案失败，请重试。");
      }
    } catch (e) {
      console.error(e);
      setError("分析过程中发生错误，请稍后重试。");
    } finally {
      setLoading(false);
      setRetryCount(0);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hParam = params.get("host");
    const gParam = params.get("guest");
    if (hParam) {
      setHostHash(hParam);
    }
    if (hParam && gParam) {
      setMyHash(gParam);
      runAnalysis(hParam, gParam);
    }
  }, [aiConfig]);
  const handleQuestionnaireComplete = async (newMyHash) => {
    setMyHash(newMyHash);
    if (hostHash) {
      runAnalysis(hostHash, newMyHash);
    }
  };
  if (analysis) {
    const hostProfile = hostHash ? decodeSoul(hostHash) : null;
    const myProfile = myHash ? decodeSoul(myHash) : null;
    return /* @__PURE__ */ jsx(
      AnalysisReport,
      {
        result: analysis,
        hostName: hostProfile?.name,
        guestName: myProfile?.name,
        hostHash: hostHash || void 0,
        guestHash: myHash || void 0
      }
    );
  }
  const SettingsModal = () => {
    const [tempConfig, setTempConfig] = useState(aiConfig);
    return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 w-full max-w-md shadow-2xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "AI 模型设置" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "自定义 Endpoint (可选)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: tempConfig.endpoint || "",
              onChange: (e) => setTempConfig({ ...tempConfig, endpoint: e.target.value }),
              placeholder: "https://api.openai.com/v1/chat/completions",
              className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "留空则使用默认服务" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "API Key (可选)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              value: tempConfig.apiKey || "",
              onChange: (e) => setTempConfig({ ...tempConfig, apiKey: e.target.value }),
              placeholder: "sk-...",
              className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "模型名称 (可选)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: tempConfig.model || "",
              onChange: (e) => setTempConfig({ ...tempConfig, model: e.target.value }),
              placeholder: "gemini-2.5-flash-lite",
              className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowSettings(false),
            className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg",
            children: "取消"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleSaveConfig(tempConfig),
            className: "px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800",
            children: "保存"
          }
        )
      ] })
    ] }) });
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900", children: "正在进行灵魂共鸣分析..." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "AI 正在对比你们的 50 个维度数据" }),
      retryCount > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm animate-pulse border border-yellow-200", children: [
        "AI 服务连接不稳定，正在进行第 ",
        retryCount,
        " 次重试..."
      ] })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-red-800 mb-2", children: "出错了" }),
      /* @__PURE__ */ jsx("p", { className: "text-red-600 mb-4", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.location.href = "/match",
          className: "px-4 py-2 bg-white border border-red-300 text-red-700 rounded hover:bg-red-50 transition-colors",
          children: "返回重试"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setShowSettings(true),
        className: "absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors",
        title: "AI 设置",
        children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
        ] })
      }
    ),
    showSettings && /* @__PURE__ */ jsx(SettingsModal, {}),
    hostHash ? /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center bg-gray-50 p-6 rounded-xl border border-gray-100", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-3", children: "匹配模式" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "对方已就位，请完成你的灵魂档案" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm font-mono", children: [
          "目标编码: ",
          hostHash.substring(0, 12),
          "..."
        ] })
      ] }),
      /* @__PURE__ */ jsx(Questionnaire, { onComplete: handleQuestionnaireComplete })
    ] }) : /* @__PURE__ */ jsx(MatchInput, { onMatch: handleMatchStart })
  ] });
}

const $$Match = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u5339\u914D\u7075\u9B42\u5951\u5408\u5EA6 | Match Score" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full max-w-3xl mx-auto"> ${renderComponent($$result2, "MatchFlow", MatchFlow, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/\u6742\u9879/survey/src/components/MatchFlow", "client:component-export": "default" })} </div> ` })}`;
}, "/Volumes/\u6742\u9879/survey/src/pages/match.astro", void 0);

const $$file = "/Volumes/杂项/survey/src/pages/match.astro";
const $$url = "/match";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Match,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
