/* ==========================================================================
   main.js —— 入口：按顺序装配各模块
   --------------------------------------------------------------------------
   加载顺序（见 index.html）：
     projects.js → render.js → interactions.js → main.js
   全部使用普通全局脚本，不依赖构建工具，双击 index.html 即可运行。
   ========================================================================== */

(function () {
  'use strict';

  function boot() {
    var render = window.PortfolioRender;
    var interactions = window.PortfolioInteractions;
    var projects = window.PROJECTS || [];

    if (!render || !interactions) return;

    var list = document.getElementById('works-list');
    var orderIndex = render.createOrderIndex(projects);

    /* 1. 渲染项目列表（编号取自在完整列表中的位置，筛选时保持不变） */
    render.renderProjects(projects, list, orderIndex);

    /* 2. 类别标签按数据中出现的顺序自动生成，新增类别无需改代码 */
    var categories = [];
    projects.forEach(function (project) {
      if (categories.indexOf(project.category) === -1) categories.push(project.category);
    });

    /* 3. 装配交互 */
    interactions.initHeader();
    interactions.initMobileNav();
    interactions.initScrollSpy();

    var reveal = interactions.initReveal();

    interactions.initFilter({
      bar: document.getElementById('filter-bar'),
      list: list,
      empty: document.getElementById('works-empty'),
      countLabel: document.getElementById('works-count'),
      projects: projects,
      categories: categories,
      orderIndex: orderIndex,
      reveal: reveal
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
