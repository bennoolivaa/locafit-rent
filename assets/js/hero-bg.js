/* Sfondo animato della home: pennellate lente in WebGL (stessa tecnica dell'hero di Aedify),
   con colori LocaFit: nero, grafite, argento e un filo di blu.
   Se WebGL manca resta la foto sotto; con "riduci movimento" disegna un solo fotogramma. */
(() => {
  const canvas = document.querySelector('.hero-bg');
  if (!canvas) return;
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = [
    'precision mediump float;uniform vec2 r;uniform float t;',
    'float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*n(p);p=R*p*2.03;a*=.5;}return v;}',
    'void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=(gl_FragCoord.xy-.5*r)/r.y;',
    'float a=-.42;p=mat2(cos(a),-sin(a),sin(a),cos(a))*p;p*=vec2(1.1,3.2);',
    'float T=t*.035;vec2 q=vec2(fbm(p+vec2(0.,T)),fbm(p+vec2(5.2,1.3)-T));',
    'vec2 w=vec2(fbm(p+3.4*q+vec2(1.7,9.2)+T*.8),fbm(p+3.4*q+vec2(8.3,2.8)-T*.6));',
    'float f=fbm(p+3.2*w);',
    'float st=n(vec2(p.x*1.2+w.x*2.,p.y*26.+w.y*9.));',
    // nero, grafite, argento, riflesso freddo, blu LocaFit scurito
    'vec3 c0=vec3(.02,.025,.035),c1=vec3(.12,.13,.15),c2=vec3(.38,.39,.42),c3=vec3(.72,.76,.82),cg=vec3(0.,.34,.68);',
    'vec3 col=mix(c0,c1,smoothstep(.15,.65,f));',
    'col=mix(col,c2,smoothstep(.45,.85,f*w.y+.15)*.85);',
    'col=mix(col,cg,smoothstep(.55,.95,q.x*w.x*1.6)*.6);',
    'col+=c3*pow(smoothstep(.5,1.,f+st*.2),2.2)*1.05;',
    'col*=.82+.32*st;',
    'float v=smoothstep(1.25,.25,length((uv-vec2(.5,.7))*vec2(1.,1.3)));col*=.68+.45*v;',
    'col*=mix(.62,1.,smoothstep(0.,.5,uv.y));',
    'col+=(h(gl_FragCoord.xy+t)-.5)*.03;',
    'gl_FragColor=vec4(col,1.);}',
  ].join('\n');

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  const pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't');

  // Lo shader è pesante: risoluzione ridotta, 30 fotogrammi al secondo, pausa fuori schermo
  const scale = Math.min(devicePixelRatio || 1, 1.5) * (innerWidth < 700 ? 0.45 : 0.55);
  const t0 = performance.now(); let raf = 0, last = 0, first = true, visible = true;
  const measure = () => {
    const w = Math.max(1, Math.round(canvas.clientWidth * scale)), h = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  };
  const draw = (now) => {
    raf = 0;
    if (!first && now - last < 33) { if (!reduced && visible) raf = requestAnimationFrame(draw); return; }
    last = now; measure();
    gl.uniform2f(uR, canvas.width, canvas.height);
    gl.uniform1f(uT, reduced ? 20 : (now - t0) / 1000 + 20);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (first) { first = false; canvas.classList.add('on'); }
    if (!reduced && visible) raf = requestAnimationFrame(draw);
  };
  const resume = () => { if (!reduced && visible && !raf) raf = requestAnimationFrame(draw); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting && document.visibilityState === 'visible'; resume(); }, { rootMargin: '100px' }).observe(canvas);
  document.addEventListener('visibilitychange', () => { visible = document.visibilityState === 'visible' && canvas.getBoundingClientRect().bottom > 0; resume(); });
  addEventListener('resize', () => { measure(); if (reduced) requestAnimationFrame(draw); });
  raf = requestAnimationFrame(draw);
})();
