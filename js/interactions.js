/* ==========================================================================
   interactions.js —— 页面交互
   --------------------------------------------------------------------------
   initHeader      吸顶导航滚动后的分割线
   initMobileNav   移动端汉堡菜单
   initScrollSpy   当前区块在导航中高亮
   initReveal      滚动入场（尊重 prefers-reduced-motion）
   initFilter      按类别筛选项目
   ========================================================================== */

(function (global) {
  'use strict';

  var MOBILE_BREAKPOINT = 900;

  /* ---------------------------------------------------------------- 吸顶导航 */

  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ------------------------------------------------------------ 移动端菜单 */

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false);
    });
  }

  /* -------------------------------------------------------- 导航当前区块高亮 */

  function initScrollSpy() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var sections = links
      .map(function (link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    if (!sections.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      var offset = 120;
      var current = sections[0];

      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= offset) current = section;
      });

      /* 已滚动到底部时，强制高亮最后一个区块 */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1];
      }

      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id);
      });
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    request();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }

  /* -------------------------------------------------------------- 滚动入场 */

  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return { refresh: function () {} };
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
    );

    function observeAll(root) {
      var scope = root || document;
      Array.prototype.slice
        .call(scope.querySelectorAll('.reveal:not(.is-visible)'))
        .forEach(function (item) {
          observer.observe(item);
        });
    }

    observeAll(document);
    return { refresh: observeAll };
  }

  /* ---------------------------------------------------------------- 类别筛选 */

  function initFilter(config) {
    var bar = config.bar;
    var list = config.list;
    var empty = config.empty;
    var countLabel = config.countLabel;
    var render = global.PortfolioRender;
    if (!bar || !list || !render) return;

    var projects = config.projects || [];
    var orderIndex = config.orderIndex || render.createOrderIndex(projects);
    var reveal = config.reveal;
    var active = '全部';
    var chips = ['全部'].concat(config.categories || []);

    bar.innerHTML = chips
      .map(function (category) {
        return (
          '<button type="button" class="filter-chip" data-category="' +
          render.escapeHTML(category) + '" aria-pressed="' +
          String(category === active) + '">' + render.escapeHTML(category) + '</button>'
        );
      })
      .join('');

    if (countLabel) countLabel.setAttribute('aria-live', 'polite');

    /* 计数文案：全部时显示总数，筛选后显示"类别 · 数量" */
    function updateCount(total) {
      if (!countLabel) return;
      var amount = String(total).padStart(2, '0');
      countLabel.textContent =
        active === '全部' ? '共 ' + amount + ' 个项目' : active + ' · ' + amount + ' 个项目';
    }

    function apply() {
      var filtered =
        active === '全部'
          ? projects
          : projects.filter(function (project) {
              return project.category === active;
            });

      render.renderProjects(filtered, list, orderIndex);
      updateCount(filtered.length);
      if (empty) empty.hidden = filtered.length !== 0;
      if (reveal) reveal.refresh(list);
    }

    bar.addEventListener('click', function (event) {
      var button = event.target.closest('.filter-chip');
      if (!button) return;

      active = button.dataset.category;
      Array.prototype.slice.call(bar.querySelectorAll('.filter-chip')).forEach(function (chip) {
        chip.setAttribute('aria-pressed', String(chip === button));
      });
      apply();
    });

    /* 首屏已由 main.js 渲染，这里只同步一次计数 */
    updateCount(projects.length);
  }

  global.PortfolioInteractions = {
    initHeader: initHeader,
    initMobileNav: initMobileNav,
    initScrollSpy: initScrollSpy,
    initReveal: initReveal,
    initFilter: initFilter
  };
})(window);
