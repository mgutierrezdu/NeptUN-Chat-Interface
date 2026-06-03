# UNamigo - Asistente Virtual UNAL

<div align="center">

![UNamigo Logo](https://img.shields.io/badge/UNamigo-v0.1.0--beta-003380?style=for-the-badge&labelColor=FFCC00)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-06B6D4?style=flat-square&logo=tailwindcss)

**Asistente virtual inteligente para estudiantes de la Universidad Nacional de Colombia**

[Demo en Vivo](https://v0.app/chat/projects/prj_ABreVnped1mWeoAXIdSLUe7GfSCy) · [Reportar Bug](https://github.com/mgutierrezdu/v0-unamigo-chat-interface/issues) · [Solicitar Feature](https://github.com/mgutierrezdu/v0-unamigo-chat-interface/issues)

</div>

---

## Descripcion del Proyecto

UNamigo es una aplicacion web progresiva (PWA) disenada para asistir a estudiantes de la Universidad Nacional de Colombia en su vida academica. Proporciona acceso rapido a recursos institucionales, un chatbot inteligente para resolver dudas y un mural comunitario para interaccion entre estudiantes.

### Capturas de Pantalla

| Chat IA | Recursos | Mural |
|---------|----------|-------|
| Asistente virtual con respuestas contextualizadas | Calendario academico y enlaces a servicios UNAL | Publicaciones y comunidad estudiantil |

---

## Caracteristicas Principales

### Chat con IA
- Respuestas contextualizadas sobre tramites academicos
- Sugerencias rapidas predefinidas
- Indicador de escritura animado
- Historial de conversacion en sesion

### Panel de Recursos
- **Calendario Academico**: Fechas importantes del semestre
- **Servicios UNAL**: Enlaces directos a SIA, SIBU, Bienestar, correo institucional
- **Filtros por categoria**: Academico, biblioteca, bienestar, tecnologia

### Mural Comunitario
- Publicaciones de estudiantes
- Sistema de likes
- Filtros por categoria (eventos, academico, bienestar, general)
- Formulario para nuevas publicaciones

---

## Stack Tecnologico

| Categoria | Tecnologia | Version |
|-----------|------------|---------|
| **Framework** | Next.js (App Router) | 16.2.6 |
| **UI Library** | React | 19 |
| **Lenguaje** | TypeScript | 5.7.3 |
| **Estilos** | Tailwind CSS | 4.2.0 |
| **Componentes** | shadcn/ui + Radix UI | - |
| **Animaciones** | Framer Motion | 12.40.0 |
| **Iconos** | Lucide React | 1.16.0 |

---

## Instalacion

### Prerequisitos

- Node.js 20.x o superior
- pnpm 9.x (recomendado) o npm/yarn

### Pasos de Instalacion

```bash
# 1. Clonar el repositorio
git clone https://github.com/mgutierrezdu/v0-unamigo-chat-interface.git

# 2. Navegar al directorio
cd v0-unamigo-chat-interface

# 3. Instalar dependencias
pnpm install

# 4. Iniciar servidor de desarrollo
pnpm dev
```

La aplicacion estara disponible en [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo con HMR |
| `pnpm build` | Genera build de produccion |
| `pnpm start` | Inicia servidor de produccion |
| `pnpm lint` | Ejecuta ESLint para analisis de codigo |

---

## Estructura del Proyecto

```
unamigo/
├── app/                          # App Router de Next.js
│   ├── globals.css               # Estilos globales y tokens CSS
│   ├── layout.tsx                # Layout raiz con metadata
│   └── page.tsx                  # Pagina principal
│
├── components/                   # Componentes React
│   ├── ui/                       # Componentes shadcn/ui
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── scroll-area.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   │
│   ├── chat-panel.tsx            # Panel de chat con IA
│   ├── mural-panel.tsx           # Mural comunitario
│   ├── recursos-panel.tsx        # Panel de recursos
│   └── unal-shield.tsx           # Escudo UNAL (SVG)
│
├── lib/                          # Utilidades y datos
│   ├── data.ts                   # Datos estaticos y tipos
│   └── utils.ts                  # Funciones auxiliares
│
├── public/                       # Assets estaticos
│   ├── icon.svg
│   └── placeholder-*.{jpg,png,svg}
│
├── docs/                         # Documentacion adicional
│   ├── ARQUITECTURA.md           # Documentacion de arquitectura
│   ├── COMPONENTES.md            # API de componentes
│   └── CONTRIBUIR.md             # Guia de contribucion
│
├── CHANGELOG.md                  # Historial de cambios
├── components.json               # Configuracion shadcn/ui
├── next.config.mjs               # Configuracion Next.js
├── package.json                  # Dependencias y scripts
├── postcss.config.mjs            # Configuracion PostCSS
├── tailwind.config.ts            # Configuracion Tailwind (v4)
└── tsconfig.json                 # Configuracion TypeScript
```

---

## Paleta de Colores

La aplicacion utiliza los colores institucionales de la Universidad Nacional:

| Color | Codigo Hex | Uso |
|-------|------------|-----|
| **Azul UNAL** | `#003380` | Color primario, header, botones |
| **Dorado UNAL** | `#FFCC00` | Acentos, badges, hover states |
| **Fondo** | `#f8fafc` | Background general |
| **Texto** | `#0f172a` | Texto principal |
| **Muted** | `#64748b` | Texto secundario |

---

## Desarrollo con v0

Este repositorio esta vinculado a un proyecto de [v0](https://v0.app). Puedes continuar el desarrollo visitando el enlace de abajo. Cada merge a `main` se despliega automaticamente.

[Continuar trabajando en v0](https://v0.app/chat/projects/prj_ABreVnped1mWeoAXIdSLUe7GfSCy)

---

## Roadmap

- [ ] Integracion con API de IA (OpenAI/Anthropic)
- [ ] Autenticacion con correo institucional UNAL
- [ ] Base de datos para persistencia (Neon + Drizzle)
- [ ] Notificaciones push
- [ ] Modo offline (PWA)
- [ ] Integracion con SIA para consulta de notas
- [ ] Calendario sincronizado con Google Calendar

---

## Contribuir

Las contribuciones son bienvenidas. Por favor lee [CONTRIBUIR.md](docs/CONTRIBUIR.md) para conocer el proceso.

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva caracteristica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

---

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para mas informacion.

---

## Contacto

**Proyecto UNamigo** - Universidad Nacional de Colombia

Link del Proyecto: [https://github.com/mgutierrezdu/v0-unamigo-chat-interface](https://github.com/mgutierrezdu/v0-unamigo-chat-interface)

---

<div align="center">

Hecho con el corazon para la comunidad UNAL

**Universidad Nacional de Colombia** · Sede Bogota

</div>
