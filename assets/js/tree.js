/* ============================================================
   Hamisi Family — ego hourglass tree
   The tree shows a few generations around one person at a time.
   That is what keeps a large family readable on a phone.
   ============================================================ */
(function () {
  'use strict';

  var D = window.FH.data;
  var SVGNS = 'http://www.w3.org/2000/svg';

  var container = null;
  var camEl = null;
  var edgeEl = null;
  var nodesEl = null;
  var cam = { x: 0, y: 0, s: 1 };
  var nodes = {};
  var edges = [];
  var focusId = null;
  var onOpen = null;
  var raf = null;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function metrics() {
    var narrow = window.innerWidth < 720;
    return narrow
      ? { W: 156, H: 82, FW: 176, FH: 118, GAP: 16, VGAP: 54, PAD: 48 }
      : { W: 184, H: 88, FW: 208, FH: 128, GAP: 22, VGAP: 64, PAD: 64 };
  }

  // ---------- generation numbering ----------
  var genCache = null;
  function generations() {
    if (genCache) return genCache;
    var g = {};
    D.people.forEach(function (p) { g[p.id] = 0; });
    for (var pass = 0; pass < 6; pass++) {
      D.relationships.forEach(function (r) {
        if (r.type !== 'parent') return;
        if (g[r.b] < g[r.a] + 1) g[r.b] = g[r.a] + 1;
      });
    }
    genCache = g;
    return g;
  }

  // ---------- layout ----------
  function buildLayout(focusIdIn) {
    var m = metrics();
    var gen = generations();
    var fGen = gen[focusIdIn];
    var rows = { '-2': [], '-1': [], '0': [], '1': [], '2': [], '3': [] };
    var seen = {};

    function push(row, id, kind) {
      if (row < -2 || row > 3) return;
      if (seen[id]) return;
      seen[id] = true;
      rows[String(row)].push({ id: id, kind: kind || 'kin' });
    }

    var focus = D.byId(focusIdIn);
    if (!focus) return null;

    // --- row 0: partners either side of the focus, then siblings and their partners
    var partners = D.partnersOf(focusIdIn);
    if (partners.length) push(0, partners[0].id, 'partner');
    push(0, focusIdIn, 'focus');
    partners.slice(1).forEach(function (p) { push(0, p.id, 'partner'); });

    var sibs = D.siblingsOf(focusIdIn);
    // hinted siblings (people known to be siblings without modelled parents)
    D.siblingHints.forEach(function (h) {
      if (h.a === focusIdIn) sibs.push({ id: h.b, full: true, hint: true });
      if (h.b === focusIdIn) sibs.push({ id: h.a, full: true, hint: true });
    });
    sibs.sort(function (a, b) { return (D.byId(a.id).dob || '') < (D.byId(b.id).dob || '') ? -1 : 1; });
    sibs.forEach(function (s) {
      push(0, s.id, s.hint ? 'sibling-hint' : 'sibling');
      D.partnersOf(s.id).forEach(function (p) { push(0, p.id, 'partner'); });
    });

    // --- ancestors
    var parentIds = D.parentsOf(focusIdIn).map(function (x) { return x.id; });
    var up1 = [];
    parentIds.slice().sort(function (a, b) { return (D.byId(a).dob || '') < (D.byId(b).dob || '') ? -1 : 1; })
      .forEach(function (pid) {
        up1.push(pid);
        D.partnersOf(pid).forEach(function (pt) {
          if (up1.indexOf(pt.id) === -1 && parentIds.indexOf(pt.id) === -1) up1.push(pt.id);
        });
      });
    up1.forEach(function (id) { push(-1, id, 'parent'); });

    var up2 = [];
    up1.forEach(function (id) {
      D.parentsOf(id).forEach(function (x) { if (up2.indexOf(x.id) === -1) up2.push(x.id); });
    });
    up2.sort(function (a, b) { return (D.byId(a).dob || '') < (D.byId(b).dob || '') ? -1 : 1; });
    up2.forEach(function (id) { push(-2, id, 'grandparent'); });

    // --- descendants
    var down1 = [];
    D.childrenOf(focusIdIn).forEach(function (c) { down1.push({ id: c.id, subtype: c.subtype }); });
    down1.sort(function (a, b) { return (D.byId(a.id).dob || '') < (D.byId(b.id).dob || '') ? -1 : 1; });
    down1.forEach(function (c) {
      push(1, c.id, c.subtype === 'adopted' ? 'adopted' : 'child');
      D.partnersOf(c.id).forEach(function (p) { push(1, p.id, 'partner'); });
    });

    var down2 = [];
    down1.forEach(function (c) {
      D.childrenOf(c.id).forEach(function (g) { if (!down2.some(function (x) { return x.id === g.id; })) down2.push(g); });
    });
    down2.sort(function (a, b) { return (D.byId(a.id).dob || '') < (D.byId(b.id).dob || '') ? -1 : 1; });
    down2.forEach(function (c) {
      push(2, c.id, c.subtype === 'adopted' ? 'adopted' : 'child');
      D.partnersOf(c.id).forEach(function (p) { push(2, p.id, 'partner'); });
    });

    var down3 = [];
    down2.forEach(function (c) {
      D.childrenOf(c.id).forEach(function (g) { if (!down3.some(function (x) { return x.id === g.id; })) down3.push(g); });
    });
    down3.forEach(function (c) { push(3, c.id, 'child'); });

    // --- horizontal placement
    function dims(row, kind) {
      var isFocus = kind === 'focus';
      return { w: isFocus ? m.FW : m.W, h: isFocus ? m.FH : m.H };
    }

    var rowKeys = ['-2', '-1', '0', '1', '2', '3'];
    var positions = {};

    // row 0 sequential
    var r0 = rows['0'];
    var cx = 0;
    r0.forEach(function (item) {
      var d = dims(0, item.kind);
      item.w = d.w; item.h = d.h;
      item.x = cx;
      cx += d.w + m.GAP;
    });
    var focusItem = r0.filter(function (i) { return i.kind === 'focus'; })[0];
    var shift = focusItem ? focusItem.w / 2 - (focusItem.x) : 0;
    r0.forEach(function (i) { i.x += shift; positions[i.id] = i; });

    function midOf(ids, fallback) {
      var xs = [];
      ids.forEach(function (id) { if (positions[id]) xs.push(positions[id].x + positions[id].w / 2); });
      if (!xs.length) return fallback || 0;
      return xs.reduce(function (a, b) { return a + b; }, 0) / xs.length;
    }

    function placeRow(rowKey, desiredFn, centreOn) {
      var items = rows[rowKey];
      if (!items.length) return;
      items.forEach(function (item) {
        var d = dims(rowKey, item.kind);
        item.w = d.w; item.h = d.h;
        item.desired = desiredFn(item);
      });
      items.sort(function (a, b) { return a.desired - b.desired; });
      var cursor = -Infinity;
      items.forEach(function (item) {
        item.x = Math.max(item.desired, cursor);
        cursor = item.x + item.w + m.GAP;
      });
      var mean = items.reduce(function (a, i) { return a + i.x + i.w / 2; }, 0) / items.length;
      var target = centreOn === undefined ? items.reduce(function (a, i) { return a + i.desired; }, 0) / items.length : centreOn;
      var dx = target - mean;
      items.forEach(function (i) { i.x += dx; positions[i.id] = i; });
    }

    // row -1 aligned above the people they parent
    placeRow('-1', function (item) {
      var kids = r0.filter(function (k) {
        return D.parentsOf(k.id).some(function (p) { return p.id === item.id; });
      }).map(function (k) { return k.id; });
      return midOf(kids, 0);
    });

    placeRow('-2', function (item) {
      var kids = rows['-1'].filter(function (k) {
        return D.parentsOf(k.id).some(function (p) { return p.id === item.id; });
      }).map(function (k) { return k.id; });
      return midOf(kids, 0);
    });

    // row 1 centred under the parent couple block
    var parentBlockIds = [focusIdIn].concat(partners.map(function (p) { return p.id; }));
    var parentCentre = midOf(parentBlockIds, 0);
    placeRow('1', function () { return parentCentre; }, parentCentre);

    placeRow('2', function (item) {
      var kids = rows['1'].filter(function (k) {
        return D.parentsOf(k.id).some(function (p) { return p.id === item.id; });
      }).map(function (k) { return k.id; });
      return midOf(kids, parentCentre);
    }, parentCentre);

    placeRow('3', function (item) {
      var kids = rows['2'].filter(function (k) {
        return D.parentsOf(k.id).some(function (p) { return p.id === item.id; });
      }).map(function (k) { return k.id; });
      return midOf(kids, parentCentre);
    }, parentCentre);

    // --- vertical placement
    var present = rowKeys.filter(function (k) { return rows[k].length; });
    var y = 0;
    var rowY = {};
    present.forEach(function (k) {
      var rowH = rows[k].reduce(function (a, i) { return Math.max(a, i.h); }, 0);
      rowY[k] = y;
      y += rowH + m.VGAP;
    });
    present.forEach(function (k) {
      var rowH = rows[k].reduce(function (a, i) { return Math.max(a, i.h); }, 0);
      rows[k].forEach(function (i) {
        i.y = rowY[k] + (rowH - i.h) / 2;
      });
    });

    // --- edges
    var presentIds = {};
    present.forEach(function (k) { rows[k].forEach(function (i) { presentIds[i.id] = true; }); });

    var edgeList = [];
    var coupled = {};
    D.relationships.forEach(function (r) {
      if (r.type === 'partner') { coupled[r.a + '|' + r.b] = true; coupled[r.b + '|' + r.a] = true; }
    });

    // parent edges, grouped by child so a couple drops one line
    var byChild = {};
    D.relationships.forEach(function (r) {
      if (r.type !== 'parent') return;
      if (!presentIds[r.a] || !presentIds[r.b]) return;
      var a = positions[r.a], b = positions[r.b];
      if (!a || !b || a.y >= b.y) return;
      (byChild[r.b] = byChild[r.b] || []).push(r);
    });

    Object.keys(byChild).forEach(function (childId) {
      var list = byChild[childId];
      if (list.length >= 2) {
        var p1 = list[0].a, p2 = list[1].a;
        if (coupled[p1 + '|' + p2]) {
          var pa = positions[p1], pb = positions[p2];
          var left = pa.x < pb.x ? pa : pb;
          var right = pa.x < pb.x ? pb : pa;
          var allAdopted = list.every(function (x) { return x.subtype === 'adopted'; });
          edgeList.push({
            kind: allAdopted ? 'dashed' : 'parent',
            a: null, b: childId,
            sx: (left.x + left.w + right.x) / 2,
            sy: left.y + left.h / 2
          });
          return;
        }
      }
      list.forEach(function (r) {
        edgeList.push({ kind: r.subtype === 'adopted' ? 'dashed' : 'parent', a: r.a, b: r.b });
      });
    });

    D.relationships.forEach(function (r) {
      if (r.type !== 'partner') return;
      if (!presentIds[r.a] || !presentIds[r.b]) return;
      edgeList.push({ kind: 'partner', a: r.a, b: r.b });
    });
    D.siblingHints.forEach(function (h) {
      if (!presentIds[h.a] || !presentIds[h.b]) return;
      if (positions[h.a].y !== positions[h.b].y) return;
      edgeList.push({ kind: 'sibling', a: h.a, b: h.b });
    });

    // --- bounds
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    present.forEach(function (k) {
      rows[k].forEach(function (i) {
        minX = Math.min(minX, i.x); minY = Math.min(minY, i.y);
        maxX = Math.max(maxX, i.x + i.w); maxY = Math.max(maxY, i.y + i.h);
      });
    });

    return {
      rows: rows, present: present, positions: positions,
      edges: edgeList, focus: focusItem,
      bounds: { minX: minX, minY: minY, maxX: maxX, maxY: maxY, w: maxX - minX, h: maxY - minY }
    };
  }

  // ---------- edges ----------
  function pathFor(e) {
    var b = nodes[e.b];
    if (!b) return '';
    var a = e.a ? nodes[e.a] : null;
    if (e.kind === 'partner') {
      if (!a) return '';
      var left = a.x < b.x ? a : b, right = a.x < b.x ? b : a;
      var yy = left.y + left.h / 2;
      var x1 = left.x + left.w, x2 = right.x;
      if (x2 < x1) return '';
      if (x2 - x1 > 60) return '';
      return 'M' + x1 + ',' + (yy - 2) + 'H' + x2 + 'M' + x1 + ',' + (yy + 2) + 'H' + x2;
    }
    if (e.kind === 'sibling') {
      if (!a) return '';
      var l = a.x < b.x ? a : b, r = a.x < b.x ? b : a;
      var sy0 = l.y + l.h / 2;
      return 'M' + (l.x + l.w) + ',' + sy0 + 'H' + r.x;
    }
    var px = e.sx !== undefined ? e.sx : (a ? a.x + a.w / 2 : b.x + b.w / 2);
    var py = e.sy !== undefined ? e.sy : (a ? a.y + a.h : b.y - 40);
    var cx2 = b.x + b.w / 2, cy2 = b.y;
    var mid = cy2 - 28;
    if (mid <= py + 10) mid = py + (cy2 - py) * 0.5;
    if (Math.abs(cx2 - px) < 1) return 'M' + px + ',' + py + 'V' + cy2;
    var dir = cx2 > px ? 1 : -1;
    var r2 = Math.min(10, Math.abs(cx2 - px) / 2, Math.max(2, (cy2 - mid) / 2));
    return 'M' + px + ',' + py +
      'V' + (mid - r2) +
      'Q' + px + ',' + mid + ' ' + (px + dir * r2) + ',' + mid +
      'H' + (cx2 - dir * r2) +
      'Q' + cx2 + ',' + mid + ' ' + cx2 + ',' + (mid + r2) +
      'V' + cy2;
  }

  function renderEdges() {
    edges.forEach(function (item) {
      var d = pathFor(item.data);
      if (item.el.getAttribute('d') !== d) item.el.setAttribute('d', d);
    });
  }

  // ---------- camera ----------
  function shellSize() {
    return { w: container.clientWidth, h: container.clientHeight };
  }

  function applyCam() {
    camEl.style.transform = 'translate(' + cam.x + 'px,' + cam.y + 'px) scale(' + cam.s + ')';
  }

  function fit(bounds, immediate) {
    var target = fitTarget(bounds);
    if (immediate || reduced) { cam = target; applyCam(); updateZoomLabel(); return; }
    tweenCam(target);
  }

  function tweenCam(target) {
    var from = { x: cam.x, y: cam.y, s: cam.s };
    var start = performance.now();
    var dur = 420;
    function step(now) {
      var t = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      cam.x = from.x + (target.x - from.x) * e;
      cam.y = from.y + (target.y - from.y) * e;
      cam.s = from.s + (target.s - from.s) * e;
      applyCam();
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }

  // ---------- node elements ----------
  function labelFor(p) {
    if (p.dod) return D.year(p.dob) + ' – ' + D.year(p.dod);
    var y = D.year(p.dob);
    var a = D.age(p);
    return y ? 'b. ' + y + ' · ' + a : p.statusDetail;
  }

  function buildNode(item) {
    var p = D.byId(item.id);
    var isFocus = item.kind === 'focus';
    var el = document.createElement(isFocus ? 'div' : 'button');
    el.className = 'tnode' + (isFocus ? ' is-focus' : '') + (p.dod ? ' is-deceased' : '');
    el.setAttribute('data-id', p.id);
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.transform = 'translate(' + item.x + 'px,' + item.y + 'px)';

    if (!isFocus) {
      el.type = 'button';
      el.setAttribute('aria-label', 'Centre the tree on ' + p.name);
    } else {
      el.setAttribute('role', 'group');
      el.setAttribute('aria-label', p.name + ', centred');
    }

    var html = '' +
      '<span class="mono mono-34" data-branch="' + p.branch + '">' + D.initials(p.id) + '</span>' +
      '<span class="tnode-text">' +
        '<span class="tnode-name">' + p.name + '</span>' +
        '<span class="tnode-sub"><i class="branch-dot ' + D.branchClass(p.branch) + '"></i><span class="tnode-sub-t">' + labelFor(p) + '</span></span>' +
      '</span>';

    if (D.isMinor(p)) {
      html += '<span class="tnode-limited" title="Limited details until consent is recorded">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>';
    }

    if (isFocus) {
      html += '<span class="tnode-foot">' +
        '<a href="#/person/' + p.id + '">Open profile' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>' +
        '</a></span>';
    }

    el.innerHTML = html;

    if (!isFocus) {
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        setFocus(p.id, true, true);
      });
    }
    el.addEventListener('dblclick', function () { location.hash = '#/person/' + p.id; });
    return el;
  }

  // ---------- public ----------
  function mount(el, opts) {
    container = el;
    onOpen = opts && opts.onOpen;
    container.innerHTML = '';

    var shell = document.createElement('div');
    shell.className = 'tree-shell';
    shell.innerHTML =
      '<div class="tree-camera"></div>' +
      '<div class="tree-overlay tree-top-left">' +
        '<span class="tree-hint">Tap a card to centre it. Drag to pan, pinch to zoom.</span>' +
        '<div class="trail" data-el="trail"></div>' +
      '</div>' +
      '<div class="tree-overlay tree-top-right" data-el="back"></div>' +
      '<div class="tree-overlay tree-bottom">' +
        '<div class="zset" role="toolbar" aria-label="Tree controls">' +
          '<button class="zbtn" data-act="out" aria-label="Zoom out">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12h14"/></svg></button>' +
          '<div class="zbtn zoom-pct" data-act="pct">100%</div>' +
          '<button class="zbtn" data-act="in" aria-label="Zoom in">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>' +
          '<span class="zsep" aria-hidden="true"></span>' +
          '<button class="zbtn zbtn-text" data-act="fit">Fit</button>' +
          '<button class="zbtn zbtn-text" data-act="whole">Whole family</button>' +
        '</div>' +
      '</div>';

    container.appendChild(shell);
    camEl = shell.querySelector('.tree-camera');
    nodesEl = document.createElement('div');
    edgeEl = document.createElementNS(SVGNS, 'svg');
    edgeEl.setAttribute('class', 'tree-edges');
    camEl.appendChild(edgeEl);
    camEl.appendChild(nodesEl);

    shell.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'in') zoomBy(1.18);
      if (act === 'out') zoomBy(1 / 1.18);
      if (act === 'fit') fit(current.bounds, false);
      if (act === 'whole') setFocus('p01', true, true);
    });

    setupPanZoom(shell);
    if (focusId) setFocus(focusId, false, false);
  }

  var current = null;

  function setFocus(id, push, animate) {
    if (!container) return;
    focusId = id;
    var layout = buildLayout(id);
    if (!layout) return;

    var previous = nodes;
    current = layout;

    nodes = {};
    nodesEl.innerHTML = '';
    layout.present.forEach(function (key) {
      layout.rows[key].forEach(function (item) {
        var el = buildNode(item);
        nodesEl.appendChild(el);
        var prev = previous[item.id];
        nodes[item.id] = { el: el, x: item.x, y: item.y, w: item.w, h: item.h, toX: item.x, toY: item.y, fromX: item.x, fromY: item.y };
        if (prev && animate && !reduced) {
          nodes[item.id].fromX = prev.x;
          nodes[item.id].fromY = prev.y;
          nodes[item.id].x = prev.x;
          nodes[item.id].y = prev.y;
          el.style.transform = 'translate(' + prev.x + 'px,' + prev.y + 'px)';
        }
      });
    });

    edgeEl.innerHTML = '';
    var OFF = 200;
    var boxW = layout.bounds.w + OFF * 2;
    var boxH = layout.bounds.h + OFF * 2;
    edgeEl.setAttribute('viewBox', '0 0 ' + boxW + ' ' + boxH);
    edgeEl.setAttribute('width', boxW);
    edgeEl.setAttribute('height', boxH);
    edgeEl.style.left = (layout.bounds.minX - OFF) + 'px';
    edgeEl.style.top = (layout.bounds.minY - OFF) + 'px';
    edgeEl.style.width = boxW + 'px';
    edgeEl.style.height = boxH + 'px';

    var g = document.createElementNS(SVGNS, 'g');
    g.setAttribute('transform', 'translate(' + (-(layout.bounds.minX - OFF)) + ',' + (-(layout.bounds.minY - OFF)) + ')');
    edgeEl.appendChild(g);

    edges = layout.edges.map(function (e) {
      var path = document.createElementNS(SVGNS, 'path');
      path.setAttribute('class', e.kind === 'partner' ? 'partner' : e.kind === 'dashed' ? 'parent dashed' : e.kind === 'sibling' ? 'sibling' : '');
      g.appendChild(path);
      return { el: path, data: { kind: e.kind, a: e.a, b: e.b, sx: e.sx, sy: e.sy } };
    });

    renderEdges();
    renderTrail(id);
    renderBack(id);
    updateZoomLabel();

    if (animate && !reduced) {
      var t0 = performance.now();
      var dur = 420;
      // reset camera to old fit? keep camera, tween nodes then ease camera
      var from = { x: cam.x, y: cam.y, s: cam.s };
      var targetCam = fitTarget(layout.bounds);
      if (raf) cancelAnimationFrame(raf);
      function step(now) {
        var t = Math.min(1, (now - t0) / dur);
        var e = 1 - Math.pow(1 - t, 3);
        Object.keys(nodes).forEach(function (k) {
          var n = nodes[k];
          n.x = n.fromX + (n.toX - n.fromX) * e;
          n.y = n.fromY + (n.toY - n.fromY) * e;
          n.el.style.transform = 'translate(' + n.x + 'px,' + n.y + 'px)';
        });
        renderEdges();
        cam.x = from.x + (targetCam.x - from.x) * e;
        cam.y = from.y + (targetCam.y - from.y) * e;
        cam.s = from.s + (targetCam.s - from.s) * e;
        applyCam();
        if (t < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    } else {
      fit(layout.bounds, true);
    }
    if (push && window.FH.app) window.FH.app.onTreeFocus(id);
  }

  function fitTarget(bounds) {
    var s = shellSize();
    var narrow = window.innerWidth < 720;
    if (narrow) {
      // phones: keep cards at reading size, centre on the focus person, pan from there
      var f = nodes[focusId];
      var scale = Math.min(1.05, s.w / 340);
      if (f) {
        return {
          s: scale,
          x: s.w / 2 - (f.x + f.w / 2) * scale,
          y: Math.max(24, s.h * 0.34 - (f.y + f.h / 2) * scale)
        };
      }
      return { s: scale, x: (s.w - bounds.w * scale) / 2 - bounds.minX * scale, y: 40 - bounds.minY * scale };
    }
    var pad = 48;
    var sx = (s.w - pad * 2) / Math.max(bounds.w, 1);
    var sy = (s.h - pad * 2 - 40) / Math.max(bounds.h, 1);
    var scale2 = Math.max(0.4, Math.min(1.3, Math.min(1, sx, sy)));
    return {
      s: scale2,
      x: (s.w - bounds.w * scale2) / 2 - bounds.minX * scale2,
      y: (s.h - bounds.h * scale2) / 2 - bounds.minY * scale2 + 6
    };
  }

  function renderTrail(id) {
    var trail = container.querySelector('[data-el="trail"]');
    if (!trail) return;
    var chain = window.FH.app ? window.FH.app.trailFor(id) : [id];
    var last = chain.length > 3 ? chain.slice(chain.length - 3) : chain;
    var html = '';
    if (chain.length > 3) html += '<span class="now">…</span><span class="sep">›</span>';
    last.forEach(function (pid, i) {
      if (i) html += '<span class="sep">›</span>';
      if (pid === id) html += '<span class="now">' + D.fullName(pid) + '</span>';
      else html += '<a href="#/tree/' + pid + '">' + D.fullName(pid) + '</a>';
    });
    trail.innerHTML = html;
  }

  function renderBack(id) {
    var el = container.querySelector('[data-el="back"]');
    if (!el) return;
    if (id === 'p03') { el.innerHTML = ''; return; }
    el.innerHTML = '<a class="chip chip-line back-btn" href="#/tree/p03" style="text-decoration:none;height:32px;padding:0 12px;background:var(--card)">' +
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M11 6l-6 6 6 6"/></svg>Back to me</a>';
  }

  function updateZoomLabel() {
    var el = container && container.querySelector('[data-act="pct"]');
    if (el) el.textContent = Math.round(cam.s * 100) + '%';
  }

  function zoomBy(k, cx, cy) {
    var s = Math.max(0.4, Math.min(1.5, cam.s * k));
    var rect = container.getBoundingClientRect();
    var px = cx === undefined ? rect.width / 2 : cx;
    var py = cy === undefined ? rect.height / 2 : cy;
    cam.x = px - (px - cam.x) * (s / cam.s);
    cam.y = py - (py - cam.y) * (s / cam.s);
    cam.s = s;
    applyCam();
    updateZoomLabel();
  }

  function setupPanZoom(shell) {
    var pointers = new Map();
    var pinch = null; // { prevDist } while two fingers are down
    var drag = null;  // { x, y } last position of the panning finger

    function stopTween() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    shell.addEventListener('pointerdown', function (ev) {
      // Mouse keeps the old canvas-only drag; touch may also grab a card
      // (a stationary tap still fires its click, a moved finger pans).
      if (ev.target.closest('.zbtn, .tree-overlay, .trail, a, button:not(.tnode)')) return;
      stopTween();
      pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        pinch = { prevDist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) };
        drag = null;
      } else if (pointers.size === 1) {
        drag = { x: ev.clientX, y: ev.clientY };
        shell.style.cursor = 'grabbing';
      }
      if (ev.pointerType === 'mouse') {
        try { shell.setPointerCapture(ev.pointerId); } catch (e) {}
      }
      ev.preventDefault();
    });
    shell.addEventListener('pointermove', function (ev) {
      if (!pointers.has(ev.pointerId)) return;
      pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (pointers.size >= 2 && pinch) {
        var pts = Array.from(pointers.values());
        var d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinch.prevDist > 0 && d > 0) {
          var rect = container.getBoundingClientRect();
          zoomBy(d / pinch.prevDist, (pts[0].x + pts[1].x) / 2 - rect.left, (pts[0].y + pts[1].y) / 2 - rect.top);
        }
        pinch.prevDist = d;
      } else if (drag) {
        cam.x += ev.clientX - drag.x;
        cam.y += ev.clientY - drag.y;
        drag = { x: ev.clientX, y: ev.clientY };
        applyCam();
      }
    });
    function release(ev) {
      pointers.delete(ev.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size === 1) {
        // Pinch ended, one finger left: keep panning without a jump.
        var rest = Array.from(pointers.values())[0];
        drag = { x: rest.x, y: rest.y };
      } else {
        drag = null;
        shell.style.cursor = '';
      }
      if (ev.pointerType === 'mouse') {
        try { shell.releasePointerCapture(ev.pointerId); } catch (e) {}
      }
    }
    shell.addEventListener('pointerup', release);
    shell.addEventListener('pointercancel', release);
    shell.addEventListener('wheel', function (ev) {
      if (ev.target.closest('.tree-overlay')) return;
      ev.preventDefault();
      var rect = container.getBoundingClientRect();
      zoomBy(ev.deltaY < 0 ? 1.09 : 1 / 1.09, ev.clientX - rect.left, ev.clientY - rect.top);
    }, { passive: false });
  }

  function focusPersonId() { return focusId; }

  function keyHandler(ev) {
    if (!current) return;
    var map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    var dir = map[ev.key];
    if (!dir) return;
    var partners = D.partnersOf(focusId).map(function (p) { return p.id; });
    var kids = D.childrenOf(focusId).map(function (c) { return c.id; });
    var parents = D.parentsOf(focusId).map(function (p) { return p.id; });
    var sibs = D.siblingsOf(focusId).map(function (s) { return s.id; });
    var target = null;
    if (dir === 'up') target = parents[0] || null;
    if (dir === 'down') target = kids[0] || null;
    if (dir === 'left') target = partners[0] || sibs[0] || null;
    if (dir === 'right') target = partners[partners.length - 1] || sibs[sibs.length - 1] || null;
    if (target) { ev.preventDefault(); setFocus(target, true, true); }
  }

  window.FH = window.FH || {};
  window.FH.tree = {
    mount: mount,
    setFocus: setFocus,
    keyHandler: keyHandler,
    getFocus: focusPersonId,
    refit: function () { if (current) fit(current.bounds, true); }
  };
})();
