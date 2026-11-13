/* ============================================================
   Hamisi Family — screens
   ============================================================ */
(function () {
  'use strict';

  var D = window.FH.data;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var ICONS = {
    tree: '<circle cx="12" cy="4.6" r="1.9"/><circle cx="5.6" cy="19" r="1.9"/><circle cx="18.4" cy="19" r="1.9"/><path d="M12 6.7v7.8M5.6 17.1v-2.6h12.8v2.6"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6S14 16 14.6 19"/><path d="M16 5.4a3.2 3.2 0 0 1 0 6.2"/><path d="M17.2 14.8c2.1.4 3.4 1.9 3.8 4.2"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.5L16 9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    download: '<path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    chevronRight: '<path d="M9 5l7 7-7 7"/>',
    chevronDown: '<path d="M5 9l7 7 7-7"/>',
    chevronLeft: '<path d="M15 5l-7 7 7 7"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H6M11 6l-6 6 6 6"/>',
    userPlus: '<circle cx="10" cy="8" r="3.4"/><path d="M3.8 19.5c.6-3.1 2.9-4.8 6.2-4.8 1.1 0 2.1.2 3 .6"/><path d="M18 14v6M15 17h6"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.6 6.8L12 13l8.4-6.2"/>',
    dots: '<circle cx="6" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18" cy="12" r="1.3"/>',
    shield: '<path d="M12 3.2l7 2.6v5.4c0 4.3-2.9 7.6-7 9.6-4.1-2-7-5.3-7-9.6V5.8l7-2.6Z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3"/>',
    branch: '<circle cx="7" cy="6" r="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="12" r="2"/><path d="M7 8v8M9 6.8c3.4.4 5 1.8 6 4.4"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    users: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2.8 19c.5-2.6 2.3-4 5.2-4s4.7 1.4 5.2 4"/><path d="M14.6 15.2c2.4.3 3.9 1.6 4.4 3.8"/>',
    key: '<circle cx="8" cy="12" r="3.4"/><path d="M11.4 12H20M17 12v3M19.6 12v2.4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.4"/>',
    alert: '<path d="M12 4.5L21 19.5H3L12 4.5Z"/><path d="M12 10v4M12 17v.4"/>',
    file: '<path d="M6 3.5h7l5 5v12H6z"/><path d="M13 3.5v5h5"/>',
    pencil: '<path d="M15.5 4.5l4 4L9 19H5v-4L15.5 4.5Z"/>',
    memory: '<path d="M12 20.5s-7-4.2-7-9.2a4 4 0 0 1 7-2.6 4 4 0 0 1 7 2.6c0 5-7 9.2-7 9.2Z"/>'
  };

  function icon(name, size, cls) {
    var p = ICONS[name] || '';
    return '<svg class="' + (cls || '') + '" width="' + (size || 18) + '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }

  function mono(id, size, cls) {
    var p = D.byId(id);
    return '<span class="mono mono-' + (size || 34) + ' ' + (cls || '') + '" data-branch="' + esc(p.branch) + '" aria-hidden="true">' + D.initials(id) + '</span>';
  }

  function branchChip(b) {
    return '<span class="chip chip-line"><i class="branch-dot ' + D.branchClass(b) + '"></i>' + esc(b) + '</span>';
  }

  function statusChip(p) {
    var label = { student: 'Student', employed: 'Employed', 'self-employed': 'Self-employed', retired: 'Retired', other: 'Other' }[p.status] || p.status;
    return '<span class="chip">' + esc(label) + '</span>';
  }

  function factsOf(id) {
    var p = D.byId(id); var out = [];
    if (p.dod) out.push(D.year(p.dob) + ' – ' + D.year(p.dod));
    else if (p.dob) out.push(D.age(p) + ' years');
    out.push(p.county);
    return out;
  }

  // =========================================================
  // Cover
  // =========================================================
  var cover = {
    title: 'A first look at your family site',
    render: function () {
      return '<main id="main" class="wrap">' +
        '<div class="cover">' +
          '<div class="cover-inner">' +
            '<div class="cover-grid">' +
              '<div>' +
                '<p class="eyebrow">Design proposal · v1 · 13 November 2026</p>' +
                '<h1 class="display">A first look at the Baraza family site.</h1>' +
                '<p class="lede">Ten screens, drawn to the scope in your Project Pack. Nothing is built yet — this is the design gate. Walk through it, choose the look you want, and approve the screens.</p>' +
                '<div class="btn-row cover-actions">' +
                  '<a class="btn btn-primary" href="#/tree/p03">Start the walkthrough' + icon('arrow', 16) + '</a>' +
                  '<a class="btn btn-soft" href="#/pack">Read the Project Pack</a>' +
                '</div>' +
              '</div>' +

              '<div class="review">' +
                '<p class="review-title">How to review this</p>' +
                '<div class="review-list">' +
                  '<div class="review-step"><span class="review-n">1</span><div>' +
                    '<b>Choose the look</b>' +
                    '<span>Three starting points, in the dark panel at the bottom right. They keep the same colours and change the type, the shapes and the mood.</span></div></div>' +
                  '<div class="review-step"><span class="review-n">2</span><div>' +
                    '<b>Approve the screens</b>' +
                    '<span>Tick a screen once you are happy with it. Anything left unticked stays open until we hear from you.</span></div></div>' +
                  '<div class="review-step"><span class="review-n">3</span><div>' +
                    '<b>Send your review</b>' +
                    '<span>Your chosen look, your approvals and your notes go to Apex on WhatsApp in one message. You press send.</span></div></div>' +
                '</div>' +
                '<div class="note-strip">' + icon('info', 16) +
                  '<span><strong>Best on a laptop or desktop.</strong> On a phone the tree pans, and the three looks are easy to confuse in a small sheet. Have a look on a bigger screen before you decide.</span></div>' +
              '</div>' +
            '</div>' +

            '<div class="cover-facts">' +
              '<div>' + icon('people', 15) + '21 people · three generations</div>' +
              '<div>' + icon('branch', 15) + 'Bungoma · Nairobi · Mombasa</div>' +
              '<div>' + icon('info', 15) + 'Sample family — every name invented</div>' +
            '</div>' +
            '<div class="cover-foot">' +
              '<span>Apex Webs, Mombasa</span>' +
              '<button class="btn btn-ghost btn-sm" data-act="open-demo">Choose a look and approve a screen</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</main>';
    },
    mount: function (root) {
      var b = root.querySelector('[data-act="open-demo"]');
      if (b) b.addEventListener('click', function () { window.FH.app.openDrawer(); });
    }
  };

  // =========================================================
  // Sign in
  // =========================================================
  var signin = {
    title: 'Sign in',
    render: function () {
      return '<main id="main" class="wrap">' +
        '<div class="signin">' +
          '<div class="signin-card">' +
            '<span class="mono mono-64" data-branch="Bungoma">BF</span>' +
            '<h1>Welcome back.</h1>' +
            '<p class="lede">This site is private. Only relatives who have been invited can sign in.</p>' +
            '<div class="stack-3">' +
              '<div class="field">' +
                '<label for="si-email">Your email address</label>' +
                '<input class="input" id="si-email" type="email" autocomplete="email" placeholder="you@example.com">' +
                '<p class="hint">We will send you a link. There is no password to remember.</p>' +
              '</div>' +
              '<button class="btn btn-primary btn-block" data-act="send-link">Email me a sign-in link</button>' +
            '</div>' +
            '<p class="small mt-6"><a class="link" href="#" data-act="code">I have an invite code</a></p>' +
            '<div class="demo-hint">Prototype shortcut: <a href="#/tree/p03">sign in as Daniel Baraza, Owner' + icon('arrow', 13) + '</a></div>' +
            '<p class="small muted mt-6">New here? Ask Mr. Baraza to send you an invite.</p>' +
            '<hr class="rule mt-6">' +
            '<div class="flex-between mt-6 small muted">' +
              '<a class="link" href="#/pack">The Project Pack</a>' +
              '<a class="link" href="#/">Back to the cover</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</main>';
    },
    mount: function (root) {
      var send = root.querySelector('[data-act="send-link"]');
      if (send) send.addEventListener('click', function () {
        var v = root.querySelector('#si-email').value.trim();
        if (!v || v.indexOf('@') === -1) {
          window.FH.app.toast('Enter an email address first.');
          root.querySelector('#si-email').focus();
          return;
        }
        window.FH.app.toast('In the live site, a sign-in link would be on its way to ' + v + '.');
      });
      var code = root.querySelector('[data-act="code"]');
      if (code) code.addEventListener('click', function (e) {
        e.preventDefault();
        window.FH.app.toast('Invite codes are single use and expire after seven days.');
      });
    }
  };

  // =========================================================
  // Tree
  // =========================================================
  var tree = {
    title: 'Family tree',
    chrome: 'wide',
    render: function (params) {
      var who = D.fullName(params.id || 'p03');
      return '<main id="main">' +
        '<h1 class="sr-only">Family tree, centred on ' + esc(who) + '</h1>' +
        '<div id="tree-mount"></div></main>';
    },
    mount: function (root, params) {
      document.body.classList.add('tree-mode');
      window.FH.tree.mount(root.querySelector('#tree-mount'), {});
      window.FH.tree.setFocus(params.id || 'p03', false, false);
    }
  };

  // =========================================================
  // Profile
  // =========================================================
  var profile = {
    title: 'Profile',
    render: function (params) {
      var p = D.byId(params.id) || D.byId('p03');
      var id = p.id;
      var parents = D.parentsOf(id);
      var partners = D.partnersOf(id);
      var kids = D.childrenOf(id);
      var sibs = D.siblingsOf(id);

      function relChips(list, labelFn) {
        if (!list.length) return '';
        return '<div class="rel-list">' + list.map(function (x) {
          var pid = x.id || x;
          var sub = labelFn ? labelFn(x) : '';
          return '<a class="rel-chip" href="#/person/' + pid + '">' + mono(pid, 34) +
            '<span><span class="n">' + esc(D.fullName(pid)) + '</span>' +
            (sub ? '<span class="r">' + esc(sub) + '</span>' : '') + '</span></a>';
        }).join('') + '</div>';
      }

      var relGroups = '';
      if (parents.length) {
        relGroups += '<div class="rel-group"><div class="rel-label">Parents</div>' +
          relChips(parents, function (x) { return x.subtype === 'adopted' ? 'adoptive' : 'biological'; }) + '</div>';
      }
      if (partners.length) {
        relGroups += '<div class="rel-group"><div class="rel-label">' + (partners.length > 1 ? 'Partners' : 'Partner') + '</div>' +
          relChips(partners, function (x) { return x.start ? 'since ' + x.start : ''; }) + '</div>';
      }
      if (sibs.length) {
        relGroups += '<div class="rel-group"><div class="rel-label">Brothers and sisters</div>' +
          relChips(sibs, function (x) { return x.full ? 'full sibling' : 'half sibling'; }) + '</div>';
      }
      if (kids.length) {
        relGroups += '<div class="rel-group"><div class="rel-label">Children</div>' +
          relChips(kids, function (x) { return x.subtype === 'adopted' ? 'adopted' : ''; }) + '</div>';
      }

      var timeline = '';
      var entries = [];
      (p.work || []).forEach(function (w) {
        entries.push({ org: w.org, role: w.role, years: w.from + (w.to ? ' – ' + w.to : ' – now'), now: w.current });
      });
      (p.edu || []).forEach(function (e) {
        entries.push({ org: e.org, role: e.role, years: e.from + (e.to ? ' – ' + e.to : ' – now'), now: e.current, edu: true });
      });
      if (entries.length) {
        timeline = '<div class="tl">' + entries.map(function (e) {
          return '<div class="tl-item' + (e.now ? ' is-now' : '') + '">' +
            '<div class="tl-main"><span class="tl-org">' + esc(e.org) + '</span><span class="tl-years">' + esc(e.years) + '</span></div>' +
            '<div class="tl-role">' + esc(e.role) + (e.edu ? ' · education' : '') + '</div></div>';
        }).join('') + '</div>';
      } else {
        timeline = '<p class="muted small">No school or work records yet.</p>';
      }

      var visRows = D.FIELDS.map(function (f) {
        var lvl = D.visibilityOf(id, f);
        return '<div class="vis-row"><span>' + esc(D.FIELD_LABEL[f]) + '</span><b>' +
          (lvl === 'owner' ? icon('lock', 12) : '') + esc(D.LEVEL_LABEL[lvl]) + '</b></div>';
      }).join('');

      var memorial = !!p.dod;

      return '<main id="main" class="wrap">' +
        '<div class="profile-grid">' +
          '<div>' +
            '<div class="identity' + (memorial ? ' memorial' : '') + '">' +
              '<span class="mono mono-96" data-branch="' + esc(p.branch) + '" aria-hidden="true">' + D.initials(id) + '</span>' +
              '<div class="identity-body">' +
                '<p class="eyebrow" style="margin-bottom:8px">' + esc(p.branch) + ' branch · ' + esc(p.county) + '</p>' +
                '<h1>' + esc(p.name) + '</h1>' +
                (p.pref && p.pref !== p.name ? '<p class="pref">Known as ' + esc(p.pref) + '</p>' : '') +
                '<div class="fact-row">' + factsOf(id).map(function (f) { return '<span>' + esc(f) + '</span>'; }).join('<span class="sep">·</span>') + '</div>' +
                (memorial ? '<p class="memorial-note">Remembered by the family.</p>' : '') +
                '<div class="row-gap" style="margin-top:14px">' +
                  (memorial ? '<span class="chip chip-accent">In memory</span>' : '') +
                  statusChip(p) +
                  (D.isMinor(p) ? '<span class="chip chip-line">' + icon('lock', 11) + 'Limited details</span>' : '') +
                '</div>' +
              '</div>' +
            '</div>' +

            (p.bio ? '<p class="bio">' + esc(p.bio) + '</p>' : '') +
            (p.statusDetail ? '<p class="small muted" style="margin-top:-8px">' + esc(p.statusDetail) + '</p>' : '') +

            (relGroups ? '<section class="section" style="padding-top:32px"><h2 style="font-size:22px;margin-bottom:20px">Relationships</h2>' + relGroups + '</section>' : '') +

            '<section class="section" style="padding-top:32px"><h2 style="font-size:22px;margin-bottom:20px">School and work</h2>' + timeline + '</section>' +

            '<section class="section" style="padding-top:32px">' +
              '<div class="section-head"><h2 style="font-size:22px">Photos</h2><span class="small muted">1 of 6 in this package</span></div>' +
              '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px">' +
                '<div style="aspect-ratio:4/5;border:1px dashed var(--rule);border-radius:var(--r-md);display:grid;place-items:center;color:var(--muted);background:var(--paper-2)">' +
                  '<span class="small tac" style="padding:12px">' + icon('file', 20) + '<br>Photo to be supplied</span>' +
                '</div>' +
              '</div>' +
            '</section>' +
          '</div>' +

          '<aside class="rail">' +
            '<div class="rail-card">' +
              '<h3>Who can see this</h3>' + visRows +
              '<p class="small muted" style="margin-top:12px">Hidden details never leave the server. They are not filtered out on the screen.</p>' +
              '<a class="arrow-link" href="#/privacy" style="margin-top:12px">Change visibility' + icon('arrow', 13) + '</a>' +
            '</div>' +
            '<div class="rail-card">' +
              '<h3>On this record</h3>' +
              '<div class="vis-row"><span>Added</span><b>12 January 2024</b></div>' +
              '<div class="vis-row"><span>Last changed</span><b>2 hours ago</b></div>' +
              '<div class="vis-row"><span>Record ID</span><b class="tabular">' + esc(id.toUpperCase()) + '</b></div>' +
            '</div>' +
            '<div class="rail-card">' +
              '<h3>Actions</h3>' +
              '<div class="stack-2">' +
                '<a class="btn btn-primary btn-block" href="#/tree/' + id + '">' + icon('tree', 16) + 'Open in the tree</a>' +
                '<button class="btn btn-soft btn-block" data-act="suggest">' + icon('pencil', 15) + 'Suggest a change</button>' +
                '<button class="btn btn-ghost btn-block" data-act="more">' + icon('dots', 16) + 'More options</button>' +
              '</div>' +
            '</div>' +
          '</aside>' +
        '</div>' +
        '<div class="phone-bar">' +
          '<a class="btn btn-soft btn-block" href="#/tree/' + id + '">Open in the tree</a>' +
          '<button class="btn btn-primary btn-block" data-act="suggest">Suggest a change</button>' +
        '</div>' +
      '</main>';
    },
    mount: function (root, params) {
      root.querySelectorAll('[data-act="suggest"]').forEach(function (b) {
        b.addEventListener('click', function () {
          window.FH.app.toast('In the live site this opens a short form. Your change would go to Abdalla for approval.');
        });
      });
      var more = root.querySelector('[data-act="more"]');
      if (more) more.addEventListener('click', function () {
        window.FH.app.dialog({
          title: 'More options',
          body: '<p>Soft delete keeps the record and its history, and hides the person from the tree. Only the owner can do this.</p>',
          actions: [{ label: 'Cancel', kind: 'ghost' }, { label: 'Remove from tree', kind: 'danger', onClick: function () { window.FH.app.toast('Prototype: nothing was removed.'); } }]
        });
      });
    }
  };

  // =========================================================
  // Directory
  // =========================================================
  var people = {
    title: 'People',
    state: { q: '', branch: 'All', status: 'All', gen: 'All' },
    render: function () {
      var s = people.state;
      return '<main id="main" class="wrap">' +
        '<div class="page-head">' +
          '<p class="eyebrow">Directory</p>' +
          '<h1 class="page-title">People</h1>' +
          '<p class="lede">Everyone in the family, in one list. Search by name, branch, county or what they do.</p>' +
        '</div>' +
        '<div class="dir-controls">' +
          '<div class="search">' + icon('search', 18) +
            '<input class="input" id="dir-q" type="search" placeholder="Search a name, a place or a school" value="' + esc(s.q) + '" aria-label="Search people">' +
          '</div>' +
          '<div class="dir-filters">' +
            '<div class="seg" role="group" aria-label="Branch">' +
              ['All', 'Bungoma', 'Nairobi', 'Mombasa'].map(function (b) {
                return '<button type="button" data-branch="' + b + '" aria-pressed="' + (s.branch === b) + '">' + b + '</button>';
              }).join('') +
            '</div>' +
            '<select class="select" id="dir-status" aria-label="Status">' +
              ['All', 'Student', 'Employed', 'Self-employed', 'Retired'].map(function (v) {
                return '<option value="' + v + '"' + (s.status === v ? ' selected' : '') + '>' + (v === 'All' ? 'Any status' : v) + '</option>';
              }).join('') +
            '</select>' +
            '<select class="select" id="dir-gen" aria-label="Generation">' +
              ['All', '1', '2', '3', '4'].map(function (v) {
                return '<option value="' + v + '"' + (s.gen === v ? ' selected' : '') + '>' + (v === 'All' ? 'Any generation' : v + (v === '1' ? 'st' : v === '2' ? 'nd' : v === '3' ? 'rd' : 'th') + ' generation') + '</option>';
              }).join('') +
            '</select>' +
            '<button class="btn btn-ghost btn-sm" data-act="clear" hidden>Clear filters</button>' +
          '</div>' +
        '</div>' +
        '<div id="dir-results"></div>' +
      '</main>';
    },
    mount: function (root) {
      var self = people;
      var qEl = root.querySelector('#dir-q');
      var results = root.querySelector('#dir-results');
      var clearBtn = root.querySelector('[data-act="clear"]');

      function genOf(id) {
        var g = {};
        D.people.forEach(function (p) { g[p.id] = 0; });
        for (var i = 0; i < 6; i++) {
          D.relationships.forEach(function (r) {
            if (r.type !== 'parent') return;
            if (g[r.b] < g[r.a] + 1) g[r.b] = g[r.a] + 1;
          });
        }
        return g[id];
      }

      function draw() {
        var s = self.state;
        var list = D.people.filter(function (p) {
          if (s.branch !== 'All' && p.branch !== s.branch) return false;
          if (s.status !== 'All' && p.status !== s.status.toLowerCase().replace(' ', '-')) return false;
          if (s.gen !== 'All' && String(genOf(p.id) + 1) !== s.gen) return false;
          if (s.q) {
            var hay = (p.name + ' ' + p.pref + ' ' + p.branch + ' ' + p.county + ' ' + p.statusDetail).toLowerCase();
            if (hay.indexOf(s.q.toLowerCase()) === -1) return false;
          }
          return true;
        });

        clearBtn.hidden = !(s.q || s.branch !== 'All' || s.status !== 'All' || s.gen !== 'All');

        if (!list.length) {
          results.innerHTML = '<div class="empty" style="margin-top:32px"><strong>No one matches that.</strong>' +
            '<p class="small">Try a shorter search, or clear the filters.</p>' +
            '<button class="btn btn-soft btn-sm mt-6" data-act="clear2">Clear filters</button></div>';
          var c2 = results.querySelector('[data-act="clear2"]');
          if (c2) c2.addEventListener('click', function () {
            self.state = { q: '', branch: 'All', status: 'All', gen: 'All' };
            qEl.value = '';
            root.querySelectorAll('[data-branch]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.branch === 'All')); });
            root.querySelector('#dir-status').value = 'All';
            root.querySelector('#dir-gen').value = 'All';
            draw();
          });
          return;
        }

        results.innerHTML = '<div class="result-line"><span>' + list.length + (list.length === 1 ? ' person' : ' people') + '</span>' +
          '<span>Showing ' + list.length + ' of ' + D.people.length + '</span></div>' +
          '<div class="people-list">' + list.map(function (p) {
            var rel = p.id === 'p03' ? 'You' : D.relationLabel('p03', p.id);
            return '<a class="person-row" href="#/person/' + p.id + '">' +
              mono(p.id, 44) +
              '<span class="person-main"><span class="person-name">' + esc(p.name) + '</span>' +
              (rel ? '<span class="person-rel">' + esc(rel) + '</span>' : '') + '</span>' +
              '<span class="person-meta">' +
                '<span><i class="branch-dot ' + D.branchClass(p.branch) + '" style="display:inline-block;margin-right:6px"></i>' + esc(p.county) + '</span>' +
                '<span>' + esc(p.dod ? 'In memory' : (D.age(p) + ' years')) + '</span>' +
                '<span class="chip chip-quiet">' + esc({ student: 'Student', employed: 'Employed', 'self-employed': 'Self-employed', retired: 'Retired' }[p.status] || p.status) + '</span>' +
              '</span>' +
              '<span class="muted">' + icon('chevronRight', 16) + '</span>' +
            '</a>';
          }).join('') + '</div>';
      }

      qEl.addEventListener('input', function () { self.state.q = qEl.value.trim(); draw(); });
      root.querySelectorAll('[data-branch]').forEach(function (b) {
        b.addEventListener('click', function () {
          self.state.branch = b.dataset.branch;
          root.querySelectorAll('[data-branch]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          draw();
        });
      });
      root.querySelector('#dir-status').addEventListener('change', function (e) { self.state.status = e.target.value; draw(); });
      root.querySelector('#dir-gen').addEventListener('change', function (e) { self.state.gen = e.target.value; draw(); });
      clearBtn.addEventListener('click', function () {
        self.state = { q: '', branch: 'All', status: 'All', gen: 'All' };
        qEl.value = '';
        root.querySelectorAll('[data-branch]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.branch === 'All')); });
        root.querySelector('#dir-status').value = 'All';
        root.querySelector('#dir-gen').value = 'All';
        draw();
      });

      draw();
    }
  };

  // =========================================================
  // Admin
  // =========================================================
  var admin = {
    title: 'Owner dashboard',
    render: function () {
      var pending = D.requests.filter(function (r) { return r.status === 'pending'; });
      var openInvites = D.invites.filter(function (i) { return i.status === 'pending'; });
      var openCorr = D.corrections.filter(function (c) { return c.status === 'open'; });

      return '<main id="main" class="wrap">' +
        '<div class="page-head">' +
          '<p class="eyebrow">Owner</p>' +
          '<h1 class="page-title">Owner dashboard</h1>' +
          '<p class="lede">You are the only person who can approve changes, invite relatives and change what the family can see.</p>' +
        '</div>' +

        '<div class="stats" style="margin-top:32px">' +
          '<a class="stat" href="#/people"><span class="stat-num tabular">' + D.people.length + '</span><span class="stat-label">People in the family</span></a>' +
          '<a class="stat ' + (pending.length ? 'is-alert' : '') + '" href="#pending"><span class="stat-num tabular">' + pending.length + '</span><span class="stat-label">Waiting for you</span></a>' +
          '<a class="stat" href="#invites"><span class="stat-num tabular">' + openInvites.length + '</span><span class="stat-label">Open invites</span></a>' +
          '<a class="stat" href="#corrections"><span class="stat-num tabular">' + openCorr.length + '</span><span class="stat-label">Correction requests</span></a>' +
        '</div>' +

        '<section class="section" id="pending">' +
          '<div class="section-head"><h2>Waiting for your approval</h2><span class="small">Editor changes go live only when you approve them</span></div>' +
          (pending.length ? pending.map(function (r) {
            var person = D.byId(r.personId);
            return '<div class="req-row">' + mono(r.personId, 44) +
              '<div class="req-body">' +
                '<div class="req-title"><span class="who-a">' + esc(person.name) + '</span> · ' + esc(r.fieldLabel.toLowerCase()) + '</div>' +
                '<div class="req-meta">Suggested by ' + esc(D.fullName(r.authorId)) + ' · ' + esc(D.relTime(r.createdAt)) + '</div>' +
                '<div class="req-diff"><span class="before">' + esc(r.before) + '</span>' + icon('arrow', 13) + '<span class="after">' + esc(r.after) + '</span></div>' +
              '</div>' +
              '<a class="btn btn-soft btn-sm" href="#/admin/requests/' + r.id + '">Review</a>' +
            '</div>';
          }).join('') : '<div class="empty"><strong>Nothing is waiting.</strong><p class="small">When an editor suggests a change you will see it here, with what it said before and after.</p></div>') +
        '</section>' +

        '<section class="section" id="invites">' +
          '<div class="section-head"><h2>Open invites</h2><a class="arrow-link" href="#/invite">Invite a relative' + icon('arrow', 13) + '</a></div>' +
          (openInvites.length ? '<table class="tbl"><thead><tr><th>Email</th><th>Role</th><th>Branch</th><th>Expires</th><th></th></tr></thead><tbody>' +
            openInvites.map(function (i) {
              var soon = new Date(i.expiresAt) - D.TODAY < 36 * 3600 * 1000;
              return '<tr><td>' + esc(i.email) + '</td><td>' + esc(i.role) + '</td><td>' + (i.branch ? esc(i.branch) : '—') + '</td>' +
                '<td' + (soon ? ' style="color:var(--accent-ink);font-weight:500"' : '') + '>' + esc(i.expiresAt.slice(8, 10) + ' Nov') + (soon ? ' · soon' : '') + '</td>' +
                '<td><button class="btn btn-ghost btn-sm" data-act="copy" data-email="' + esc(i.email) + '">Copy link</button></td></tr>';
            }).join('') + '</tbody></table>' : '<div class="empty"><strong>No invites open.</strong></div>') +
        '</section>' +

        '<section class="section" id="corrections">' +
          '<div class="section-head"><h2>Correction requests</h2><span class="small">Anyone can ask for their details to be corrected or removed</span></div>' +
          (openCorr.length ? openCorr.map(function (c) {
            return '<div class="req-row">' + mono(c.personId, 44) +
              '<div class="req-body"><div class="req-title"><span class="who-a">' + esc(D.fullName(c.personId)) + '</span></div>' +
              '<div class="req-meta">' + esc(D.relTime(c.createdAt)) + ' · still open</div>' +
              '<p class="quote" style="margin-top:10px">' + esc(c.text) + '</p></div>' +
              '<button class="btn btn-soft btn-sm" data-act="resolve" data-id="' + c.id + '">Mark resolved</button></div>';
          }).join('') : '<div class="empty"><strong>Nothing to resolve.</strong></div>') +
        '</section>' +

        '<section class="section">' +
          '<div class="section-head"><h2>Recent activity</h2><span class="small">Every change is recorded, and the log cannot be edited</span></div>' +
          '<div>' + D.activity.slice(0, 6).map(function (a) {
            return '<div class="act-row">' + mono(a.actorId, 34) +
              '<div class="act-text"><strong style="font-weight:600">' + esc(D.first(a.actorId)) + '</strong> ' + esc(a.text) + '</div>' +
              '<div class="act-time">' + esc(D.relTime(a.at)) + '</div></div>';
          }).join('') + '</div>' +
        '</section>' +

        '<section class="section">' +
          '<div class="section-head"><h2>Your data</h2></div>' +
          '<div class="panel flex-between">' +
            '<div><p style="font-weight:600;margin-bottom:2px">Download a full copy</p>' +
            '<p class="small muted" style="margin:0">Everything the family has recorded, without anyone’s sign-in details.</p></div>' +
            '<div class="btn-row">' +
              '<button class="btn btn-soft btn-sm" data-act="export" data-fmt="JSON">JSON</button>' +
              '<button class="btn btn-soft btn-sm" data-act="export" data-fmt="CSV">CSV</button>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</main>';
    },
    mount: function (root) {
      root.querySelectorAll('[data-act="copy"]').forEach(function (b) {
        b.addEventListener('click', function () {
          window.FH.app.toast('Invite link copied for ' + b.dataset.email + '.');
        });
      });
      root.querySelectorAll('[data-act="export"]').forEach(function (b) {
        b.addEventListener('click', function () {
          window.FH.app.toast('Preparing a ' + b.dataset.fmt + ' copy. In the live site the file downloads straight away.');
        });
      });
      root.querySelectorAll('[data-act="resolve"]').forEach(function (b) {
        b.addEventListener('click', function () {
          var c = D.corrections.find(function (x) { return x.id === b.dataset.id; });
          if (c) c.status = 'resolved';
          window.FH.app.toast('Marked resolved. The person who asked will be told.');
          window.FH.app.rerender();
        });
      });
    }
  };

  // =========================================================
  // Request detail
  // =========================================================
  var request = {
    title: 'Review a change',
    render: function (params) {
      var r = D.requests.find(function (x) { return x.id === params.id; });
      if (!r || r.status !== 'pending') {
        return '<main id="main" class="wrap wrap-mid"><div class="section"><div class="empty"><strong>This request has been dealt with.</strong>' +
          '<p class="small">It is no longer in the queue.</p><a class="btn btn-soft btn-sm mt-6" href="#/admin">Back to the dashboard</a></div></div></main>';
      }
      var person = D.byId(r.personId);
      var membersSee = D.reach(D.visibilityOf(r.personId, r.field === 'statusDetail' ? 'status' : r.field));

      return '<main id="main" class="wrap wrap-mid">' +
        '<div class="section" style="padding-top:28px">' +
          '<a class="arrow-link" href="#/admin" style="border:0;margin-bottom:20px">' + icon('arrowLeft', 14) + 'Back to the dashboard</a>' +
          '<p class="eyebrow">Change request · ' + esc(D.relTime(r.createdAt)) + '</p>' +
          '<h1 class="page-title">' + esc(person.name) + '’s ' + esc(r.fieldLabel.toLowerCase()) + '</h1>' +
          '<p class="lede" style="margin-top:10px">Suggested by ' + esc(D.fullName(r.authorId)) + ', editor for the ' + esc(D.byId(r.authorId).branch) + ' branch.</p>' +

          '<div class="diff mt-8">' +
            '<div class="diff-col"><div class="diff-label">Now</div><div class="diff-val muted">' + esc(r.before) + '</div>' +
              '<div class="diff-sub">Visible to ' + membersSee + ' people</div></div>' +
            '<div class="diff-col proposed"><div class="diff-label">Proposed</div><div class="diff-val">' + esc(r.after) + '</div>' +
              '<div class="diff-sub">Visible to ' + membersSee + ' people once approved</div></div>' +
          '</div>' +

          '<div class="mt-8"><div class="rel-label">Why</div>' +
            '<p class="quote">' + esc(r.reason) + '</p></div>' +

          '<div class="mt-8 warn">' + icon('info', 16) +
            '<span>Approving publishes this at once to everyone allowed to see it. It is recorded in the activity log under your name.</span></div>' +

          '<div class="btn-row mt-8">' +
            '<button class="btn btn-primary" data-act="approve">Approve and publish</button>' +
            '<button class="btn btn-soft" data-act="reject">Reject</button>' +
          '</div>' +
        '</div>' +
      '</main>';
    },
    mount: function (root, params) {
      var r = D.requests.find(function (x) { return x.id === params.id; });
      if (!r) return;
      root.querySelector('[data-act="approve"]').addEventListener('click', function () {
        r.status = 'approved';
        var person = D.byId(r.personId);
        if (r.field === 'statusDetail') person.statusDetail = r.after;
        D.activity.unshift({ id: 'a' + Date.now(), actorId: 'p03', text: 'approved a change to ' + person.name + '’s ' + r.fieldLabel.toLowerCase(), at: '2026-11-13T09:00:00+03:00' });
        window.FH.app.toast('Approved. ' + person.name + '’s record is updated.');
        location.hash = '#/admin';
      });
      root.querySelector('[data-act="reject"]').addEventListener('click', function () {
        window.FH.app.dialog({
          title: 'Why are you rejecting this?',
          body: '<div class="field"><label for="rj">Reason (the editor will see this)</label>' +
            '<textarea class="textarea" id="rj" placeholder="For example: the school has not changed yet."></textarea>' +
            '<p class="err" id="rj-err" hidden>Please write a short reason.</p></div>',
          actions: [{ label: 'Cancel', kind: 'ghost' }, {
            label: 'Reject', kind: 'danger', onClick: function (dlg) {
              var v = dlg.querySelector('#rj').value.trim();
              if (!v) { dlg.querySelector('#rj-err').hidden = false; dlg.querySelector('#rj').focus(); return false; }
              r.status = 'rejected';
              r.reason = v;
              window.FH.app.toast('Rejected. The editor has been told why.');
              location.hash = '#/admin';
              return true;
            }
          }]
        });
      });
    }
  };

  // =========================================================
  // Privacy
  // =========================================================
  var privacy = {
    title: 'Privacy',
    open: {},
    render: function () {
      var levels = [
        { k: 'owner', t: 'Owner only', d: 'Only you. Nobody else, on any screen.', c: 'var(--forest)' },
        { k: 'branch', t: 'Branch', d: 'Relatives in the same branch as this person.', c: 'var(--b3)' },
        { k: 'members', t: 'Members', d: 'Everyone you have invited, and nobody else.', c: 'var(--b2)' },
        { k: 'public', t: 'Public', d: 'Anyone with the link, including search engines.', c: 'var(--rule)' }
      ];

      return '<main id="main" class="wrap">' +
        '<div class="page-head"><p class="eyebrow">Privacy and control</p>' +
          '<h1 class="page-title">You decide what is shown.</h1>' +
          '<p class="lede">Person by person, and field by field. Rules are enforced in the database, not only on the screen — a hidden detail never reaches the browser at all.</p></div>' +

        '<section class="section">' +
          '<div class="section-head"><h2>The four levels</h2></div>' +
          '<div class="legend-grid">' + levels.map(function (l) {
            return '<div class="legend-item"><strong>' + esc(l.t) + '</strong><span>' + esc(l.d) + '</span></div>';
          }).join('') + '</div>' +
        '</section>' +

        '<section class="section">' +
          '<div class="section-head"><h2>Family defaults</h2><span class="small">Every new person starts here</span></div>' +
          '<div style="max-width:620px">' + D.FIELDS.map(function (f) {
            return '<div class="vis-row" style="padding:12px 0"><span style="font-size:14.5px">' + esc(D.FIELD_LABEL[f]) + '</span>' +
              '<span class="mini-seg" role="group" aria-label="' + esc(D.FIELD_LABEL[f]) + '">' +
              D.LEVEL_ORDER.map(function (l) {
                return '<button type="button" data-def="' + f + '" data-lvl="' + l + '" aria-pressed="' + (D.familyDefaults[f] === l) + '">' + esc(D.LEVEL_LABEL[l]) + '</button>';
              }).join('') + '</span></div>';
          }).join('') + '</div>' +
        '</section>' +

        '<section class="section">' +
          '<div class="section-head"><h2>People</h2><span class="small">Open a row to change one person</span></div>' +
          '<div class="pkg-scroll"><table class="priv-table"><thead><tr><th>Person</th><th>Date of birth</th><th>Contact</th><th>Status</th><th>Location</th><th></th></tr></thead><tbody>' +
          D.people.map(function (p) {
            var isOpen = !!privacy.open[p.id];
            var limited = D.isMinor(p);
            var row = '<tr class="' + (isOpen ? 'is-open' : '') + '">' +
              '<td><button class="link link-plain" data-open="' + p.id + '" style="display:flex;align-items:center;gap:10px;background:none;border:0;padding:0;cursor:pointer;text-align:left">' +
                mono(p.id, 22) + '<span>' + esc(p.name) + '</span>' +
                (limited ? '<span class="chip chip-sm chip-accent">Minor</span>' : '') + '</button></td>' +
              ['dob', 'contact', 'status', 'location'].map(function (f) {
                return '<td><span class="chip chip-sm chip-line">' + esc(D.LEVEL_LABEL[D.visibilityOf(p.id, f)]) + '</span></td>';
              }).join('') +
              '<td><button class="btn btn-ghost btn-sm" data-open="' + p.id + '">' + (isOpen ? 'Close' : 'Change') + '</button></td></tr>';

            if (!isOpen) return row;

            var detail = '<tr class="is-open"><td colspan="6" style="padding:16px 0 22px">' +
              '<div style="display:grid;gap:10px;max-width:640px">' +
              D.FIELDS.map(function (f) {
                return '<div class="vis-row"><span style="font-size:14px">' + esc(D.FIELD_LABEL[f]) + '</span>' +
                  '<span class="mini-seg" role="group" aria-label="' + esc(D.FIELD_LABEL[f]) + '">' +
                  D.LEVEL_ORDER.map(function (l) {
                    return '<button type="button" data-pid="' + p.id + '" data-field="' + f + '" data-lvl="' + l + '" aria-pressed="' + (D.visibilityOf(p.id, f) === l) + '">' + esc(D.LEVEL_LABEL[l]) + '</button>';
                  }).join('') + '</span></div>';
              }).join('') +
              (!D.consentFor(p.id) && limited ? '<div class="warn">' + icon('alert', 16) + '<span>No consent is recorded for this person. Details stay hidden from everyone but you until a parent or guardian agrees.</span></div>' : '') +
              '</div></td></tr>';
            return row + detail;
          }).join('') +
          '</tbody></table></div>' +
        '</section>' +

        '<section class="section">' +
          '<div class="section-head"><h2>Minors and consent</h2><span class="small">Children get extra care</span></div>' +
          ['p16', 'p17', 'p18'].map(function (id) {
            var c = D.consentFor(id);
            return '<div class="consent-row">' + mono(id, 44) +
              '<div class="consent-body"><div style="font-size:15px;font-weight:600">' + esc(D.fullName(id)) + ' · ' + D.age(D.byId(id)) + ' years</div>' +
              '<div class="small ' + (c ? 'muted' : '') + '" style="margin-top:2px">' +
                (c ? 'Consent recorded. Given by ' + esc(D.fullName(c.givenBy)) + ' on ' + esc(D.shortDate(c.givenAt)) + ', covering ' + esc(c.scope.toLowerCase()) + '.'
                   : '<span style="color:var(--accent-ink);font-weight:500">No consent recorded.</span> Photo, contact and location stay hidden.') +
              '</div></div>' +
              (c ? '<span class="chip chip-ok">' + icon('check', 11) + 'Recorded</span>'
                 : '<button class="btn btn-soft btn-sm" data-consent="' + id + '">Record consent</button>') +
            '</div>';
          }).join('') +
        '</section>' +
      '</main>';
    },
    mount: function (root) {
      root.querySelectorAll('[data-open]').forEach(function (b) {
        b.addEventListener('click', function () {
          var id = b.dataset.open;
          privacy.open[id] = !privacy.open[id];
          window.FH.app.rerender();
        });
      });
      root.querySelectorAll('[data-def]').forEach(function (b) {
        b.addEventListener('click', function () {
          D.familyDefaults[b.dataset.def] = b.dataset.lvl;
          window.FH.app.toast(D.FIELD_LABEL[b.dataset.def] + ' is now ' + D.LEVEL_LABEL[b.dataset.lvl].toLowerCase() + ' for new people.');
          window.FH.app.rerender();
        });
      });
      root.querySelectorAll('[data-field]').forEach(function (b) {
        b.addEventListener('click', function () {
          var pid = b.dataset.pid, f = b.dataset.field, lvl = b.dataset.lvl;
          if (!D.consentFor(pid) && D.isMinor(D.byId(pid)) && lvl !== 'owner') {
            window.FH.app.dialog({
              title: 'Consent is needed first',
              body: '<p>' + esc(D.fullName(pid)) + ' is under 18. Record who agreed before making this detail visible to anyone else.</p>',
              actions: [{ label: 'Not now', kind: 'ghost' }, { label: 'Record consent', kind: 'primary', onClick: function () {
                openConsent(pid); return true;
              } }]
            });
            return;
          }
          D.visibility[pid][f] = lvl;
          window.FH.app.toast(D.FIELD_LABEL[f] + ' for ' + D.first(pid) + ' is now ' + D.LEVEL_LABEL[lvl].toLowerCase() + '.');
          window.FH.app.rerender();
        });
      });
      root.querySelectorAll('[data-consent]').forEach(function (b) {
        b.addEventListener('click', function () { openConsent(b.dataset.consent); });
      });

      function openConsent(id) {
        window.FH.app.dialog({
          title: 'Record consent',
          body: '<p style="margin-bottom:16px">For ' + esc(D.fullName(id)) + ', aged ' + D.age(D.byId(id)) + '.</p>' +
            '<div class="field"><label for="cg">Who gave consent</label><select class="select" id="cg">' +
            ['p05 Wycliffe Baraza', 'p10 Zainabu Baraza', 'p06 Naomi Baraza'].map(function (x) {
              var pid = x.slice(0, 3);
              return '<option value="' + pid + '"' + (D.parentsOf(id).some(function (pp) { return pp.id === pid; }) ? ' selected' : '') + '>' + esc(D.fullName(pid)) + '</option>';
            }).join('') + '</select></div>' +
            '<div class="field"><label for="cs">What it covers</label><input class="input" id="cs" value="Photo and school"></div>' +
            '<p class="hint" style="margin-top:12px">Recorded with today’s date. Withdrawing consent hides the data at once.</p>',
          actions: [{ label: 'Cancel', kind: 'ghost' }, { label: 'Save consent', kind: 'primary', onClick: function (dlg) {
            D.consents.push({ id: 'c' + Date.now(), personId: id, givenBy: dlg.querySelector('#cg').value, scope: dlg.querySelector('#cs').value, givenAt: '2026-11-13', withdrawnAt: null });
            window.FH.app.toast('Consent recorded for ' + D.fullName(id) + '.');
            window.FH.app.rerender();
            return true;
          } }]
        });
      }
    }
  };

  // =========================================================
  // Invite
  // =========================================================
  var invite = {
    title: 'Invite a relative',
    done: null,
    render: function () {
      if (invite.done) {
        return '<main id="main" class="wrap"><div class="invite-wrap"><div class="invite-card">' +
          '<div class="empty" style="text-align:left;padding:28px"><strong style="font-size:22px">Invite sent.</strong>' +
            '<p class="small" style="margin-top:8px">' + esc(invite.done.email) + ' will get an email with a link. The link works once and expires in seven days.</p>' +
            '<div class="vis-row" style="margin-top:16px"><span>Role</span><b>' + esc(invite.done.role) + '</b></div>' +
            (invite.done.branch ? '<div class="vis-row"><span>Branch</span><b>' + esc(invite.done.branch) + '</b></div>' : '') +
            '<div class="btn-row mt-6"><button class="btn btn-primary btn-sm" data-act="again">Send another</button>' +
            '<a class="btn btn-ghost btn-sm" href="#/admin">Back to the dashboard</a></div>' +
          '</div></div></div></main>';
      }
      return '<main id="main" class="wrap"><div class="invite-wrap"><div class="invite-card">' +
        '<p class="eyebrow">Invite</p>' +
        '<h1 class="page-title">Invite a relative</h1>' +
        '<p class="lede" style="margin-top:10px">They will see only what their role allows, and only the details you have made visible.</p>' +
        '<div class="mt-8">' +
          '<div class="field"><label for="iv-email">Their email address</label>' +
            '<input class="input" id="iv-email" type="email" placeholder="name@example.com" autocomplete="off">' +
            '<p class="err" id="iv-err" hidden>Enter a complete email address, for example name@example.com</p></div>' +
          '<div class="field"><span class="field-label">What they can do</span>' +
            '<div class="role-grid">' +
              '<label class="radio-card"><input type="radio" name="role" value="Viewer" checked>' +
                '<span><strong>Viewer</strong><span>Browse the tree and profiles. Change nothing.</span></span></label>' +
              '<label class="radio-card"><input type="radio" name="role" value="Editor" id="iv-editor">' +
                '<span><strong>Editor</strong><span>Keep one branch up to date. Their changes come to you first.</span></span></label>' +
            '</div></div>' +
          '<div class="field" id="iv-branch-wrap" hidden><label for="iv-branch">Which branch</label>' +
            '<select class="select" id="iv-branch"><option>Bungoma</option><option>Nairobi</option><option>Mombasa</option></select>' +
            '<p class="hint">An editor can only change people in their own branch.</p></div>' +
          '<p class="hint" style="margin-top:16px">The link works once and expires after seven days.</p>' +
          '<div class="btn-row mt-6">' +
            '<button class="btn btn-primary" data-act="send">Send invite</button>' +
            '<a class="btn btn-ghost" href="#/admin">Cancel</a>' +
          '</div>' +
        '</div>' +
      '</div></div></main>';
    },
    mount: function (root) {
      if (invite.done) {
        var again = root.querySelector('[data-act="again"]');
        if (again) again.addEventListener('click', function () { invite.done = null; window.FH.app.rerender(); });
        return;
      }
      var email = root.querySelector('#iv-email');
      var err = root.querySelector('#iv-err');
      var wrap = root.querySelector('#iv-branch-wrap');
      root.querySelectorAll('input[name="role"]').forEach(function (r) {
        r.addEventListener('change', function () { wrap.hidden = r.value !== 'Editor' || !r.checked; });
      });
      var send = root.querySelector('[data-act="send"]');
      send.addEventListener('click', function () {
        var v = email.value.trim();
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        err.hidden = ok;
        if (!ok) { email.focus(); return; }
        var role = root.querySelector('input[name="role"]:checked').value;
        invite.done = { email: v, role: role, branch: role === 'Editor' ? root.querySelector('#iv-branch').value : null };
        D.invites.unshift({ id: 'i' + Date.now(), email: v, role: role, branch: invite.done.branch, sentAt: '2026-11-13T09:00:00+03:00', expiresAt: '2026-11-20T09:00:00+03:00', status: 'pending' });
        D.activity.unshift({ id: 'a' + Date.now(), actorId: 'p03', text: 'invited ' + v + ' as a ' + role.toLowerCase(), at: '2026-11-13T09:00:00+03:00' });
        window.FH.app.rerender();
      });
    }
  };

  // =========================================================
  // The Pack
  // =========================================================
  var pack = {
    title: 'The Project Pack',
    pkg: 'Standard',
    render: function () {
      var sections = [
        ['idea', 'The idea'], ['family', 'A family is not a tree'], ['able', 'What you can do'],
        ['relatives', 'What relatives see'], ['packages', 'What each package gives you'],
        ['howtree', 'How the tree works'], ['privacy', 'Privacy and control'],
        ['not-v1', 'Not in version 1'], ['work', 'How we work together'],
        ['your-part', 'What we need from you'], ['done', 'How we know it is finished'], ['next', 'Next steps']
      ];

      var features = [
        'Interactive family tree with expand, collapse and focus',
        'Person profiles with photo, bio, relationships and status',
        'Works on phones first',
        'Owner admin dashboard',
        'Invite-only login',
        'Privacy controls',
        'Searchable directory with filters',
        'Editor role with approval',
        'Education and work history',
        'Photo gallery per person',
        'Activity log of who changed what',
        '3D explore mode with 2D fallback',
        'Bulk import from a spreadsheet',
        'Second language, for example Swahili',
        'Priority support in the launch month'
      ];
      var matrix = [
        ['yes', 'yes', 'yes'], ['yes', 'yes', 'yes'], ['yes', 'yes', 'yes'], ['yes', 'yes', 'yes'], ['yes', 'yes', 'yes'],
        ['Site-level', 'Per person', 'Per person'], ['no', 'yes', 'yes'], ['no', 'yes', 'yes'], ['Current only', 'yes', 'yes'],
        ['One photo', 'yes', 'yes'], ['no', 'yes', 'yes'], ['no', 'no', 'yes'], ['no', 'no', 'yes'], ['no', 'no', 'yes'], ['no', 'no', 'yes']
      ];
      var cell = function (v) {
        if (v === 'yes') return '<td class="yes">' + icon('check', 17) + '</td>';
        if (v === 'no') return '<td class="no">—</td>';
        return '<td style="font-size:12.5px;color:var(--ink-2)">' + esc(v) + '</td>';
      };

      var summaries = {
        Essential: 'Essential is the clear version: a tree, profiles and your control of who joins. Right for one family that you look after yourself.',
        Standard: 'Standard is recommended for a family where several relatives help maintain the records. Editors work on their own branch and you approve every change.',
        Premium: 'Premium adds the showcase layer: a 3D explore mode, bulk import from a spreadsheet, a second language and priority support in the launch month.'
      };

      var need = [
        'Your answers to the questionnaire',
        'The site name, and any colours or family crest',
        'The family information: names, relationships, dates, status',
        'Photos you are happy to share, and a guardian’s agreement for anyone under 18',
        'Who your editors will be',
        'Quick replies when we ask for an approval'
      ];

      var ready = window.FH.app ? window.FH.app.getChecklist() : {};

      return '<main id="main" class="wrap">' +
        '<div class="pack-layout">' +
          '<nav class="pack-index" aria-label="Contents"><ol>' +
            sections.map(function (s, i) {
              return '<li><a href="#/pack" data-jump="' + s[0] + '">' + (i + 1) + '. ' + esc(s[1]) + '</a></li>';
            }).join('') +
          '</ol></nav>' +

          '<div class="pack-body">' +
            '<section class="pack-cover" id="pack-top">' +
              '<p class="eyebrow">The Project Pack · client edition · draft v1</p>' +
              '<h1>Your project, in plain words.</h1>' +
              '<p class="lede">Prepared for the family by Apex Webs, Mombasa. This is the same document you were given, set to be read on a phone — with the family platform running underneath it, so you can see what each page means.</p>' +
              '<div class="meta"><span>13 November 2026</span><span>21 sample people</span><span>Three packages</span></div>' +
            '</section>' +

            '<section id="idea"><h2>The idea in one paragraph</h2>' +
              '<p>A private website where your whole family lives in one place: who is who, how everyone is related, and what each person is doing today, from school to work. Relatives open it on their phones, tap through the family tree and find anyone in seconds. You stay in charge of who sees what.</p>' +
            '</section>' +

            '<section id="family"><h2>A family is not a tree</h2>' +
              '<p>Real families include remarriages, half-siblings, adoptions, step-parents and relatives by marriage. A simple parent-and-child structure breaks the moment one of these appears. So we record each person once, and each relationship separately.</p>' +
              '<div class="diagram">' +
                '<svg viewBox="0 0 640 300" role="img" aria-label="A small family graph showing one person with two partners, children from each union, and one adopted child">' +
                  '<g stroke="var(--rule)" stroke-width="1.5" fill="none">' +
                    '<path d="M120 92 C120 130 120 130 120 150" />' +
                    '<path d="M180 92 C180 130 180 130 180 150" />' +
                    '<path d="M120 150 H180" />' +
                    '<path d="M150 150 V186" />' +
                    '<path d="M150 186 H70 V214" />' +
                    '<path d="M150 186 H230 V214" />' +
                    '<path d="M320 92 C320 130 320 130 320 150" />' +
                    '<path d="M380 92 C380 130 380 130 380 150" />' +
                    '<path d="M320 150 H380" />' +
                    '<path d="M350 150 V186" />' +
                    '<path d="M350 186 H470 V214" stroke-dasharray="5 4" />' +
                  '</g>' +
                  '<g font-family="var(--font-sans)" font-size="12" fill="var(--ink)">' +
                    '<g><rect x="70" y="58" width="100" height="34" rx="6" fill="var(--card)" stroke="var(--forest)" stroke-width="1.5"/><text x="120" y="79" text-anchor="middle">Abdalla</text></g>' +
                    '<g><rect x="200" y="58" width="100" height="34" rx="6" fill="var(--card)" stroke="var(--rule)"/><text x="250" y="79" text-anchor="middle">Maryam</text></g>' +
                    '<g><rect x="300" y="12" width="100" height="34" rx="6" fill="var(--card)" stroke="var(--rule)"/><text x="350" y="33" text-anchor="middle">Grace</text></g>' +
                    '<g><rect x="20" y="214" width="100" height="34" rx="6" fill="var(--card)" stroke="var(--rule)"/><text x="70" y="235" text-anchor="middle">Yusuf</text></g>' +
                    '<g><rect x="180" y="214" width="100" height="34" rx="6" fill="var(--card)" stroke="var(--rule)"/><text x="230" y="235" text-anchor="middle">Amina</text></g>' +
                    '<g><rect x="470" y="214" width="100" height="34" rx="6" fill="var(--card)" stroke="var(--rule)" stroke-dasharray="4 3"/><text x="520" y="235" text-anchor="middle" fill="var(--muted)">Bilal</text></g>' +
                  '</g>' +
                  '<g font-family="var(--font-sans)" font-size="10.5" fill="var(--muted)">' +
                    '<text x="150" y="176" text-anchor="middle">married 1988</text>' +
                    '<text x="235" y="52" text-anchor="middle">married 2003</text>' +
                    '<text x="470" y="256" text-anchor="middle">half-brother · adopted into the family record once</text>' +
                  '</g>' +
                '</svg>' +
                '<div class="diagram-key">' +
                  '<span><svg width="26" height="8"><line x1="0" y1="4" x2="26" y2="4" stroke="var(--forest)" stroke-width="1.5"/></svg>Marriage or partnership</span>' +
                  '<span><svg width="26" height="8"><line x1="0" y1="4" x2="26" y2="4" stroke="var(--rule)" stroke-width="1.5"/></svg>Parent and child</span>' +
                  '<span><svg width="26" height="8"><line x1="0" y1="4" x2="26" y2="4" stroke="var(--rule)" stroke-width="1.5" stroke-dasharray="4 3"/></svg>Adopted</span>' +
                '</div>' +
              '</div>' +
              '<p>Because of this, the tree can grow for generations without being rebuilt, and a half-brother is shown as a half-brother rather than quietly flattened into a brother.</p>' +
            '</section>' +

            '<section id="able"><h2>What you will be able to do</h2>' +
              '<div class="feature-grid">' +
                ['See the whole family as an interactive tree, and tap anyone to centre the tree on them|tree',
                 'Add a person in a few taps: name, photo, birthday, school or work, and how they are related|userPlus',
                 'Link people the way real families work: remarriages, half-siblings, adopted and step relatives|branch',
                 'Invite relatives by email and choose what each one can see|mail',
                 'Hide details such as phone numbers or birthdays, one person at a time|lock',
                 'Remember a loved one who has passed with a respectful memorial profile|memory'
                ].map(function (row) {
                  var parts = row.split('|');
                  return '<div class="feature"><span class="feature-ic">' + icon(parts[1], 21) + '</span>' +
                    '<div><strong>' + esc(parts[0].split(':')[0]) + '</strong><span>' + esc(parts[0]) + '</span></div></div>';
                }).join('') +
              '</div>' +
              '<p style="margin-top:24px">And whenever you like, you can <a class="link" href="#/admin">download a full copy of your family data</a>.</p>' +
            '</section>' +

            '<section id="relatives"><h2>What your relatives see</h2>' +
              '<div class="feature-grid">' +
                ['A clean family tree that fits their phone screen|tree',
                 'A profile for each person with photo, age, status and links to their relatives|people',
                 'Only what you have allowed, and nothing more|shield'
                ].map(function (row) {
                  var parts = row.split('|');
                  return '<div class="feature"><span class="feature-ic">' + icon(parts[1], 21) + '</span>' +
                    '<div><strong>' + esc(parts[0].split(' ').slice(0, 4).join(' ')) + '</strong><span>' + esc(parts[0]) + '</span></div></div>';
                }).join('') +
              '</div>' +
              '<p style="margin-top:24px"><a class="arrow-link" href="#/people">See the directory as a relative sees it' + icon('arrow', 13) + '</a></p>' +
            '</section>' +

            '<section id="packages"><h2>What each package gives you</h2>' +
              '<p>Choose a package to see what changes. Prices, dates and payment terms are in section 5 of your Project Pack, so they live in one place and never drift out of date here.</p>' +
              '<div class="pkg-wrap mt-6"><div class="pkg-scroll"><table class="pkg">' +
                '<thead><tr><th></th>' +
                  ['Essential', 'Standard', 'Premium'].map(function (name) {
                    return '<th aria-selected="' + (pack.pkg === name) + '"><button class="pkg-btn" data-pkg="' + name + '">' +
                      '<span class="n">' + name + '</span><span class="t">' + (name === 'Standard' ? 'Recommended' : name === 'Essential' ? 'Start simple' : 'Showcase') + '</span></button></th>';
                  }).join('') +
                '</tr></thead><tbody>' +
                features.map(function (f, i) {
                  return '<tr><td>' + esc(f) + '</td>' + matrix[i].map(cell).join('') + '</tr>';
                }).join('') +
                '</tbody></table></div>' +
                '<div class="pkg-summary">' + esc(summaries[pack.pkg]) + '</div>' +
                '<div class="pkg-note">Optional add-ons, quoted after the scope is agreed: family stories and events, a map of where relatives live, a printable tree poster, extra languages, SMS or WhatsApp notifications.</div>' +
              '</div>' +
            '</section>' +

            '<section id="howtree"><h2>How the tree works</h2>' +
              '<p>Families are not neat boxes. For a big family, the tree shows a few generations at a time and you tap to open more branches. The person you are looking at sits in the middle: their parents above, their children below, their partners and brothers and sisters beside them.</p>' +
              '<div class="diagram"><svg viewBox="0 0 640 240" role="img" aria-label="Three views of the tree: the whole family, one branch, and one person centred">' +
                '<g font-family="var(--font-sans)" font-size="11" fill="var(--muted)">' +
                  '<text x="0" y="14">1. Whole family</text><text x="220" y="14">2. One branch</text><text x="440" y="14">3. One person, centred</text>' +
                '</g>' +
                '<g stroke="var(--rule)" fill="none" stroke-width="1.2">' +
                  '<path d="M90 70 H140 M115 70 V96 M115 96 H80 V116 M115 96 H150 V116"/>' +
                  '<path d="M310 70 H360 M335 70 V96 M335 96 H300 V116 M335 96 H370 V116"/>' +
                  '<path d="M550 70 H600 M575 70 V96"/>' +
                '</g>' +
                '<g fill="var(--card)" stroke="var(--rule)" stroke-width="1.2">' +
                  '<rect x="40" y="46" width="100" height="24" rx="5"/><rect x="90" y="116" width="60" height="22" rx="5"/><rect x="120" y="116" width="60" height="22" rx="5"/>' +
                  '<rect x="260" y="46" width="100" height="24" rx="5"/><rect x="270" y="116" width="60" height="22" rx="5"/><rect x="340" y="116" width="60" height="22" rx="5"/>' +
                  '<rect x="500" y="46" width="100" height="24" rx="5"/>' +
                '</g>' +
                '<g fill="var(--card)" stroke="var(--forest)" stroke-width="2">' +
                  '<rect x="530" y="96" width="90" height="26" rx="6"/>' +
                  '<rect x="555" y="150" width="40" height="20" rx="5"/>' +
                '</g>' +
                '<g stroke="var(--rule)" fill="none" stroke-width="1.2"><path d="M575 122 V150"/></g>' +
              '</svg></div>' +
              '<p>On a phone the same idea holds. Nothing is shrunk until it is unreadable; the tree simply shows less at once, and moves when you tap.</p>' +
            '</section>' +

            '<section id="privacy"><h2>Privacy and control</h2>' +
              '<p>This platform holds personal information about real people, including children, so privacy is built in from the start.</p>' +
              '<div class="ladder">' +
                '<div class="ladder-row"><span class="ladder-bar" style="background:var(--forest)"></span><strong>Owner only</strong><span>Just you.</span></div>' +
                '<div class="ladder-row"><span class="ladder-bar" style="background:var(--b3)"></span><strong>Branch</strong><span>Relatives in the same branch.</span></div>' +
                '<div class="ladder-row"><span class="ladder-bar" style="background:var(--b2)"></span><strong>Members</strong><span>Everyone you have invited.</span></div>' +
                '<div class="ladder-row"><span class="ladder-bar" style="background:var(--rule)"></span><strong>Public</strong><span>Anyone with the link.</span></div>' +
              '</div>' +
              '<p>Private by default. Minors are shown with limited details and only with a parent or guardian’s consent. Any member can ask for their information to be corrected or removed, and you will see the request in your dashboard.</p>' +
              '<p>The platform is designed with Kenya’s Data Protection Act, 2019 in mind. Apex Webs is not a law firm, so we recommend you confirm with a legal adviser whether registration with the Office of the Data Protection Commissioner applies to you.</p>' +
              '<p style="margin-top:20px"><a class="arrow-link" href="#/privacy">Open the privacy controls' + icon('arrow', 13) + '</a></p>' +
            '</section>' +

            '<section id="not-v1"><h2>Not in version 1</h2>' +
              '<p>Online payments, public social features, importing records from outside genealogy services, and phone apps. The site works in your phone’s browser. Anything on the extras list needs your written approval and its own quote.</p>' +
            '</section>' +

            '<section id="work"><h2>How we will work together</h2>' +
              '<div class="phases">' +
                [['Discovery and scope', 'We agree exactly what is being built, the fields, and the privacy rules.', 'Gate 1 · Scope signed'],
                 ['Design', 'The style foundation and every screen, designed and approved one by one. This is the gate you are at now.', 'Gate 2 · Design approved'],
                 ['Build', 'Database, tree, profiles, dashboard and roles. You see working versions as we go.', 'Gate 3 · Build review'],
                 ['Data entry, testing and launch', 'We load your family, test on real phones, and go live.', 'Gate 4 · Launch approved'],
                 ['Handoff and support', 'Training, your files and accounts, and three months of free fixes.', 'Gate 5 · Handoff accepted']
                ].map(function (p, i) {
                  return '<div class="phase"><span class="phase-n">' + (i + 1) + '</span><div>' +
                    '<h4>' + esc(p[0]) + '</h4><p>' + esc(p[1]) + '</p><div class="gate">' + esc(p[2]) + '</div></div></div>';
                }).join('') +
              '</div>' +
            '</section>' +

            '<section id="your-part"><h2>What we need from you</h2>' +
              '<p>These are the only things that hold the dates. They stay ticked on this device so you can see what is left.</p>' +
              '<div class="mt-6" id="pack-need">' +
                need.map(function (n, i) {
                  var key = 'n' + i;
                  return '<label class="check"><input type="checkbox" data-need="' + key + '"' + (ready[key] ? ' checked' : '') + '><span>' + esc(n) + '</span></label>';
                }).join('') +
              '</div>' +
              '<p class="small muted" style="margin-top:16px" data-el="need-count"></p>' +
              '<div class="wa-block" style="max-width:520px;margin-top:20px">' +
                '<p>When you are ready, send this list and anything else on your mind straight to Apex on WhatsApp.</p>' +
                '<a class="btn btn-primary" data-act="send-pack">' + icon('mail', 16) + ' Send this on WhatsApp</a>' +
                '<p style="margin:10px 0 0;text-align:center">to <span class="wa-num">0711 410 442</span></p>' +
              '</div>' +
            '</section>' +

            '<section id="done"><h2>How we know it is finished</h2>' +
              '<p>You will be able to:</p>' +
              '<div class="mt-6">' +
                ['Open the site on your phone and find any relative in under a minute',
                 'Add a person and link them correctly without our help',
                 'Invite a relative and watch them log in with only the access you gave',
                 'Hide a detail and confirm a relative cannot see it',
                 'Download your data'
                ].map(function (t) {
                  return '<div class="vis-row" style="padding:12px 0;font-size:15px"><span>' + esc(t) + '</span><span style="color:var(--forest)">' + icon('check', 17) + '</span></div>';
                }).join('') +
              '</div>' +
              '<p style="margin-top:20px">Then we sign off the launch together.</p>' +
            '</section>' +

            '<section id="next"><h2>Next steps</h2>' +
              '<p>Review this prototype, then approve or note each screen. We confirm the package, the final price and the dates in writing, sign the scope together, and the build starts.</p>' +
              '<div class="btn-row mt-6">' +
                '<button class="btn btn-primary" data-act="open-demo">Open the design review</button>' +
                '<a class="btn btn-soft" href="#/tree/p03">Walk through the screens</a>' +
              '</div>' +
              '<p class="small muted" style="margin-top:32px;padding-top:20px;border-top:1px solid var(--rule)">Apex Webs, Mombasa. Draft v1, 13 November 2026. This prototype is a design proposal, not the finished product.</p>' +
            '</section>' +
          '</div>' +
        '</div>' +
      '</main>';
    },
    mount: function (root) {
      root.querySelectorAll('[data-pkg]').forEach(function (b) {
        b.addEventListener('click', function () {
          pack.pkg = b.dataset.pkg;
          window.FH.app.rerender();
        });
      });
      var btn = root.querySelector('[data-act="open-demo"]');
      if (btn) btn.addEventListener('click', function () { window.FH.app.openDrawer(); });

      var sendPack = root.querySelector('[data-act="send-pack"]');
      if (sendPack) sendPack.addEventListener('click', function () {
        var done = [], left = [];
        need.forEach(function (n, i) {
          (window.FH.app.getChecklist()['n' + i] ? done : left).push(n);
        });
        var lines = ['Hello Apex Webs — Baraza family, Project Pack checklist.', ''];
        if (done.length) { lines.push('Ready:'); done.forEach(function (n) { lines.push('- ' + n); }); lines.push(''); }
        if (left.length) { lines.push('Still needed:'); left.forEach(function (n) { lines.push('- ' + n); }); lines.push(''); }
        lines.push('(Sent from the design prototype.)');
        var url = window.FH.app.waLink(lines.join('\n'));
        var w = window.open(url, '_blank', 'noopener');
        if (!w) location.href = url;
      });

      root.querySelectorAll('[data-jump]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var el = root.querySelector('#' + a.dataset.jump);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      var inputs = root.querySelectorAll('[data-need]');
      function count() {
        var n = 0;
        inputs.forEach(function (i) { if (i.checked) n++; });
        var el = root.querySelector('[data-el="need-count"]');
        if (el) el.textContent = n + ' of ' + inputs.length + ' ready.';
      }
      inputs.forEach(function (i) {
        i.addEventListener('change', function () { window.FH.app.setChecklist(i.dataset.need, i.checked); count(); });
      });
      count();

      // scroll spy
      var links = root.querySelectorAll('.pack-index a');
      var targets = Array.prototype.map.call(links, function (a) { return root.querySelector('#' + a.dataset.jump); });
      function spy() {
        var best = -1;
        targets.forEach(function (t, i) {
          if (!t) return;
          if (t.getBoundingClientRect().top < 140) best = i;
        });
        links.forEach(function (l, i) { l.classList.toggle('active', i === best); });
      }
      window.addEventListener('scroll', spy, { passive: true });
      spy();
    }
  };

  window.FH = window.FH || {};
  window.FH.screens = {
    cover: cover, signin: signin, tree: tree, profile: profile, people: people,
    admin: admin, request: request, privacy: privacy, invite: invite, pack: pack
  };
  window.FH.esc = esc;
  window.FH.icon = icon;
  window.FH.mono = mono;
})();
