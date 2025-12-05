/* empty css                                  */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BGTwoHLf.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_ogGX1N73.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Q as Questionnaire } from '../chunks/Questionnaire_MisYFolm.mjs';
export { renderers } from '../renderers.mjs';

function SoulHashDisplay({ hash }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/match?host=${hash}` : `/match?host=${hash}`;
  const invitationText = `【Match Score 邀请函】
朋友，我已完成我的灵魂契合度测试。点击下方链接，完成你的问卷，看看我们的相性如何：

${shareUrl}

或直接复制我的 Match Score 编码（如果链接失效）：
${hash}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(invitationText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Match Score 邀请函",
        text: invitationText,
        url: shareUrl
      }).then(() => {
        console.log("Shared successfully");
      }).catch((error) => {
        console.error("Error sharing:", error);
        navigator.clipboard.writeText(invitationText).then(() => {
          alert("邀请函已复制到剪贴板！");
        }).catch((err) => {
          console.error("Failed to copy invitation text: ", err);
        });
      });
    } else {
      navigator.clipboard.writeText(invitationText).then(() => {
        alert("邀请函已复制到剪贴板！");
      }).catch((err) => {
        console.error("Failed to copy invitation text: ", err);
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-2 font-mono", children: "或直接复制我的 Match Score 编码（如果链接失效）：" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("code", { className: "flex-1 block p-3 bg-white border border-gray-300 rounded text-xs font-mono break-all text-gray-600 max-h-20 overflow-y-auto", children: hash }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCopy,
            className: "px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium transition-colors",
            children: copied ? "已复制" : "复制"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2 text-gray-900", children: "你的 Match Score 已生成" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "快去寻找那个和你灵魂共鸣的人吧" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleShare,
            className: "flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-transform hover:scale-105 shadow-lg",
            children: [
              /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("circle", { cx: "18", cy: "5", r: "3" }),
                /* @__PURE__ */ jsx("circle", { cx: "6", cy: "12", r: "3" }),
                /* @__PURE__ */ jsx("circle", { cx: "18", cy: "19", r: "3" }),
                /* @__PURE__ */ jsx("line", { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }),
                /* @__PURE__ */ jsx("line", { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" })
              ] }),
              "分享给朋友"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/match",
            className: "flex items-center gap-2 px-6 py-3 bg-white text-black border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-transform hover:scale-105",
            children: [
              /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { d: "m12 19-7-7 7-7" }),
                /* @__PURE__ */ jsx("path", { d: "M19 12H5" })
              ] }),
              "返回首页"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-gray-400", children: "包含：测试链接 + Match Score 编码" })
    ] })
  ] });
}

function CreateFlow() {
  const [hash, setHash] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlHash = params.get("hash");
    if (urlHash) {
      setHash(urlHash);
    }
  }, []);
  const handleComplete = (newHash) => {
    setHash(newHash);
    window.history.pushState({}, "", `/create?hash=${newHash}`);
  };
  if (hash) {
    return /* @__PURE__ */ jsx(SoulHashDisplay, { hash });
  }
  return /* @__PURE__ */ jsx(Questionnaire, { onComplete: handleComplete });
}

const $$Create = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u521B\u5EFA\u4F60\u7684 Match Score | Match Score" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full max-w-3xl mx-auto"> ${renderComponent($$result2, "CreateFlow", CreateFlow, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/\u6742\u9879/survey/src/components/CreateFlow", "client:component-export": "default" })} </div> ` })}`;
}, "/Volumes/\u6742\u9879/survey/src/pages/create.astro", void 0);

const $$file = "/Volumes/杂项/survey/src/pages/create.astro";
const $$url = "/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Create,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
