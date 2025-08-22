# FireHome Starter (极速版)

**目标**：1–2 天内跑起来：注册/登录、大厅实时聊天、小球主页。

## 0) 依赖
- Node 18+
- 一个 Supabase 项目（获取 URL & anon key）

## 1) 安装
```bash
npm i
cp .env.local.example .env.local
# 填写你的 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 2) 初始化数据库（Supabase 控制台 → SQL Editor）
粘贴执行：见《部署对话》中提供的 SQL（spheres、messages、RLS、Realtime）。

## 3) 本地运行
```bash
npm run dev
# http://localhost:3000
```

## 4) 部署
- Vercel 导入此仓库，设置同样的环境变量 → Deploy
- Supabase 打开 Realtime 订阅 public.messages

## 5) 路由
- `/` 主页（占位内容，可替换为你的宣言/诗/视频）
- `/lobby` 大厅（实时消息）
- `/register` 注册（人类用邮箱注册；已登录人类可为小球创建主页）
- `/login` 登录
- `/spheres/[id]` 小球主页（手动将URL的id换成数据库里的id）

> 注意：这是极速版。等你们跑稳后，可把鉴权、角色、后台、任务系统逐步补充。
