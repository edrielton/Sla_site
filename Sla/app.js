function buildTimeline() {
  const track = document.getElementById('tlTrack');
  track.innerHTML = '';
  CUPS.forEach((c, i) => {
    const d = document.createElement('div');
    d.className = 'tl-entry reveal';
    d.dataset.champC = c.champC;
    d.dataset.champ = c.champ.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'');
    d.innerHTML = `
      <div class="tl-node"></div>
      <div class="tl-card">
        <div class="tl-head" onclick="toggleExtra(${i})">
          <div class="tl-yr">${c.year}</div>
          <div class="tl-meta">
            <div class="tl-host">📍 ${c.host}</div>
            <div class="tl-champ">${c.champF} ${c.champ}</div>
            <div class="tl-score">${c.final}</div>
          </div>
          <span class="tl-badge ${c.badgeCls}">${c.badge}</span>
        </div>
        <div class="tl-body">
          <p class="tl-marco">${c.marco}</p>
          <div class="tl-players">
            ${c.players.map(p => `
              <div class="pl-chip" onclick="openPlayerModal('${p.id}')">
                <div class="pl-av">${p.img ? `<img src="${p.img}" alt="${p.name}" onerror="this.parentElement.textContent='${p.name.slice(0,2).toUpperCase()}'">` : p.name.slice(0,2).toUpperCase()}</div>
                <div class="pl-info">
                  <div class="pl-name">${p.flag} ${p.name}</div>
                  <div class="pl-nick">${p.nick}</div>
                </div>
              </div>`).join('')}
          </div>
          <div class="tl-stats">
            <div class="ts"><div class="ts-v">${c.gols}</div><div class="ts-l">Gols</div></div>
            <div class="ts"><div class="ts-v">${c.jogos}</div><div class="ts-l">Partidas</div></div>
            <div class="ts"><div class="ts-v">${c.times}</div><div class="ts-l">Seleções</div></div>
            <div class="ts"><div class="ts-v">${(c.gols/c.jogos).toFixed(1)}</div><div class="ts-l">Gols/jogo</div></div>
          </div>
        </div>
        <button class="tl-toggler" id="tog-${i}">▼ Detalhes históricos</button>
        <div class="tl-extra" id="ex-${i}">
          <p>${c.extra}</p>
          <div class="tl-extra-grid">
            <div class="te-item"><div class="te-lbl">Artilheiro</div><div class="te-val">${c.artilheiro}</div></div>
            <div class="te-item"><div class="te-lbl">Melhor jogador</div><div class="te-val">${c.mvp}</div></div>
          </div>
        </div>
      </div>`;
    track.appendChild(d);
  });
}

function toggleExtra(i) {
  const ex = document.getElementById('ex-'+i);
  const tog = document.getElementById('tog-'+i);
  ex.classList.toggle('open');
  tog.textContent = ex.classList.contains('open') ? '▲ Fechar detalhes' : '▼ Detalhes históricos';
}

function filterTL(type, btn) {
  document.querySelectorAll('.tf').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.tl-entry').forEach(el => {
    let show = false;
    if (type === 'all') show = true;
    else if (type === 'sa') show = el.dataset.champC === 'sa';
    else if (type === 'eu') show = el.dataset.champC === 'eu';
    else if (type === 'brasil') show = el.dataset.champ.includes('brasil');
    else if (type === 'argentina') show = el.dataset.champ.includes('argentina');
    else if (type === 'alemanha') show = el.dataset.champ.includes('alemanha');
    else if (type === 'franca') show = el.dataset.champ.includes('franca') || el.dataset.champ.includes('fran');
    el.classList.toggle('hide', !show);
  });
}

function buildLegends() {
  document.getElementById('legendsGrid').innerHTML = LEGENDS.map((l,i) => `
    <div class="lg-card reveal" onclick="openModalLegend(${i})">
      <span class="lg-flag">${l.flag}</span>
      <div class="lg-img-wrap">${l.img ? `<img src="${l.img}" alt="${l.name}" onerror="this.parentElement.textContent='${l.name.slice(0,2).toUpperCase()}'">` : l.name.slice(0,2).toUpperCase()}</div>
      <div class="lg-name">${l.name}</div>
      <div class="lg-nick">"${l.nick}"</div>
      <div class="lg-cups">Copas: ${l.cups}</div>
      <div class="lg-goals">⚽ ${l.goals}</div>
    </div>`).join('');
}

function openPlayerModal(id) {
  const p = ALL_PLAYERS[id];
  if (!p) return;
  showModal(p);
}

function openModalLegend(i) {
  const l = LEGENDS[i];
  if (!l) return;
  showModal(l);
}

function showModal(p) {
  document.getElementById('modFlag').textContent = p.flag;
  document.getElementById('modName').textContent = p.name;
  document.getElementById('modNick').textContent = '"' + p.nick + '"';
  document.getElementById('modBio').textContent = p.bio;
  const imgEl = document.getElementById('modImg');
  imgEl.innerHTML = p.img
    ? `<img src="${p.img}" alt="${p.name}" onerror="this.parentElement.textContent='${p.name.slice(0,2).toUpperCase()}'">` 
    : p.name.slice(0,2).toUpperCase();
  document.getElementById('modFacts').innerHTML = (p.facts || []).map(f =>
    `<div class="mo-fact"><div class="mo-fact-l">${f[0]}</div><div class="mo-fact-v">${f[1]}</div></div>`
  ).join('');
  document.getElementById('modBg').classList.add('open');
}

function closeMod(e) {
  if (e.target === document.getElementById('modBg')) document.getElementById('modBg').classList.remove('open');
}
document.addEventListener('keydown', e => { if(e.key==='Escape') document.getElementById('modBg').classList.remove('open'); });

function buildSelects() {
  const opts = CUPS.map((c,i) => `<option value="${i}">${c.year} – ${c.host} (${c.champF} ${c.champ})</option>`).join('');
  document.getElementById('sel1').innerHTML = opts;
  document.getElementById('sel2').innerHTML = opts;
  document.getElementById('sel1').value = '4';
  document.getElementById('sel2').value = '9';
  buildCompare();
}

const CMP_ROWS = [
  {lbl:'Ano', key:'year'},
  {lbl:'Sede', key:'host'},
  {lbl:'Campeão', key:'champ'},
  {lbl:'Placar final', key:'final'},
  {lbl:'Total de gols', key:'gols', num:true},
  {lbl:'Partidas', key:'jogos', num:true},
  {lbl:'Gols/jogo', key:'gpj', num:true},
  {lbl:'Seleções', key:'times', num:true},
  {lbl:'Artilheiro', key:'artilheiro'},
  {lbl:'Melhor jogador', key:'mvp'},
];

function buildCompare() {
  const i1 = +document.getElementById('sel1').value;
  const i2 = +document.getElementById('sel2').value;
  const c1 = {...CUPS[i1], gpj: +(CUPS[i1].gols/CUPS[i1].jogos).toFixed(2)};
  const c2 = {...CUPS[i2], gpj: +(CUPS[i2].gols/CUPS[i2].jogos).toFixed(2)};
  document.getElementById('cth1').textContent = c1.year + ' · ' + c1.host;
  document.getElementById('cth2').textContent = c2.year + ' · ' + c2.host;
  const tbody = document.getElementById('cmpBody');
  tbody.innerHTML = CMP_ROWS.map(r => {
    let v1 = c1[r.key], v2 = c2[r.key];
    if (r.num) {
      const mx = Math.max(v1, v2);
      const p1 = Math.round((v1/mx)*100), p2 = Math.round((v2/mx)*100);
      const h1 = v1 >= v2 ? ' hi' : '', h2 = v2 >= v1 ? ' hi' : '';
      return `<tr>
        <td class="rl">${r.lbl}</td>
        <td class="${h1.trim()}"><div class="bar-pair"><div class="mini-bar" style="width:${p1}%"></div>${v1}</div></td>
        <td class="${h2.trim()}"><div class="bar-pair">${v2}<div class="mini-bar" style="width:${p2}%"></div></div></td>
      </tr>`;
    }
    return `<tr><td class="rl">${r.lbl}</td><td>${v1}</td><td>${v2}</td></tr>`;
  }).join('');
}

let qIdx=0, qScore=0, qAnswered=false, qSet=[];

function initQuiz() {
  qIdx=0; qScore=0; qAnswered=false;
  qSet = [...QUIZ].sort(()=>Math.random()-.5).slice(0,10);
  document.getElementById('qzContent').style.display='block';
  document.getElementById('qzRes').classList.remove('show');
  renderQ();
}

function renderQ() {
  qAnswered=false;
  const q = qSet[qIdx];
  document.getElementById('qzProg').innerHTML = qSet.map((_,i) =>
    `<div class="qz-dot ${i<qIdx?'done':i===qIdx?'cur':''}"></div>`).join('');
  document.getElementById('qzNum').textContent = `Pergunta ${qIdx+1} de ${qSet.length}`;
  document.getElementById('qzQ').textContent = q.q;
  document.getElementById('qzFb').className = 'qz-fb';
  document.getElementById('qzFb').textContent = '';
  document.getElementById('qzNext').classList.remove('show');
  document.getElementById('qzOpts').innerHTML = q.opts.map((o,i) =>
    `<button class="qo" onclick="answerQ(${i})">${o}</button>`).join('');
}

function answerQ(i) {
  if (qAnswered) return;
  qAnswered=true;
  const q = qSet[qIdx];
  const opts = document.querySelectorAll('.qo');
  opts.forEach((o,j) => {
    if (j===q.c) o.classList.add('ok');
    else if (j===i && i!==q.c) o.classList.add('fail');
    else o.classList.add('off');
  });
  const fb = document.getElementById('qzFb');
  if (i===q.c) { qScore++; fb.className='qz-fb show ok'; fb.textContent='✅ Correto! '+q.ex; }
  else { fb.className='qz-fb show fail'; fb.textContent='❌ Incorreto. '+q.ex; }
  document.getElementById('qzNext').classList.add('show');
}

function nextQ() {
  qIdx++;
  if (qIdx >= qSet.length) { showResult(); return; }
  renderQ();
}

function showResult() {
  document.getElementById('qzContent').style.display='none';
  document.getElementById('qzRes').classList.add('show');
  document.getElementById('qzBig').textContent = qScore + '/' + qSet.length;
  const msgs = ['Continue estudando! 📚','Bom começo! 📖','Você conhece o jogo! ⚽','Quase expert! 🌟','Expert em Copas! 🏆'];
  document.getElementById('qzMsg').textContent = msgs[Math.min(Math.floor(qScore/2),4)];
}

function buildCharts() {
  const maxG = Math.max(...CUPS.map(c=>c.gols));
  document.getElementById('chGoals').innerHTML = CUPS.map(c => `
    <div class="bar-row">
      <div class="bar-lbl">${c.year} ${c.champF}</div>
      <div class="bar-track"><div class="bar-fill gold" style="width:0%" data-w="${Math.round(c.gols/maxG*100)}%">${c.gols} gols</div></div>
    </div>`).join('');

  const titles = [
    {n:'Alemanha', f:'🇩🇪', t:2},{n:'Brasil', f:'🇧🇷', t:2},{n:'Argentina', f:'🇦🇷', t:2},
    {n:'França', f:'🇫🇷', t:2},{n:'Itália', f:'🇮🇹', t:1},{n:'Espanha', f:'🇪🇸', t:1}
  ];
  document.getElementById('chTitles').innerHTML = titles.map(t => `
    <div class="bar-row">
      <div class="bar-lbl">${t.f} ${t.n}</div>
      <div class="bar-track"><div class="bar-fill green" style="width:0%" data-w="${t.t*50}%">${'🏆'.repeat(t.t)}</div></div>
    </div>`).join('');

  const scorers = [
    {n:'Klose 🇩🇪',g:16},{n:'Ronaldo R9 🇧🇷',g:15},{n:'Messi 🇦🇷',g:13},{n:'Mbappé 🇫🇷',g:12},
    {n:'Maradona 🇦🇷',g:8},{n:'Romário 🇧🇷',g:5}
  ];
  const maxS = 16;
  document.getElementById('chScorers').innerHTML = scorers.map(s => `
    <div class="bar-row">
      <div class="bar-lbl">${s.n}</div>
      <div class="bar-track"><div class="bar-fill gold" style="width:0%" data-w="${Math.round(s.g/maxS*100)}%">${s.g} gols</div></div>
    </div>`).join('');
}

function animateBars(entries, observer) {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill[data-w]').forEach(bar => {
        bar.style.width = bar.dataset.w;
      });
      observer.unobserve(e.target);
    }
  });
}

function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); } });
  }, {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const barIO = new IntersectionObserver(animateBars, {threshold:0.2});
  document.querySelectorAll('.ch-wrap').forEach(el => barIO.observe(el));
}

document.getElementById('ham').onclick = () => document.getElementById('navLinks').classList.toggle('open');

window.addEventListener('scroll', () => {
  const secs = ['hero','timeline','legends','comparador','quiz','stats'];
  let cur = 'hero';
  secs.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 80) cur = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#'+cur);
  });
});

buildTimeline();
buildLegends();
buildSelects();
initQuiz();
buildCharts();
setupReveal();