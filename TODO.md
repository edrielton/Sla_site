# TODO — Otimização e Segurança do Site

## Objetivo
Deixar o site mais leve e separar os arquivos, mantendo a mesma estética, e reforçar a segurança do código.

## Passos

### 1. Separar os dados — `data.js` → `data/` ✅
- [x] Criar `src/data/players.js` (ALL_PLAYERS)
- [x] Criar `src/data/cups.js` (CUPS)
- [x] Criar `src/data/legends.js` (LEGENDS)
- [x] Criar `src/data/quiz.js` (QUIZ)
- [x] Criar `src/data/index.js` (re-exporta tudo)
- [x] Remover `src/data.js`

### 2. Separar o CSS — `index.css` → `styles/` ✅
- [x] Criar `src/styles/base.css`
- [x] Criar `src/styles/nav.css`
- [x] Criar `src/styles/hero.css`
- [x] Criar `src/styles/timeline.css`
- [x] Criar `src/styles/legends.css`
- [x] Criar `src/styles/comparador.css`
- [x] Criar `src/styles/quiz.css`
- [x] Criar `src/styles/stats.css`
- [x] Criar `src/styles/records.css`
- [x] Criar `src/styles/mvp.css`
- [x] Criar `src/styles/favorites.css`
- [x] Criar `src/styles/intro.css`
- [x] Criar `src/styles/footer.css`
- [x] Criar `src/styles/modal.css`
- [x] Criar `src/styles/theme.css`
- [x] Criar `src/styles/index.css` (importa tudo)
- [x] Remover `src/index.css`
- [x] Atualizar `src/main.jsx` para importar `styles/index.css`

### 3. Performance — Code Splitting (lazy loading) ✅
- [x] Atualizar `src/App.jsx` com `React.lazy` + `Suspense` para as seções abaixo da dobra

### 4. Lazy loading de imagens ✅
- [x] Adicionar `loading="lazy"` em imagens abaixo da dobra (Legends, Timeline, MVPSection, Favorites, PlayerModal)

### 5. Segurança ✅
- [x] Adicionar `.gitignore` (evita vazar `.env`, `node_modules`, etc.)
- [x] Verificar que não há dados sensíveis no código
- [x] Adicionar `.env.example` (documenta variáveis seguras)
- [x] Adicionar headers de segurança no `vite.config.js`

### 6. Remover comentários/explicações do código ✅
- [x] Remover comentários `/* ===== ... ===== */` dos arquivos CSS
- [x] Remover comentários do `.env.example`
- [x] Remover comentários do `vite.config.js`

### 7. Testes ✅
- [x] Rodar `npm run build` — SUCESSO (code splitting funcionando)
- [x] Verificar que o visual permanece o mesmo (mesmo CSS, só reorganizado)
