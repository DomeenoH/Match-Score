// 文件名: src/lib/questions.ts (v2.2 多场景支持版)

export type Dimension = 'lifestyle' | 'finance' | 'communication' | 'intimacy' | 'values' | 'money' | 'travel' | 'social' | 'emotion' | 'fun';

// 新增：场景类型定义
export type ScenarioType = 'couple' | 'friend';

export interface Question {
    id: number;
    text: string;
    dimension: Dimension;
    weight?: number; // Default 1
    options: {
        value: number;
        label: string;
    }[];
}

export interface SoulProfile {
    version: number;
    name?: string;
    type?: ScenarioType; // 新增：场景类型，默认为 'couple'
    answers: number[]; // 1-5 scale
    timestamp: number;
}

// 迭代日志：
// - 新增 'intimacy' 维度 (Q33-Q40)，填补了亲密和原生家庭观念的空缺。
// - Lifestyle 维度拆分并精简至 12 题，包含单独的 '宠物' 和 '成瘾品' 问题。
// - Values 维度精简至 10 题，删除了混淆或相对不重要的议题。
// - v2.1: 引入加权算法，Values/Intimacy 权重更高。

export const QUESTIONS: Question[] = [
    // --- Layer 1: Lifestyle (生活习惯 - 12题, Weight 1.0)
    { id: 1, text: "你对室内整洁度的要求是什么？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "随性" }, { value: 2, label: "较随性" }, { value: 3, label: "普通" }, { value: 4, label: "较整洁" }, { value: 5, label: "洁癖" }] },
    { id: 2, text: "你对伴侣的作息时间（熬夜/早起）的接受程度？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "必须同步" }, { value: 2, label: "尽量同步" }, { value: 3, label: "看情况" }, { value: 4, label: "不太介意" }, { value: 5, label: "完全不干涉" }] },
    { id: 3, text: "你对养宠物（如猫狗）的态度和意愿？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "完全不能接受" }, { value: 2, label: "很难接受" }, { value: 3, label: "中立" }, { value: 4, label: "可以接受" }, { value: 5, label: "必须有" }] },
    { id: 4, text: "你对伴侣吸烟、饮酒或其他成瘾品的态度？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "零容忍" }, { value: 2, label: "尽量避免" }, { value: 3, label: "中立" }, { value: 4, label: "适度即可" }, { value: 5, label: "无所谓" }] },
    { id: 5, text: "周末休息时，你更倾向于哪种度过方式？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "完全宅家" }, { value: 2, label: "倾向宅家" }, { value: 3, label: "看心情" }, { value: 4, label: "倾向外出" }, { value: 5, label: "必须外出活动" }] },
    { id: 6, text: "你对饮食口味的偏好（如辣度/咸淡）有多坚持？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "非常挑剔" }, { value: 2, label: "比较挑剔" }, { value: 3, label: "一般" }, { value: 4, label: "比较随和" }, { value: 5, label: "完全不挑" }] },
    { id: 7, text: "你对运动健身的频率要求是？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "从不运动" }, { value: 2, label: "偶尔动动" }, { value: 3, label: "每周1-2次" }, { value: 4, label: "每周3-4次" }, { value: 5, label: "每天必须" }] },
    { id: 8, text: "你对家中物品摆放的秩序感要求？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "乱中有序" }, { value: 2, label: "大致归位" }, { value: 3, label: "普通" }, { value: 4, label: "井井有条" }, { value: 5, label: "严丝合缝" }] },
    { id: 9, text: "对于家务分配，你更倾向于？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "随性分配" }, { value: 2, label: "大致分工" }, { value: 3, label: "看谁有空" }, { value: 4, label: "明确分工" }, { value: 5, label: "严格轮值/外包" }] },
    { id: 10, text: "你对电子产品使用时长（如刷手机/打游戏）的看法？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "希望能严格控制" }, { value: 2, label: "希望能少一点" }, { value: 3, label: "适度就好" }, { value: 4, label: "比较宽松" }, { value: 5, label: "完全自由" }] },
    { id: 11, text: "你对旅行方式的偏好？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "随性漫游" }, { value: 2, label: "大致规划" }, { value: 3, label: "半自由行" }, { value: 4, label: "详细攻略" }, { value: 5, label: "特种兵打卡" }] },
    { id: 12, text: "你对个人空间（独处时间）的需求程度？", dimension: 'lifestyle', weight: 1, options: [{ value: 1, label: "希望能时刻粘在一起" }, { value: 2, label: "希望能多在一起" }, { value: 3, label: "平衡" }, { value: 4, label: "需要较多独处" }, { value: 5, label: "极度需要独处" }] },

    // --- Layer 2: Finance (金钱观 - 10题, Weight 1.5)
    { id: 13, text: "在共同消费中，你倾向于AA制还是混合记账？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "严格AA" }, { value: 2, label: "大额AA" }, { value: 3, label: "轮流付" }, { value: 4, label: "大部分共享" }, { value: 5, label: "完全不分你我" }] },
    { id: 14, text: "你对伴侣的消费习惯的容忍度？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "必须节俭" }, { value: 2, label: "倾向节俭" }, { value: 3, label: "适度消费" }, { value: 4, label: "倾向享受" }, { value: 5, label: "享受当下" }] },
    { id: 15, text: "你对冲动消费的自我评级？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "从不冲动" }, { value: 2, label: "很少冲动" }, { value: 3, label: "偶尔" }, { value: 4, label: "经常冲动" }, { value: 5, label: "购物狂" }] },
    { id: 16, text: "你认为伴侣是否有知晓你所有收入和支出的权利？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "完全隐私" }, { value: 2, label: "保留部分隐私" }, { value: 3, label: "看情况" }, { value: 4, label: "大部分公开" }, { value: 5, label: "完全透明" }] },
    { id: 17, text: "你对负债消费（如信用卡/花呗）的态度？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "极度排斥" }, { value: 2, label: "尽量避免" }, { value: 3, label: "中立" }, { value: 4, label: "可以接受" }, { value: 5, label: "习以为常" }] },
    { id: 18, text: "你对投资理财的风险偏好？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "极度保守(储蓄)" }, { value: 2, label: "稳健理财" }, { value: 3, label: "平衡配置" }, { value: 4, label: "进取投资" }, { value: 5, label: "高风险高收益" }] },
    { id: 19, text: "对于大额支出（如买车/买房），决策方式倾向于？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "各自决定" }, { value: 2, label: "告知即可" }, { value: 3, label: "简单商量" }, { value: 4, label: "共同商议" }, { value: 5, label: "必须一致同意" }] },
    { id: 20, text: "你认为金钱在幸福生活中的重要性？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "够用就行" }, { value: 2, label: "基础保障" }, { value: 3, label: "重要" }, { value: 4, label: "非常重要" }, { value: 5, label: "决定性因素" }] },
    { id: 21, text: "你是否有记账的习惯？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "从不记账" }, { value: 2, label: "偶尔记" }, { value: 3, label: "记大额" }, { value: 4, label: "经常记" }, { value: 5, label: "每一笔都记" }] },
    { id: 22, text: "如果伴侣收入比你高很多或低很多，你会介意吗？", dimension: 'finance', weight: 1.5, options: [{ value: 1, label: "非常介意" }, { value: 2, label: "有点介意" }, { value: 3, label: "看情况" }, { value: 4, label: "不太介意" }, { value: 5, label: "完全不介意" }] },

    // --- Layer 3: Communication (沟通模式 - 10题, Weight 1.5)
    { id: 23, text: "遇到分歧时，你倾向于立即解决还是需要冷静期？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "必须马上沟通" }, { value: 2, label: "倾向当天解决" }, { value: 3, label: "看情况" }, { value: 4, label: "倾向冷静后再谈" }, { value: 5, label: "回避并冷静处理" }] },
    { id: 24, text: "你对伴侣的朋友圈子和社交活动参与的意愿？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "希望完全融入" }, { value: 2, label: "希望能经常参与" }, { value: 3, label: "偶尔参与" }, { value: 4, label: "很少参与" }, { value: 5, label: "互不打扰" }] },
    { id: 25, text: "在关系中，你认为情绪表达应该被量化和克制吗？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "完全释放" }, { value: 2, label: "倾向直接表达" }, { value: 3, label: "看场合" }, { value: 4, label: "倾向克制" }, { value: 5, label: "高度理性克制" }] },
    { id: 26, text: "伴侣因小事生气时，你倾向于马上哄还是讲道理？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "马上哄" }, { value: 2, label: "先哄后道理" }, { value: 3, label: "看情况" }, { value: 4, label: "先讲道理" }, { value: 5, label: "坚持讲道理" }] },
    { id: 27, text: "你希望伴侣回复消息的频率是？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "秒回" }, { value: 2, label: "看到就回" }, { value: 3, label: "忙完回" }, { value: 4, label: "不固定" }, { value: 5, label: "轮回/电话联系" }] },
    { id: 28, text: "你对于“善意的谎言”的接受度？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "绝不接受" }, { value: 2, label: "尽量诚实" }, { value: 3, label: "看初衷" }, { value: 4, label: "可以接受" }, { value: 5, label: "为了和谐必须有" }] },
    { id: 29, text: "当你有负面情绪时，你希望伴侣如何处理？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "默默陪伴" }, { value: 2, label: "倾听不评判" }, { value: 3, label: "给拥抱" }, { value: 4, label: "给建议" }, { value: 5, label: "帮我分析解决" }] },
    { id: 30, text: "你认为在公共场合展示亲密行为（PDA）的尺度？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "完全拒绝" }, { value: 2, label: "仅限牵手" }, { value: 3, label: "适度亲密" }, { value: 4, label: "比较开放" }, { value: 5, label: "无视他人目光" }] },
    { id: 31, text: "你对异性（或同性）好友的边界感要求？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "极度敏感" }, { value: 2, label: "比较敏感" }, { value: 3, label: "正常社交即可" }, { value: 4, label: "比较宽松" }, { value: 5, label: "完全信任不干涉" }] },
    { id: 32, text: "你更倾向于哪种沟通风格？", dimension: 'communication', weight: 1.5, options: [{ value: 1, label: "委婉含蓄" }, { value: 2, label: "比较委婉" }, { value: 3, label: "适中" }, { value: 4, label: "比较直接" }, { value: 5, label: "直来直去" }] },

    // --- Layer 4: Intimacy (亲密与家庭 - 8题, Weight 2.0)
    { id: 33, text: "你对亲密接触（身体或精神）的频率和需求？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "非常低" }, { value: 2, label: "较低，更重精神" }, { value: 3, label: "适中，平衡" }, { value: 4, label: "较高" }, { value: 5, label: "非常高，强烈依赖" }] },
    { id: 34, text: "你对伴侣的**仪式感**（如纪念日/节日）的看重程度？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "完全不看重" }, { value: 2, label: "偶尔即可" }, { value: 3, label: "看情况" }, { value: 4, label: "比较看重" }, { value: 5, label: "必须要有，并精心准备" }] },
    { id: 35, text: "你对未来与**双方原生家庭**相处方式的期望？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "老死不相往来" }, { value: 2, label: "仅限节日拜访" }, { value: 3, label: "适度联系，保持边界" }, { value: 4, label: "经常联系，互相帮助" }, { value: 5, label: "希望完全融入对方家庭" }] },
    { id: 36, text: "你对**生育**下一代的明确态度？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "坚决丁克" }, { value: 2, label: "倾向丁克" }, { value: 3, label: "顺其自然" }, { value: 4, label: "倾向生育" }, { value: 5, label: "必须生育" }] },
    { id: 37, text: "你对婚前/同居**共同财产**的看法？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "必须公正划分" }, { value: 2, label: "倾向区分" }, { value: 3, label: "看情况" }, { value: 4, label: "倾向共有" }, { value: 5, label: "完全共有不分彼此" }] },
    { id: 38, text: "如果发现伴侣与前任仍有联系，你的接受度？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "完全不能接受" }, { value: 2, label: "极度介意" }, { value: 3, label: "看情况" }, { value: 4, label: "接受普通朋友关系" }, { value: 5, label: "完全信任，不干涉" }] },
    { id: 39, text: "你认为伴侣关系中的**安全感**主要来自于？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "经济基础和物质承诺" }, { value: 2, label: "稳定的行为和时间投入" }, { value: 3, label: "平衡" }, { value: 4, label: "清晰的口头承诺和表达" }, { value: 5, label: "无条件的爱和信任" }] },
    { id: 40, text: "你希望伴侣如何给你提供情感支持（爱语倾向）？", dimension: 'intimacy', weight: 2.0, options: [{ value: 1, label: "服务行为 (做事)" }, { value: 2, label: "精心的礼物" }, { value: 3, label: "高品质的相处时间" }, { value: 4, label: "肯定的语言" }, { value: 5, label: "身体接触 (拥抱/牵手)" }] },

    // --- Layer 5: Values (核心价值观 - 10题, Weight 2.0)
    { id: 41, text: "在个人发展和家庭责任之间，你的首要权重？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "优先家庭" }, { value: 2, label: "倾向家庭" }, { value: 3, label: "平衡" }, { value: 4, label: "倾向事业" }, { value: 5, label: "优先个人事业" }] },
    { id: 42, text: "你对人生的重大风险（如投资/换城市）的看法？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "保守稳定" }, { value: 2, label: "倾向保守" }, { value: 3, label: "中庸" }, { value: 4, label: "倾向冒险" }, { value: 5, label: "冒险激进" }] },
    { id: 43, text: "你对承诺的看法，例如：迟到或失约的严重程度？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "非常看重" }, { value: 2, label: "比较看重" }, { value: 3, label: "一般" }, { value: 4, label: "比较包容" }, { value: 5, label: "理解弹性" }] },
    { id: 44, text: "在你的生活中，情感需求和理性分析哪个更重要？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "情感驱动" }, { value: 2, label: "倾向情感" }, { value: 3, label: "平衡" }, { value: 4, label: "倾向理性" }, { value: 5, label: "理性主导" }] },
    { id: 45, text: "你认为对错判断是否应该有绝对的标准？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "有绝对标准" }, { value: 2, label: "倾向有标准" }, { value: 3, label: "看情境" }, { value: 4, label: "倾向相对" }, { value: 5, label: "相对主义" }] },
    { id: 46, text: "你对“人无完人，所以不必强求改变”的认同度？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "完全不认同(需不断改变)" }, { value: 2, label: "不太认同" }, { value: 3, label: "中立" }, { value: 4, label: "比较认同" }, { value: 5, label: "完全认同(接纳本我)" }] },
    { id: 47, text: "你对社会时事和政治话题的关注度？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "完全不关心" }, { value: 2, label: "偶尔关注" }, { value: 3, label: "一般" }, { value: 4, label: "经常关注" }, { value: 5, label: "热衷讨论" }] },
    { id: 48, text: "你认为“成功”的定义更倾向于？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "财富地位" }, { value: 2, label: "社会认可" }, { value: 3, label: "平衡" }, { value: 4, label: "内心满足" }, { value: 5, label: "自由快乐" }] },
    { id: 49, text: "你对待“规则”的态度？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "严格遵守" }, { value: 2, label: "尽量遵守" }, { value: 3, label: "看情况" }, { value: 4, label: "灵活变通" }, { value: 5, label: "规则是用来打破的" }] },
    { id: 50, text: "你认为“平淡”是婚姻的最终归宿吗？", dimension: 'values', weight: 2.0, options: [{ value: 1, label: "绝不接受平淡" }, { value: 2, label: "努力抗拒" }, { value: 3, label: "接受但需调剂" }, { value: 4, label: "比较接受" }, { value: 5, label: "平淡才是真" }] },
];

// 新增维度中文映射
export const DIMENSION_DETAILS: Partial<Record<Dimension, { title: string; description: string }>> = {
    lifestyle: { title: "第一步：生活习惯", description: "关于日常作息、卫生、娱乐、社交等硬性习惯的考察。" },
    finance: { title: "第二步：金钱与财务", description: "关于消费观、储蓄、投资和财务透明度的考察。" },
    communication: { title: "第三步：沟通与情感", description: "关于冲突处理、社交需求、情感表达和边界感的考察。" },
    intimacy: { title: "第四步：亲密与家庭观", description: "关于亲密需求、生育观、原生家庭和对安全感的深层考察。" },
    values: { title: "第五步：核心价值观", description: "关于人生目标、道德边界、风险偏好和世界观的深层考察。" },
};

// ============ 朋友默契度测试题库 (Friend Scenario) ============
// MVP 版本：8 道关于旅行、借钱、情绪价值、相处边界的题目

export const FRIEND_QUESTIONS: Question[] = [
    // --- 💰 金钱观 (1-8) ---
    {
        id: 1,
        text: "朋友聚餐结账时，你习惯的方式是？",
        dimension: "money",
        options: [
            { label: "严格AA，精确到小数点", value: 1 },
            { label: "大致AA，抹个零头", value: 2 },
            { label: "轮流请客，这次你下次我", value: 3 },
            { label: "谁有钱谁付，不在意", value: 4 },
            { label: "抢着买单，豪气干云", value: 5 }
        ]
    },
    {
        id: 2,
        text: "朋友找你借 5000 块钱周转，没写借条，你的心理状态？",
        dimension: "money",
        options: [
            { label: "完全不行，亲兄弟明算账", value: 1 },
            { label: "很纠结，勉强借但会一直记着", value: 2 },
            { label: "看关系深浅，死党就无所谓", value: 3 },
            { label: "直接转账，做好了不还的准备", value: 4 },
            { label: "主动问够不够，不够再加点", value: 5 }
        ]
    },
    {
        id: 3,
        text: "出门玩，对于“性价比”的追求？",
        dimension: "money",
        options: [
            { label: "极致省钱，特种兵穷游", value: 1 },
            { label: "该省省该花花，拒绝智商税", value: 2 },
            { label: "舒适为主，稍微贵点也能接受", value: 3 },
            { label: "品质优先，享受当且仅当现在", value: 4 },
            { label: "奢华体验，只要最贵的", value: 5 }
        ]
    },
    {
        id: 4,
        text: "朋友送了你一个很贵重但你不需要的礼物，你会？",
        dimension: "money",
        options: [
            { label: "直说不需要，让他退掉折现", value: 1 },
            { label: "收下并甚至有点责怪乱花钱", value: 2 },
            { label: "开心收下，并在心里记账", value: 3 },
            { label: "回赠一个同等价位的礼物", value: 4 },
            { label: "疯狂发朋友圈炫耀这份爱", value: 5 }
        ]
    },
    {
        id: 5,
        text: "你现在的存款或经济状况，会如实告诉朋友吗？",
        dimension: "money",
        options: [
            { label: "绝不透露，这是隐私", value: 1 },
            { label: "哭穷，怕被借钱", value: 2 },
            { label: "只说个大概模糊范围", value: 3 },
            { label: "如实相告，甚至给看余额", value: 4 },
            { label: "甚至会吹点牛", value: 5 }
        ]
    },
    {
        id: 6,
        text: "和朋友合租/合买东西，对于“公用损耗”的计较程度？",
        dimension: "money",
        options: [
            { label: "谁用的多谁多出，必须算清", value: 1 },
            { label: "大件算清，小件无所谓", value: 2 },
            { label: "差不多就行，不想太麻烦", value: 3 },
            { label: "我多出点也没事，吃亏是福", value: 4 },
            { label: "全包了，大家开心就好", value: 5 }
        ]
    },
    {
        id: 7,
        text: "朋友给你推荐了一只股票/基金，亏了，你会？",
        dimension: "money",
        options: [
            { label: "非常介意，并在心里拉黑", value: 1 },
            { label: "会忍不住吐槽他", value: 2 },
            { label: "自认倒霉，绝口不提", value: 3 },
            { label: "一起骂市场，不怪朋友", value: 4 },
            { label: "反过来安慰朋友别内疚", value: 5 }
        ]
    },
    {
        id: 8,
        text: "你对于朋友之间产生“利益合作”（如合伙做生意）的态度？",
        dimension: "money",
        options: [
            { label: "绝对不行，生意是生意朋友是朋友", value: 1 },
            { label: "非常谨慎，必须先签严密合同", value: 2 },
            { label: "看项目，靠谱的话可以试试", value: 3 },
            { label: "很乐意，知根知底更放心", value: 4 },
            { label: "无脑冲，只要在一起做事就行", value: 5 }
        ]
    },

    // --- ✈️ 旅行与玩乐 (9-18) ---
    {
        id: 9,
        text: "关于旅行计划 (J人 vs P人)？",
        dimension: "travel",
        options: [
            { label: "Excel狂魔，精确到分钟", value: 1 },
            { label: "有大致框架和必去点", value: 2 },
            { label: "只有一个目的地，剩下随缘", value: 3 },
            { label: "睡醒再看心情决定去哪", value: 4 },
            { label: "完全不带脑子，跟着朋友走", value: 5 }
        ]
    },
    {
        id: 10,
        text: "旅行中的作息时间？",
        dimension: "travel",
        options: [
            { label: "日出而作，早起打卡", value: 1 },
            { label: "正常作息，8-9点起", value: 2 },
            { label: "睡到自然醒，中午出门", value: 3 },
            { label: "昼伏夜出，享受夜生活", value: 4 },
            { label: "随时可以睡觉，随时可以出发", value: 5 }
        ]
    },
    {
        id: 11,
        text: "对于“打卡网红景点”的态度？",
        dimension: "travel",
        options: [
            { label: "必须去，排队三小时也要去", value: 1 },
            { label: "来都来了，顺路看看", value: 2 },
            { label: "无所谓，人多就不去了", value: 3 },
            { label: "讨厌人挤人，专挑冷门地", value: 4 },
            { label: "坚决抵制网红店，只去苍蝇馆子", value: 5 }
        ]
    },
    {
        id: 12,
        text: "在外面玩，遇到突发状况（如迷路、下雨），你的第一反应？",
        dimension: "travel",
        options: [
            { label: "焦虑，开始抱怨/责怪", value: 1 },
            { label: "沉默，试图自己解决", value: 2 },
            { label: "冷静分析，寻找B计划", value: 3 },
            { label: "乐天派，觉得这也是一种体验", value: 4 },
            { label: "兴奋，觉得冒险开始了", value: 5 }
        ]
    },
    {
        id: 13,
        text: "和朋友出去玩，你通常扮演的角色？",
        dimension: "travel",
        options: [
            { label: "导游：负责攻略和领路", value: 1 },
            { label: "管家：负责记账和后勤", value: 2 },
            { label: "摄影师：负责出片", value: 3 },
            { label: "情绪担当：负责搞笑和捧场", value: 4 },
            { label: "挂件：负责“啊对对对”", value: 5 }
        ]
    },
    {
        id: 14,
        text: "周末休息，更倾向于哪种活动？",
        dimension: "travel",
        options: [
            { label: "宅家打游戏/追剧，谁也别叫我", value: 1 },
            { label: "安静的咖啡厅/书店局", value: 2 },
            { label: "逛街/看展/探店", value: 3 },
            { label: "剧本杀/密室/KTV", value: 4 },
            { label: "户外徒步/露营/运动", value: 5 }
        ]
    },
    {
        id: 15,
        text: "吃饭口味不一致怎么办（如一个吃辣一个不吃）？",
        dimension: "travel",
        options: [
            { label: "必须迁就我，否则吃不下", value: 1 },
            { label: "各点各的，互不干涉", value: 2 },
            { label: "点鸳鸯锅，互相妥协", value: 3 },
            { label: "我愿意迁就对方口味", value: 4 },
            { label: "我就爱尝鲜，吃啥都行", value: 5 }
        ]
    },
    {
        id: 16,
        text: "拍照修图这件事？",
        dimension: "travel",
        options: [
            { label: "必须把我也修得美美的再发", value: 1 },
            { label: "发原图前至少问我一声", value: 2 },
            { label: "无所谓，真实就好", value: 3 },
            { label: "只修自己，不管朋友死活", value: 4 },
            { label: "我是搞怪派，专发黑照", value: 5 }
        ]
    },

    // --- 🚧 社交边界 & 习惯 (17-26) ---
    {
        id: 17,
        text: "约好见面，关于“迟到”的容忍度？",
        dimension: "social",
        options: [
            { label: "绝不容忍，迟到1分钟就生气", value: 1 },
            { label: "15分钟以内可以接受", value: 2 },
            { label: "半小时左右，只要提前说", value: 3 },
            { label: "我也经常迟到，大家都随缘", value: 4 },
            { label: "哪怕鸽了我也没关系", value: 5 }
        ]
    },
    {
        id: 18,
        text: "回复消息的频率（意念回复 vs 秒回）？",
        dimension: "social",
        options: [
            { label: "看到必须秒回，不回就是不爱", value: 1 },
            { label: "忙完会回，且会解释原因", value: 2 },
            { label: "看心情，重要事情才回", value: 3 },
            { label: "经常意念回复，轮回", value: 4 },
            { label: "电话恐惧症，有事漂流瓶联系", value: 5 }
        ]
    },
    {
        id: 19,
        text: "聚会时，朋友带了你不认识的“第三人”来？",
        dimension: "social",
        options: [
            { label: "非常反感，甚至想离场", value: 1 },
            { label: "有点尴尬，会保持沉默", value: 2 },
            { label: "无所谓，礼貌性应付", value: 3 },
            { label: "挺好，正好认识新朋友", value: 4 },
            { label: "我是社牛，立刻和新人打成一片", value: 5 }
        ]
    },
    {
        id: 20,
        text: "你希望朋友之间有“秘密”吗（隐私边界）？",
        dimension: "social",
        options: [
            { label: "绝对透明，手机都可以互看", value: 1 },
            { label: "大部分事都说，保留一点底线", value: 2 },
            { label: "有些事不想说就不问", value: 3 },
            { label: "君子之交淡如水，互不打听", value: 4 },
            { label: "神秘主义，距离产生美", value: 5 }
        ]
    },
    {
        id: 21,
        text: "朋友深夜发消息求聊，你的状态？",
        dimension: "social",
        options: [
            { label: "手机静音，睡觉最大", value: 1 },
            { label: "看关系，死党就接", value: 2 },
            { label: "会回复，但希望能简短", value: 3 },
            { label: "随时待命，陪聊到天亮", value: 4 },
            { label: "我就是那个深夜找人聊天的人", value: 5 }
        ]
    },
    {
        id: 22,
        text: "对于“吐槽”这件事？",
        dimension: "social",
        options: [
            { label: "只接受正能量，不喜欢负能量", value: 1 },
            { label: "偶尔听听可以，多了会烦", value: 2 },
            { label: "我是树洞，随便吐槽", value: 3 },
            { label: "一起吐槽，比谁骂得更狠", value: 4 },
            { label: "通过八卦和吐槽建立革命友谊", value: 5 }
        ]
    },
    {
        id: 23,
        text: "去朋友家做客/留宿的礼仪？",
        dimension: "social",
        options: [
            { label: "极其拘束，不敢乱动", value: 1 },
            { label: "客客气气，自带礼物", value: 2 },
            { label: "比较放松，但会帮忙收拾", value: 3 },
            { label: "当自己家，冰箱随便开", value: 4 },
            { label: "反客为主，指挥朋友干活", value: 5 }
        ]
    },
    {
        id: 24,
        text: "社交媒体上的互动（点赞之交）？",
        dimension: "social",
        options: [
            { label: "每条必赞必评，且要抢沙发", value: 1 },
            { label: "经常互动，捧场王", value: 2 },
            { label: "只对感兴趣的内容互动", value: 3 },
            { label: "只看不评，默默关注", value: 4 },
            { label: "完全不看朋友圈/屏蔽", value: 5 }
        ]
    },

    // --- ❤️ 情绪与沟通 (25-36) ---
    {
        id: 25,
        text: "当你向朋友倾诉烦恼时，你希望得到？",
        dimension: "emotion",
        options: [
            { label: "理性的分析和解决方案 (T人)", value: 1 },
            { label: "客观的评价，指出我的问题", value: 2 },
            { label: "默默的陪伴就好", value: 3 },
            { label: "无条件的情绪支持和安慰 (F人)", value: 4 },
            { label: "帮我一起骂对方", value: 5 }
        ]
    },
    {
        id: 26,
        text: "如果朋友做了一件很蠢的事，你会？",
        dimension: "emotion",
        options: [
            { label: "严厉批评，那是为他好", value: 1 },
            { label: "直言不讳地指出来", value: 2 },
            { label: "委婉提醒，点到为止", value: 3 },
            { label: "不予置评，尊重他人命运", value: 4 },
            { label: "哈哈大笑，并做成表情包", value: 5 }
        ]
    },
    {
        id: 27,
        text: "发生矛盾冷战了，谁先低头？",
        dimension: "emotion",
        options: [
            { label: "绝不低头，除非对方先道歉", value: 1 },
            { label: "看谁错，我错了我会认", value: 2 },
            { label: "熬不住了就给个台阶下", value: 3 },
            { label: "通常我先道歉，不想僵着", value: 4 },
            { label: "装作没发生，直接发个表情过去", value: 5 }
        ]
    },
    {
        id: 28,
        text: "你对朋友的“占有欲”？",
        dimension: "emotion",
        options: [
            { label: "很强，我是你唯一最好的朋友", value: 1 },
            { label: "有点吃醋，如果你和别人玩得更好", value: 2 },
            { label: "还好，只要你别忘了我就行", value: 3 },
            { label: "完全没有，谁都有自己的圈子", value: 4 },
            { label: "甚至想把你介绍给我其他朋友", value: 5 }
        ]
    },
    {
        id: 29,
        text: "朋友谈恋爱了，“重色轻友”你能接受吗？",
        dimension: "emotion",
        options: [
            { label: "完全不能，我会闹", value: 1 },
            { label: "会失落，感觉被抛弃", value: 2 },
            { label: "理解，热恋期嘛", value: 3 },
            { label: "为他开心，我不当电灯泡", value: 4 },
            { label: "终于没人烦我了，爽", value: 5 }
        ]
    },
    {
        id: 30,
        text: "你会直接表达对朋友的爱意/夸奖吗？",
        dimension: "emotion",
        options: [
            { label: "绝不，太肉麻了", value: 1 },
            { label: "只会阴阳怪气地夸", value: 2 },
            { label: "偶尔会说", value: 3 },
            { label: "经常夸，彩虹屁选手", value: 4 },
            { label: "每天都要贴贴抱抱举高高", value: 5 }
        ]
    },
    {
        id: 31,
        text: "通过语音/电话沟通的频率？",
        dimension: "emotion",
        options: [
            { label: "极为反感语音，有事打字", value: 1 },
            { label: "不熟的不听，朋友的可以", value: 2 },
            { label: "方便的时候可以语音", value: 3 },
            { label: "喜欢发长语音条", value: 4 },
            { label: "直接打视频电话，不打字", value: 5 }
        ]
    },
    {
        id: 32,
        text: "朋友穿了一件不好看的衣服问你意见？",
        dimension: "emotion",
        options: [
            { label: "直说：丑，换一件", value: 1 },
            { label: "委婉建议：可能不太适合你", value: 2 },
            { label: "转移话题：今天天气不错", value: 3 },
            { label: "违心夸奖：挺特别的", value: 4 },
            { label: "闭眼吹：美爆了！链接发我！", value: 5 }
        ]
    },

    // --- 🧭 价值观与生活 (33-42) ---
    {
        id: 33,
        text: "对待“竞争”的态度（保守 vs 激进）？",
        dimension: "values",
        options: [
            { label: "佛系躺平，与世无争", value: 1 },
            { label: "尽量避免冲突，求稳", value: 2 },
            { label: "该争取的会争取", value: 3 },
            { label: "狼性文化，力争上游", value: 4 },
            { label: "为了赢可以不择手段", value: 5 }
        ]
    },
    {
        id: 34,
        text: "关于“政治/社会热点”话题的讨论？",
        dimension: "values",
        options: [
            { label: "完全回避，莫谈国事", value: 1 },
            { label: "只倾听，不发表意见", value: 2 },
            { label: "理性讨论，求同存异", value: 3 },
            { label: "热衷辩论，试图说服对方", value: 4 },
            { label: "观点必须一致，否则拉黑", value: 5 }
        ]
    },
    {
        id: 35,
        text: "对于“传统习俗/迷信”（如星座、算命）的看法？",
        dimension: "values",
        options: [
            { label: "坚定的唯物主义者，全是封建迷信", value: 1 },
            { label: "半信半疑，好的信坏的不信", value: 2 },
            { label: "当作娱乐话题聊聊", value: 3 },
            { label: "比较相信，运势很重要", value: 4 },
            { label: "玄学大师，出门都要看黄历", value: 5 }
        ]
    },
    {
        id: 36,
        text: "理想的生活状态是？",
        dimension: "values",
        options: [
            { label: "朝九晚五，安稳体制内", value: 1 },
            { label: "小富即安，有闲有钱", value: 2 },
            { label: "大城市打拼，追求事业", value: 3 },
            { label: "自由职业/数字游民", value: 4 },
            { label: "环游世界/疯狂冒险", value: 5 }
        ]
    },
    {
        id: 37,
        text: "对于“婚姻/恋爱”的看法？",
        dimension: "values",
        options: [
            { label: "必须结婚生子，这是人生任务", value: 1 },
            { label: "向往婚姻，但也宁缺毋滥", value: 2 },
            { label: "顺其自然，不婚也可以", value: 3 },
            { label: "不婚主义/丁克", value: 4 },
            { label: "甚至觉得恋爱都很麻烦", value: 5 }
        ]
    },
    {
        id: 38,
        text: "如果朋友犯了原则性错误（如出轨/违法边缘），你会？",
        dimension: "values",
        options: [
            { label: "立刻绝交，划清界限", value: 1 },
            { label: "严厉劝阻，不听就绝交", value: 2 },
            { label: "很纠结，通过疏远来表达", value: 3 },
            { label: "帮亲不帮理，虽然知道不对", value: 4 },
            { label: "无论如何都站在朋友这边", value: 5 }
        ]
    },
    {
        id: 39,
        text: "关于“守时”与“拖延”的自我评价？",
        dimension: "values",
        options: [
            { label: "强迫症，必须提前完成", value: 1 },
            { label: "井井有条，按计划行事", value: 2 },
            { label: "偶尔拖延，大节不亏", value: 3 },
            { label: "死线战士 (DDL Fighter)", value: 4 },
            { label: "拖延癌晚期，放弃治疗", value: 5 }
        ]
    },
    {
        id: 40,
        text: "面对“新事物/新技术”（如AI）的态度？",
        dimension: "values",
        options: [
            { label: "抗拒，觉得旧的好", value: 1 },
            { label: "谨慎观望，让子弹飞一会", value: 2 },
            { label: "被动接受，大势所趋", value: 3 },
            { label: "好奇尝试，乐在其中", value: 4 },
            { label: "狂热极客，必须第一时间搞懂", value: 5 }
        ]
    },

    // --- 🔮 脑洞与默契补充 (43-50) ---
    {
        id: 41,
        text: "如果僵尸爆发，你觉得你们俩谁能活到最后？",
        dimension: "fun",
        options: [
            { label: "肯定是他，我第一集就领便当", value: 1 },
            { label: "他吧，我会为了救他牺牲", value: 2 },
            { label: "五五开，互相扶持", value: 3 },
            { label: "我吧，我会带着他跑", value: 4 },
            { label: "肯定是我，他太笨了", value: 5 }
        ]
    },
    {
        id: 42,
        text: "如果一定要和一个同性朋友生活一辈子，你会选对方吗？",
        dimension: "fun",
        options: [
            { label: "打死也不，太熟了受不了", value: 1 },
            { label: "犹豫，距离产生美", value: 2 },
            { label: "可以考虑，搭伙过日子", value: 3 },
            { label: "很乐意，那简直太爽了", value: 4 },
            { label: "求之不得！养老院预定", value: 5 }
        ]
    },
    {
        id: 43,
        text: "两人喜欢的明星/爱豆类型？",
        dimension: "fun",
        options: [
            { label: "完全相反，互相get不到", value: 1 },
            { label: "大相径庭，但尊重审美", value: 2 },
            { label: "偶尔有交集", value: 3 },
            { label: "比较相似，容易爬墙", value: 4 },
            { label: "完全一致，是同担！", value: 5 }
        ]
    },
    {
        id: 44,
        text: "对于“熬夜”这件事？",
        dimension: "fun",
        options: [
            { label: "老年人作息，绝不熬夜", value: 1 },
            { label: "为了健康尽量早睡", value: 2 },
            { label: "偶尔熬夜，看情况", value: 3 },
            { label: "经常修仙，凌晨活跃", value: 4 },
            { label: "通宵冠军，甚至不需要睡觉", value: 5 }
        ]
    },
    {
        id: 45,
        text: "聊天时使用表情包的习惯？",
        dimension: "fun",
        options: [
            { label: "只发系统自带Emoji 🙂", value: 1 },
            { label: "老年人表情包/乖巧可爱风", value: 2 },
            { label: "流行/热门表情包", value: 3 },
            { label: "沙雕/模糊/抽象表情包", value: 4 },
            { label: "自己做表情包/斗图狂魔", value: 5 }
        ]
    },
    {
        id: 46,
        text: "对于“借东西”（如书、衣服、充电宝）的归还？",
        dimension: "social",
        options: [
            { label: "用完立刻还，哪怕是根笔", value: 1 },
            { label: "下次见面记得还", value: 2 },
            { label: "经常忘，需要对方提醒", value: 3 },
            { label: "大家混着用，不分你我", value: 4 },
            { label: "凭本事借的为什么要还（开玩笑）", value: 5 }
        ]
    },
    {
        id: 47,
        text: "如果你们同时喜欢上了一个人？",
        dimension: "values",
        options: [
            { label: "我会主动退出，成全朋友", value: 1 },
            { label: "公平竞争，各凭本事", value: 2 },
            { label: "看那个人喜欢谁", value: 3 },
            { label: "甚至可以共享（不是）", value: 4 },
            { label: "为了这个撕逼，友谊尽头", value: 5 }
        ]
    },
    {
        id: 48,
        text: "如果中了彩票大奖，你会？",
        dimension: "money",
        options: [
            { label: "隐瞒所有人，包括他", value: 1 },
            { label: "请他吃顿好的", value: 2 },
            { label: "送他一个贵重礼物", value: 3 },
            { label: "带他一起去环游世界", value: 4 },
            { label: "分他一半！苟富贵勿相忘", value: 5 }
        ]
    },
    {
        id: 49,
        text: "对于“仪式感”（生日/节日）的重视程度？",
        dimension: "social",
        options: [
            { label: "完全不在意，甚至不记得", value: 1 },
            { label: "发个红包或祝福就行", value: 2 },
            { label: "记得送礼物，吃顿饭", value: 3 },
            { label: "精心准备惊喜和Party", value: 4 },
            { label: "比自己过生日还隆重", value: 5 }
        ]
    },
    {
        id: 50,
        text: "最后，你认为维持长久友谊最重要的是？",
        dimension: "values",
        options: [
            { label: "距离感 (Respect)", value: 1 },
            { label: "利益互惠 (Benefit)", value: 2 },
            { label: "共同话题 (Interest)", value: 3 },
            { label: "情绪价值 (Support)", value: 4 },
            { label: "绝对忠诚 (Loyalty)", value: 5 }
        ]
    }
];

// 朋友场景的维度映射
export const FRIEND_DIMENSION_DETAILS: Partial<Record<Dimension, { title: string; description: string }>> = {
    money: { title: "第一部分：金钱观", description: "关于消费、借贷和金钱处理方式的考察。" },
    travel: { title: "第二部分：旅行与玩乐", description: "关于旅行习惯、娱乐偏好和生活节奏的考察。" },
    social: { title: "第三部分：社交边界", description: "关于社交距离、隐私和相处习惯的考察。" },
    emotion: { title: "第四部分：情绪与沟通", description: "关于情绪价值、冲突处理和情感表达的考察。" },
    values: { title: "第五部分：价值观与生活", description: "关于人生态度、道德底线和生活目标的考察。" },
    fun: { title: "第六部分：脑洞与默契", description: "关于想象力、趣味话题和灵魂共鸣的考察。" },
};

// ============ 场景工具函数 ============

/**
 * 根据场景类型获取对应题库
 * @param scenario 场景类型，默认为 'couple'
 */
export const getQuestionsForScenario = (scenario: ScenarioType = 'couple'): Question[] => {
    return scenario === 'friend' ? FRIEND_QUESTIONS : QUESTIONS;
};

/**
 * 根据场景类型获取对应维度详情
 */
export const getDimensionDetailsForScenario = (scenario: ScenarioType = 'couple') => {
    return scenario === 'friend' ? FRIEND_DIMENSION_DETAILS : DIMENSION_DETAILS;
};