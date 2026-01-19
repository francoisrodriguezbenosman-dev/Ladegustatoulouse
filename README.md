# Domaine de Lapistoule - Site Web

Site web statique moderne pour le Domaine de Lapistoule, vignoble situé à Luzech (Cahors).

## Stack Technique

- **TypeScript** - Développement type-safe
- **Vite** - Build tool ultra-rapide
- **CSS Vanilla** - Architecture ITCSS
- **Lucide Icons** - Icônes SVG modernes
- **Playwright** - Tests end-to-end

## Prérequis

- Node.js 18+
- npm ou yarn

## Installation

```bash
npm install
```

## Commandes Disponibles

### Développement

```bash
npm run dev          # Démarre le serveur de développement
```

### Build

```bash
npm run build        # Compile TypeScript et build pour production
npm run preview      # Preview du build de production
```

### Qualité de Code

```bash
npm run lint         # Vérifie le code avec ESLint
npm run lint:fix     # Corrige automatiquement les erreurs ESLint
npm run format       # Formate le code avec Prettier
npm run format:check # Vérifie le formatage sans modifier
```

### Tests

```bash
npm run test         # Exécute les tests Playwright
npm run test:ui      # Interface UI pour les tests
npm run test:debug   # Mode debug des tests
```

## Architecture du Projet

```
├── src/
│   ├── scripts/
│   │   ├── main.ts              # Point d'entrée
│   │   ├── components/          # Composants globaux
│   │   │   ├── global.ts        # Injection header/footer + lazy loading
│   │   │   ├── header.ts        # Logique navigation
│   │   │   └── layoutTemplates.ts
│   │   ├── pages/               # Scripts spécifiques par page
│   │   └── utils/
│   │       └── lazyLoad.ts      # Utilitaire lazy loading
│   ├── styles/
│   │   ├── style.css            # Orchestrateur ITCSS
│   │   ├── tokens.css           # Design system tokens
│   │   ├── base.css             # Reset & typography
│   │   ├── layout.css           # Grid & containers
│   │   ├── utilities.css        # Classes utilitaires
│   │   ├── lazy-load.css        # Styles lazy loading
│   │   └── pages/               # Styles par page
│   └── snippets/                # Composants HTML réutilisables
├── tests/                       # Tests Playwright e2e
├── index.html, domaine.html, etc.
└── vite.config.ts
```

## Lazy Loading des Images

Le site implémente le lazy loading natif pour optimiser les performances.

### Utilisation

Remplacez l'attribut `src` par `data-src` pour les images à lazy-load :

```html
<!-- Avant -->
<img src="/assets/image.jpg" alt="Description" />

<!-- Après -->
<img data-src="/assets/image.jpg" alt="Description" />
```

Pour les images responsive avec `srcset` :

```html
<img
  data-src="/assets/image.jpg"
  data-srcset="/assets/image-small.jpg 480w, /assets/image-large.jpg 1200w"
  alt="Description"
/>
```

### Fonctionnement

- Utilise l'API **Intersection Observer** pour détecter les images visibles
- Précharge les images **100px avant** qu'elles n'entrent dans le viewport
- **Effet de blur** pendant le chargement
- **Animation fade-in** une fois chargées
- **Fallback automatique** pour navigateurs non supportés

### États CSS

- `.lazy-loading` - Image en cours de chargement (blur)
- `.lazy-loaded` - Image chargée (fade-in)
- `.lazy-error` - Erreur de chargement

## Design System

### Breakpoints

```css
--breakpoint-xs: 375px
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px
```

### Typographie Fluide

Le site utilise la fonction CSS `clamp()` pour une typographie responsive :

```css
--text-base: clamp(0.9375rem, 1vw + 0.5rem, 1.125rem)
--text-5xl: clamp(3rem, 8vw, 5rem)
```

### Grille Responsive

```html
<!-- Mobile-first: 1 colonne par défaut -->
<div class="grid grid-3 gap-lg">
  <!-- Contenu -->
</div>
```

## Tests End-to-End

Les tests Playwright couvrent :

- ✅ Navigation entre pages
- ✅ Menu mobile responsive
- ✅ Sections principales (hero, vins, etc.)
- ✅ Accessibilité (WCAG)
- ✅ Tests multi-navigateurs (Chrome, Firefox, Safari)
- ✅ Tests mobile (iOS/Android)

### Exécution des Tests

```bash
# Mode headless (CI)
npm run test

# Mode UI interactif
npm run test:ui

# Mode debug
npm run test:debug
```

## Configuration ESLint

Le projet utilise ESLint 9 avec flat config :

- TypeScript strict
- Prettier intégré
- Warnings sur `console.log` (autorise `console.warn` et `console.error`)
- Ignore les variables préfixées par `_`

## Configuration Prettier

- Single quotes
- Semicolons
- Tab width: 4 (TypeScript), 2 (CSS)
- Print width: 100
- Trailing commas: ES5

## Build Multi-Pages

Vite est configuré pour générer 5 pages statiques :

- `index.html` (home)
- `domaine.html`
- `vins.html`
- `visites.html`
- `contact.html`

## Performance

✅ Code splitting automatique par page
✅ Tree shaking via Vite
✅ Lazy loading des images
✅ Preconnect fonts Google
✅ Video poster fallback
✅ CSS modulaire avec ITCSS

## Accessibilité

✅ Touch targets 44px minimum (WCAG AA)
✅ Smooth scroll
✅ Font antialiasing
✅ ARIA labels
✅ Semantic HTML5
✅ Alt text sur toutes les images

## Navigateurs Supportés

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari 14+
- iOS Safari 14+
- Chrome Android

## License

Propriété du Domaine de Lapistoule © 2024

## Contact

Pour toute question technique, contactez l'équipe de développement.
