// Toronto work-friendly cafe dataset.
// Attributes are crowd-sourced (best-effort) from Reddit-cited guides:
// BlogTO, NOW Toronto, Over Here Toronto, Toronto For You, The Global Circle.
// "unknown" means no source explicitly confirmed the attribute.
// Merge your personal Google Maps list into MY_MAPS_PICKS below.

window.CAFES = [
  { name: "The Common", neighborhood: "Annex", address: null, outlets: "few", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "quiet", vibe: "tiny, brightly-lit U of T study nook" },
  { name: "Field Trip Cafe", neighborhood: "Bloorcourt", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "warm, cozy, classroom-inspired" },
  { name: "Run and Gun Coffee", neighborhood: "Brockton Village", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "lots of table space, bleacher seating" },
  { name: "Dark Horse Espresso Bar", neighborhood: "Kensington-Chinatown", address: "215 Spadina Ave", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "spacious communal tables, exposed brick" },
  { name: "Odin Cafe + Bar", neighborhood: "Corktown", address: null, outlets: "many", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "Scandinavian design, outlets throughout" },
  { name: "Zav Coffee Shop & Gallery", neighborhood: "East Danforth", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "art-filled, ample room for solo or groups" },
  { name: "Tampered Press", neighborhood: "Dundas West", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "lots of natural light, homey feel" },
  { name: "Boxcar Social", neighborhood: "Harbourfront", address: "235 Queens Quay W", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "lakeside views; calm by day, bar by night" },
  { name: "Boxcar Social (Summerhill)", neighborhood: "Summerhill", address: "1208 Yonge St", outlets: "many", wifi: "ok", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "two-story Victorian, upstairs + patio" },
  { name: "Full Stop", neighborhood: "Junction", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "playful decor, fits 40+, large patio" },
  { name: "Hale Coffee Company", neighborhood: "Junction Triangle", address: "300 Campbell Ave #103", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "huge windows, high ceilings, calm" },
  { name: "Cafe Pamenar", neighborhood: "Kensington Market", address: null, outlets: "few", wifi: "good", lighting: "dim/moody", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "artsy; no laptops in the evenings" },
  { name: "Neo Coffee Bar", neighborhood: "St. Lawrence", address: "161 Frederick St #100", outlets: "some", wifi: "good", lighting: "dim/moody", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "quiet", vibe: "Japanese minimalist; no laptops after 5pm" },
  { name: "Quantum Coffee", neighborhood: "King West", address: "482 Front St W", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "modern, brick back room, ample power" },
  { name: "Good Neighbour", neighborhood: "Koreatown", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "super airy, minimalist, no distractions" },
  { name: "Tango Palace Coffee Company", neighborhood: "Leslieville", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "chill, open until 11pm" },
  { name: "Louie Craft Coffee", neighborhood: "Liberty Village", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "exposed brick, good people-watching" },
  { name: "Flying Pony", neighborhood: "Little India", address: null, outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "doubles as an art gallery" },
  { name: "Jimmy's Coffee", neighborhood: "Ossington", address: "84 Gerrard St W", outlets: "some", wifi: "ok", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "rustic brick, bookish, quieter upstairs" },
  { name: "Goat Coffee Co.", neighborhood: "Pape Village", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "bar seating, communal spaces, food" },
  { name: "Early Bird Espresso & Brew Bar", neighborhood: "Queen West", address: null, outlets: "few", wifi: "ok", lighting: "bright/natural", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "great spot but fills by afternoon" },
  { name: "Sumach Espresso", neighborhood: "Regent Park", address: null, outlets: "many", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "unpretentious, lots of outlets" },
  { name: "Merchants of Green Coffee", neighborhood: "Riverside", address: null, outlets: "few", wifi: "good", lighting: "dim/moody", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "cozy couches, fair-trade" },
  { name: "Reunion Island Coffee Bar", neighborhood: "Roncesvalles", address: null, outlets: "few", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "bright, classy; time your visit" },
  { name: "The Birchcliff", neighborhood: "Scarborough (Birch Cliff)", address: "1680 Kingston Rd", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "third-wave, minimalist, community-focused" },
  { name: "Krave Coffee", neighborhood: "St. Clair West", address: null, outlets: "few", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "cozy, calm, rustic, patio" },
  { name: "The Porch Light", neighborhood: "Upper Beaches", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "community hub, busy with laptop workers" },
  { name: "Fix Coffee + Bikes", neighborhood: "West Queen West", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "roomy, bleacher seating, bike repair" },
  { name: "Balzac's Coffee Roasters (TMU)", neighborhood: "Yonge & Dundas", address: null, outlets: "few", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "campus cafe, big communal tables" },
  { name: "Balzac's Coffee Roasters (Distillery)", neighborhood: "Distillery District", address: "1 Trinity St", outlets: "some", wifi: "ok", lighting: "dim/moody", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "Victorian building, loft/gallery upstairs" },
  { name: "Istanbul Cafe", neighborhood: "Yonge & Eglinton", address: null, outlets: "few", wifi: "ok", lighting: "dim/moody", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "Turkish coffee, fireplace, good for groups" },
  { name: "5 Elements Espresso Bar", neighborhood: "Yorkville", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "three levels, privacy-friendly" },
  { name: "Dark Horse Espresso Bar (Canary)", neighborhood: "Canary District", address: "416 Front St E", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "high ceilings, couches, George Brown spot" },
  { name: "Dineen Coffee Co.", neighborhood: "Financial District", address: "140 Yonge St", outlets: "few", wifi: "ok", lighting: "bright/natural", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "elegant heritage building; busy" },
  { name: "Dineen Outpost", neighborhood: "Leslieville", address: "1042 Gerrard St E", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "high ceilings, marble tables, patio" },
  { name: "Rooster Coffee House (Broadview)", neighborhood: "Riverdale", address: "479 Broadview Ave", outlets: "many", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "rustic-chic, park views, freelancer fav" },
  { name: "Rooster Coffee House (Jarvis)", neighborhood: "Church-Wellesley", address: "568 Jarvis St", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "warm rustic-chic, second floor" },
  { name: "Te Aro", neighborhood: "Leslieville", address: "983 Queen St E", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "airy interior, in-house roasting" },
  { name: "The Sidekick", neighborhood: "Leslieville", address: "1374 Queen St E", outlets: "few", wifi: "ok", lighting: "dim/moody", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "comic book store cafe, eclectic" },
  { name: "Moonbean Coffee Company", neighborhood: "Kensington Market", address: "30 St Andrew St", outlets: "few", wifi: "ok", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "cozy eclectic, on-site roasting" },
  { name: "The Library Specialty Coffee", neighborhood: "Chinatown", address: "281 Dundas St W", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "minimalist, serene and focused" },
  { name: "Café Plenty", neighborhood: "Chinatown", address: "250 Dundas St W", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "bright open-concept, nooks + communal" },
  { name: "Hailed Coffee", neighborhood: "Downtown", address: "44 Gerrard St W", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "modern chic, peaceful yet stimulating" },
  { name: "Gossip Coffee", neighborhood: "North York", address: null, outlets: "few", wifi: "ok", lighting: "dim/moody", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "cozy, warmly lit, plush sofas" },
  { name: "T-Buds Tea Lounge", neighborhood: "Lawrence Park", address: "3343 Yonge St Fl 2", outlets: "some", wifi: "good", lighting: "dim/moody", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "serene tea lounge, soft lighting" },
  { name: "Morning Parade Coffee Bar", neighborhood: "The Beaches", address: "1952 Gerrard St E", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "sleek contemporary, communal tables" },
  { name: "Cliffside Hearth Bread Company", neighborhood: "Scarborough (Cliffside)", address: "3047 Kingston Rd", outlets: "few", wifi: "ok", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "rustic bakery, comfortable seating" },
  { name: "Black Goat Cafe", neighborhood: "Etobicoke (Long Branch)", address: "3261 Lake Shore Blvd W", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "sleek, tranquil, comfortable" },
  { name: "The Mad Bean Coffee House", neighborhood: "Forest Hill", address: "519 Eglinton Ave W", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "artsy, local art, comfy couches" },
  { name: "Artisano Bakery Café", neighborhood: "Leaside", address: "1636 Bayview Ave", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "spacious bakery, parking available" },
  { name: "Faema Café", neighborhood: "Dovercourt", address: "672 Dupont St Suite 201", outlets: "few", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "modern Italian cafe with retail" },
  { name: "Crosstown Coffee Bar", neighborhood: "Chaplin Estates", address: "187 Highbourne Rd", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "lively", vibe: "industrial chic, nooks + communal" },
  { name: "De Mello Palheta Coffee Roasters", neighborhood: "Yonge & Eglinton", address: "2489 Yonge St", outlets: "few", wifi: "ok", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "bright contemporary, in-house roasting" },
  { name: "Himalayan Coffee House", neighborhood: "Yonge & Eglinton", address: "2552 Yonge St", outlets: "few", wifi: "good", lighting: "dim/moody", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "Himalayan-themed, serene, cozy" },
  { name: "Aroma Espresso Bar", neighborhood: "Bay Street", address: "562 Bay St", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "lively", vibe: "vibrant chain, open airy layout" },
  { name: "AM Coffee Studio", neighborhood: "Dundas West", address: "2233 Dundas St W", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "wellness-focused, dedicated co-working" },
  { name: "Found Coffee", neighborhood: "Little Italy", address: "324 College St", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "quiet", vibe: "curated playlists, helpful staff" },
  { name: "Rooms Coffee", neighborhood: "Dovercourt", address: "915 Dupont St", outlets: "some", wifi: "good", lighting: "moderate", seating: "unknown", laptopFriendly: true, noiseLevel: "quiet", vibe: "Japanese-inspired, ideal for solo work" },
  { name: "Creeds Coffee Bar", neighborhood: "Annex", address: "450 Dupont St", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "long communal tables, all-day sessions" },
  { name: "10 Dean Cafe & Bar", neighborhood: "The Annex", address: "484 Spadina Ave", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "cafe by day, bar by night; rule ends 5pm" },
  { name: "Cafe23", neighborhood: "Queen West", address: "728 Queen St W", outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "Instagram patio, calm interior corners" },
  { name: "Bevy @ The Combine", neighborhood: "Entertainment District", address: "225 Wellington St W, Fl 2", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "built for remote work: booths, outlet tables" },
  { name: "Coffee Lunar", neighborhood: "Yonge & Davenport", address: "920 Yonge St #6", outlets: "some", wifi: "good", lighting: "dim/moody", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "calm, best for early mornings" },
  { name: "Goldstruck Coffee", neighborhood: "Yorkville", address: "130 Cumberland St", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "quiet", vibe: "professional, good for light work" },
  { name: "forget me not coffee", neighborhood: "Fashion District", address: "506 Adelaide St W", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "homey, welcoming for reading + work" },
  { name: "Nabulu Coffee", neighborhood: "Kensington Market", address: "6 Joseph St", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "women-owned, comfy couches, office seating" },
  { name: "Cafe Forêt", neighborhood: "Chinatown", address: "153 Dundas St W", outlets: "many", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "calming Korean cafe, labelled outlets" },
  { name: "Project Seoul", neighborhood: "Kensington Market", address: "355 Spadina Ave, 2nd Fl", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "co-working vibe; 2hr limit busy weekends" },
  { name: "Bloom Cafe", neighborhood: "Downtown Yonge", address: "596 Yonge St", outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "Japanese-inspired bakery-cafe; few outlets" },
  { name: "135 Ossington", neighborhood: "Trinity Bellwoods", address: "135 Ossington Ave", outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "Japanese-inspired; tight at peak" },
  { name: "Pilot Coffee Roasters (Ossington)", neighborhood: "Ossington", address: null, outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "paper-airplane ceiling, plenty of seating" },
  { name: "Claudia's Coffee", neighborhood: "Junction", address: null, outlets: "many", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "hidden gem with patio, plenty of outlets" },
  { name: "Cafe Zuzu", neighborhood: "Regent Park", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "classy all-day concept, food + cocktails" },
  { name: "Bloor Street Diner", neighborhood: "Yorkville", address: "33 Bloor St E", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "lively", vibe: "casual, booths + bar, long hours" },
  { name: "Cafe Neon", neighborhood: "Parkdale", address: "1024 Queen St W", outlets: "few", wifi: "ok", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "bright airy minimalist, mixed seating" },
  { name: "Cherry Bomb Coffee", neighborhood: "Roncesvalles", address: "79 Roncesvalles Ave", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "large windows, vibrant, eclectic seating" },
  { name: "Wallace Espresso", neighborhood: "Junction Triangle", address: "188 Wallace Ave", outlets: "few", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "quiet", vibe: "minimalist, calm, compact" },
  { name: "Second Cup Coffee Co. (College)", neighborhood: "Little Italy", address: "179 College St", outlets: "many", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "spacious chain, comfortable seating" },
  { name: "Fratelli Village Pizzeria", neighborhood: "Scarborough (West Hill)", address: "384 Old Kingston Rd", outlets: "few", wifi: "ok", lighting: "moderate", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "casual; quieter off-peak, good for groups" },
  { name: "Sanremo Bakery", neighborhood: "Etobicoke (Mimico)", address: "374 Royal York Rd", outlets: "few", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "nostalgic Italian bakery, bustling" },
  { name: "Silver Fox Coffee Boutique", neighborhood: "Bloor West Village", address: "2285 Bloor St W", outlets: "none", wifi: "none", lighting: "moderate", seating: "limited", laptopFriendly: false, noiseLevel: "lively", vibe: "NO devices/laptops at all (social-only)" },
  { name: "Flying Books", neighborhood: "Queen West", address: "371 Queen St W", outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "bookshop/wine/coffee; no laptops eve + wknd" },
  { name: "Subtext", neighborhood: "Church-Wellesley", address: "655 Yonge St", outlets: "some", wifi: "good", lighting: "dim/moody", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "cozy specialty micro-roaster, single-origin only, serious study sessions" },
  { name: "Propeller Coffee", neighborhood: "Parkdale", address: "50 Wade Ave", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "industrial-chic, top-notch coffee, plenty of space to spread out" },
  { name: "915 Dupont", neighborhood: "Dovercourt", address: "915 Dupont St", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "café and bar in one, work-and-chill hangout" },
  { name: "Ace Hotel Lobby", neighborhood: "King West", address: "51 Camden St", outlets: "many", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "stylish hotel lobby, inspiring change of scenery, great people-watching" },
  { name: "Bevy", neighborhood: "Financial District", address: "25 Bay St", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "downtown, relaxed co-working vibe, great coffee" },
  { name: "Dark Horse Espresso Bar (Queen St E)", neighborhood: "Leslieville", address: "630 Queen St E", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "bright, airy east-end spot with a welcoming vibe" },

  // --- sourced from laptopfriendly.co/toronto ---
  { name: "Miss Lin Cafe", neighborhood: "North York", address: "Highway 7", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "quiet", vibe: "ample power, great natural light, long-stay friendly" },
  { name: "7 West Cafe", neighborhood: "Church-Wellesley", address: "Charles St W", outlets: "few", wifi: "good", lighting: "moderate", seating: "unknown", laptopFriendly: true, noiseLevel: "moderate", vibe: "legendary 24-hour cafe, good wifi, open all night" },
  { name: "Cafe N One", neighborhood: "North York", address: "Yonge St", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "moderate", vibe: "North York work spot, good natural light" },
  { name: "Baroness (Yonge)", neighborhood: "Garden District", address: "Yonge St", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "moderate", vibe: "downtown, natural light, good for long stays" },
  { name: "Cafe 295", neighborhood: "Etobicoke", address: "The West Mall", outlets: "many", wifi: "good", lighting: "dim/moody", seating: "unknown", laptopFriendly: true, noiseLevel: "moderate", vibe: "Etobicoke work cafe, ample power, dimmer setting" },
  { name: "Cafe X Bica", neighborhood: "Summerhill", address: "Pears Ave", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "moderate", vibe: "bright Annex-adjacent spot, solid wifi" },
  { name: "Mabel's Bakery & Specialty Foods", neighborhood: "Roncesvalles", address: "Roncesvalles Ave", outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "beloved neighbourhood bakery-cafe" },
  { name: "MOLA Cafe/Market", neighborhood: "Trinity Bellwoods", address: "Dundas St W", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "quiet", vibe: "quiet, bright cafe-market concept, west-end gem" },
  { name: "Dual Citizen", neighborhood: "Queen West", address: "Queen St W", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "lively", vibe: "spacious and sunlit, lively but roomy enough to focus" },
  { name: "Mast Coffee", neighborhood: "Moss Park", address: "Shuter St", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "compact downtown spot with nice natural light" },
  { name: "Le Bleu Coffee", neighborhood: "St. Clair West", address: "St Clair Ave W", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "quiet", vibe: "quiet, well-powered, bright St Clair West gem" },
  { name: "Reply", neighborhood: "Financial District", address: "Bay St", outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "financial district work cafe, reliable wifi" },
  { name: "The Social Blend", neighborhood: "Midtown", address: "Eglinton Ave E", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "lively", vibe: "bright Midtown spot, livelier vibe" },
  { name: "Paris Baguette", neighborhood: "Yonge & Eglinton", address: "Yonge St", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "unknown", laptopFriendly: true, noiseLevel: "moderate", vibe: "Korean bakery-cafe, bright and decent for work" },
  { name: "Glad Day Bookshop", neighborhood: "Church-Wellesley", address: "499 Church St", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "LGBTQ+ bookshop-cafe, eclectic and welcoming" },
  { name: "The Croissant Tree", neighborhood: "Church-Wellesley", address: "625 Church St", outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "Church St bakery-cafe" },
  { name: "Crestfallen", neighborhood: "Koreatown", address: "663 Bloor St W", outlets: "many", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "Koreatown gem, ample power, good for long sessions" },
  { name: "Bloomers Bloor", neighborhood: "Bloor West Village", address: "873 Bloor St W", outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "Bloor West neighbourhood cafe" },
  { name: "Page One Coffee + Bar", neighborhood: "Downtown", address: "106 Mutual St", outlets: "some", wifi: "ok", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "downtown coffee-bar, good for longer stays" },
  { name: "Bready", neighborhood: "Financial District", address: "20 Adelaide St W", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "corner bakery-cafe at Adelaide & York, great pastries" },
  // ── Financial District ──────────────────────────────────────────────────────
  { name: "Balzac's Coffee (Union Station)", neighborhood: "Financial District", address: "65 Front St W", outlets: "few", wifi: "good", lighting: "bright/natural", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "grand beaux-arts hall — arrive before 9am for a seat" },
  { name: "Fahrenheit Coffee", neighborhood: "Financial District", address: "King St W", outlets: "many", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "moderate", vibe: "sleek Bay St specialty cafe, solid for all-day sessions" },
  { name: "Commoner Coffee", neighborhood: "Financial District", address: "100 Front St W", outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "quiet", vibe: "tucked downtown espresso bar, calm between the towers" },
  // ── Waterfront / Harbourfront ────────────────────────────────────────────────
  { name: "Amsterdam BrewHouse", neighborhood: "Harbourfront", address: "245 Queens Quay W", outlets: "few", wifi: "ok", lighting: "bright/natural", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "waterfront patio brewery-cafe, best lake views in the city" },
  { name: "Steam Whistle Biergärten", neighborhood: "Harbourfront", address: "255 Bremner Blvd", outlets: "few", wifi: "ok", lighting: "bright/natural", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "historic roundhouse at the lake — coffee by day, lagers by evening" },
  { name: "The Rec Room", neighborhood: "Harbourfront", address: "255 Bremner Blvd", outlets: "some", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: "tolerated", noiseLevel: "lively", vibe: "massive lakefront entertainment lounge, good for group sessions" },
  { name: "Meridian Arts Centre Cafe", neighborhood: "Harbourfront", address: "1 York St", outlets: "some", wifi: "good", lighting: "bright/natural", seating: "spacious", laptopFriendly: true, noiseLevel: "quiet", vibe: "arts complex cafe by the harbour, calm and underused" }
];

// ─────────────────────────────────────────────────────────────────────────────
// CAFE_META — supplementary data merged at runtime (hours, links, addedAt)
// key format matches key(c): "(name|neighborhood)".toLowerCase().trim()
// ─────────────────────────────────────────────────────────────────────────────
window.CAFE_META = {
  "bready|financial district":
    { hours: "7am–5pm Mon–Fri", website: "https://bready.co", instagram: "bready.to", addedAt: "2026-05-20" },
  "balzac's coffee (union station)|financial district":
    { hours: "6am–8pm", website: "https://balzacs.com", instagram: "balzacsco", addedAt: "2026-05-20" },
  "fahrenheit coffee|financial district":
    { hours: "7am–6pm", instagram: "fahrenheitcoffee", addedAt: "2026-05-20" },
  "commoner coffee|financial district":
    { hours: "7am–5pm", addedAt: "2026-05-20" },
  "amsterdam brewhouse|harbourfront":
    { hours: "11am–12am", website: "https://amsterdambeer.com", instagram: "amsterdambrewhouse", addedAt: "2026-05-20" },
  "steam whistle biergärten|harbourfront":
    { hours: "12pm–9pm", website: "https://steamwhistle.ca", instagram: "steamwhistlebeer", addedAt: "2026-05-20" },
  "the rec room|harbourfront":
    { hours: "11am–2am", website: "https://therecroom.com", instagram: "therecroom", addedAt: "2026-05-20" },
  "meridian arts centre cafe|harbourfront":
    { hours: "9am–5pm", addedAt: "2026-05-20" },
  // ── Well-known cafes: hours + socials ────────────────────────────────────
  "dark horse espresso bar|kensington-chinatown":
    { hours: "7am–9pm", website: "https://darkhorseespresso.com", instagram: "darkhorseespresso" },
  "dark horse espresso bar (canary)|canary district":
    { hours: "7am–9pm", website: "https://darkhorseespresso.com", instagram: "darkhorseespresso" },
  "dark horse espresso bar (queen st e)|leslieville":
    { hours: "7am–9pm", website: "https://darkhorseespresso.com", instagram: "darkhorseespresso", addedAt: "2026-05-19" },
  "hale coffee company|junction triangle":
    { hours: "7am–5pm", website: "https://halecoffee.com", instagram: "halecoffeeco" },
  "boxcar social|harbourfront":
    { hours: "7am–11pm", website: "https://boxcarsocial.ca", instagram: "boxcarsocial" },
  "boxcar social (summerhill)|summerhill":
    { hours: "7am–10pm", website: "https://boxcarsocial.ca", instagram: "boxcarsocial" },
  "neo coffee bar|st. lawrence":
    { hours: "8am–5pm", website: "https://neocoffeebar.com", instagram: "neocoffeebar" },
  "quantum coffee|king west":
    { hours: "7am–8pm", instagram: "quantum.coffee" },
  "jimmy's coffee|ossington":
    { hours: "7am–7pm", website: "https://jimmyscoffee.ca", instagram: "jimmyscoffeeto" },
  "balzac's coffee roasters (distillery)|distillery district":
    { hours: "7am–9pm", website: "https://balzacs.com", instagram: "balzacsco" },
  "balzac's coffee roasters (tmu)|yonge & dundas":
    { hours: "7am–9pm", website: "https://balzacs.com", instagram: "balzacsco" },
  "dineen coffee co.|financial district":
    { hours: "7am–5pm", website: "https://dineencoffee.com", instagram: "dineencoffee" },
  "dineen outpost|leslieville":
    { hours: "8am–5pm", website: "https://dineencoffee.com", instagram: "dineencoffee" },
  "rooster coffee house (broadview)|riverdale":
    { hours: "7am–7pm", website: "https://roostercoffeehouse.com", instagram: "roostercoffeehouse" },
  "rooster coffee house (jarvis)|church-wellesley":
    { hours: "7am–7pm", website: "https://roostercoffeehouse.com", instagram: "roostercoffeehouse" },
  "pilot coffee roasters (ossington)|ossington":
    { hours: "7am–6pm", website: "https://pilotcoffeeroasters.com", instagram: "pilotcoffee" },
  "moonbean coffee company|kensington market":
    { hours: "8am–8pm", instagram: "moonbeancoffee" },
  "cafe pamenar|kensington market":
    { hours: "8am–10pm", instagram: "cafepamenar" },
  "merchants of green coffee|riverside":
    { hours: "8am–6pm", instagram: "merchantsofgreencoffee" },
  "fix coffee + bikes|west queen west":
    { hours: "7am–6pm", instagram: "fixcoffeeandbikes" },
  "reunion island coffee bar|roncesvalles":
    { hours: "7am–6pm", instagram: "reunionislandcoffee" },
  "the library specialty coffee|chinatown":
    { hours: "8am–6pm", instagram: "thelibraryspecialtycoffee" },
  "good neighbour|koreatown":
    { hours: "8am–5pm", instagram: "goodneighbourcoffee" },
  "7 west cafe|church-wellesley":
    { hours: "Open 24 hours", instagram: "7westcafe", addedAt: "2026-05-19" },
  "crestfallen|koreatown":
    { hours: "8am–7pm", instagram: "crestfallencoffee", addedAt: "2026-05-19" },
  "le bleu coffee|st. clair west":
    { instagram: "lebleucoffee", addedAt: "2026-05-19" },
  "creeds coffee bar|annex":
    { hours: "7am–6pm", instagram: "creedscoffeebar" },
  "bevy @ the combine|entertainment district":
    { hours: "7am–6pm", instagram: "bevy.cafe" },
  "ace hotel lobby|king west":
    { hours: "7am–10pm", website: "https://acehotel.com/toronto", instagram: "acehoteltoronto", addedAt: "2026-05-19" },
  "glad day bookshop|church-wellesley":
    { hours: "10am–10pm", website: "https://gladday.ca", instagram: "gladdaybookshop", addedAt: "2026-05-19" },
  "dual citizen|queen west":
    { hours: "8am–6pm", instagram: "dualcitizencafe", addedAt: "2026-05-19" },
  "mola cafe/market|trinity bellwoods":
    { hours: "8am–6pm", instagram: "molacafemarket", addedAt: "2026-05-19" },
  "page one coffee + bar|downtown":
    { hours: "7am–7pm", instagram: "pageonecoffee", addedAt: "2026-05-19" },
  "propeller coffee|parkdale":
    { hours: "7am–5pm", website: "https://propellercoffee.com", instagram: "propellercoffee", addedAt: "2026-05-19" },
  "subtext|church-wellesley":
    { instagram: "subtextcoffee", addedAt: "2026-05-19" },
  "bevy|financial district":
    { hours: "7am–6pm", instagram: "bevy.cafe", addedAt: "2026-05-19" },
  "915 dupont|dovercourt":
    { instagram: "915dupont", addedAt: "2026-05-19" },
  // ── New badge only (no extra data yet) ───────────────────────────────────
  "miss lin cafe|north york":          { addedAt: "2026-05-19" },
  "cafe n one|north york":             { addedAt: "2026-05-19" },
  "baroness (yonge)|garden district":  { addedAt: "2026-05-19" },
  "cafe 295|etobicoke":                { addedAt: "2026-05-19" },
  "cafe x bica|summerhill":            { addedAt: "2026-05-19" },
  "mabel's bakery & specialty foods|roncesvalles": { addedAt: "2026-05-19" },
  "mast coffee|moss park":             { addedAt: "2026-05-19" },
  "reply|financial district":          { addedAt: "2026-05-19" },
  "the social blend|midtown":          { addedAt: "2026-05-19" },
  "paris baguette|yonge & eglinton":   { addedAt: "2026-05-19" },
  "the croissant tree|church-wellesley": { addedAt: "2026-05-19" },
  "bloomers bloor|bloor west village": { addedAt: "2026-05-19" },
};

// Drop your Google Maps "saved cafes" picks here once you share the list.
// They get merged + de-duped into the pool and flagged with a personal badge.
// Example: { name: "Some Cafe", neighborhood: "...", mine: true }
window.MY_MAPS_PICKS = [
  // --- Matches existing pool cafes: flags them as yours, keeps their attrs ---
  { name: "Dark Horse Espresso Bar", neighborhood: "Kensington-Chinatown" },
  { name: "Dark Horse Espresso Bar (Canary)", neighborhood: "Canary District" },
  { name: "Project Seoul", neighborhood: "Kensington Market" },
  { name: "10 Dean Cafe & Bar", neighborhood: "The Annex" },
  { name: "Bevy @ The Combine", neighborhood: "Entertainment District" },

  // --- New cafes from your Maps list (attrs unknown — verify in person) ---
  { name: "Starbucks Coffee Company", neighborhood: "Toronto", address: null, outlets: "many", wifi: "good", lighting: "moderate", seating: "spacious", laptopFriendly: true, noiseLevel: "lively", vibe: "your Maps pick · 3.9★ chain coffee shop" },
  { name: "BRANDOR COFFEE", neighborhood: "Toronto", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "your Maps pick · 4.2★ coffee shop" },
  { name: "Forno Cultura", neighborhood: "King West", address: null, outlets: "few", wifi: "ok", lighting: "moderate", seating: "limited", laptopFriendly: "tolerated", noiseLevel: "moderate", vibe: "your Maps pick · 4.5★ artisan Italian bakery" },
  { name: "Humble Donkey", neighborhood: "Toronto", address: null, outlets: "some", wifi: "good", lighting: "moderate", seating: "limited", laptopFriendly: true, noiseLevel: "moderate", vibe: "your Maps pick · 4.1★ cafe" }
];
