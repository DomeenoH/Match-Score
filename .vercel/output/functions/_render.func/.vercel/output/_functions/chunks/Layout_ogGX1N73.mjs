import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderSlot, e as renderTemplate } from './astro/server_BGTwoHLf.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="UTF-8"><meta name="description" content="Match Score 灵魂契合度测试"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-white text-gray-900 min-h-screen flex flex-col font-sans antialiased selection:bg-black selection:text-white"> <header class="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50"> <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between"> <a href="/" class="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
Match Score
</a> <nav class="flex gap-6 text-sm font-medium text-gray-600 items-center"> <a href="/" class="hover:text-black transition-colors">首页</a> <a href="/create" class="hover:text-black transition-colors">创建</a> <a href="/match" class="hover:text-black transition-colors">匹配</a> <a href="https://github.com/DomeenoH/match-Score" target="_blank" rel="noopener noreferrer" class="hover:text-black transition-colors">
GitHub
</a> </nav> </div> </header> <main class="flex-1 w-full max-w-4xl mx-auto px-4 py-12"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="py-8 text-center text-xs text-gray-400 border-t border-gray-50 mt-auto"> <p>
© 2025 Match Score. Built by <a href="https://github.com/DomeenoH/match-Score" target="_blank" rel="noopener noreferrer" class="hover:text-gray-600 underline decoration-dotted underline-offset-2">DomeenoH</a> </p> </footer> </body></html>`;
}, "/Volumes/\u6742\u9879/survey/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
