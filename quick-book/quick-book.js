/* TGCC quick book — drop-in. Include with: <script src="quick-book/quick-book.js" defer></script>
   Desktop (>=768px): docked bar with Experience / Date / Guests popovers + Book Tickets.
   Mobile (<768px): one-line summary bar + Book; tapping the summary opens a bottom sheet.
   Only visible while the hero (first section) is on screen; hides once you scroll past it, returns if you scroll back up.
   On mobile it also hides the page's existing fixed "Plan Your Visit / Book Tickets" bar. */
(function () {
  var CFG = {
    BOOK_URL: '#book',            // [TBC] booking page; experience/date/guests are appended as query params
    SECTION_SELECTOR: 'section',  // the bar hides once the bottom of the 1st match (the hero) scrolls above the viewport
    SECTIONS: 1,
    HIDE_OLD_MOBILE_BAR: true,
    MAX_GUESTS: 12
  };
  var EX = [
    { id: 'signature-tour', title: 'The Signature Tour', meta: '90 min' },
    { id: 'tasting-room', title: 'The Tasting Room', meta: '45 min' },
    { id: 'blend-your-own', title: 'Blend Your Own', meta: '2 hr' },
    { id: 'private-custom', title: 'Private and Custom', meta: 'By request' }
  ];
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var today = new Date(); today.setHours(0, 0, 0, 0);
  function day(i) { var d = new Date(today); d.setDate(d.getDate() + i); return d; }
  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function dateLabel(i) { var d = day(i); return (i === 0 ? 'Today' : DOW[d.getDay()]) + ', ' + d.getDate() + ' ' + MON[d.getMonth()]; }

  var me = document.currentScript || document.querySelector('script[src*="quick-book.js"]');
  var base = me ? me.src.replace(/[^\/]*$/, '') : 'quick-book/';
  var st = { exp: 0, day: 0, g: 2, pop: '', sheet: false, shown: true };

  var C = '#tgcc-qb';
  var css = ''
    + "@font-face{font-family:'TGCC Mirador';font-weight:400;font-display:swap;src:url('" + base + "fonts/Mirador-Book.otf') format('opentype')}"
    + "@font-face{font-family:'TGCC Uniform';font-weight:400;font-display:swap;src:url('" + base + "fonts/Uniform-Regular.otf') format('opentype')}"
    + "@font-face{font-family:'TGCC Uniform';font-weight:700;font-display:swap;src:url('" + base + "fonts/Uniform-Bold.otf') format('opentype')}"
    + C + '{position:fixed;inset:0;z-index:2147482000;pointer-events:none;font-family:"TGCC Uniform",system-ui,sans-serif;color:#4D4D3C;-webkit-font-smoothing:antialiased}'
    + C + ' *{box-sizing:border-box;margin:0}'
    + C + ' button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent}'
    + C + ' .s{font-family:"TGCC Mirador",Georgia,serif;font-weight:400}'
    + C + ' .lb{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#A0401F}'
    + C + ' .bar,' + C + ' .pop,' + C + ' .sheet,' + C + ' .scrim{pointer-events:auto}'
    + C + ' .bar{position:absolute;left:50%;bottom:32px;width:min(1104px,calc(100% - 96px));height:64px;background:#FBF3E1;display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(200px,.8fr) auto;box-shadow:0 14px 34px rgba(42,19,10,.25);transform:translate(-50%,0);transition:transform 600ms cubic-bezier(.2,.7,.2,1),opacity 450ms ease}'
    + C + '.intro .bar{animation:qbBar 700ms cubic-bezier(.2,.7,.2,1) both}'
    + C + '.off .bar{transform:translate(-50%,140%);opacity:0;pointer-events:none}'
    + C + ' .seg{border-right:1px solid rgba(77,77,60,.18);padding:0 24px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:3px;text-align:left;min-width:0}'
    + C + ' .seg .s{font-size:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}'
    + C + ' .gst{padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:12px}'
    + C + ' .rnd{width:30px;height:30px;border-radius:50%;border:1px solid rgba(77,77,60,.4)!important;font-size:15px;line-height:1}'
    + C + ' .rnd:disabled{opacity:.35;cursor:default}'
    + C + ' .go{margin:8px;padding:0 32px;border-radius:999px;background:#55291A!important;color:#FBF3E1!important;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background 200ms ease}'
    + C + ' .go:hover{background:#2A130A!important}'
    + C + ' .pop{position:absolute;bottom:108px;background:#FBF3E1;box-shadow:0 18px 40px rgba(42,19,10,.3);animation:qbIn 200ms ease}'
    + C + ' .pop.x{width:300px;padding:8px;display:flex;flex-direction:column}'
    + C + ' .row{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:12px;text-align:left}'
    + C + ' .row .s{font-size:18px}' + C + ' .row small{font-size:11px;color:#615D51}'
    + C + ' .row.on,' + C + ' .row:hover{background:#F2EAD6}'
    + C + ' .pop.d{padding:16px;display:grid;grid-template-columns:repeat(7,44px);gap:6px}'
    + C + ' .dy{height:52px;background:#F2EAD6!important;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}'
    + C + ' .dy span{font-size:9px;letter-spacing:.08em;text-transform:uppercase}' + C + ' .dy .s{font-size:18px;letter-spacing:0;text-transform:none}'
    + C + ' .dy.on{background:#55291A!important;color:#FBF3E1!important}'
    + C + ' .mbar,' + C + ' .sheet,' + C + ' .scrim{display:none}'
    + '@media (min-width:768px) and (max-width:1100px){' + C + ' .seg,' + C + ' .gst{padding:0 16px}' + C + ' .go{padding:0 22px}' + C + ' .bar{width:calc(100% - 48px)}}'
    + '@keyframes qbIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}'
    + '@keyframes qbBar{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}'
    + '@media (max-width:767px){'
    + C + ' .bar,' + C + ' .pop{display:none!important}'
    + C + ' .mbar{display:flex;pointer-events:auto;position:absolute;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));height:64px;background:#FBF3E1;box-shadow:0 14px 34px rgba(42,19,10,.3);transition:transform 600ms cubic-bezier(.2,.7,.2,1),opacity 450ms ease}'
    + C + '.intro .mbar{animation:qbIn 700ms cubic-bezier(.2,.7,.2,1) both}'
    + C + '.off .mbar{transform:translateY(140%);opacity:0;pointer-events:none}'
    + C + ' .sum{flex:1;min-width:0;padding:0 14px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:3px;text-align:left}'
    + C + ' .sum .s{font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}'
    + C + ' .sum small{font-size:11px;color:#615D51;white-space:nowrap}'
    + C + ' .mbar .go{padding:0 20px}'
    + C + ' .scrim{position:absolute;inset:0;background:rgba(42,19,10,.5);animation:qbIn 200ms ease}'
    + C + ' .sheet{position:absolute;left:0;right:0;bottom:0;max-height:92vh;overflow-y:auto;background:#FBF3E1;padding:12px 20px calc(28px + env(safe-area-inset-bottom));flex-direction:column;gap:18px;animation:qbUp 300ms cubic-bezier(.2,.7,.2,1)}'
    + C + '.sh .scrim{display:block}' + C + '.sh .sheet{display:flex}' + C + '.sh .mbar{display:none}'
    + C + ' .grab{align-self:center;width:40px;height:4px;border-radius:2px;background:rgba(77,77,60,.25)}'
    + C + ' .hd{display:flex;justify-content:space-between;align-items:center}' + C + ' .hd .s{font-size:24px}'
    + C + ' .cls{width:44px;height:44px;margin-right:-10px;font-size:22px}'
    + C + ' .sheet .row{align-items:center;min-height:48px;padding:0 12px}'
    + C + ' .strip{display:flex;gap:6px;overflow-x:auto;margin:0 -20px;padding:0 20px;scrollbar-width:none}' + C + ' .strip::-webkit-scrollbar{display:none}'
    + C + ' .strip .dy{flex:none;width:48px;height:56px}'
    + C + ' .grp{display:flex;flex-direction:column;gap:8px}'
    + C + ' .sg{display:flex;justify-content:space-between;align-items:center}' + C + ' .sg .s{font-size:20px}'
    + C + ' .sg .rnd{width:44px;height:44px;font-size:18px}'
    + C + ' .sheet .go{margin:0;height:52px;width:100%}'
    + '@keyframes qbUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}'
    + '}';

  var root, styleEl;
  function h(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function gl() { return st.g + (st.g === 1 ? ' adult' : ' adults'); }
  function days(n, cls) {
    var o = ''; for (var i = 0; i < n; i++) { var d = day(i); o += '<button class="dy' + (i === st.day ? ' on' : '') + '" data-day="' + i + '"><span>' + DOW[d.getDay()] + '</span><span class="s">' + d.getDate() + '</span></button>'; }
    return o;
  }
  function exps() { return EX.map(function (e, i) { return '<button class="row' + (i === st.exp ? ' on' : '') + '" data-exp="' + i + '"><span class="s">' + h(e.title) + '</span><small>' + e.meta + '</small></button>'; }).join(''); }
  function render() {
    var e = EX[st.exp];
    cls();
    root.innerHTML = ''
      + '<div class="bar" role="region" aria-label="Quick book">'
      + '<button class="seg" data-pop="exp" aria-expanded="' + (st.pop === 'exp') + '"><span class="lb">Experience</span><span class="s">' + h(e.title) + '</span></button>'
      + '<button class="seg" data-pop="date" aria-expanded="' + (st.pop === 'date') + '"><span class="lb">Date</span><span class="s">' + dateLabel(st.day) + '</span></button>'
      + '<div class="gst"><div style="display:flex;flex-direction:column;gap:3px"><span class="lb">Guests</span><span class="s" style="font-size:18px;white-space:nowrap">' + gl() + '</span></div>'
      + '<div style="display:flex;gap:4px"><button class="rnd" data-g="-1" aria-label="Fewer guests"' + (st.g <= 1 ? ' disabled' : '') + '>−</button><button class="rnd" data-g="1" aria-label="More guests"' + (st.g >= CFG.MAX_GUESTS ? ' disabled' : '') + '>+</button></div></div>'
      + '<button class="go" data-book>Book Tickets</button></div>'
      + (st.pop === 'exp' && st.shown ? '<div class="pop x" style="left:' + popLeft(0) + 'px">' + exps() + '</div>' : '')
      + (st.pop === 'date' && st.shown ? '<div class="pop d" style="left:' + popLeft(1) + 'px">' + days(14) + '</div>' : '')
      + '<div class="mbar"><button class="sum" data-sheet><span class="s">' + h(e.title) + '</span><small>' + dateLabel(st.day) + ' · ' + gl() + ' · Edit</small></button><button class="go" data-book>Book</button></div>'
      + '<div class="scrim" data-close></div>'
      + '<div class="sheet" role="dialog" aria-modal="true" aria-label="Book a visit"><span class="grab"></span>'
      + '<div class="hd"><span class="s">Book a visit</span><button class="cls" data-close aria-label="Close">×</button></div>'
      + '<div style="display:flex;flex-direction:column">' + exps() + '</div>'
      + '<div class="grp"><span class="lb">Date</span><div class="strip">' + days(14) + '</div></div>'
      + '<div class="sg"><div style="display:flex;flex-direction:column;gap:2px"><span class="lb">Guests</span><span class="s">' + gl() + '</span></div>'
      + '<div style="display:flex;gap:8px"><button class="rnd" data-g="-1" aria-label="Fewer guests"' + (st.g <= 1 ? ' disabled' : '') + '>−</button><button class="rnd" data-g="1" aria-label="More guests"' + (st.g >= CFG.MAX_GUESTS ? ' disabled' : '') + '>+</button></div></div>'
      + '<button class="go" data-book>Book Tickets</button></div>';
  }
  function popLeft(i) {
    var bar = root.querySelector('.bar'); var r = bar ? bar.getBoundingClientRect() : null;
    if (!r || !r.width) { var w = Math.min(1104, innerWidth - 96); r = { left: (innerWidth - w) / 2, width: w }; }
    var s0 = bar && bar.children[1] ? bar.children[1].getBoundingClientRect().left : r.left + r.width * .35; return Math.round(i === 0 ? r.left : s0);
  }
  var intro = true;
  function cls() { root.className = (st.shown || st.sheet ? '' : 'off') + (st.sheet ? ' sh' : '') + (intro ? ' intro' : ''); }
  function set(p) { for (var k in p) st[k] = p[k]; render(); }

  function onClick(ev) {
    var t = ev.target.closest('button,[data-close]'); if (!t || !root.contains(t)) return;
    ev.qbHandled = true;
    if (t.hasAttribute('data-pop')) { var p = t.getAttribute('data-pop'); return set({ pop: st.pop === p ? '' : p }); }
    if (t.hasAttribute('data-exp')) return set({ exp: +t.getAttribute('data-exp'), pop: '' });
    if (t.hasAttribute('data-day')) {
      var sx = root.querySelector('.strip'); var sl = sx ? sx.scrollLeft : 0;
      set({ day: +t.getAttribute('data-day'), pop: '' });
      var nx = root.querySelector('.strip'); if (nx) nx.scrollLeft = sl; return;
    }
    if (t.hasAttribute('data-g')) return set({ g: Math.max(1, Math.min(CFG.MAX_GUESTS, st.g + +t.getAttribute('data-g'))) });
    if (t.hasAttribute('data-sheet')) return set({ sheet: true });
    if (t.hasAttribute('data-close')) return set({ sheet: false });
    if (t.hasAttribute('data-book')) {
      var u = CFG.BOOK_URL, q = 'experience=' + EX[st.exp].id + '&date=' + iso(day(st.day)) + '&guests=' + st.g;
      location.href = u + (u.indexOf('?') >= 0 ? '&' : '?') + q;
    }
  }

  function hideOldBar() {
    if (!CFG.HIDE_OLD_MOBILE_BAR || innerWidth >= 768) return;
    var all = document.body.querySelectorAll('div,nav,footer,aside');
    for (var i = 0; i < all.length; i++) {
      var el = all[i]; if (root.contains(el) || el.dataset.qbHidden) continue;
      var tx = el.textContent || ''; if (tx.length > 200 || !/plan your visit/i.test(tx) || !/book tickets/i.test(tx)) continue;
      var cs = getComputedStyle(el); if (cs.position !== 'fixed') continue;
      var r = el.getBoundingClientRect(); if (r.bottom < innerHeight - 4 || r.height > 160) continue;
      el.dataset.qbHidden = '1'; el.style.setProperty('display', 'none', 'important');
    }
  }

  var ticking = false;
  function check() {
    ticking = false;
    var secs = document.querySelectorAll(CFG.SECTION_SELECTOR);
    var last = secs[Math.min(CFG.SECTIONS, secs.length) - 1];
    var shown = last ? last.getBoundingClientRect().bottom > 80 : true;
    if (shown === st.shown) return;
    if (!shown && st.pop) { st.pop = ''; render(); }
    st.shown = shown;
    // toggle the class only (no re-render) so the CSS transition actually runs
    requestAnimationFrame(cls); setTimeout(cls, 50);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(check); setTimeout(function () { if (ticking) check(); }, 100); } }

  function mount() {
    if (document.getElementById('tgcc-qb')) return;
    styleEl = document.createElement('style'); styleEl.textContent = css; document.head.appendChild(styleEl);
    root = document.createElement('div'); root.id = 'tgcc-qb';
    document.body.appendChild(root);
    root.addEventListener('click', onClick);
    render(); check(); hideOldBar();
    setTimeout(function () { intro = false; cls(); }, 800);
  }
  function boot() {
    mount();
    addEventListener('scroll', onScroll, { passive: true, capture: true });
    addEventListener('resize', function () { st.pop = ''; render(); check(); hideOldBar(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && (st.pop || st.sheet)) set({ pop: '', sheet: false }); });
    document.addEventListener('click', function (e) { if (e.qbHandled || !st.pop || !root) return; var path = e.composedPath ? e.composedPath() : []; if (path.indexOf(root) >= 0 || root.contains(e.target) || !e.target.isConnected) return; set({ pop: '' }); });
    // bundled pages can replace the body after load; re-mount and re-hide the old bar if that happens
    var mt = 0;
    new MutationObserver(function (list) {
      if (!document.getElementById('tgcc-qb')) { root = null; mount(); }
      for (var i = 0; i < list.length; i++) if (!root || !root.contains(list[i].target)) { clearTimeout(mt); mt = setTimeout(function () { hideOldBar(); onScroll(); }, 120); break; }
    })
      .observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
