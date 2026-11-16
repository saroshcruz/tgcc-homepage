/* TGCC age gate — drop-in. Include with: <script src="age-gate/age-gate.js" defer></script>
   Works on desktop and mobile (breakpoint 768px). No dependencies. */
(function () {
  var MIN_AGE = 21;                 // [TBC] legal drinking age
  var REMEMBER_DAYS = 30;           // how long a pass is remembered
  var KEY = 'tgcc_age_ok';

  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && saved.until > Date.now()) return;
  } catch (e) {}
  if (/[?&]agegate=off/.test(location.search)) return;

  var me = document.currentScript || document.querySelector('script[src*="age-gate.js"]');
  var base = me ? me.src.replace(/[^\/]*$/, '') : 'age-gate/';

  var css = ''
    + "@font-face{font-family:'TGCC Mirador';font-weight:400;font-display:swap;src:url('" + base + "fonts/Mirador-Book.otf') format('opentype')}"
    + "@font-face{font-family:'TGCC Uniform';font-weight:400;font-display:swap;src:url('" + base + "fonts/Uniform-Regular.otf') format('opentype')}"
    + "@font-face{font-family:'TGCC Uniform';font-weight:500;font-display:swap;src:url('" + base + "fonts/Uniform-Medium.otf') format('opentype')}"
    + "@font-face{font-family:'TGCC Uniform';font-weight:700;font-display:swap;src:url('" + base + "fonts/Uniform-Bold.otf') format('opentype')}"
    + '#tgcc-ag{position:fixed;inset:0;z-index:2147483000;overflow:hidden;background:#2A130A;color:#FBF3E1;font-family:"TGCC Uniform",system-ui,sans-serif;-webkit-font-smoothing:antialiased;transition:opacity 500ms ease}'
    + '#tgcc-ag *{box-sizing:border-box}'
    + '#tgcc-ag .ag-bg{position:absolute;inset:-40px;width:calc(100% + 80px);height:calc(100% + 80px);object-fit:cover;filter:blur(18px)}'
    + '#tgcc-ag .ag-tint{position:absolute;inset:0;background:rgba(42,19,10,.62)}'
    + '#tgcc-ag .ag-in{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;padding:48px 24px 80px;text-align:center}'
    + '#tgcc-ag .ag-logo{width:96px;height:95px;background:#FBF3E1;-webkit-mask:url("' + base + 'tgcc-logo.png") center/contain no-repeat;mask:url("' + base + 'tgcc-logo.png") center/contain no-repeat;flex:none}'
    + '#tgcc-ag .ag-q{display:flex;flex-direction:column;align-items:center;gap:12px}'
    + '#tgcc-ag .ag-eye{font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#DBBC88}'
    + '#tgcc-ag h1{margin:0;font-family:"TGCC Mirador",Georgia,serif;font-weight:400;font-size:52px;line-height:1.05;letter-spacing:-.01em;color:#FBF3E1}'
    + '#tgcc-ag .ag-dob{display:flex;gap:24px;align-items:flex-end;margin:0;padding:0;border:0}'
    + '#tgcc-ag input{width:140px;margin:0;background:transparent;border:0;border-bottom:1px solid rgba(251,243,225,.5);border-radius:0;padding:0 0 8px;text-align:center;font-family:"TGCC Mirador",Georgia,serif;font-size:72px;line-height:1;color:#FBF3E1;-webkit-appearance:none;appearance:none;outline:none;transition:border-color 200ms ease}'
    + '#tgcc-ag input.ag-y{width:250px}'
    + '#tgcc-ag input:focus{border-bottom-color:#DBBC88}'
    + '#tgcc-ag input::placeholder{color:rgba(251,243,225,.35);opacity:1}'
    + '#tgcc-ag .ag-act{display:flex;flex-direction:column;align-items:center;gap:14px}'
    + '#tgcc-ag button{height:48px;padding:0 32px;border:0;border-radius:999px;background:rgba(219,188,136,.45);color:#4D4D3C;font-family:"TGCC Uniform",system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:background 240ms ease}'
    + '#tgcc-ag button.on{background:#DBBC88}'
    + '#tgcc-ag .ag-msg{font-size:13px;color:#DBBC88;min-height:18px;margin:-24px 0 -16px}'
    + '#tgcc-ag .ag-foot{position:absolute;left:0;right:0;bottom:28px;display:flex;justify-content:center;gap:28px;font-size:12px;color:rgba(251,243,225,.75)}'
    + '#tgcc-ag .ag-foot a{color:inherit;text-decoration:none}#tgcc-ag .ag-foot a:hover{color:#FBF3E1}'
    + '@media (max-width:767px){'
    + '#tgcc-ag .ag-in{justify-content:flex-start;gap:0;padding:84px 24px 40px}'
    + '#tgcc-ag .ag-logo{width:80px;height:79px}'
    + '#tgcc-ag .ag-q{margin-top:72px}'
    + '#tgcc-ag h1{font-size:36px;line-height:1.08}'
    + '#tgcc-ag .ag-dob{margin-top:48px;align-self:stretch;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1.7fr);gap:14px}'
    + '#tgcc-ag input,#tgcc-ag input.ag-y{width:auto;min-width:0;font-size:44px;padding-bottom:6px}'
    + '#tgcc-ag .ag-act{margin-top:auto;align-self:stretch;gap:0}'
    + '#tgcc-ag .ag-msg{margin:16px 0 0}'
    + '#tgcc-ag button{width:100%;height:52px}'
    + '#tgcc-ag .ag-foot{position:static;gap:20px;margin-top:20px}'
    + '}'
    + '@media (max-height:620px) and (max-width:767px){#tgcc-ag .ag-q{margin-top:32px}#tgcc-ag .ag-dob{margin-top:28px}#tgcc-ag .ag-msg{margin-top:12px}}';

  var html = ''
    + '<img class="ag-bg" src="' + base + 'age-gate-bg.jpg" alt="">'
    + '<div class="ag-tint"></div>'
    + '<div class="ag-in">'
    + '<span class="ag-logo" role="img" aria-label="The Good Craft Co."></span>'
    + '<div class="ag-q"><span class="ag-eye">Before you come in</span><h1 id="tgcc-ag-title">Are you ' + MIN_AGE + ' or older?</h1></div>'
    + '<fieldset class="ag-dob"><legend style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Date of birth</legend>'
    + '<input class="ag-d" inputmode="numeric" autocomplete="bday-day" maxlength="2" placeholder="DD" aria-label="Day">'
    + '<input class="ag-m" inputmode="numeric" autocomplete="bday-month" maxlength="2" placeholder="MM" aria-label="Month">'
    + '<input class="ag-y" inputmode="numeric" autocomplete="bday-year" maxlength="4" placeholder="YYYY" aria-label="Year">'
    + '</fieldset>'
    + '<span class="ag-msg" role="status" aria-live="polite"></span>'
    + '<div class="ag-act"><button type="button">Continue</button>'
    + '<div class="ag-foot"><span>Please enjoy responsibly</span><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>'
    + '</div></div>';

  function mount() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var el = document.createElement('div');
    el.id = 'tgcc-ag'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'tgcc-ag-title');
    el.innerHTML = html;
    document.body.appendChild(el);
    var prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    var d = el.querySelector('.ag-d'), m = el.querySelector('.ag-m'), y = el.querySelector('.ag-y');
    var btn = el.querySelector('button'), msg = el.querySelector('.ag-msg');
    var fields = [d, m, y];

    function check() {
      var dd = +d.value, mm = +m.value, yy = +y.value;
      if (y.value.length !== 4 || !dd || !mm || mm > 12 || dd > 31 || yy < 1900) return null;
      var born = new Date(yy, mm - 1, dd);
      if (born.getMonth() !== mm - 1 || born > new Date()) return null;
      var lim = new Date(); lim.setFullYear(lim.getFullYear() - MIN_AGE);
      return born <= lim ? 'ok' : 'young';
    }
    function sync() { btn.classList.toggle('on', !!check()); }

    fields.forEach(function (f, i) {
      var max = +f.getAttribute('maxlength');
      f.addEventListener('input', function () {
        f.value = f.value.replace(/\D/g, '').slice(0, max);
        msg.textContent = '';
        if (f.value.length === max && fields[i + 1]) fields[i + 1].focus();
        sync();
      });
      f.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !f.value && fields[i - 1]) fields[i - 1].focus();
        if (e.key === 'Enter') submit();
      });
    });

    function submit() {
      var r = check();
      if (!r) { msg.textContent = 'Please enter a full date of birth.'; return; }
      if (r === 'young') { msg.textContent = 'Sorry, you need to be ' + MIN_AGE + ' or older to visit.'; return; }
      msg.textContent = 'Welcome in.';
      try { localStorage.setItem(KEY, JSON.stringify({ until: Date.now() + REMEMBER_DAYS * 864e5 })); } catch (e) {}
      el.style.opacity = '0';
      setTimeout(function () { el.remove(); st.remove(); document.documentElement.style.overflow = prevOverflow; }, 520);
    }
    btn.addEventListener('click', submit);
    if (window.matchMedia('(min-width:768px)').matches) d.focus();
  }

  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
