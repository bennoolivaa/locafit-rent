"""Marchio LOCAFIT: punto verde + due chevron a pennello (dal logo di Fausto), ridisegnati puliti.
Ogni pennellata = linea centrale levigata + profilo di spessore -> contorno pieno."""
import math, sys

NAVY, RED, GREEN = '#1B2A6B', '#D62839', '#2BA84A'


def bez(p0, p1, p2, n):
    return [((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0], (1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]) for t in (i/n for i in range(n+1))]


def chevron_line(a, apex, b, bow_a, bow_b, r):
    """a -> apex -> b, bracci leggermente curvi, gomito raccordato di raggio r"""
    def toward(p, q, d):
        L = math.dist(p, q); return (q[0]+(p[0]-q[0])*d/L, q[1]+(p[1]-q[1])*d/L)
    a1 = toward(a, apex, r); b1 = toward(b, apex, r)
    def bowed(p, q, k):
        mx, my = (p[0]+q[0])/2, (p[1]+q[1])/2; dx, dy = q[0]-p[0], q[1]-p[1]; L = math.hypot(dx, dy)
        return (mx - dy/L*k, my + dx/L*k)
    pts = bez(a, bowed(a, a1, bow_a), a1, 40)
    pts += bez(a1, apex, b1, 24)[1:]
    pts += bez(b1, bowed(b1, b, bow_b), b, 40)[1:]
    return pts


def stroke(pts, width, cut_a=0.0, cut_b=0.0, rnd=0):
    """width(s) con s in [0,1] lungo la linea; cut = inclinazione del taglio alle estremità"""
    L = [0.0]
    for i in range(1, len(pts)): L.append(L[-1] + math.dist(pts[i-1], pts[i]))
    tot = L[-1]; left, right = [], []
    for i, p in enumerate(pts):
        q0 = pts[max(i-1, 0)]; q1 = pts[min(i+1, len(pts)-1)]
        dx, dy = q1[0]-q0[0], q1[1]-q0[1]; n = math.hypot(dx, dy); nx, ny = -dy/n, dx/n
        w = width(L[i]/tot)/2
        left.append((p[0]+nx*w, p[1]+ny*w)); right.append((p[0]-nx*w, p[1]-ny*w))
    # taglio obliquo del pennello alle estremità
    def shift(pt, i, k):
        q0 = pts[max(i-1, 0)]; q1 = pts[min(i+1, len(pts)-1)]
        dx, dy = q1[0]-q0[0], q1[1]-q0[1]; n = math.hypot(dx, dy)
        return (pt[0]+dx/n*k, pt[1]+dy/n*k)
    N = len(pts)
    for i in range(N):
        fa = max(0.0, 1 - L[i]/(2.5*abs(cut_a))) if cut_a else 0
        fb = max(0.0, 1 - (tot-L[i])/(2.5*abs(cut_b))) if cut_b else 0
        k = cut_a*fa + cut_b*fb
        if k: left[i] = shift(left[i], i, k); right[i] = shift(right[i], i, -k)
    def cap(a, b, p, u, w):
        # da a a b passando davanti alla punta (direzione u verso l'esterno)
        out = []
        for k in range(1, 12):
            th = math.pi*k/12; c, sn = math.cos(th), math.sin(th)
            out.append(((a[0]+b[0])/2 + (a[0]-b[0])/2*c + u[0]*w*sn*rnd, (a[1]+b[1])/2 + (a[1]-b[1])/2*c + u[1]*w*sn*rnd))
        return out
    def unit(p, q):
        dx, dy = p[0]-q[0], p[1]-q[1]; n = math.hypot(dx, dy); return (dx/n, dy/n)
    endb = cap(left[-1], right[-1], pts[-1], unit(pts[-1], pts[-2]), width(1)/2) if rnd else []
    starta = cap(right[0], left[0], pts[0], unit(pts[0], pts[1]), width(0)/2) if rnd else []
    poly = left + endb + right[::-1] + starta
    d = 'M' + ' '.join(f'{x:.2f} {y:.2f}' for x, y in poly) + 'Z'
    return d


def smooth(*knots):
    """profilo a tratti: knots = (s, w) ordinati"""
    def f(s):
        for (s0, w0), (s1, w1) in zip(knots, knots[1:]):
            if s <= s1:
                t = (s - s0)/(s1 - s0); t = t*t*(3-2*t); return w0 + (w1-w0)*t
        return knots[-1][1]
    return f


def mark(navy=NAVY, red=RED, green=GREEN):
    nv = chevron_line((7, 5), (52, 30), (8, 55), -2.2, 1.0, 4)
    rd = chevron_line((32, 7.5), (79, 30), (35, 55), -0.8, 1.2, 1.8)
    navy_d = stroke(nv, smooth((0, 5.5), (.05, 8.4), (.22, 9.6), (.45, 8.6), (.5, 9.4), (.56, 8.4), (.8, 7.6), (.96, 6.2), (1, 4.2)), cut_a=-2.6, cut_b=1.4)
    red_d = stroke(rd, smooth((0, 7.6), (.05, 7.0), (.12, 5.4), (.42, 5.6), (.5, 7.4), (.58, 5.6), (.88, 5.4), (.95, 7.0), (1, 7.6)), rnd=0.8)
    return (f'<path fill="{red}" d="{red_d}"/>'
            f'<path fill="{navy}" d="{navy_d}"/>'
            f'<circle fill="{green}" cx="21" cy="30" r="6.2"/>')


VB = '0 -1 86 62'

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'out/mark.svg'
    open(out, 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VB}">{mark()}</svg>')
    print(out)
