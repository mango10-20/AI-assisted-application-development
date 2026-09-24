/* ==========================================================================
   render.js —— 把项目数据渲染成 DOM
   --------------------------------------------------------------------------
   每个项目按 data-layout 生成同一套 HTML 结构，版式差异全部交给 CSS 处理，
   因此新增项目或新增版式都不需要改这个文件。
   ========================================================================== */

(function (global) {
  'use strict';

  var ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ESCAPE_MAP[ch];
    });
  }

  function pad2(num) {
    return String(num + 1).padStart(2, '0');
  }

  /* 编号取自项目在完整列表中的位置，保证筛选时编号不会跳动 */
  function createOrderIndex(projects) {
    var map = new Map();
    projects.forEach(function (project, index) {
      map.set(project.id, index);
    });
    return map;
  }

  function techListHTML(tech) {
    return (tech || [])
      .map(function (item) {
        return '<li>' + escapeHTML(item) + '</li>';
      })
      .join('');
  }

  /* 类别与类型标签包在同一个容器里：editorial 版式会把 kicker 改为竖排，
     有了这层包裹，两个标签才会留在同一行而不是各占一行 */
  function kickerTagsHTML(project) {
    return (
      '<span class="project-tags">' +
      '<span class="project-category">' + escapeHTML(project.category) + '</span>' +
      (project.tag ? '<span class="project-tag">' + escapeHTML(project.tag) + '</span>' : '') +
      '</span>'
    );
  }

  function linkHTML(link) {
    if (!link) return '';
    return (
      '<a class="project-link" href="' + escapeHTML(link) + '" target="_blank" rel="noopener">' +
      '查看详情<span aria-hidden="true">↗</span></a>'
    );
  }

  function projectHTML(project, order) {
    var size = project.imageSize || [1600, 900];
    var layout = project.layout || 'split-left';

    return (
      '<article class="project reveal" data-layout="' + escapeHTML(layout) + '"' +
      ' data-category="' + escapeHTML(project.category) + '">' +

        '<figure class="project-media">' +
          '<img src="' + escapeHTML(project.image) + '"' +
          ' alt="' + escapeHTML(project.title) + ' 项目示意图"' +
          ' width="' + size[0] + '" height="' + size[1] + '"' +
          ' loading="lazy" decoding="async">' +
        '</figure>' +

        '<div class="project-text">' +
          '<header class="project-head">' +
            '<p class="project-kicker">' +
              '<span class="project-index">' + pad2(order) + '</span>' +
              kickerTagsHTML(project) +
            '</p>' +
            '<h3 class="project-title">' + escapeHTML(project.title) + '</h3>' +
          '</header>' +

          '<p class="project-summary">' + escapeHTML(project.summary) + '</p>' +

          '<ul class="project-tech" aria-label="技术栈">' + techListHTML(project.tech) + '</ul>' +

          '<footer class="project-foot">' +
            '<time datetime="' + escapeHTML(project.date) + '">' + escapeHTML(project.period) + '</time>' +
            '<span aria-hidden="true">·</span>' +
            '<span class="project-state">' + escapeHTML(project.state) + '</span>' +
            linkHTML(project.link) +
          '</footer>' +
        '</div>' +
      '</article>'
    );
  }

  function renderProjects(projects, mount, orderIndex) {
    if (!mount) return;
    mount.innerHTML = projects
      .map(function (project) {
        var order = orderIndex && orderIndex.has(project.id) ? orderIndex.get(project.id) : 0;
        return projectHTML(project, order);
      })
      .join('');
  }

  global.PortfolioRender = {
    escapeHTML: escapeHTML,
    pad2: pad2,
    createOrderIndex: createOrderIndex,
    projectHTML: projectHTML,
    renderProjects: renderProjects
  };
})(window);
