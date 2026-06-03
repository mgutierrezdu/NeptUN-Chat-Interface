# Guia de Contribucion - UNamigo

Gracias por tu interes en contribuir a UNamigo. Este documento te guiara a traves del proceso de contribucion.

---

## Indice

1. [Codigo de Conducta](#codigo-de-conducta)
2. [Como Contribuir](#como-contribuir)
3. [Configuracion del Entorno](#configuracion-del-entorno)
4. [Estandares de Codigo](#estandares-de-codigo)
5. [Proceso de Pull Request](#proceso-de-pull-request)
6. [Reportar Bugs](#reportar-bugs)
7. [Solicitar Features](#solicitar-features)

---

## Codigo de Conducta

Este proyecto sigue un codigo de conducta basado en el respeto mutuo. Al participar, te comprometes a:

- Usar un lenguaje acogedor e inclusivo
- Respetar diferentes puntos de vista y experiencias
- Aceptar criticas constructivas con gracia
- Enfocarte en lo mejor para la comunidad
- Mostrar empatia hacia otros miembros

---

## Como Contribuir

### Tipos de Contribuciones

| Tipo | Descripcion |
|------|-------------|
| **Bug Fix** | Correccion de errores existentes |
| **Feature** | Nueva funcionalidad |
| **Docs** | Mejoras en documentacion |
| **Style** | Cambios de formato/estilos (sin afectar logica) |
| **Refactor** | Refactorizacion de codigo existente |
| **Test** | Agregar o mejorar tests |
| **Chore** | Actualizacion de dependencias, config, etc. |

### Flujo de Trabajo

```
1. Fork del repositorio
         │
         ▼
2. Clonar tu fork
         │
         ▼
3. Crear rama de feature
         │
         ▼
4. Desarrollar cambios
         │
         ▼
5. Commit con mensaje descriptivo
         │
         ▼
6. Push a tu fork
         │
         ▼
7. Crear Pull Request
         │
         ▼
8. Revision de codigo
         │
         ▼
9. Merge a main
```

---

## Configuracion del Entorno

### Requisitos

- Node.js 20.x o superior
- pnpm 9.x (gestor de paquetes recomendado)
- Git
- Editor con soporte TypeScript (VS Code recomendado)

### Pasos de Configuracion

```bash
# 1. Fork del repositorio en GitHub

# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/v0-unamigo-chat-interface.git
cd v0-unamigo-chat-interface

# 3. Agregar upstream
git remote add upstream https://github.com/mgutierrezdu/v0-unamigo-chat-interface.git

# 4. Instalar dependencias
pnpm install

# 5. Iniciar servidor de desarrollo
pnpm dev
```

### Extensiones de VS Code Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

## Estandares de Codigo

### TypeScript

- Usar tipos explicitos en funciones y componentes
- Evitar `any`, usar `unknown` si es necesario
- Definir interfaces para props de componentes

```typescript
// CORRECTO
interface ChatPanelProps {
  initialMessages?: Message[]
  onSend?: (message: string) => void
}

export function ChatPanel({ initialMessages = [], onSend }: ChatPanelProps) {
  // ...
}

// INCORRECTO
export function ChatPanel(props: any) {
  // ...
}
```

### React

- Usar componentes funcionales con hooks
- Nombrar componentes con PascalCase
- Nombrar archivos con kebab-case
- Un componente principal por archivo

```typescript
// components/chat-panel.tsx
"use client"

import { useState } from "react"

export function ChatPanel() {
  const [state, setState] = useState()
  // ...
}
```

### Tailwind CSS

- Usar clases de Tailwind sobre CSS personalizado
- Seguir orden logico de clases
- Usar tokens de diseno definidos

```tsx
// CORRECTO
<div className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm">

// INCORRECTO
<div style={{ display: 'flex', padding: '16px' }}>
```

### Orden de Clases Tailwind

1. Layout (flex, grid, block)
2. Posicionamiento (relative, absolute)
3. Box Model (w, h, p, m)
4. Tipografia (text, font)
5. Colores (bg, text)
6. Bordes (border, rounded)
7. Efectos (shadow, opacity)
8. Transiciones (transition, duration)

### Commits

Seguimos la convencion de Conventional Commits:

```
<tipo>(<alcance>): <descripcion>

[cuerpo opcional]

[footer opcional]
```

#### Tipos de Commit

| Tipo | Uso |
|------|-----|
| `feat` | Nueva caracteristica |
| `fix` | Correccion de bug |
| `docs` | Cambios en documentacion |
| `style` | Formato (sin cambios de codigo) |
| `refactor` | Refactorizacion |
| `test` | Agregar tests |
| `chore` | Tareas de mantenimiento |

#### Ejemplos

```bash
# Feature
git commit -m "feat(chat): agregar indicador de escritura animado"

# Bug fix
git commit -m "fix(mural): corregir contador de likes negativo"

# Documentacion
git commit -m "docs: actualizar README con instrucciones de instalacion"

# Refactor
git commit -m "refactor(recursos): extraer logica de filtrado a custom hook"
```

---

## Proceso de Pull Request

### Antes de Crear el PR

1. **Sincronizar con upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ejecutar linting**
   ```bash
   pnpm lint
   ```

3. **Verificar build**
   ```bash
   pnpm build
   ```

4. **Probar manualmente**
   - Navegar por todas las pestanas
   - Probar interacciones (chat, likes, formularios)
   - Verificar en mobile

### Plantilla de PR

```markdown
## Descripcion

Breve descripcion de los cambios realizados.

## Tipo de Cambio

- [ ] Bug fix
- [ ] Nueva feature
- [ ] Cambio de documentacion
- [ ] Refactorizacion
- [ ] Otro: ___

## Cambios Realizados

- Cambio 1
- Cambio 2

## Screenshots (si aplica)

| Antes | Despues |
|-------|---------|
| img   | img     |

## Checklist

- [ ] Mi codigo sigue los estandares del proyecto
- [ ] He probado mis cambios localmente
- [ ] He actualizado la documentacion (si es necesario)
- [ ] El linting pasa sin errores
- [ ] El build compila correctamente
```

### Proceso de Revision

1. Un maintainer revisara tu PR
2. Podrian solicitar cambios
3. Una vez aprobado, se hara merge a `main`
4. El deploy automatico actualizara la aplicacion

---

## Reportar Bugs

### Antes de Reportar

- Verificar que el bug no haya sido reportado
- Confirmar que es reproducible
- Recolectar informacion del entorno

### Plantilla de Bug Report

```markdown
## Descripcion del Bug

Descripcion clara y concisa del problema.

## Pasos para Reproducir

1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado

Que deberia pasar.

## Comportamiento Actual

Que pasa actualmente.

## Screenshots

Si aplica, agregar capturas de pantalla.

## Entorno

- OS: [ej. macOS 14.0]
- Navegador: [ej. Chrome 120]
- Version de Node: [ej. 20.10.0]

## Contexto Adicional

Cualquier otra informacion relevante.
```

---

## Solicitar Features

### Antes de Solicitar

- Verificar que no exista una solicitud similar
- Considerar si encaja con el proposito del proyecto
- Pensar en posibles implementaciones

### Plantilla de Feature Request

```markdown
## Descripcion de la Feature

Descripcion clara de lo que quieres que suceda.

## Problema que Resuelve

Cual es el problema o necesidad que esta feature resolveria.

## Solucion Propuesta

Como imaginas que deberia funcionar.

## Alternativas Consideradas

Otras soluciones que hayas pensado.

## Contexto Adicional

Mockups, ejemplos de otras apps, etc.
```

---

## Recursos Utiles

### Documentacion

- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Radix UI](https://www.radix-ui.com)

### Herramientas

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## Contacto

Si tienes preguntas sobre el proceso de contribucion:

1. Abre un Issue con etiqueta `question`
2. Revisa los Issues existentes
3. Consulta la documentacion del proyecto

---

Gracias por contribuir a UNamigo y ayudar a mejorar la experiencia de los estudiantes de la Universidad Nacional.
