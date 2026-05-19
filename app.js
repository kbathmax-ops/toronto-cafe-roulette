(function () {
  "use strict";

  // ---- Build pool: Reddit dataset + personal Maps picks, de-duped ----
  function key(c) { return (c.name + "|" + (c.neighborhood || "")).toLowerCase().trim(); }

  var ALL = CAFES.map(function (c) { return Object.assign({}, c); });
  var seen = {};
  ALL.forEach(function (c) { seen[key(c)] = c; });
  (window.MY_MAPS_PICKS || []).forEach(function (p) {
    var k = key(p);
    if (seen[k]) { Object.assign(seen[k], p, { mine: true }); }
    else { var n = Object.assign({}, p, { mine: true }); ALL.push(n); seen[k] = n; }
  });

  var RANK = { many: 3, some: 2, few: 1, good: 3, ok: 2, none: 0, unknown: 0,
               quiet: 1, moderate: 2, lively: 3 };

  var ICON = {
    power: '<path d="M12 3v9"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/>',
    wifi: '<path d="M5 12.6a11 11 0 0 1 14 0"/><path d="M1.5 9a16 16 0 0 1 21 0"/><path d="M8.5 16.1a6 6 0 0 1 7 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>',
    chair: '<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M5 18v2M19 18v2"/>',
    ban: '<circle cx="12" cy="12" r="9"/><line x1="5.6" y1="5.6" x2="18.4" y2="18.4"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="16.5" x2="12.01" y2="16.5"/>',
  };
  function svg(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[name] + "</svg>"; }

  // ---- DOM ----
  var $ = function (id) { return document.getElementById(id); };
  var wheel = $("wheel"), wheelLabel = $("wheel-label");
  var result = $("result"), spinTimer = null;

  // ---- Filters ----
  function readFilters() {
    return {
      outlets: $("f-outlets").value,
      wifi: $("f-wifi").value,
      light: $("f-light").value,
      noise: $("f-noise").value,
      hood: $("f-hood").value,
      laptop: $("f-laptop").checked,
    };
  }

  function pool() {
    var f = readFilters();
    return ALL.filter(function (c) {
      if (f.laptop && c.laptopFriendly === false) return false;
      if (f.outlets === "many" && c.outlets !== "many") return false;
      if (f.outlets === "some" && RANK[c.outlets] < 2) return false;
      if (f.wifi === "good" && c.wifi !== "good") return false;
      if (f.wifi === "ok" && RANK[c.wifi] < 2) return false;
      if (f.light && c.lighting !== f.light) return false;
      if (f.noise === "quiet" && c.noiseLevel !== "quiet") return false;
      if (f.noise === "moderate" && !(c.noiseLevel === "quiet" || c.noiseLevel === "moderate")) return false;
      if (f.hood && c.neighborhood !== f.hood) return false;
      return true;
    });
  }

  function mapsUrl(c) {
    var q = encodeURIComponent(c.name + " " + (c.address || c.neighborhood || "") + " Toronto");
    return "https://www.google.com/maps/search/?api=1&query=" + q;
  }

  function attrChips(c) {
    var items = [];
    if (c.outlets !== "unknown") items.push({ icon: "power", t: c.outlets + " outlets", good: RANK[c.outlets] >= 2 });
    if (c.wifi !== "unknown") items.push({ icon: "wifi", t: "wifi " + c.wifi, good: c.wifi === "good" });
    if (c.lighting !== "unknown") items.push({ icon: "sun", t: c.lighting });
    if (c.noiseLevel !== "unknown") items.push({ icon: "volume", t: c.noiseLevel, good: c.noiseLevel === "quiet" });
    if (c.seating !== "unknown") items.push({ icon: "chair", t: c.seating + " seating" });
    if (c.laptopFriendly === false) items.push({ icon: "ban", t: "no laptops", warn: true });
    else if (c.laptopFriendly === "tolerated") items.push({ icon: "alert", t: "laptops limited", warn: true });
    return items;
  }

  // ---- Roulette ----
  function pickAndShow() {
    var p = pool();
    if (!p.length) {
      wheelLabel.textContent = "Spin";
      result.hidden = true;
      $("empty").hidden = false;
      return;
    }
    $("empty").hidden = true;
    var ticks = 14 + Math.floor(Math.random() * 6);
    var i = 0;
    wheel.classList.add("spinning");
    result.hidden = true;
    clearTimeout(spinTimer);
    function tick() {
      wheelLabel.textContent = p[Math.floor(Math.random() * p.length)].name;
      if (++i >= ticks) {
        wheel.classList.remove("spinning");
        showResult(p[Math.floor(Math.random() * p.length)]);
        bumpSpins();
        return;
      }
      spinTimer = setTimeout(tick, 40 + i * i * 1.2);
    }
    tick();
  }

  function showResult(c) {
    wheelLabel.textContent = "Spin";
    $("result-tag").textContent = c.mine ? "From your Maps list" : "Your spot";
    $("result-name").textContent = c.name;
    $("result-hood").textContent = c.neighborhood + (c.address ? " · " + c.address : "");
    var ul = $("result-attrs");
    ul.innerHTML = attrChips(c).map(function (a) {
      var cls = a.good ? ' class="is-good"' : a.warn ? ' class="is-warn"' : "";
      return "<li" + cls + ">" + svg(a.icon) + "<span>" + a.t + "</span></li>";
    }).join("");
    $("result-vibe").textContent = "“" + c.vibe + "”";
    $("result-maps").href = mapsUrl(c);
    result.hidden = false;
  }

  // ---- Spins-today counter (localStorage) ----
  function today() { return new Date().toISOString().slice(0, 10); }
  function bumpSpins() {
    var d = today(), n = 1;
    try {
      var s = JSON.parse(localStorage.getItem("tcr_spins") || "{}");
      n = (s.date === d ? s.n : 0) + 1;
      localStorage.setItem("tcr_spins", JSON.stringify({ date: d, n: n }));
    } catch (e) {}
    $("spin-count").textContent = n;
  }
  function loadSpins() {
    try {
      var s = JSON.parse(localStorage.getItem("tcr_spins") || "{}");
      $("spin-count").textContent = s.date === today() ? s.n : 0;
    } catch (e) { $("spin-count").textContent = 0; }
  }

  function refreshPoolCount() { $("pool-count").textContent = pool().length; }

  // ---- Grid view ----
  function renderGrid() {
    var grid = $("grid");
    grid.innerHTML = "";
    pool().forEach(function (c) {
      var card = document.createElement("div");
      card.className = "card";
      var chips = attrChips(c).map(function (a) {
        var cls = a.good ? ' class="is-good"' : a.warn ? ' class="is-warn"' : "";
        return "<li" + cls + ">" + svg(a.icon) + "<span>" + a.t + "</span></li>";
      }).join("");
      card.innerHTML =
        "<h3>" + c.name + (c.mine ? "<span class=\"mine-badge\">mine</span>" : "") + "</h3>" +
        "<div class=\"hood\">" + c.neighborhood + (c.address ? " · " + c.address : "") + "</div>" +
        "<ul class=\"attrs\">" + chips + "</ul>" +
        "<p class=\"vibe\">“" + c.vibe + "”</p>" +
        "<a href=\"" + mapsUrl(c) + "\" target=\"_blank\" rel=\"noopener\">Open in Maps →</a>";
      grid.appendChild(card);
    });
  }

  // ---- Wire up ----
  function initHoods() {
    var hoods = ALL.map(function (c) { return c.neighborhood; })
      .filter(function (v, i, a) { return v && a.indexOf(v) === i; })
      .sort();
    var sel = $("f-hood");
    hoods.forEach(function (h) {
      var o = document.createElement("option");
      o.value = o.textContent = h;
      sel.appendChild(o);
    });
  }

  function onFilterChange() {
    refreshPoolCount();
    if (pool().length) $("empty").hidden = true;
    if (!$("grid-view").hidden) renderGrid();
  }

  function resetFilters() {
    ["f-outlets", "f-wifi", "f-light", "f-noise", "f-hood"].forEach(function (id) { $(id).value = ""; });
    $("f-laptop").checked = true;
    onFilterChange();
  }

  ["f-outlets", "f-wifi", "f-light", "f-noise", "f-hood", "f-laptop"].forEach(function (id) {
    $(id).addEventListener("change", onFilterChange);
  });

  $("reset").addEventListener("click", resetFilters);
  $("empty-reset").addEventListener("click", resetFilters);

  wheel.addEventListener("click", pickAndShow);
  $("respin").addEventListener("click", pickAndShow);
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && !/^(SELECT|INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      pickAndShow();
    }
  });

  document.querySelectorAll(".view-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".view-btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var v = btn.dataset.view;
      $("roulette-view").hidden = v !== "roulette";
      $("grid-view").hidden = v !== "grid";
      if (v === "grid") renderGrid();
    });
  });

  initHoods();
  refreshPoolCount();
  loadSpins();
})();
