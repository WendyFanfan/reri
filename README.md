
# RERI Project Documentation

This is a project for **RERI** — an official website and e-commerce platform for snap button tools and accessories.

## 1. Home Page

* Showcase product concepts and brand philosophy
* Display current product series (expandable to view detailed products in each series)
* Contact us section

## 2. Purchase Module

* Place orders
* Add products to cart, view cart
* Checkout

## 3. User Module

* Sign up via email
* Login

## 4. Service Module

* Basic FAQs
* Tool usage tutorials
* Search functionality

## 5. Multi-language Module

* Support multiple languages (currently English and German)

## 6. Future Plans

* **Admin Dashboard**

  * View and manage customer orders
  * Manage product listings and display content
* Database integration for data storage and management
* Performance optimization and SEO improvements

## 7. Tech Stack

* **Frontend**: Vue 3 + Vite + Vue Router + Pinia
* **Internationalization**: Vue I18n
* **Deployment**: Netlify
* **(Planned) Backend**: Node.js / Express + Database (MySQL or MongoDB)




直接用 **Nest.js + MongoDB** 来做后端，这样：

* **结构清晰**：即使几年后别人看代码，也能马上明白逻辑
* **类型安全**：TypeScript 会减少很多 bug，尤其是数据结构相关的
* **可扩展性好**：未来你想加后台管理系统、第三方支付、国际化、权限控制都很方便
* **作品集加分**：面试官会觉得你熟悉企业级后端架构，而不仅仅是写个 API

我帮你梳理一下一个 **电商类 Nest.js 项目骨架**，方便你后续一步步实现：

---

## **RERI Backend (Nest.js) 功能规划**

### 1️⃣ 用户模块（Auth & User）

* **注册 / 登录**（Email + 密码）
* **JWT Token 鉴权**
* **用户信息管理**（姓名、邮箱、电话、地址等）
* **密码加密存储（bcrypt）**
* **重置密码功能**

---

### 2️⃣ 产品模块（Product）

* 产品列表
* 分类 / 搜索 / 过滤
* 产品详情
* 多语言字段（名称、描述）

---

### 3️⃣ 订单模块（Order）

* 创建订单
* 查询订单（按用户 / 管理员权限）
* 修改订单状态（未支付 → 已支付 → 已发货 → 已完成）

---

### 4️⃣ 购物车模块（Cart）

* 添加 / 删除商品
* 计算价格
* 与用户账户绑定

---

### 5️⃣ 售后与服务模块（Service）

* 售后申请
* Q\&A / 教程文档
* 搜索功能

---

### 6️⃣ 后台管理（Admin Dashboard API）

* 用户管理
* 产品管理（增删改查）
* 订单管理
* 服务模块管理

---

## **技术选型**

* **框架**：Nest.js（企业级 Node.js 框架）
* **数据库**：MongoDB（Mongoose ODM）
* **认证**：JWT（Json Web Token）
* **加密**：bcrypt
* **环境管理**：dotenv
* **部署**：可用 Railway / Render / VPS

---

## **开发步骤建议**

1. 初始化 Nest.js 项目
2. 连接 MongoDB
3. 实现用户注册/登录（JWT 鉴权）
4. 添加产品模块 API
5. 实现订单 API
6. 实现购物车 API
7. 增加后台管理 API
8. 部署上线（配合你的 Vue 前端）

---

用 token + 登录鉴权
流程大致如下：
1. 用户输入邮箱+密码 → 前端调用后端 API（/login）。
2. 后端验证密码正确 → 生成一个 token（比如 JWT）。
3. 前端保存 token（放在 localStorage 或 cookie 中，推荐 cookie + HttpOnly 以防 XSS）。
4. 以后访问需要鉴权的接口时 → 前端带上 token（放在 HTTP Header 里：Authorization: Bearer token）。
5. 后端校验 token 是否有效 → 返回数据。
6. 登出时 → 前端清除 token。

具体流程：对，这个流程完全没问题，而且是目前主流的 Web 登录鉴权方式，尤其适合你这个 **Vue + Node.js + MongoDB** 项目。
我帮你用更清晰的分步骤 + 技术细节总结一下，并且补充一些安全要点，让它更健壮。

---

## **Token + 登录鉴权完整流程**

### 1️⃣ 用户登录

* **前端**

  1. 用户输入 **邮箱 + 密码**
  2. 调用后端 `/auth/login` API（POST 请求，Body 中传邮箱和密码）
* **后端**

  1. 从数据库取出用户信息
  2. 用 `bcrypt.compare()` 校验密码
  3. 如果正确 → 用 `jsonwebtoken` 生成 **JWT Token**

     ```ts
     const token = jwt.sign(
       { userId: user._id, role: user.role }, // payload
       process.env.JWT_SECRET,               // 秘钥
       { expiresIn: '7d' }                    // 过期时间
     );
     ```
  4. 把 token 返回给前端

---

### 2️⃣ 前端保存 Token

* **推荐方式**

  * **HttpOnly Cookie**（防 XSS）
  * 设置 `Secure`（仅 HTTPS 下发送）
* **简化方式**（开发阶段）

  * 存在 `localStorage` 或 `sessionStorage`（方便调试，但有 XSS 风险）

---

### 3️⃣ 访问需要鉴权的接口

* 前端在请求时加上 Header：

  ```
  Authorization: Bearer <token>
  ```
* 后端用中间件验证：

  ```ts
  function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  ```

---

### 4️⃣ Token 校验

* 如果 **有效** → 继续处理请求
* 如果 **过期 / 无效** → 返回 `401 Unauthorized`

---

### 5️⃣ 用户登出

* **前端**

  * 清除 Cookie / localStorage 的 token
  * 清空 Pinia 中的用户信息
* **后端**

  * 如果用的是 **短期 Token + 刷新 Token 机制**，需要在登出时让刷新 Token 失效（比如从数据库删除）

---

## **额外安全建议**

1. **密码存储**：一定要 `bcrypt.hash()` 加盐存储
2. **Token 过期时间**：建议 7 天以内
3. **刷新 Token 机制**：可以配合短期访问 Token（15 分钟）+ 长期刷新 Token（7 天）来提高安全性
4. **CORS 配置**：限制允许访问 API 的域名，防止被外部网站滥用

---






