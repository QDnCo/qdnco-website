"""Builds site/assets/markets-map.json, the geometry for the homepage markets map (DESIGN.md 6.16).

Source: Natural Earth 1:10m Admin 0 countries, India point of view. This is the
release that draws India on its official boundary: all of Jammu & Kashmir
(including PoK and Gilgit-Baltistan), Ladakh with Aksai Chin, Arunachal Pradesh,
Andaman & Nicobar and Lakshadweep. Never swap in the default "de facto" file;
it cuts the top of J&K off and is a legal exposure for an Indian business.

Download once (13 MB, not committed):
  curl -sSfL -o /tmp/ne_ind_10m.geojson \
    https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_ind.geojson

Run:  python3 scripts/generate/make-markets-map.py /tmp/ne_ind_10m.geojson

Output:
  india  India close-up, pre-projected (plate carree, 22N standard parallel):
         viewBox, outline path, dot grid and city points.
  globe  Simplified lon/lat rings for the draggable globe, projected in the
         browser: land, plus India / United States / UAE highlighted.
"""
import json
import math
import sys

OUT = 'site/assets/markets-map.json'
CITIES = {'Bangalore': (77.59, 12.97), 'Chennai': (80.27, 13.08), 'Pune': (73.85, 18.52), 'Mumbai': (72.88, 19.08),
          'Delhi': (77.21, 28.61), 'Hyderabad': (78.49, 17.39)}
HIGHLIGHT = {'india': 'IND', 'usa': 'USA', 'uae': 'ARE'}
SKIP = {'ATA'}

# India close-up projection: 10 px per degree of latitude, longitude scaled by cos(22N).
K = math.cos(math.radians(22))
LON0, LAT1, WIDTH_DEG, HEIGHT_PX = 66.0, 38.5, 35, 345


def polys(geometry):
    return [geometry['coordinates']] if geometry['type'] == 'Polygon' else geometry['coordinates']


def ring_area(ring):
    return abs(sum(ring[i][0] * ring[i - 1][1] - ring[i - 1][0] * ring[i][1] for i in range(len(ring)))) / 2


def douglas_peucker(pts, tol):
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        (ax, ay), (bx, by) = pts[a], pts[b]
        dx, dy = bx - ax, by - ay
        norm = math.hypot(dx, dy) or 1e-12
        best, idx = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            d = abs(dy * px - dx * py + bx * ay - by * ax) / norm
            if d > best:
                best, idx = d, i
        if best > tol:
            keep[idx] = True
            stack += [(a, idx), (idx, b)]
    return [p for p, k in zip(pts, keep) if k]


def simplify_ring(ring, tol):
    """Closed rings start and end on the same point, so split at the farthest point first."""
    far = max(range(len(ring)), key=lambda i: (ring[i][0] - ring[0][0]) ** 2 + (ring[i][1] - ring[0][1]) ** 2)
    return douglas_peucker(ring[:far + 1], tol)[:-1] + douglas_peucker(ring[far:], tol)


def outer_rings(feature, min_area):
    return [p[0] for p in polys(feature['geometry']) if ring_area(p[0]) >= min_area]


def project_india(lon, lat):
    return (lon - LON0) * 10 * K, (LAT1 - lat) * 10


def india_outline(feature):
    out = []
    for ring in outer_rings(feature, 0):
        pts = simplify_ring([project_india(*p) for p in ring], 0.35)
        if len(pts) >= 3:
            out.append('M' + 'L'.join('%.1f,%.1f' % p for p in pts) + 'Z')
    return ''.join(out)


def point_in_ring(pt, ring):
    x, y = pt
    inside = False
    for i in range(len(ring)):
        (x1, y1), (x2, y2) = ring[i], ring[i - 1]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            inside = not inside
    return inside


def india_dots(feature, pitch=0.5):
    """Hex grid of dots inside India's official outline."""
    rings = outer_rings(feature, 0.002)
    dots, lat, row = [], 37.2, 0
    while lat > 6:
        lon = 68 + (pitch / 2 if row % 2 else 0)
        while lon < 97.5:
            if any(point_in_ring((lon, lat), r) for r in rings):
                dots.append([round(v, 1) for v in project_india(lon, lat)])
            lon += pitch / K
        lat -= pitch * 0.866
        row += 1
    return dots


def lonlat_rings(feature, tol, min_area):
    out = []
    for ring in outer_rings(feature, min_area):
        pts = simplify_ring(ring, tol)
        if len(pts) >= 3:
            out.append([[round(x, 2), round(y, 2)] for x, y in pts])
    return out


def main(src):
    by_code = {f['properties']['ADM0_A3']: f for f in json.load(open(src))['features']}
    india = by_code['IND']
    land = [r for code, f in by_code.items() if code not in SKIP and code not in HIGHLIGHT.values()
            for r in lonlat_rings(f, 0.35, 0.6)]
    detail = {'india': (0.12, 0.002), 'usa': (0.25, 0.05), 'uae': (0.04, 0.01)}
    data = {
        'india': {
            'vb': [0, 0, round(WIDTH_DEG * 10 * K), HEIGHT_PX],
            'outline': india_outline(india),
            'dots': india_dots(india),
            'cities': {name: [round(v, 1) for v in project_india(*ll)] for name, ll in CITIES.items()},
        },
        'globe': dict({'land': land}, **{k: lonlat_rings(by_code[code], *detail[k]) for k, code in HIGHLIGHT.items()}),
    }
    with open(OUT, 'w') as fh:
        json.dump(data, fh, separators=(',', ':'))
    print('wrote', OUT, 'dots', len(data['india']['dots']), 'globe rings', len(land))


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('usage: python3 scripts/generate/make-markets-map.py <ne_10m_admin_0_countries_ind.geojson>')
    main(sys.argv[1])
