# Changelog - UNamigo

Registro de cambios técnicos del proyecto UNamigo.

---

## [1.0.0] - 2026-06-03

### Migración de HTML a Next.js 16

**Tipo de cambio:** Migración completa de arquitectura

---

### Dependencias Instaladas

| Paquete | Propósito |
|---------|-----------|
| `framer-motion` | Animaciones y transiciones de UI |
| `@radix-ui/react-tabs` | Componente Tabs accesible |
| `@radix-ui/react-avatar` | Imágenes de perfil |
| `@radix-ui/react-scroll-area` | Scroll personalizado |
| `@radix-ui/react-tooltip` | Tooltips accesibles |

---

### Archivos Creados

```
lib/data.ts                    (131 líneas)
├── Interface: Recurso { id, titulo, descripcion, icon, categoria, url }
├── Interface: FechaCalendario { fecha, evento, tipo }
├── Interface: Publicacion { id, autor, avatar, categoria, contenido, likes, tiempo }
├── Const: recursos[] → 6 servicios UNAL
├── Const: calendarioAcademico[] → 5 fechas importantes
├── Const: publicaciones[] → 4 posts de ejemplo
└── Const: sugerenciasRapidas[] → 6 prompts para el chat

components/unal-shield.tsx     (42 líneas)
└── SVG Component: Escudo UNAL vectorizado con colores oficiales

components/chat-panel.tsx      (195 líneas)
├── State: messages[] → Array de mensajes con rol (user|assistant)
├── State: isTyping → Indicador de respuesta en progreso
├── Feature: AnimatePresence para entrada/salida de mensajes
├── Feature: Typing indicator con keyframes CSS
├── Feature: Quick suggestions chips clickeables
└── Feature: Auto-scroll con useRef

components/recursos-panel.tsx  (114 líneas)
├── State: categoriaActiva → Filtro de recursos
├── Section: Calendario académico con badges por tipo
├── Section: Grid de recursos filtrable
└── Feature: Links externos a servicios UNAL

components/mural-panel.tsx     (230 líneas)
├── State: publicaciones[] → Posts con CRUD local
├── State: filtro → Categoría activa
├── State: nuevoPost → Form state para nueva publicación
├── Feature: Sistema de likes con toggle
├── Feature: Filtros por categoría
├── Feature: Formulario de nueva publicación
└── Feature: Stagger animation en lista de posts
```

---

### Archivos Modificados

```
app/page.tsx                   (81 líneas)
├── Layout: Header con shield + branding + badges
├── Component: Tabs con 3 paneles (Chat, Recursos, Mural)
└── Responsive: Mobile-first con max-w-md container

app/layout.tsx                 (68 líneas)
├── Metadata: title, description, keywords SEO
├── Viewport: theme-color #003380, user-scalable=no
└── Font: Inter variable con CSS custom properties
```

---

### Paleta de Colores (CSS Tokens)

| Token | Valor | Uso |
|-------|-------|-----|
| `--unal-blue` | `#003380` | Azul institucional UNAL |
| `--unal-gold` | `#FFCC00` | Dorado/Amarillo UNAL |
| `--background` | `#f8fafc` | Fondo general (slate-50) |
| `--foreground` | `#0f172a` | Texto principal (slate-900) |
| `--muted` | `#64748b` | Texto secundario (slate-500) |

---

### Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                      app/layout.tsx                     │
│  (Inter font, metadata, viewport, global styles)        │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                      app/page.tsx                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Header: UNALShield + "UNamigo" + Badges        │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Tabs (shadcn/ui)                               │   │
│  │  ├── TabsTrigger: Chat | Recursos | Mural      │   │
│  │  └── TabsContent:                               │   │
│  │      ├── <ChatPanel />                          │   │
│  │      ├── <RecursosPanel />                      │   │
│  │      └── <MuralPanel />                         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

### Flujo de Datos

```
lib/data.ts ──export──▶ components/*.tsx ──import──▶ app/page.tsx
     │
     └── Tipos TypeScript + datos estáticos de demostración
```

---

### Patterns Utilizados

| Pattern | Descripción |
|---------|-------------|
| Client Components | `"use client"` para interactividad |
| Compound Components | Tabs con Trigger/Content pattern |
| Controlled Inputs | useState para forms |
| Optimistic UI | Likes actualizan inmediatamente |
| Stagger Animations | delay basado en index para listas |
| Mobile-First | Container max-w-md, touch targets 44px+ |

---

### Notas de Migración

La migración convierte un HTML monolítico de 623 líneas en una arquitectura modular con separación de concerns:
- **Datos** en `lib/`
- **Componentes reutilizables** en `components/`
- **Composición** en `app/`

El estado es local (`useState`) para demostración, pero está estructurado para migrar fácilmente a una base de datos con Server Actions.
