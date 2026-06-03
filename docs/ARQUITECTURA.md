# Arquitectura - UNamigo

Este documento describe la arquitectura tecnica de la aplicacion UNamigo.

---

## Vision General

UNamigo sigue una arquitectura modular basada en componentes, utilizando el App Router de Next.js 16 con React 19.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CAPA DE PRESENTACION                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                         app/layout.tsx                              │  │
│   │   • Configuracion de fuentes (Inter)                                │  │
│   │   • Metadata SEO y Open Graph                                       │  │
│   │   • Viewport y theme-color                                          │  │
│   │   • Importacion de estilos globales                                 │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                          app/page.tsx                               │  │
│   │   • Header con branding                                             │  │
│   │   • Sistema de Tabs (navegacion principal)                          │  │
│   │   • Composicion de paneles                                          │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│              ┌─────────────────────┼─────────────────────┐                 │
│              ▼                     ▼                     ▼                  │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐        │
│   │   ChatPanel      │  │  RecursosPanel   │  │   MuralPanel     │        │
│   │                  │  │                  │  │                  │        │
│   │ • Mensajes       │  │ • Calendario     │  │ • Publicaciones  │        │
│   │ • Input          │  │ • Recursos       │  │ • Likes          │        │
│   │ • Sugerencias    │  │ • Filtros        │  │ • Formulario     │        │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CAPA DE DATOS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                          lib/data.ts                                │  │
│   │                                                                     │  │
│   │   Interfaces:                    Constantes:                        │  │
│   │   • Recurso                      • recursos[]                       │  │
│   │   • FechaCalendario              • calendarioAcademico[]            │  │
│   │   • Publicacion                  • publicaciones[]                  │  │
│   │   • Mensaje                      • sugerenciasRapidas[]             │  │
│   │                                                                     │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE UI (shadcn/ui)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   components/ui/                                                            │
│   ├── avatar.tsx      → Imagenes de perfil circulares                      │
│   ├── badge.tsx       → Etiquetas de estado y categorias                   │
│   ├── button.tsx      → Botones con variantes                              │
│   ├── card.tsx        → Contenedores con sombra                            │
│   ├── input.tsx       → Campos de entrada de texto                         │
│   ├── scroll-area.tsx → Areas con scroll personalizado                     │
│   ├── tabs.tsx        → Navegacion por pestanas                            │
│   ├── textarea.tsx    → Areas de texto multilinea                          │
│   └── tooltip.tsx     → Tooltips accesibles                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Patrones de Diseno

### 1. Client Components

Todos los paneles interactivos utilizan la directiva `"use client"` para habilitar:
- Estado local con `useState`
- Efectos con `useEffect`
- Referencias con `useRef`
- Event handlers

```typescript
"use client"

import { useState } from "react"

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  // ...
}
```

### 2. Compound Components

El sistema de Tabs utiliza el patron Compound Components de Radix UI:

```tsx
<Tabs defaultValue="chat">
  <TabsList>
    <TabsTrigger value="chat">Chat</TabsTrigger>
    <TabsTrigger value="recursos">Recursos</TabsTrigger>
    <TabsTrigger value="mural">Mural</TabsTrigger>
  </TabsList>
  
  <TabsContent value="chat">
    <ChatPanel />
  </TabsContent>
  {/* ... */}
</Tabs>
```

### 3. Controlled Components

Los formularios utilizan estado controlado:

```typescript
const [nuevoPost, setNuevoPost] = useState({
  contenido: "",
  categoria: "general"
})

<Textarea
  value={nuevoPost.contenido}
  onChange={(e) => setNuevoPost(prev => ({
    ...prev,
    contenido: e.target.value
  }))}
/>
```

### 4. Optimistic UI

Las interacciones como likes se actualizan inmediatamente sin esperar confirmacion del servidor:

```typescript
const handleLike = (id: string) => {
  setPublicaciones(prev => prev.map(pub => 
    pub.id === id 
      ? { ...pub, likes: pub.liked ? pub.likes - 1 : pub.likes + 1, liked: !pub.liked }
      : pub
  ))
}
```

---

## Flujo de Datos

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Usuario   │────▶│   Evento    │────▶│   Estado    │
│  (Interaccion)    │  (onClick)  │     │  (useState) │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Re-render  │
                                        │ (React 19)  │
                                        └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │     UI      │
                                        │ Actualizada │
                                        └─────────────┘
```

### Estado Local vs Global

| Tipo de Estado | Ubicacion | Ejemplo |
|----------------|-----------|---------|
| Mensajes del chat | `ChatPanel` | `messages[]` |
| Publicaciones | `MuralPanel` | `publicaciones[]` |
| Filtros activos | Cada panel | `categoriaActiva` |
| Formularios | Cada panel | `nuevoPost`, `inputValue` |

---

## Sistema de Estilos

### Tailwind CSS v4

La aplicacion utiliza Tailwind CSS v4 con la nueva sintaxis de configuracion en CSS:

```css
/* app/globals.css */
@import 'tailwindcss';

@theme inline {
  --font-sans: 'Inter', system-ui, sans-serif;
  --color-unal-blue: #003380;
  --color-unal-gold: #FFCC00;
}
```

### Tokens de Diseno

```css
:root {
  /* Colores UNAL */
  --unal-blue: 220 100% 25%;
  --unal-gold: 48 100% 50%;
  
  /* Colores semanticos */
  --background: 210 40% 98%;
  --foreground: 222 84% 5%;
  --primary: var(--unal-blue);
  --accent: var(--unal-gold);
}
```

---

## Animaciones

### Framer Motion

Se utiliza Framer Motion para animaciones declarativas:

```tsx
import { motion, AnimatePresence } from "framer-motion"

// Animacion de entrada para mensajes
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>

// Stagger animation para listas
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

### Animaciones CSS

Para micro-interacciones simples:

```css
@keyframes typing {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}

.typing-dot {
  animation: typing 1.4s infinite;
}
```

---

## Accesibilidad (a11y)

### Caracteristicas Implementadas

- **Navegacion por teclado**: Todos los elementos interactivos son accesibles con Tab
- **ARIA labels**: Componentes de Radix UI incluyen atributos ARIA correctos
- **Contraste de colores**: Paleta UNAL cumple con WCAG 2.1 AA
- **Focus visible**: Anillos de enfoque claros en todos los elementos
- **Texto alternativo**: Implementado en imagenes y avatares

### Ejemplo de Accesibilidad

```tsx
<Button
  aria-label="Enviar mensaje"
  disabled={!inputValue.trim()}
>
  <Send className="h-4 w-4" />
  <span className="sr-only">Enviar</span>
</Button>
```

---

## Rendimiento

### Optimizaciones Implementadas

1. **Code Splitting**: Cada panel se carga de forma independiente
2. **Tree Shaking**: Solo se importan los iconos necesarios de Lucide
3. **CSS-in-JS eliminado**: Tailwind genera CSS estatico
4. **Fuentes optimizadas**: Next.js Font optimiza la carga de Inter

### Metricas Objetivo

| Metrica | Objetivo | Estado |
|---------|----------|--------|
| LCP | < 2.5s | Pendiente medicion |
| FID | < 100ms | Pendiente medicion |
| CLS | < 0.1 | Pendiente medicion |

---

## Proximos Pasos de Arquitectura

### Fase 2: Backend

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ARQUITECTURA FUTURA                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Frontend (Next.js)                                                        │
│        │                                                                    │
│        ▼                                                                    │
│   Server Actions ──────▶ API Routes ──────▶ Base de Datos                  │
│        │                      │                  │                          │
│        │                      │                  ▼                          │
│        │                      │            ┌──────────┐                    │
│        │                      │            │   Neon   │                    │
│        │                      │            │ Postgres │                    │
│        │                      │            └──────────┘                    │
│        │                      │                                             │
│        │                      ▼                                             │
│        │               ┌──────────────┐                                    │
│        │               │  AI Gateway  │                                    │
│        │               │  (Vercel)    │                                    │
│        └──────────────▶└──────────────┘                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tecnologias Planificadas

- **Base de datos**: Neon (Postgres serverless)
- **ORM**: Drizzle ORM
- **Autenticacion**: Better Auth
- **IA**: Vercel AI Gateway con modelos OpenAI/Anthropic
- **Cache**: React Cache + revalidateTag
