(function () {
  "use strict";

  /* ===== System 1+2: pool build + Google Maps picks merge/dedupe ===== */
  function key(c) { return (c.name + "|" + (c.neighborhood || "")).toLowerCase().trim(); }
  var ALL = (window.CAFES || []).map(function (c) { return Object.assign({}, c); });
  var seen = {};
  ALL.forEach(function (c) { seen[key(c)] = c; });
  (window.MY_MAPS_PICKS || []).forEach(function (p) {
    var k = key(p);
    if (seen[k]) { Object.assign(seen[k], p, { mine: true }); }
    else { var n = Object.assign({}, p, { mine: true }); ALL.push(n); seen[k] = n; }
  });

  var RANK = { many: 3, some: 2, few: 1, good: 3, ok: 2, none: 0, unknown: 0,
               quiet: 1, moderate: 2, lively: 3 };

  /* ===== System 7: laptop-friendly default filter ===== */
  function pool() {
    return ALL.filter(function (c) { return c.laptopFriendly !== false; });
  }

  /* tile icons (match Roast widget-tile weight: stroke 1.6) */
  var ICON = {
    power: '<path d="M12 3v9"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/>',
    wifi: '<path d="M5 12.6a11 11 0 0 1 14 0"/><path d="M1.5 9a16 16 0 0 1 21 0"/><path d="M8.5 16.1a6 6 0 0 1 7 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>',
  };
  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + ICON[name] + "</svg>";
  }

  var $ = function (id) { return document.getElementById(id); };
  var tiles = document.querySelectorAll("#w-grid .tile");
  var spinTimer = null, spinning = false;

  /* designed idle content — restored on reset */
  var IDLE = {
    title: "Let's get you connected in Toronto's best cafes.",
    desc: "Pair with a stranger over coffee in walking distance. Choose your vibe, " +
          "spin the wheel, and we'll book a quiet table for two.",
    tiles: [
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', lbl: "Online", val: "412", small: "" },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/></svg>', lbl: "Avg. match", val: "94", small: "%" },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>', lbl: "Wait time", val: "2", small: " min" },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>', lbl: "Nearby", val: "8", small: " cafes" },
    ],
  };

  function setTile(i, svg, lbl, val, small) {
    var t = tiles[i];
    t.querySelector(".label").innerHTML = svg + '<span class="lbl"></span>';
    t.querySelector(".lbl").textContent = lbl;
    t.querySelector(".value").innerHTML = '<span class="val"></span>' + (small ? "<small></small>" : "");
    t.querySelector(".val").textContent = val;
    if (small) t.querySelector(".value small").textContent = small;
  }

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function attrText(v) { return !v || v === "unknown" ? "—" : v; }

  function poolCount() {
    var n = pool().length;
    $("w-num").textContent = n;
    $("w-unit").textContent = "spots";
  }

  /* ===== System 6: spins-today counter (localStorage) ===== */
  function today() { return new Date().toISOString().slice(0, 10); }
  function bumpSpins() {
    var d = today(), n = 1;
    try {
      var s = JSON.parse(localStorage.getItem("roast_spins") || "{}");
      n = (s.date === d ? s.n : 0) + 1;
      localStorage.setItem("roast_spins", JSON.stringify({ date: d, n: n }));
    } catch (e) {}
    return n;
  }
  function spinsToday() {
    try {
      var s = JSON.parse(localStorage.getItem("roast_spins") || "{}");
      return s.date === today() ? s.n : 0;
    } catch (e) { return 0; }
  }

  /* ===== idle / reset ===== */
  function showIdle() {
    $("w-title").textContent = IDLE.title;
    var sp = spinsToday();
    $("w-sub").innerHTML = 'Toronto, ON <span class="dot">·</span> <span id="w-sub-tail"></span>';
    $("w-sub-tail").textContent = sp ? sp + (sp === 1 ? " spin today" : " spins today") : "Tonight";
    IDLE.tiles.forEach(function (t, i) { setTile(i, t.svg, t.lbl, t.val, t.small); });
    $("w-desc").textContent = IDLE.desc;
    $("w-cta-label").textContent = "Match me";
    poolCount();
  }

  /* ===== System 4: result rendering (repurpose existing widget elements) ===== */
  function showResult(c) {
    $("w-title").textContent = c.name;
    var loc = c.neighborhood + (c.address ? " · " + c.address : "");
    $("w-sub").innerHTML = '<span></span>' + (c.mine ? ' <span class="dot">·</span> <span></span>' : "");
    $("w-sub").firstChild.textContent = loc;
    if (c.mine) $("w-sub").lastChild.textContent = "from your Maps list";

    setTile(0, iconSvg("power"), "Outlets", cap(attrText(c.outlets)), "");
    setTile(1, iconSvg("wifi"), "Wifi", cap(attrText(c.wifi)), "");
    setTile(2, iconSvg("sun"), "Lighting", cap(attrText(c.lighting)), "");
    setTile(3, iconSvg("volume"), "Noise", cap(attrText(c.noiseLevel)), "");

    var note = "";
    if (c.laptopFriendly === false) note = " · No laptops here.";
    else if (c.laptopFriendly === "tolerated") note = " · Laptops limited at peak.";
    $("w-desc").textContent = (c.vibe ? c.vibe.charAt(0).toUpperCase() + c.vibe.slice(1) : "") + "." + note;
    $("w-cta-label").textContent = "Match again";
    poolCount();
  }

  function showEmpty() {
    $("w-title").textContent = "No cafes match tonight.";
    $("w-sub").innerHTML = 'Toronto, ON <span class="dot">·</span> <span></span>';
    $("w-sub").lastChild.textContent = "pool is empty";
    IDLE.tiles.forEach(function (t, i) { setTile(i, t.svg, "—", "—", ""); });
    $("w-desc").textContent = "Every spot is filtered out. Tap the dock to reset.";
    $("w-num").textContent = "0";
  }

  /* ===== System 3: roulette spin (quadratic deceleration) ===== */
  function spin(triggers) {
    if (spinning) return;
    var p = pool();
    if (!p.length) { showEmpty(); return; }
    spinning = true;
    triggers.forEach(function (el) { if (el) el.classList.add("spinning"); });
    $("topo-wrap").hidden = false;
    $("w-grid").style.visibility = "hidden";
    $("w-desc").textContent = "Spinning the wheel…";
    $("w-cta-label").textContent = "Matching…";
    IDLE.tiles.forEach(function (t, i) { setTile(i, t.svg, t.lbl, "·", ""); });

    var ticks = 14 + Math.floor(Math.random() * 6), i = 0;
    clearTimeout(spinTimer);
    function tick() {
      $("w-title").textContent = p[Math.floor(Math.random() * p.length)].name;
      if (++i >= ticks) {
        spinning = false;
        triggers.forEach(function (el) { if (el) el.classList.remove("spinning"); });
        $("topo-wrap").hidden = true;
        $("w-grid").style.visibility = "";
        showResult(p[Math.floor(Math.random() * p.length)]);
        bumpSpins();
        return;
      }
      spinTimer = setTimeout(tick, 40 + i * i * 1.2);
    }
    tick();
  }

  /* ===== wire interactions onto existing (unchanged) elements ===== */
  var spinBtns = [$("f-spin"), $("rail-spin")];
  function doSpin() { spin(spinBtns); }
  $("f-spin").addEventListener("click", doSpin);
  $("rail-spin").addEventListener("click", doSpin);
  $("w-cta").addEventListener("click", doSpin);
  $("dock").addEventListener("click", function () {
    if (spinning) { clearTimeout(spinTimer); spinning = false;
      spinBtns.forEach(function (el) { el.classList.remove("spinning"); }); }
    $("topo-wrap").hidden = true;
    $("w-grid").style.visibility = "";
    showIdle();
  });
  $("f-expand").addEventListener("click", function () {
    var el = document.documentElement;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen();
  });
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") { e.preventDefault(); doSpin(); }
  });

  /* OS clock (matches prototype) */
  function tickClock() {
    $("os-time").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  tickClock();
  setInterval(tickClock, 30000);

  showIdle();
})();
