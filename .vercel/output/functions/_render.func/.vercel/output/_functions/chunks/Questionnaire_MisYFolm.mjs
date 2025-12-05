import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import LZString from 'lz-string';

const QUESTIONS = [
  // --- Layer 1: Lifestyle (生活习惯 - 12题)
  { id: 1, text: "你对室内整洁度的要求是什么？", dimension: "lifestyle", options: [{ value: 1, label: "随性" }, { value: 2, label: "较随性" }, { value: 3, label: "普通" }, { value: 4, label: "较整洁" }, { value: 5, label: "洁癖" }] },
  { id: 2, text: "你对伴侣的作息时间（熬夜/早起）的接受程度？", dimension: "lifestyle", options: [{ value: 1, label: "必须同步" }, { value: 2, label: "尽量同步" }, { value: 3, label: "看情况" }, { value: 4, label: "不太介意" }, { value: 5, label: "完全不干涉" }] },
  { id: 3, text: "你对养宠物（如猫狗）的态度和意愿？", dimension: "lifestyle", options: [{ value: 1, label: "完全不能接受" }, { value: 2, label: "很难接受" }, { value: 3, label: "中立" }, { value: 4, label: "可以接受" }, { value: 5, label: "必须有" }] },
  // Q3 拆分：宠物
  { id: 4, text: "你对伴侣吸烟、饮酒或其他成瘾品的态度？", dimension: "lifestyle", options: [{ value: 1, label: "零容忍" }, { value: 2, label: "尽量避免" }, { value: 3, label: "中立" }, { value: 4, label: "适度即可" }, { value: 5, label: "无所谓" }] },
  // Q3/Q13 整合优化
  { id: 5, text: "周末休息时，你更倾向于哪种度过方式？", dimension: "lifestyle", options: [{ value: 1, label: "完全宅家" }, { value: 2, label: "倾向宅家" }, { value: 3, label: "看心情" }, { value: 4, label: "倾向外出" }, { value: 5, label: "必须外出活动" }] },
  { id: 6, text: "你对饮食口味的偏好（如辣度/咸淡）有多坚持？", dimension: "lifestyle", options: [{ value: 1, label: "非常挑剔" }, { value: 2, label: "比较挑剔" }, { value: 3, label: "一般" }, { value: 4, label: "比较随和" }, { value: 5, label: "完全不挑" }] },
  { id: 7, text: "你对运动健身的频率要求是？", dimension: "lifestyle", options: [{ value: 1, label: "从不运动" }, { value: 2, label: "偶尔动动" }, { value: 3, label: "每周1-2次" }, { value: 4, label: "每周3-4次" }, { value: 5, label: "每天必须" }] },
  { id: 8, text: "你对家中物品摆放的秩序感要求？", dimension: "lifestyle", options: [{ value: 1, label: "乱中有序" }, { value: 2, label: "大致归位" }, { value: 3, label: "普通" }, { value: 4, label: "井井有条" }, { value: 5, label: "严丝合缝" }] },
  { id: 9, text: "对于家务分配，你更倾向于？", dimension: "lifestyle", options: [{ value: 1, label: "随性分配" }, { value: 2, label: "大致分工" }, { value: 3, label: "看谁有空" }, { value: 4, label: "明确分工" }, { value: 5, label: "严格轮值/外包" }] },
  { id: 10, text: "你对电子产品使用时长（如刷手机/打游戏）的看法？", dimension: "lifestyle", options: [{ value: 1, label: "希望能严格控制" }, { value: 2, label: "希望能少一点" }, { value: 3, label: "适度就好" }, { value: 4, label: "比较宽松" }, { value: 5, label: "完全自由" }] },
  { id: 11, text: "你对旅行方式的偏好？", dimension: "lifestyle", options: [{ value: 1, label: "随性漫游" }, { value: 2, label: "大致规划" }, { value: 3, label: "半自由行" }, { value: 4, label: "详细攻略" }, { value: 5, label: "特种兵打卡" }] },
  { id: 12, text: "你对个人空间（独处时间）的需求程度？", dimension: "lifestyle", options: [{ value: 1, label: "希望能时刻粘在一起" }, { value: 2, label: "希望能多在一起" }, { value: 3, label: "平衡" }, { value: 4, label: "需要较多独处" }, { value: 5, label: "极度需要独处" }] },
  // --- Layer 2: Finance (金钱观 - 10题)
  { id: 13, text: "在共同消费中，你倾向于AA制还是混合记账？", dimension: "finance", options: [{ value: 1, label: "严格AA" }, { value: 2, label: "大额AA" }, { value: 3, label: "轮流付" }, { value: 4, label: "大部分共享" }, { value: 5, label: "完全不分你我" }] },
  { id: 14, text: "你对伴侣的消费习惯的容忍度？", dimension: "finance", options: [{ value: 1, label: "必须节俭" }, { value: 2, label: "倾向节俭" }, { value: 3, label: "适度消费" }, { value: 4, label: "倾向享受" }, { value: 5, label: "享受当下" }] },
  { id: 15, text: "你对冲动消费的自我评级？", dimension: "finance", options: [{ value: 1, label: "从不冲动" }, { value: 2, label: "很少冲动" }, { value: 3, label: "偶尔" }, { value: 4, label: "经常冲动" }, { value: 5, label: "购物狂" }] },
  { id: 16, text: "你认为伴侣是否有知晓你所有收入和支出的权利？", dimension: "finance", options: [{ value: 1, label: "完全隐私" }, { value: 2, label: "保留部分隐私" }, { value: 3, label: "看情况" }, { value: 4, label: "大部分公开" }, { value: 5, label: "完全透明" }] },
  { id: 17, text: "你对负债消费（如信用卡/花呗）的态度？", dimension: "finance", options: [{ value: 1, label: "极度排斥" }, { value: 2, label: "尽量避免" }, { value: 3, label: "中立" }, { value: 4, label: "可以接受" }, { value: 5, label: "习以为常" }] },
  { id: 18, text: "你对投资理财的风险偏好？", dimension: "finance", options: [{ value: 1, label: "极度保守(储蓄)" }, { value: 2, label: "稳健理财" }, { value: 3, label: "平衡配置" }, { value: 4, label: "进取投资" }, { value: 5, label: "高风险高收益" }] },
  { id: 19, text: "对于大额支出（如买车/买房），决策方式倾向于？", dimension: "finance", options: [{ value: 1, label: "各自决定" }, { value: 2, label: "告知即可" }, { value: 3, label: "简单商量" }, { value: 4, label: "共同商议" }, { value: 5, label: "必须一致同意" }] },
  { id: 20, text: "你认为金钱在幸福生活中的重要性？", dimension: "finance", options: [{ value: 1, label: "够用就行" }, { value: 2, label: "基础保障" }, { value: 3, label: "重要" }, { value: 4, label: "非常重要" }, { value: 5, label: "决定性因素" }] },
  { id: 21, text: "你是否有记账的习惯？", dimension: "finance", options: [{ value: 1, label: "从不记账" }, { value: 2, label: "偶尔记" }, { value: 3, label: "记大额" }, { value: 4, label: "经常记" }, { value: 5, label: "每一笔都记" }] },
  { id: 22, text: "如果伴侣收入比你高很多或低很多，你会介意吗？", dimension: "finance", options: [{ value: 1, label: "非常介意" }, { value: 2, label: "有点介意" }, { value: 3, label: "看情况" }, { value: 4, label: "不太介意" }, { value: 5, label: "完全不介意" }] },
  // --- Layer 3: Communication (沟通模式 - 10题)
  { id: 23, text: "遇到分歧时，你倾向于立即解决还是需要冷静期？", dimension: "communication", options: [{ value: 1, label: "必须马上沟通" }, { value: 2, label: "倾向当天解决" }, { value: 3, label: "看情况" }, { value: 4, label: "倾向冷静后再谈" }, { value: 5, label: "回避并冷静处理" }] },
  { id: 24, text: "你对伴侣的朋友圈子和社交活动参与的意愿？", dimension: "communication", options: [{ value: 1, label: "希望完全融入" }, { value: 2, label: "希望能经常参与" }, { value: 3, label: "偶尔参与" }, { value: 4, label: "很少参与" }, { value: 5, label: "互不打扰" }] },
  { id: 25, text: "在关系中，你认为情绪表达应该被量化和克制吗？", dimension: "communication", options: [{ value: 1, label: "完全释放" }, { value: 2, label: "倾向直接表达" }, { value: 3, label: "看场合" }, { value: 4, label: "倾向克制" }, { value: 5, label: "高度理性克制" }] },
  { id: 26, text: "伴侣因小事生气时，你倾向于马上哄还是讲道理？", dimension: "communication", options: [{ value: 1, label: "马上哄" }, { value: 2, label: "先哄后道理" }, { value: 3, label: "看情况" }, { value: 4, label: "先讲道理" }, { value: 5, label: "坚持讲道理" }] },
  { id: 27, text: "你希望伴侣回复消息的频率是？", dimension: "communication", options: [{ value: 1, label: "秒回" }, { value: 2, label: "看到就回" }, { value: 3, label: "忙完回" }, { value: 4, label: "不固定" }, { value: 5, label: "轮回/电话联系" }] },
  { id: 28, text: "你对于“善意的谎言”的接受度？", dimension: "communication", options: [{ value: 1, label: "绝不接受" }, { value: 2, label: "尽量诚实" }, { value: 3, label: "看初衷" }, { value: 4, label: "可以接受" }, { value: 5, label: "为了和谐必须有" }] },
  { id: 29, text: "当你有负面情绪时，你希望伴侣如何处理？", dimension: "communication", options: [{ value: 1, label: "默默陪伴" }, { value: 2, label: "倾听不评判" }, { value: 3, label: "给拥抱" }, { value: 4, label: "给建议" }, { value: 5, label: "帮我分析解决" }] },
  { id: 30, text: "你认为在公共场合展示亲密行为（PDA）的尺度？", dimension: "communication", options: [{ value: 1, label: "完全拒绝" }, { value: 2, label: "仅限牵手" }, { value: 3, label: "适度亲密" }, { value: 4, label: "比较开放" }, { value: 5, label: "无视他人目光" }] },
  { id: 31, text: "你对异性（或同性）好友的边界感要求？", dimension: "communication", options: [{ value: 1, label: "极度敏感" }, { value: 2, label: "比较敏感" }, { value: 3, label: "正常社交即可" }, { value: 4, label: "比较宽松" }, { value: 5, label: "完全信任不干涉" }] },
  { id: 32, text: "你更倾向于哪种沟通风格？", dimension: "communication", options: [{ value: 1, label: "委婉含蓄" }, { value: 2, label: "比较委婉" }, { value: 3, label: "适中" }, { value: 4, label: "比较直接" }, { value: 5, label: "直来直去" }] },
  // --- Layer 4: Intimacy (亲密与家庭 - 8题)
  { id: 33, text: "你对亲密接触（身体或精神）的频率和需求？", dimension: "intimacy", options: [{ value: 1, label: "非常低" }, { value: 2, label: "较低，更重精神" }, { value: 3, label: "适中，平衡" }, { value: 4, label: "较高" }, { value: 5, label: "非常高，强烈依赖" }] },
  { id: 34, text: "你对伴侣的**仪式感**（如纪念日/节日）的看重程度？", dimension: "intimacy", options: [{ value: 1, label: "完全不看重" }, { value: 2, label: "偶尔即可" }, { value: 3, label: "看情况" }, { value: 4, label: "比较看重" }, { value: 5, label: "必须要有，并精心准备" }] },
  { id: 35, text: "你对未来与**双方原生家庭**相处方式的期望？", dimension: "intimacy", options: [{ value: 1, label: "老死不相往来" }, { value: 2, label: "仅限节日拜访" }, { value: 3, label: "适度联系，保持边界" }, { value: 4, label: "经常联系，互相帮助" }, { value: 5, label: "希望完全融入对方家庭" }] },
  { id: 36, text: "你对**生育**下一代的明确态度？", dimension: "intimacy", options: [{ value: 1, label: "坚决丁克" }, { value: 2, label: "倾向丁克" }, { value: 3, label: "顺其自然" }, { value: 4, label: "倾向生育" }, { value: 5, label: "必须生育" }] },
  // 从 Q44 优化而来
  { id: 37, text: "你对婚前/同居**共同财产**的看法？", dimension: "intimacy", options: [{ value: 1, label: "必须公正划分" }, { value: 2, label: "倾向区分" }, { value: 3, label: "看情况" }, { value: 4, label: "倾向共有" }, { value: 5, label: "完全共有不分彼此" }] },
  { id: 38, text: "如果发现伴侣与前任仍有联系，你的接受度？", dimension: "intimacy", options: [{ value: 1, label: "完全不能接受" }, { value: 2, label: "极度介意" }, { value: 3, label: "看情况" }, { value: 4, label: "接受普通朋友关系" }, { value: 5, label: "完全信任，不干涉" }] },
  { id: 39, text: "你认为伴侣关系中的**安全感**主要来自于？", dimension: "intimacy", options: [{ value: 1, label: "经济基础和物质承诺" }, { value: 2, label: "稳定的行为和时间投入" }, { value: 3, label: "平衡" }, { value: 4, label: "清晰的口头承诺和表达" }, { value: 5, label: "无条件的爱和信任" }] },
  { id: 40, text: "你希望伴侣如何给你提供情感支持（爱语倾向）？", dimension: "intimacy", options: [{ value: 1, label: "服务行为 (做事)" }, { value: 2, label: "精心的礼物" }, { value: 3, label: "高品质的相处时间" }, { value: 4, label: "肯定的语言" }, { value: 5, label: "身体接触 (拥抱/牵手)" }] },
  // --- Layer 5: Values (核心价值观 - 10题)
  { id: 41, text: "在个人发展和家庭责任之间，你的首要权重？", dimension: "values", options: [{ value: 1, label: "优先家庭" }, { value: 2, label: "倾向家庭" }, { value: 3, label: "平衡" }, { value: 4, label: "倾向事业" }, { value: 5, label: "优先个人事业" }] },
  { id: 42, text: "你对人生的重大风险（如投资/换城市）的看法？", dimension: "values", options: [{ value: 1, label: "保守稳定" }, { value: 2, label: "倾向保守" }, { value: 3, label: "中庸" }, { value: 4, label: "倾向冒险" }, { value: 5, label: "冒险激进" }] },
  { id: 43, text: "你对承诺的看法，例如：迟到或失约的严重程度？", dimension: "values", options: [{ value: 1, label: "非常看重" }, { value: 2, label: "比较看重" }, { value: 3, label: "一般" }, { value: 4, label: "比较包容" }, { value: 5, label: "理解弹性" }] },
  { id: 44, text: "在你的生活中，情感需求和理性分析哪个更重要？", dimension: "values", options: [{ value: 1, label: "情感驱动" }, { value: 2, label: "倾向情感" }, { value: 3, label: "平衡" }, { value: 4, label: "倾向理性" }, { value: 5, label: "理性主导" }] },
  { id: 45, text: "你认为对错判断是否应该有绝对的标准？", dimension: "values", options: [{ value: 1, label: "有绝对标准" }, { value: 2, label: "倾向有标准" }, { value: 3, label: "看情境" }, { value: 4, label: "倾向相对" }, { value: 5, label: "相对主义" }] },
  { id: 46, text: "你对“人无完人，所以不必强求改变”的认同度？", dimension: "values", options: [{ value: 1, label: "完全不认同(需不断改变)" }, { value: 2, label: "不太认同" }, { value: 3, label: "中立" }, { value: 4, label: "比较认同" }, { value: 5, label: "完全认同(接纳本我)" }] },
  { id: 47, text: "你对社会时事和政治话题的关注度？", dimension: "values", options: [{ value: 1, label: "完全不关心" }, { value: 2, label: "偶尔关注" }, { value: 3, label: "一般" }, { value: 4, label: "经常关注" }, { value: 5, label: "热衷讨论" }] },
  { id: 48, text: "你认为“成功”的定义更倾向于？", dimension: "values", options: [{ value: 1, label: "财富地位" }, { value: 2, label: "社会认可" }, { value: 3, label: "平衡" }, { value: 4, label: "内心满足" }, { value: 5, label: "自由快乐" }] },
  { id: 49, text: "你对待“规则”的态度？", dimension: "values", options: [{ value: 1, label: "严格遵守" }, { value: 2, label: "尽量遵守" }, { value: 3, label: "看情况" }, { value: 4, label: "灵活变通" }, { value: 5, label: "规则是用来打破的" }] },
  { id: 50, text: "你认为“平淡”是婚姻的最终归宿吗？", dimension: "values", options: [{ value: 1, label: "绝不接受平淡" }, { value: 2, label: "努力抗拒" }, { value: 3, label: "接受但需调剂" }, { value: 4, label: "比较接受" }, { value: 5, label: "平淡才是真" }] }
];
const DIMENSION_DETAILS = {
  lifestyle: { title: "第一步：生活习惯", description: "关于日常作息、卫生、娱乐、社交等硬性习惯的考察。" },
  finance: { title: "第二步：金钱与财务", description: "关于消费观、储蓄、投资和财务透明度的考察。" },
  communication: { title: "第三步：沟通与情感", description: "关于冲突处理、社交需求、情感表达和边界感的考察。" },
  intimacy: { title: "第四步：亲密与家庭观", description: "关于亲密需求、生育观、原生家庭和对安全感的深层考察。" },
  // 新增维度
  values: { title: "第五步：核心价值观", description: "关于人生目标、道德边界、风险偏好和世界观的深层考察。" }
};

const encodeSoul = (profile) => {
  const profileWithTimestamp = {
    ...profile,
    timestamp: Date.now()
  };
  const jsonString = JSON.stringify(profileWithTimestamp);
  return LZString.compressToEncodedURIComponent(jsonString);
};
const decodeSoul = (hash) => {
  const jsonString = LZString.decompressFromEncodedURIComponent(hash);
  if (!jsonString) return null;
  try {
    const profile = JSON.parse(jsonString);
    if (typeof profile.version === "number" && Array.isArray(profile.answers)) {
      return profile;
    }
    return null;
  } catch (e) {
    console.error("Decoding error:", e);
    return null;
  }
};

const DIMENSION_ORDER = ["lifestyle", "finance", "communication", "intimacy", "values"];
function Questionnaire({ onComplete }) {
  const [answers, setAnswers] = useState(new Array(QUESTIONS.length).fill(0));
  const [currentDimIndex, setCurrentDimIndex] = useState(0);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);
  const handleNameSubmit = () => {
    if (name.trim()) {
      setShowNameInput(false);
    }
  };
  const currentDimension = DIMENSION_ORDER[currentDimIndex];
  const currentQuestions = useMemo(
    () => QUESTIONS.filter((q) => q.dimension === currentDimension),
    [currentDimension]
  );
  const handleOptionSelect = (questionId, value) => {
    const index = QUESTIONS.findIndex((q) => q.id === questionId);
    if (index === -1) return;
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    if (error) setError(null);
  };
  const validateCurrentStep = () => {
    const unansweredInStep = currentQuestions.filter((q) => {
      const index = QUESTIONS.findIndex((globalQ) => globalQ.id === q.id);
      return answers[index] === 0;
    });
    if (unansweredInStep.length > 0) {
      setError(`本页还有 ${unansweredInStep.length} 道题未完成，请回答所有问题后再继续。`);
      return false;
    }
    return true;
  };
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentDimIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  const handlePrev = () => {
    setCurrentDimIndex((prev) => prev - 1);
    window.scrollTo(0, 0);
  };
  const handleSubmit = () => {
    if (validateCurrentStep()) {
      if (answers.some((a) => a === 0)) {
        setError("还有未完成的题目，请检查。");
        return;
      }
      const profile = {
        version: 1,
        answers,
        name: name.trim() || "神秘人"
      };
      const hash = encodeSoul(profile);
      onComplete(hash);
    }
  };
  if (showNameInput) {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", children: "首先，请留下你的名字" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: "你的昵称",
          className: "w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none",
          onKeyDown: (e) => e.key === "Enter" && handleNameSubmit()
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleNameSubmit,
          disabled: !name.trim(),
          className: "w-full py-3 bg-black text-white rounded-lg font-bold text-lg disabled:opacity-50 hover:bg-gray-800 transition-colors",
          children: "开始测试"
        }
      )
    ] });
  }
  const progress = Math.round(answers.filter((a) => a !== 0).length / QUESTIONS.length * 100);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-16 z-30 bg-white/95 backdrop-blur-sm -mx-6 px-6 pt-4 pb-6 shadow-sm mb-8 border-b border-gray-100 transition-all duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900", children: "灵魂契合度测试" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-mono text-gray-500", children: [
            progress,
            "% 完成"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 rounded-full h-2", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-black h-2 rounded-full transition-all duration-500 ease-out",
            style: { width: `${progress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-xl border border-gray-100", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-1", children: DIMENSION_DETAILS[currentDimension].title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: DIMENSION_DETAILS[currentDimension].description })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 ease-out", children: currentQuestions.map((question) => {
      const globalIndex = QUESTIONS.findIndex((q) => q.id === question.id);
      return /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-50 pb-8 last:border-0 last:pb-0", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-lg font-medium text-gray-900 mb-4 leading-relaxed", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-300 font-mono mr-3 text-sm", children: [
            "#",
            question.id
          ] }),
          question.text.split(/(\*\*.*?\*\*)/g).map(
            (part, index) => part.startsWith("**") && part.endsWith("**") ? /* @__PURE__ */ jsx("strong", { className: "font-bold text-gray-900", children: part.slice(2, -2) }, index) : part
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-5 gap-3", children: question.options.map((option) => /* @__PURE__ */ jsxs(
          "label",
          {
            className: `
                                            relative flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-200 text-center h-full
                                            ${answers[globalIndex] === option.value ? "bg-black text-white border-black shadow-lg transform scale-[1.02]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"}
                                        `,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: `question-${question.id}`,
                  value: option.value,
                  checked: answers[globalIndex] === option.value,
                  onChange: () => handleOptionSelect(question.id, option.value),
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: option.label })
            ]
          },
          option.value
        )) })
      ] }, question.id);
    }) }, currentDimIndex),
    error && /* @__PURE__ */ jsxs("div", { className: "mt-8 p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium border border-red-100 animate-pulse", children: [
      "⚠️ ",
      error
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex justify-between gap-4 pt-6 border-t border-gray-100", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handlePrev,
          disabled: currentDimIndex === 0,
          className: `
                        px-8 py-3 rounded-lg font-medium transition-colors
                        ${currentDimIndex === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}
                    `,
          children: "上一步"
        }
      ),
      currentDimIndex < DIMENSION_ORDER.length - 1 ? /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleNext,
          className: "px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg flex-1 sm:flex-none",
          children: "下一步"
        }
      ) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSubmit,
          className: "px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg flex-1 sm:flex-none",
          children: "生成我的灵魂哈希"
        }
      )
    ] })
  ] });
}

export { Questionnaire as Q, QUESTIONS as a, decodeSoul as d };
