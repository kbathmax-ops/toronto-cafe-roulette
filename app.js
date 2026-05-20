(function () {
  "use strict";

  /* ===== Supabase client ===== */
  var SB_URL = "https://admlkeibdjttgslmffmy.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbWxrZWliZGp0dGdzbG1mZm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDIzNjUsImV4cCI6MjA5MjYxODM2NX0.MEDiE6IrQRJZXwgK5S_xXU6h8hkhxrIlp847nrUrxMs";
  var sb = window.supabase ? window.supabase.createClient(SB_URL, SB_KEY) : null;

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
  /* Merge CAFE_META (hours, website, instagram, addedAt) */
  var META = window.CAFE_META || {};
  ALL.forEach(function (c) {
    var m = META[key(c)];
    if (m) Object.assign(c, m);
  });

  var RANK = { many: 3, some: 2, few: 1, good: 3, ok: 2, none: 0, unknown: 0,
               quiet: 1, moderate: 2, lively: 3 };

  /* ===== Neighbourhood coordinates for Near Me ===== */
  var HOOD_COORDS = {
    "Annex": [43.669, -79.404], "Kensington Market": [43.655, -79.401],
    "King West": [43.644, -79.397], "Financial District": [43.648, -79.382],
    "Leslieville": [43.659, -79.337], "Riverdale": [43.663, -79.348],
    "Junction": [43.663, -79.464], "Liberty Village": [43.638, -79.420],
    "Yorkville": [43.671, -79.393], "Church-Wellesley": [43.665, -79.381],
    "Distillery District": [43.650, -79.359], "Roncesvalles": [43.645, -79.450],
    "Parkdale": [43.641, -79.441], "Bloorcourt": [43.662, -79.427],
    "Koreatown": [43.663, -79.416], "Ossington": [43.648, -79.422],
    "Harbourfront": [43.638, -79.384], "St. Lawrence": [43.650, -79.371],
    "Corktown": [43.651, -79.364], "North York": [43.761, -79.411],
    "Midtown": [43.692, -79.392], "Summerhill": [43.680, -79.390],
    "Yonge & Eglinton": [43.706, -79.398], "St. Clair West": [43.686, -79.415],
    "Junction Triangle": [43.656, -79.457], "Downtown": [43.652, -79.382],
    "Queen West": [43.648, -79.416], "West Queen West": [43.645, -79.427],
    "Trinity Bellwoods": [43.648, -79.420], "Bloor West Village": [43.649, -79.483],
    "Etobicoke": [43.624, -79.513], "Chinatown": [43.652, -79.398],
    "Little Italy": [43.657, -79.411], "Garden District": [43.656, -79.375],
    "Moss Park": [43.654, -79.370], "Dovercourt": [43.666, -79.434],
    "Scarborough (Birch Cliff)": [43.691, -79.268], "Canary District": [43.649, -79.355],
  };

  /* ===== Active filters ===== */
  var activeFilters = { openNow: false, nearMe: false, area: null };

  /* ===== System 7: pool with filters applied ===== */
  function pool() {
    var p = ALL.filter(function (c) { return c.laptopFriendly !== false; });
    if (activeFilters.openNow) {
      var h = new Date().getHours();
      var lateNight = h >= 22 || h < 7;
      if (lateNight) {
        p = p.filter(function (c) {
          return c.vibe && (c.vibe.indexOf("24") >= 0 || c.vibe.indexOf("11pm") >= 0);
        });
      }
    }
    if (activeFilters.area) {
      p = p.filter(function (c) { return c.neighborhood === activeFilters.area; });
    }
    return p;
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

  /* ===== System 6: spins-today counter + 5/day limit ===== */
  var MAX_SPINS = 5;
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
  function spinsLeft() { return Math.max(0, MAX_SPINS - spinsToday()); }

  /* ===== Hash routing ===== */
  function cafeSlug(c) {
    return (c.name + "-" + (c.neighborhood || ""))
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function loadFromHash() {
    var hash = window.location.hash;
    if (hash && hash.startsWith("#cafe/")) {
      var slug = hash.slice(6);
      var cafe = ALL.find(function (c) { return cafeSlug(c) === slug; });
      if (cafe) { showResult(cafe); return true; }
    }
    return false;
  }

  /* ===== "New" badge helper ===== */
  function isNew(cafe) {
    if (!cafe.addedAt) return false;
    return (Date.now() - new Date(cafe.addedAt).getTime()) < 30 * 24 * 60 * 60 * 1000;
  }

  /* ===== Favorites (localStorage for guests, Supabase for authed) ===== */
  var currentUser = null;
  var currentCafe = null;
  var dbFavs = [];
  var guestFavs = [];
  try { guestFavs = JSON.parse(localStorage.getItem("caffein_favs") || "[]"); } catch (e) {}

  function isFav(cafeKey) {
    return currentUser ? dbFavs.indexOf(cafeKey) >= 0 : guestFavs.indexOf(cafeKey) >= 0;
  }
  function updateStarBtn(cafeKey) {
    var btn = $("star-btn");
    if (!btn || btn.hidden) return;
    var faved = isFav(cafeKey);
    btn.classList.toggle("starred", faved);
    btn.title = faved ? "Saved ★" : "Save this cafe";
  }
  function loadDbFavs() {
    if (!currentUser || !sb) return;
    sb.from("caffein_favorites").select("cafe_key")
      .then(function (res) { dbFavs = (res.data || []).map(function (r) { return r.cafe_key; }); });
  }
  function toggleFav(cafe) {
    var k = key(cafe);
    if (currentUser && sb) {
      if (isFav(k)) {
        sb.from("caffein_favorites").delete().eq("cafe_key", k).eq("user_id", currentUser.id);
        dbFavs = dbFavs.filter(function (x) { return x !== k; });
      } else {
        sb.from("caffein_favorites").insert({ user_id: currentUser.id, cafe_key: k, cafe_name: cafe.name });
        dbFavs.push(k);
      }
    } else {
      if (isFav(k)) { guestFavs = guestFavs.filter(function (x) { return x !== k; }); }
      else { guestFavs.push(k); }
      try { localStorage.setItem("caffein_favs", JSON.stringify(guestFavs)); } catch (e) {}
    }
    updateStarBtn(k);
  }

  /* ===== idle / reset ===== */
  function showIdle() {
    currentCafe = null;
    try { history.pushState("", document.title, window.location.pathname); } catch (e) {}
    $("w-title").textContent = IDLE.title;
    var sp = spinsToday();
    $("w-sub").innerHTML = 'Toronto, ON <span class="dot">·</span> <span id="w-sub-tail"></span>';
    $("w-sub-tail").textContent = sp ? sp + (sp === 1 ? " spin today" : " spins today") : "Tonight";
    $("w-grid").hidden = true;
    $("filter-chips").hidden = false;
    $("w-desc").textContent = IDLE.desc;
    $("w-cta-label").textContent = "Match me";
    $("new-badge").hidden = true;
    $("star-btn").hidden = true;
    $("w-hours").hidden = true;
    $("w-links").hidden = true;
    poolCount();
  }

  /* ===== System 4: result rendering (repurpose existing widget elements) ===== */
  function showResult(c) {
    currentCafe = c;
    try { window.location.hash = "#cafe/" + cafeSlug(c); } catch (e) {}

    $("w-grid").hidden = false;
    $("filter-chips").hidden = true;
    $("w-title").textContent = c.name;
    var loc = c.neighborhood + (c.address ? " · " + c.address : "");
    $("w-sub").innerHTML = '<span></span>' + (c.mine ? ' <span class="dot">·</span> <span></span>' : "");
    $("w-sub").firstChild.textContent = loc;
    if (c.mine) $("w-sub").lastChild.textContent = "from your Maps list";

    /* new badge */
    $("new-badge").hidden = !isNew(c);

    /* star button */
    $("star-btn").hidden = false;
    updateStarBtn(key(c));

    setTile(0, iconSvg("power"), "Outlets", cap(attrText(c.outlets)), "");
    setTile(1, iconSvg("wifi"), "Wifi", cap(attrText(c.wifi)), "");
    setTile(2, iconSvg("sun"), "Lighting", cap(attrText(c.lighting)), "");
    setTile(3, iconSvg("volume"), "Noise", cap(attrText(c.noiseLevel)), "");

    /* hours */
    if (c.hours) {
      $("w-hours-text").textContent = c.hours;
      $("w-hours").hidden = false;
    } else {
      $("w-hours").hidden = true;
    }

    /* website + instagram links */
    var hasWeb = !!c.website, hasIg = !!c.instagram;
    if (hasWeb) {
      $("w-link-web").href = c.website;
      $("w-link-web").hidden = false;
    } else {
      $("w-link-web").hidden = true;
    }
    if (hasIg) {
      $("w-link-ig").href = "https://instagram.com/" + c.instagram.replace(/^@/, "");
      $("w-link-ig").hidden = false;
    } else {
      $("w-link-ig").hidden = true;
    }
    $("w-links").hidden = !(hasWeb || hasIg);

    var note = "";
    if (c.laptopFriendly === false) note = " · No laptops here.";
    else if (c.laptopFriendly === "tolerated") note = " · Laptops limited at peak.";
    $("w-desc").textContent = (c.vibe ? c.vibe.charAt(0).toUpperCase() + c.vibe.slice(1) : "") + "." + note;
    $("w-cta-label").textContent = "Match again";
    poolCount();
  }

  function showEmpty() {
    $("w-title").textContent = "No cafes match.";
    $("w-sub").innerHTML = 'Toronto, ON <span class="dot">·</span> <span></span>';
    $("w-sub").lastChild.textContent = "adjust your filters";
    $("w-grid").hidden = true;
    $("filter-chips").hidden = false;
    $("w-desc").textContent = "Every spot is filtered out. Tap the dock to reset filters.";
    $("w-num").textContent = "0";
  }

  /* ===== System 3: roulette spin (quadratic deceleration) ===== */
  function spin(triggers) {
    if (spinning) return;
    if (spinsLeft() === 0) {
      $("w-title").textContent = "You've had your 5 coffees today.";
      $("w-sub").innerHTML = 'Toronto, ON <span class="dot">·</span> <span>come back tomorrow</span>';
      $("w-desc").textContent = "Daily spin limit reached. Browse and favourites still work!";
      $("w-grid").hidden = true;
      $("filter-chips").hidden = true;
      return;
    }
    var p = pool();
    if (!p.length) { showEmpty(); return; }
    spinning = true;
    triggers.forEach(function (el) { if (el) el.classList.add("spinning"); });
    $("topo-wrap").hidden = false;
    $("w-grid").hidden = true;
    $("filter-chips").hidden = true;
    $("w-desc").textContent = "Spinning the wheel…";
    $("w-cta-label").textContent = "Matching…";

    var ticks = 14 + Math.floor(Math.random() * 6), i = 0;
    clearTimeout(spinTimer);
    function tick() {
      $("w-title").textContent = p[Math.floor(Math.random() * p.length)].name;
      if (++i >= ticks) {
        spinning = false;
        triggers.forEach(function (el) { if (el) el.classList.remove("spinning"); });
        $("topo-wrap").hidden = true;
        showResult(p[Math.floor(Math.random() * p.length)]);
        bumpSpins();
        return;
      }
      spinTimer = setTimeout(tick, 40 + i * i * 1.2);
    }
    tick();
  }

  /* ===== System 8: all-cafes grid ===== */
  var gridBuilt = false;

  function chipClass(attr, goodVal, midVal) {
    if (attr === goodVal) return "cc-chip-green";
    if (attr === midVal)  return "cc-chip-amber";
    if (!attr || attr === "unknown") return "cc-chip-dim";
    return "cc-chip-red";
  }

  function buildCafeGrid() {
    if (gridBuilt) return;
    gridBuilt = true;
    var list = ALL;
    $("cgp-count").textContent = list.length + " spots";
    $("cgp-grid").innerHTML = list.map(function (c) {
      var chips = [];
      if (c.wifi && c.wifi !== "unknown") {
        var label = c.wifi === "good" ? "wifi ✓" : c.wifi === "ok" ? "wifi ok" : "no wifi";
        chips.push('<span class="cc-chip ' + chipClass(c.wifi, "good", "ok") + '">' + label + '</span>');
      }
      if (c.outlets && c.outlets !== "unknown") {
        chips.push('<span class="cc-chip ' + chipClass(c.outlets, "many", "some") + '">⚡ ' + c.outlets + '</span>');
      }
      if (c.noiseLevel && c.noiseLevel !== "unknown") {
        var nClass = c.noiseLevel === "quiet" ? "cc-chip-blue" : c.noiseLevel === "moderate" ? "cc-chip-amber" : "cc-chip-red";
        chips.push('<span class="cc-chip ' + nClass + '">' + c.noiseLevel + '</span>');
      }
      if (c.lighting && c.lighting !== "unknown") {
        var lClass = c.lighting === "bright/natural" ? "cc-chip-green" : c.lighting === "moderate" ? "cc-chip-amber" : "cc-chip-dim";
        chips.push('<span class="cc-chip ' + lClass + '">☀ ' + (c.lighting === "bright/natural" ? "bright" : c.lighting) + '</span>');
      }
      var meta = c.neighborhood + (c.address ? " · " + c.address : "");
      return '<div class="cafe-card" data-key="' + key(c) + '">' +
        '<div class="cc-name">' + c.name + '</div>' +
        '<div class="cc-meta">' + meta + '</div>' +
        (chips.length ? '<div class="cc-chips">' + chips.join("") + "</div>" : "") +
        "</div>";
    }).join("");

    $("cgp-grid").addEventListener("click", function (e) {
      var card = e.target.closest(".cafe-card");
      if (!card) return;
      var k = card.dataset.key;
      var cafe = ALL.find(function (c) { return key(c) === k; });
      if (cafe) { closeGrid(); showResult(cafe); }
    });
  }

  function openGrid() {
    buildCafeGrid();
    $("cafe-grid-panel").hidden = false;
    $("rail-grid").classList.add("active");
  }
  function closeGrid() {
    $("cafe-grid-panel").hidden = true;
    $("rail-grid").classList.remove("active");
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
    activeFilters.openNow = false; activeFilters.nearMe = false; activeFilters.area = null;
    $("fc-open").classList.remove("active");
    $("fc-near").classList.remove("active");
    $("fc-area").classList.remove("active");
    $("fc-area-label").textContent = "By area";
    $("area-picker").hidden = true;
    closeGrid();
    showIdle();
  });
  $("rail-grid").addEventListener("click", openGrid);
  $("cgp-close").addEventListener("click", closeGrid);

  /* ===== Logo + Home rail button both reset to idle ===== */
  function goHome() {
    if (spinning) { clearTimeout(spinTimer); spinning = false;
      spinBtns.forEach(function (el) { el.classList.remove("spinning"); }); }
    $("topo-wrap").hidden = true;
    closeGrid();
    showIdle();
  }
  $("rail-logo").addEventListener("click", goHome);
  $("rail-home").addEventListener("click", goHome);

  /* ===== Filters ===== */
  function updateFilters() { poolCount(); }

  /* Open now */
  $("fc-open").addEventListener("click", function () {
    activeFilters.openNow = !activeFilters.openNow;
    this.classList.toggle("active", activeFilters.openNow);
    updateFilters();
  });

  /* Near me */
  $("fc-near").addEventListener("click", function () {
    var chip = this;
    if (activeFilters.nearMe) {
      activeFilters.nearMe = false;
      activeFilters.area = null;
      chip.classList.remove("active");
      $("fc-area-label").textContent = "By area";
      $("fc-area").classList.remove("active");
      updateFilters();
      return;
    }
    if (!navigator.geolocation) { return; }
    chip.classList.add("loading");
    navigator.geolocation.getCurrentPosition(function (pos) {
      chip.classList.remove("loading");
      var lat = pos.coords.latitude, lng = pos.coords.longitude;
      var best = null, bestDist = Infinity;
      Object.keys(HOOD_COORDS).forEach(function (h) {
        var c = HOOD_COORDS[h];
        var d = Math.pow(c[0] - lat, 2) + Math.pow(c[1] - lng, 2);
        if (d < bestDist) { bestDist = d; best = h; }
      });
      if (best) {
        activeFilters.nearMe = true;
        activeFilters.area = best;
        chip.classList.add("active");
        $("fc-area-label").textContent = best;
        $("fc-area").classList.add("active");
        updateFilters();
      }
    }, function () { chip.classList.remove("loading"); });
  });

  /* By area — build picker once, toggle dropdown */
  (function () {
    var picker = $("area-picker");
    var hoods = {};
    ALL.forEach(function (c) { if (c.neighborhood) hoods[c.neighborhood] = true; });
    picker.innerHTML = Object.keys(hoods).sort().map(function (h) {
      return '<button class="area-btn" data-hood="' + h + '">' + h + '</button>';
    }).join("");

    $("fc-area").addEventListener("click", function (e) {
      if (activeFilters.nearMe) return; // near-me owns the area filter
      picker.hidden = !picker.hidden;
    });

    picker.addEventListener("click", function (e) {
      var btn = e.target.closest(".area-btn");
      if (!btn) return;
      var hood = btn.dataset.hood;
      picker.querySelectorAll(".area-btn").forEach(function (b) { b.classList.remove("selected"); });
      if (activeFilters.area === hood) {
        activeFilters.area = null;
        $("fc-area-label").textContent = "By area";
        $("fc-area").classList.remove("active");
      } else {
        activeFilters.area = hood;
        btn.classList.add("selected");
        $("fc-area-label").textContent = hood;
        $("fc-area").classList.add("active");
      }
      picker.hidden = true;
      updateFilters();
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".filter-chip-wrap")) picker.hidden = true;
    });
  }());

  $("f-expand").addEventListener("click", function () {
    var el = document.documentElement;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen();
  });
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") { e.preventDefault(); doSpin(); }
  });

  /* ===== Auth modal ===== */
  $("rail-auth").addEventListener("click", function () {
    $("auth-modal").hidden = false;
  });
  $("auth-close").addEventListener("click", function () {
    $("auth-modal").hidden = true;
  });
  $("auth-submit").addEventListener("click", function () {
    var email = $("auth-email").value.trim();
    if (!email || !sb) return;
    sb.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: window.location.origin + window.location.pathname }
    }).then(function () {
      $("auth-form").hidden = true;
      $("auth-sent").hidden = false;
    });
  });
  $("auth-logout").addEventListener("click", function () {
    if (sb) sb.auth.signOut();
    $("auth-modal").hidden = true;
  });
  if (sb) {
    sb.auth.onAuthStateChange(function (event, session) {
      currentUser = session ? session.user : null;
      if (currentUser) {
        $("rail-auth-label").textContent = "Account";
        $("auth-avatar").textContent = (currentUser.email || "?")[0].toUpperCase();
        $("auth-user-email").textContent = currentUser.email || "";
        $("auth-user").hidden = false;
        $("auth-form").hidden = true;
        $("auth-sent").hidden = true;
        loadDbFavs();
      } else {
        $("rail-auth-label").textContent = "Sign in";
        $("auth-user").hidden = true;
        $("auth-form").hidden = false;
        $("auth-sent").hidden = true;
        dbFavs = [];
      }
      if (currentCafe) updateStarBtn(key(currentCafe));
    });
  }

  /* ===== Star button ===== */
  $("star-btn").addEventListener("click", function () {
    if (currentCafe) toggleFav(currentCafe);
  });

  /* ===== Init: restore from hash or show idle ===== */
  if (!loadFromHash()) showIdle();
})();
