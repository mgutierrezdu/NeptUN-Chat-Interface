# Historial de Cambios - UNamigo

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semantico](https://semver.org/lang/es/).

---

## [Sin Publicar]

### Por Hacer
- Integracion con API de IA (Vercel AI Gateway)
- Autenticacion con Better Auth + Neon
- Persistencia de datos con Drizzle ORM
- Notificaciones push (PWA)
- Modo offline

---

## [0.1.0-beta] - 2026-06-03

### Resumen
Primera version beta de UNamigo. Migracion completa desde prototipo HTML estatico
a aplicacion React/Next.js moderna con arquitectura modular.

---

### Agregado

#### Infraestructura
- Proyecto Next.js 16 con App Router
- TypeScript 5.7.3 con configuracion estricta
- Tailwind CSS v4 con tokens de diseno personalizados
- shadcn/ui como sistema de componentes base
- Framer Motion para animaciones

#### Componentes Principales

**ChatPanel** (`components/chat-panel.tsx`)
- Interfaz de chat con mensajes de usuario y asistente
- Indicador de escritura animado con puntos pulsantes
- Chips de sugerencias rapidas clickeables
- Auto-scroll al recibir nuevos mensajes
- Respuestas simuladas con delay de 1.5 segundos
- Aviso de modo demo para usuarios

**RecursosPanel** (`components/recursos-panel.tsx`)
- Calendario academico con fechas del semestre 2026-1
- Badges de tipo para fechas (importante, academico, receso)
- Grid de recursos filtrable por categoria
- Enlaces a servicios UNAL: SIA, SIBU, Bienestar, correo, Hermes

**MuralPanel** (`components/mural-panel.tsx`)
- Feed de publicaciones estilo red social
- Sistema de likes con estado optimista
- Filtros por categoria (eventos, academico, bienestar, general)
- Formulario para crear nuevas publicaciones
- Animaciones stagger en lista de posts
- Avatares con fallback de iniciales

**UNALShield** (`components/unal-shield.tsx`)
- Escudo de la Universidad Nacional en SVG vectorizado
- Colores oficiales institucionales
- Props configurables para tamano

#### Datos y Tipos

**lib/data.ts**
```typescript
// Interfaces definidas
interface Recurso {
  id: string
  titulo: string
  descripcion: string
  icon: string
  categoria: "academico" | "biblioteca" | "bienestar" | "tecnologia"
  url: string
}

interface FechaCalendario {
  fecha: string
  evento: string
  tipo: "importante" | "academico" | "receso"
}

interface Publicacion {
  id: string
  autor: string
  avatar: string
  categoria: "evento" | "academico" | "bienestar" | "general"
  contenido: string
  likes: number
  liked: boolean
  tiempo: string
}

// Datos de ejemplo incluidos
- 6 recursos institucionales
- 5 fechas del calendario academico
- 4 publicaciones de ejemplo
- 6 sugerencias rapidas para el chat
```

#### Componentes UI (shadcn/ui)
- `avatar.tsx` - Imagenes de perfil con fallback
- `badge.tsx` - Etiquetas de estado
- `button.tsx` - Botones con variantes
- `card.tsx` - Contenedores con sombra
- `input.tsx` - Campos de texto
- `scroll-area.tsx` - Areas con scroll personalizado
- `tabs.tsx` - Navegacion por pestanas
- `textarea.tsx` - Areas de texto multilinea
- `tooltip.tsx` - Tooltips accesibles

#### Documentacion
- `README.md` - Documentacion principal del proyecto
- `CHANGELOG.md` - Historial de cambios (este archivo)
- `docs/ARQUITECTURA.md` - Documentacion tecnica de arquitectura
- `docs/COMPONENTES.md` - API de componentes
- `docs/CONTRIBUIR.md` - Guia de contribucion

---

### Detalles Tecnicos

#### Dependencias Instaladas

| Paquete | Version | Proposito |
|---------|---------|-----------|
| `next` | 16.2.6 | Framework React con SSR |
| `react` | 19.x | Biblioteca UI |
| `typescript` | 5.7.3 | Tipado estatico |
| `tailwindcss` | 4.2.0 | Framework CSS utility-first |
| `framer-motion` | 12.40.0 | Animaciones declarativas |
| `lucide-react` | 1.16.0 | Iconos SVG |
| `class-variance-authority` | 0.7.1 | Variantes de componentes |
| `clsx` | 2.1.1 | Condicionales de clases |
| `tailwind-merge` | 3.3.1 | Merge inteligente de clases |

#### Arquitectura de Archivos

```
unamigo/
├── app/
│   ├── globals.css          # Estilos globales + tokens
│   ├── layout.tsx           # Layout raiz + metadata
│   └── page.tsx             # Pagina principal + tabs
│
├── components/
│   ├── ui/                  # Componentes shadcn/ui (9 archivos)
│   ├── chat-panel.tsx       # Panel de chat (195 lineas)
│   ├── mural-panel.tsx      # Mural comunitario (230 lineas)
│   ├── recursos-panel.tsx   # Panel de recursos (114 lineas)
│   └── unal-shield.tsx      # Escudo SVG (42 lineas)
│
├── lib/
│   ├── data.ts              # Datos y tipos (131 lineas)
│   └── utils.ts             # Utilidades (cn helper)
│
├── docs/
│   ├── ARQUITECTURA.md      # Documentacion de arquitectura
│   ├── COMPONENTES.md       # API de componentes
│   └── CONTRIBUIR.md        # Guia de contribucion
│
├── public/                  # Assets estaticos
├── CHANGELOG.md             # Este archivo
└── README.md                # Documentacion principal
```

#### Paleta de Colores

| Token | Valor Hex | HSL | Uso |
|-------|-----------|-----|-----|
| `--unal-blue` | `#003380` | `220 100% 25%` | Color primario institucional |
| `--unal-gold` | `#FFCC00` | `48 100% 50%` | Color de acento |
| `--background` | `#f8fafc` | `210 40% 98%` | Fondo de aplicacion |
| `--foreground` | `#0f172a` | `222 84% 5%` | Texto principal |
| `--muted` | `#64748b` | `215 16% 47%` | Texto secundario |

#### Patrones de Diseno Implementados

| Patron | Ubicacion | Descripcion |
|--------|-----------|-------------|
| Client Components | Todos los paneles | `"use client"` para interactividad |
| Compound Components | Tabs | Pattern de Radix UI |
| Controlled Inputs | Formularios | Estado con useState |
| Optimistic UI | Likes | Actualizacion inmediata sin esperar servidor |
| Stagger Animation | Listas | Delay incremental por indice |
| Auto-scroll | Chat | useRef + useEffect para scroll automatico |

#### Metricas de Codigo

| Metrica | Valor |
|---------|-------|
| Total de archivos creados | 15 |
| Lineas de codigo (aprox.) | 1,200+ |
| Componentes React | 13 |
| Interfaces TypeScript | 4 |
| Tiempo de migracion | ~30 minutos |

---

### Migracion desde HTML

#### Antes (Prototipo HTML)
- 1 archivo HTML de 623 lineas
- JavaScript inline con datos hardcoded
- CSS embebido con estilos duplicados
- Sin tipado ni modularidad
- Dificil de mantener y escalar

#### Despues (Next.js App)
- Arquitectura modular con separacion de concerns
- Datos centralizados y tipados en `lib/data.ts`
- Componentes reutilizables con props definidas
- Estilos consistentes via Tailwind tokens
- Documentacion completa
- Listo para agregar backend y autenticacion

---

### Notas de la Version

Esta es una version beta con las siguientes limitaciones:
- El chat usa respuestas simuladas (sin IA real)
- Los datos son estaticos (sin persistencia)
- No hay autenticacion de usuarios
- El mural no persiste publicaciones entre sesiones

Estas limitaciones se abordaran en las proximas versiones con la integracion
de Vercel AI Gateway, Neon Postgres y Better Auth.

---

## Enlaces

- [Repositorio](https://github.com/mgutierrezdu/v0-unamigo-chat-interface)
- [Demo en Vivo](https://v0.app/chat/projects/prj_ABreVnped1mWeoAXIdSLUe7GfSCy)
- [Reportar Bug](https://github.com/mgutierrezdu/v0-unamigo-chat-interface/issues)
