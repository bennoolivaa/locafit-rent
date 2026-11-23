"""Tre proposte originali nello stile del logo di Fausto (pennello, blu/rosso/verde, movimento)."""
import math, sys
sys.path.insert(0, '.')
from mark import stroke, smooth, bez, NAVY, RED, GREEN

def line(*segs, n=40):
    """segs: lista di (p0, ctrl, p1) quadratiche concatenate"""
    pts = []
    for i, (a, c, b) in enumerate(segs):
        s = bez(a, c, b, n); pts += s if i == 0 else s[1:]
    return pts

def svg(body, vb):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{body}</svg>'

# 1. Freccia a due tratti: un solo chevron dipinto in due colpi che si incrociano in punta
def c1(navy=NAVY, red=RED, green=GREEN):
    top = line(((7, 8.5), (32, 12), (56, 33)))
    bot = line(((60, 32.5), (36, 50), (8, 56)))
    t = stroke(top, smooth((0, 8.5), (.5, 10.5), (.92, 9.5), (1, 9)), cut_b=-3.2, rnd=.55)
    b = stroke(bot, smooth((0, 1.5), (.14, 9.5), (.5, 9.8), (.9, 8), (1, 7)), rnd=.55)
    return f'<path fill="{red}" d="{b}"/><path fill="{navy}" d="{t}"/><circle fill="{green}" cx="18" cy="33" r="6.2"/>', '0 1 66 62'

# 2. L in avanti: la L dipinta, il piede corre in avanti come una strada; freccia rossa e punto verde dentro
def c2(navy=NAVY, red=RED, green=GREEN):
    L = line(((14, 5), (10, 30), (13, 47)), ((13, 47), (15, 56), (27, 55)), ((27, 55), (52, 53), (75, 48)))
    l = stroke(L, smooth((0, 9.5), (.4, 9.5), (.55, 10.5), (.85, 8.5), (1, 6.5)), rnd=.55)
    ch = line(((36, 17), (48, 23.5), (59, 31)))
    ch2 = line(((60, 31.5), (50, 37.5), (37, 42)))
    r1 = stroke(ch, smooth((0, 6.5), (.9, 7), (1, 6.4)), rnd=.55)
    r2 = stroke(ch2, smooth((0, 1.5), (.18, 7), (1, 6.5)), rnd=.55)
    return f'<path fill="{navy}" d="{l}"/><path fill="{red}" d="{r2}"/><path fill="{red}" d="{r1}"/><circle fill="{green}" cx="27.5" cy="29.5" r="5.6"/>', '0 0 80 62'

# 3. Ruota in corsa: il punto verde corre in avanti, due pennellate di velocità curve dietro
def c3(navy=NAVY, red=RED, green=GREEN, gap='#fff'):
    a = line(((4, 25), (28, 14), (58, 18)))
    b = line(((14, 41), (34, 36), (56, 40)))
    s1 = stroke(a, smooth((0, 3.5), (.35, 7.5), (.8, 10), (1, 10)), rnd=.55)
    s2 = stroke(b, smooth((0, 2.5), (.3, 6.5), (.8, 8), (1, 8)), rnd=.55)
    return f'<path fill="{navy}" d="{s1}"/><path fill="{red}" d="{s2}"/><circle fill="{gap}" cx="66" cy="30" r="15"/><circle fill="{green}" cx="66" cy="30" r="12.5"/>', '0 4 82 48'

if __name__ == '__main__':
    for i, f in enumerate((c1, c2, c3), 1):
        body, vb = f(); open(f'out/c{i}.svg', 'w').write(svg(body, vb))
