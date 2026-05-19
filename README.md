# Toronto Cafe Roulette

Can't decide where to work today? Spin the wheel and get a Toronto cafe to
work from — filtered by outlets, wifi, lighting, and noise. Inspired by
[nyccafelist.com/roulette](https://nyccafelist.com/roulette), rebuilt from
scratch for Toronto.

No build step, no dependencies — it's a static site.

## Run it

```bash
cd toronto-cafe-roulette
python3 -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` in a browser.

## Deploy

Drop the folder on Vercel, Netlify, GitHub Pages, or any static host.

## The data

`data.js` holds the cafe pool. Attributes (outlets / wifi / lighting / noise /
laptop policy) are **crowd-sourced, best-effort** from Reddit-cited Toronto
cafe guides (BlogTO, NOW Toronto, Over Here Toronto, Toronto For You, The
Global Circle). `"unknown"` means no source confirmed it — verify before a
long trek.

### Adding your Google Maps saved cafes

Share your Google Maps cafe list publicly and add the picks to
`window.MY_MAPS_PICKS` in `data.js`:

```js
window.MY_MAPS_PICKS = [
  { name: "Some Cafe", neighborhood: "Leslieville", address: "123 Queen St E",
    outlets: "many", wifi: "good", lighting: "bright/natural",
    seating: "spacious", laptopFriendly: true, noiseLevel: "quiet",
    vibe: "my go-to" },
];
```

They're merged + de-duped into the pool and flagged with a "mine" badge.
Only `name` is strictly required; missing attributes default sensibly.
