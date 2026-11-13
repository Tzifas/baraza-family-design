/* ============================================================
   Hamisi Family — shell, router, design review drawer
   ============================================================ */
(function () {
  'use strict';

  var D = window.FH.data;
  var S = window.FH.screens;

  var root = null;
  var currentRoute = null;
  var trail = [];
  var suppress = false;

  // ---------------------------------------------------------
  // storage
  // ---------------------------------------------------------
  function store(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  var SCREENS = [
    ['cover', 'Cover and introduction'],
    ['signin', 'Sign in'],
    ['tree', 'Family tree'],
    ['profile', 'Person profile'],
    ['people', 'Directory'],
    ['admin', 'Owner dashboard'],
    ['request', 'Approval queue'],
    ['privacy', 'Privacy controls'],
    ['invite', 'Invite a relative'],
    ['pack', 'The Project Pack']
  ];

  var look = store('fh.look', 'a');
  var approvals = store('fh.approvals', {});
  var notes = store('fh.notes', '');
  var checklist = store('fh.checklist', {});

  var LOOKS = [
    { id: 'a', name: 'Albamu', desc: 'Warm ivory, forest green, ochre. Fraunces and Inter. Soft and kept.', sw: ['#FAF6EC', '#12362E', '#A9762A'] },
    { id: 'b', name: 'Usiku', desc: 'The same record at night: evergreen ground, ivory type, brass. Flatter and quieter.', sw: ['#0D1F1A', '#C9A227', '#F4EEE0'] },
    { id: 'c', name: 'Pwani', desc: 'Limestone, palm and terracotta. Bigger type, rounder shapes, more air.', sw: ['#F7F2E6', '#B9623A', '#0C3A30'] }
  ];

  var WA = '254711410442';
  var WA_PRETTY = '0711 410 442';

  // ---------------------------------------------------------
  // icons (duplicated small set so chrome works before screens)
  // ---------------------------------------------------------
  var ic = window.FH.icon;

  // ---------------------------------------------------------
  // header
  // ---------------------------------------------------------
  var NAV = [
    { hash: '#/tree/p03', label: 'Tree', key: 'tree' },
    { hash: '#/people', label: 'People', key: 'people' },
    { hash: '#/admin', label: 'Approvals', key: 'admin' },
    { hash: '#/privacy', label: 'Privacy', key: 'privacy' }
  ];

  function headerHTML(activeKey) {
    return '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="hdr"><div class="hdr-inner">' +
        '<a class="brand" href="#/">' +
          '<span class="brand-mark">BF</span>' +
          '<span><span class="brand-name">Baraza Family</span><span class="brand-sub">Private</span></span>' +
        '</a>' +
        '<nav class="nav" aria-label="Main">' +
          NAV.map(function (n) {
            return '<a href="' + n.hash + '"' + (activeKey === n.key ? ' aria-current="page"' : '') + '>' + n.label + '</a>';
          }).join('') +
          '<a href="#/pack"' + (activeKey === 'pack' ? ' aria-current="page"' : '') + '>The Pack</a>' +
        '</nav>' +
        '<div class="hdr-right">' +
          '<a class="btn btn-ghost btn-sm hide-sm" href="#/invite">' + ic('userPlus', 15) + 'Invite</a>' +
          '<a class="who" href="#/person/p03">' +
            '<span class="mono mono-34" data-branch="Bungoma">DB</span>' +
            '<span><span class="who-name">Daniel Baraza</span><span class="who-role">Owner</span></span>' +
          '</a>' +
          '<button class="menu-btn" data-act="menu" aria-label="Menu" aria-expanded="false">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          '</button>' +
        '</div>' +
      '</div></header>' +
      '<div class="sheet" id="sheet">' +
        '<nav aria-label="Mobile">' +
          NAV.map(function (n) { return '<a href="' + n.hash + '"' + (activeKey === n.key ? ' aria-current="page"' : '') + '>' + n.label + ic('chevronRight', 16) + '</a>'; }).join('') +
          '<a href="#/pack"' + (activeKey === 'pack' ? ' aria-current="page"' : '') + '>The Pack' + ic('chevronRight', 16) + '</a>' +
          '<a href="#/invite">Invite a relative' + ic('chevronRight', 16) + '</a>' +
          '<a href="#/signin">Sign out' + ic('chevronRight', 16) + '</a>' +
        '</nav>' +
        '<p class="small muted" style="margin-top:32px">Sample family. Every name is invented.</p>' +
      '</div>';
  }

  // ---------------------------------------------------------
  // routing
  // ---------------------------------------------------------
  function parse(hash) {
    var h = (hash || '').replace(/^#/, '');
    var parts = h.split('?')[0].split('/').filter(Boolean);
    if (!parts.length) return { name: 'cover', params: {} };
    var a = parts[0], b = parts[1], c = parts[2];
    if (a === 'signin') return { name: 'signin', params: {} };
    if (a === 'tree') return { name: 'tree', params: { id: b || 'p03' } };
    if (a === 'person') return { name: 'profile', params: { id: b || 'p03' } };
    if (a === 'people') return { name: 'people', params: {} };
    if (a === 'admin' && b === 'requests') return { name: 'request', params: { id: c } };
    if (a === 'admin') return { name: 'admin', params: {} };
    if (a === 'privacy') return { name: 'privacy', params: {} };
    if (a === 'invite') return { name: 'invite', params: {} };
    if (a === 'pack') return { name: 'pack', params: {} };
    return { name: 'cover', params: {} };
  }

  var KEY = { cover: '', signin: '', tree: 'tree', profile: 'tree', people: 'people', admin: 'admin', request: 'admin', privacy: 'privacy', invite: 'admin', pack: 'pack' };

  function route(hash) {
    var r = parse(hash);
    if (suppress) { suppress = false; return; }
    render(r);
  }

  function render(r) {
    currentRoute = r;
    document.body.classList.remove('tree-mode');

    if (r.name === 'tree') {
      if (!trail.length || trail[trail.length - 1] !== r.params.id) {
        if (!trail.length) trail = [r.params.id];
      }
    }

    root.innerHTML = headerHTML(KEY[r.name]) + '<div id="screen"></div>';
    var screen = root.querySelector('#screen');
    var view = S[r.name];
    screen.innerHTML = view.render(r.params);
    if (view.mount) view.mount(screen, r.params);

    document.title = (view.title ? view.title + ' · ' : '') + 'Hamisi Family';
    wireChrome();
    updatePill();

    if (r.name !== 'pack') window.scrollTo(0, 0);
    if (window.innerWidth < 900) {
      var s = root.querySelector('#sheet');
      if (s) s.classList.remove('open');
    }
  }

  function rerender() {
    var y = window.scrollY;
    render(currentRoute);
    window.scrollTo(0, y);
  }

  function wireChrome() {
    var btn = root.querySelector('[data-act="menu"]');
    var sheet = root.querySelector('#sheet');
    if (btn && sheet) {
      btn.addEventListener('click', function () {
        var open = sheet.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    }
    root.querySelectorAll('a[href^="#/"]').forEach(function (a) {
      if (a.dataset.wired) return;
      a.dataset.wired = '1';
    });
  }

  // ---------------------------------------------------------
  // tree callbacks
  // ---------------------------------------------------------
  function onTreeFocus(id) {
    if (trail[trail.length - 1] !== id) {
      trail.push(id);
      if (trail.length > 8) trail.shift();
    }
    try { history.replaceState(null, '', '#/tree/' + id); } catch (e) { location.hash = '#/tree/' + id; }
  }

  function trailFor(id) {
    var i = trail.indexOf(id);
    if (i === -1) return trail.concat([id]);
    return trail.slice(0, i + 1);
  }

  // ---------------------------------------------------------
  // toast
  // ---------------------------------------------------------
  var toastHost = null;
  function toast(msg) {
    if (!toastHost) {
      toastHost = document.createElement('div');
      toastHost.className = 'toasts';
      toastHost.setAttribute('role', 'status');
      toastHost.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastHost);
    }
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = ic('checkCircle', 17) + '<span>' + window.FH.esc(msg) + '</span>';
    toastHost.appendChild(el);
    setTimeout(function () {
      el.style.transition = 'opacity 200ms';
      el.style.opacity = '0';
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
    }, 3600);
  }

  // ---------------------------------------------------------
  // dialog
  // ---------------------------------------------------------
  function dialog(opts) {
    var back = document.createElement('div');
    back.className = 'dlg-backdrop';
    back.innerHTML =
      '<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlg-title">' +
        '<h2 id="dlg-title">' + window.FH.esc(opts.title) + '</h2>' +
        '<div class="dlg-body">' + (opts.body || '') + '</div>' +
        '<div class="dlg-foot"></div>' +
      '</div>';
    var dlg = back.querySelector('.dlg');
    var foot = back.querySelector('.dlg-foot');
    var lastFocus = document.activeElement;

    (opts.actions || [{ label: 'Close', kind: 'ghost' }]).forEach(function (a) {
      var b = document.createElement('button');
      b.className = 'btn btn-' + (a.kind || 'soft');
      b.textContent = a.label;
      b.addEventListener('click', function () {
        var keep = a.onClick ? a.onClick(dlg) : false;
        if (!keep) close();
      });
      foot.appendChild(b);
    });

    function close() {
      if (back.parentNode) back.parentNode.removeChild(back);
      document.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'Tab') {
        var f = dlg.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    back.addEventListener('click', function (e) { if (e.target === back) close(); });
    document.body.appendChild(back);
    var focusable = dlg.querySelector('input, select, textarea, button');
    if (focusable) focusable.focus();
    return { close: close };
  }

  // ---------------------------------------------------------
  // design review drawer
  // ---------------------------------------------------------
  var drawerEl = null;
  var drawerBack = null;
  var lastFocus = null;

  function approvedCount() {
    return SCREENS.filter(function (s) { return approvals[s[0]]; }).length;
  }

  function updatePill() {
    var pill = document.querySelector('.demo-pill');
    if (!pill) return;
    pill.innerHTML = '<span class="tag">DEMO</span>' +
      '<span>Design review · ' + approvedCount() + ' of ' + SCREENS.length + '</span>' +
      ic('chevronDown', 14);
    pill.setAttribute('aria-label', 'Open design review. ' + approvedCount() + ' of ' + SCREENS.length + ' screens approved.');
  }

  function openDrawer() {
    if (drawerEl) return;
    lastFocus = document.activeElement;

    drawerBack = document.createElement('div');
    drawerBack.className = 'drawer-backdrop';
    drawerEl = document.createElement('aside');
    drawerEl.className = 'drawer';
    drawerEl.setAttribute('role', 'dialog');
    drawerEl.setAttribute('aria-modal', 'true');
    drawerEl.setAttribute('aria-labelledby', 'drw-title');

    drawerEl.innerHTML =
      '<div class="drawer-head"><h2 id="drw-title">Design review</h2>' +
        '<button class="menu-btn" data-act="close" aria-label="Close">' + ic('x', 18) + '</button></div>' +
      '<div class="drawer-body">' +
        '<div class="note-strip" style="margin-top:0">' + ic('info', 16) +
          '<span><strong>Best on a laptop or desktop.</strong> On a phone the tree pans and this panel is a full sheet, so the differences between the three looks are easy to miss.</span></div>' +
        '<h3>The look</h3>' +
        LOOKS.map(function (l) {
          return '<button class="look-opt" data-look="' + l.id + '" aria-pressed="' + (look === l.id) + '">' +
            '<span class="look-sw">' + l.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>' +
            '<span class="look-body"><b>' + l.name + '</b><span>' + l.desc + '</span></span></button>';
        }).join('') +
        '<h3>Screen approvals</h3>' +
        '<div class="progress"><i style="width:' + (approvedCount() / SCREENS.length * 100) + '%"></i></div>' +
        '<p class="small muted" style="margin-bottom:10px">' + approvedCount() + ' of ' + SCREENS.length + ' approved.</p>' +
        SCREENS.map(function (s) {
          return '<label class="appr-row"><input type="checkbox" data-appr="' + s[0] + '"' + (approvals[s[0]] ? ' checked' : '') + '>' +
            '<span>' + s[1] + '</span><em>' + window.FH.esc('#' + s[0]) + '</em></label>';
        }).join('') +
        '<h3>Notes for Apex</h3>' +
        '<textarea class="textarea" data-notes placeholder="What to keep, what to change, what is missing.">' + window.FH.esc(notes) + '</textarea>' +
        '<p class="small muted" style="margin-top:8px">This stays in your browser until you send it.</p>' +
        '<div class="wa-block">' +
          '<p>Send your review to Apex on WhatsApp. It opens WhatsApp with everything written out — you press send.</p>' +
          '<button class="btn btn-primary" data-act="send-wa">' + ic('mail', 16) + ' Send my review</button>' +
          '<p style="margin:10px 0 0;text-align:center">to <span class="wa-num">' + WA_PRETTY + '</span></p>' +
        '</div>' +
      '</div>' +
      '<div class="drawer-foot">Prototype only. Approvals here are a convenience — the signed Gate 2 sheet is what counts.</div>';

    document.body.appendChild(drawerBack);
    document.body.appendChild(drawerEl);

    drawerEl.querySelector('[data-act="close"]').addEventListener('click', closeDrawer);
    drawerBack.addEventListener('click', closeDrawer);

    drawerEl.querySelectorAll('[data-look]').forEach(function (b) {
      b.addEventListener('click', function () {
        look = b.dataset.look;
        save('fh.look', look);
        document.documentElement.setAttribute('data-look', look);
        drawerEl.querySelectorAll('[data-look]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });

    drawerEl.querySelectorAll('[data-appr]').forEach(function (c) {
      c.addEventListener('change', function () {
        approvals[c.dataset.appr] = c.checked;
        save('fh.approvals', approvals);
        var p = drawerEl.querySelector('.progress i');
        if (p) p.style.width = (approvedCount() / SCREENS.length * 100) + '%';
        var t = drawerEl.querySelector('.drawer-body .small.muted');
        if (t) t.textContent = approvedCount() + ' of ' + SCREENS.length + ' approved.';
        updatePill();
      });
    });

    var ta = drawerEl.querySelector('[data-notes]');
    ta.addEventListener('input', function () { notes = ta.value; save('fh.notes', notes); });

    var sendWa = drawerEl.querySelector('[data-act="send-wa"]');
    if (sendWa) sendWa.addEventListener('click', function () { sendReview(); });

    document.addEventListener('keydown', drawerKey);
    setTimeout(function () {
      var f = drawerEl.querySelector('[data-act="close"]');
      if (f) f.focus();
    }, 10);
  }

  function drawerKey(e) {
    if (!drawerEl) return;
    if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); }
    if (e.key === 'Tab') {
      var f = drawerEl.querySelectorAll('button, [href], input, select, textarea');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function closeDrawer() {
    if (drawerEl && drawerEl.parentNode) drawerEl.parentNode.removeChild(drawerEl);
    if (drawerBack && drawerBack.parentNode) drawerBack.parentNode.removeChild(drawerBack);
    drawerEl = null; drawerBack = null;
    document.removeEventListener('keydown', drawerKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ---------------------------------------------------------
  // WhatsApp submission
  // ---------------------------------------------------------
  function reviewText() {
    var lk = LOOKS.filter(function (l) { return l.id === look; })[0] || LOOKS[0];
    var done = SCREENS.filter(function (s) { return approvals[s[0]]; });
    var left = SCREENS.filter(function (s) { return !approvals[s[0]]; });

    var lines = [];
    lines.push('Hello Apex Webs — Baraza family design review.');
    lines.push('');
    lines.push('Look chosen: ' + lk.name);
    lines.push('Screens approved: ' + done.length + ' of ' + SCREENS.length);
    if (done.length) {
      lines.push('');
      lines.push('Approved:');
      done.forEach(function (s) { lines.push('- ' + s[1]); });
    }
    if (left.length) {
      lines.push('');
      lines.push('Still to look at or not approved:');
      left.forEach(function (s) { lines.push('- ' + s[1]); });
    }
    if (notes && notes.trim()) {
      lines.push('');
      lines.push('Notes:');
      lines.push(notes.trim());
    }
    var ready = Object.keys(checklist).filter(function (k) { return checklist[k]; }).length;
    lines.push('');
    lines.push('Project Pack checklist: ' + ready + ' of 6 ready.');
    lines.push('');
    lines.push('(Sent from the design prototype.)');
    return lines.join('\n');
  }

  function sendReview() {
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(reviewText());
    var w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url;
  }

  // ---------------------------------------------------------
  // boot
  // ---------------------------------------------------------
  function pillHTML() {
    return '<button class="demo-pill" data-act="open-demo"></button>';
  }

  function boot() {
    root = document.getElementById('app');
    var qs = new URLSearchParams(location.search);
    var qlook = qs.get('look');
    if (qlook && ['a', 'b', 'c'].indexOf(qlook) !== -1) { look = qlook; save('fh.look', look); }
    document.documentElement.setAttribute('data-look', look);

    var body = document.createElement('div');
    body.style.display = 'contents';
    root.appendChild(body);
    var pill = document.createElement('div');
    pill.innerHTML = pillHTML();
    document.body.appendChild(pill.firstChild);

    document.querySelector('.demo-pill').addEventListener('click', openDrawer);
    updatePill();

    var qs2 = new URLSearchParams(location.search);
    var forced = qs2.get('route');

    window.addEventListener('hashchange', function () {
      var r = parse(location.hash);
      if (r.name === 'tree') {
        var prev = currentRoute && currentRoute.name === 'tree' ? currentRoute.params.id : null;
        if (!prev) trail = [r.params.id];
      }
      render(r);
    });

    document.addEventListener('keydown', function (e) {
      if (drawerEl) return;
      if (currentRoute && currentRoute.name === 'tree') window.FH.tree.keyHandler(e);
    });

    var initial = forced ? '#/' + forced : (location.hash || '#/');
    if (forced) {
      try { history.replaceState(null, '', '#/' + forced); } catch (e) {}
    }
    render(parse(initial));
  }

  window.FH = window.FH || {};
  window.FH.app = {
    toast: toast,
    dialog: dialog,
    rerender: rerender,
    openDrawer: openDrawer,
    onTreeFocus: onTreeFocus,
    trailFor: trailFor,
    getChecklist: function () { return checklist; },
    setChecklist: function (k, v) { checklist[k] = v; save('fh.checklist', checklist); },
    sendReview: sendReview,
    reviewText: reviewText,
    waLink: function (text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
