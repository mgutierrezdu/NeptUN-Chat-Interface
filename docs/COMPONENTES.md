# API de Componentes - UNamigo

Documentacion tecnica de los componentes principales de la aplicacion.

---

## Indice

1. [ChatPanel](#chatpanel)
2. [RecursosPanel](#recursospanel)
3. [MuralPanel](#muralpanel)
4. [UNALShield](#unalshield)

---

## ChatPanel

Panel de chat interactivo con el asistente virtual UNamigo.

### Ubicacion
```
components/chat-panel.tsx
```

### Props
Este componente no recibe props externas. Todo el estado es interno.

### Estado Interno

| Estado | Tipo | Descripcion |
|--------|------|-------------|
| `messages` | `Message[]` | Array de mensajes de la conversacion |
| `inputValue` | `string` | Valor actual del campo de texto |
| `isTyping` | `boolean` | Indica si el bot esta "escribiendo" |

### Interfaces

```typescript
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}
```

### Funciones Internas

#### `handleSend()`
Envia un mensaje del usuario y genera una respuesta simulada del bot.

```typescript
const handleSend = () => {
  if (!inputValue.trim()) return
  
  // Agregar mensaje del usuario
  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content: inputValue,
    timestamp: new Date()
  }
  
  setMessages(prev => [...prev, userMessage])
  setInputValue("")
  setIsTyping(true)
  
  // Simular respuesta del bot (1.5s delay)
  setTimeout(() => {
    const botMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Respuesta generada...",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, botMessage])
    setIsTyping(false)
  }, 1500)
}
```

#### `handleSuggestionClick(suggestion: string)`
Maneja el click en chips de sugerencias rapidas.

### Uso

```tsx
import { ChatPanel } from "@/components/chat-panel"

export default function Page() {
  return (
    <TabsContent value="chat">
      <ChatPanel />
    </TabsContent>
  )
}
```

### Subcomponentes

- **MessageBubble**: Burbuja individual de mensaje
- **TypingIndicator**: Indicador de "escribiendo..." con puntos animados
- **SuggestionChips**: Chips de sugerencias rapidas

---

## RecursosPanel

Panel con calendario academico y recursos institucionales.

### Ubicacion
```
components/recursos-panel.tsx
```

### Props
Este componente no recibe props externas.

### Estado Interno

| Estado | Tipo | Descripcion |
|--------|------|-------------|
| `categoriaActiva` | `string` | Filtro de categoria activo |

### Datos Importados

```typescript
import { recursos, calendarioAcademico } from "@/lib/data"
```

### Interfaces (desde lib/data.ts)

```typescript
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
```

### Funciones Internas

#### `filtrarRecursos()`
Filtra los recursos por categoria seleccionada.

```typescript
const recursosFiltrados = categoriaActiva === "todos"
  ? recursos
  : recursos.filter(r => r.categoria === categoriaActiva)
```

### Uso

```tsx
import { RecursosPanel } from "@/components/recursos-panel"

export default function Page() {
  return (
    <TabsContent value="recursos">
      <RecursosPanel />
    </TabsContent>
  )
}
```

### Secciones

1. **Calendario Academico**: Lista de fechas con badges de tipo
2. **Filtros de Categoria**: Botones para filtrar recursos
3. **Grid de Recursos**: Tarjetas con enlaces a servicios UNAL

---

## MuralPanel

Mural comunitario para publicaciones de estudiantes.

### Ubicacion
```
components/mural-panel.tsx
```

### Props
Este componente no recibe props externas.

### Estado Interno

| Estado | Tipo | Descripcion |
|--------|------|-------------|
| `publicaciones` | `Publicacion[]` | Array de publicaciones |
| `filtro` | `string` | Categoria activa para filtrar |
| `nuevoPost` | `object` | Estado del formulario de nueva publicacion |
| `mostrarFormulario` | `boolean` | Visibilidad del formulario |

### Interfaces (desde lib/data.ts)

```typescript
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
```

### Funciones Internas

#### `handleLike(id: string)`
Toggle de like en una publicacion.

```typescript
const handleLike = (id: string) => {
  setPublicaciones(prev => prev.map(pub => 
    pub.id === id 
      ? { 
          ...pub, 
          likes: pub.liked ? pub.likes - 1 : pub.likes + 1, 
          liked: !pub.liked 
        }
      : pub
  ))
}
```

#### `handleSubmit(e: FormEvent)`
Crea una nueva publicacion.

```typescript
const handleSubmit = (e: FormEvent) => {
  e.preventDefault()
  
  const nuevaPublicacion: Publicacion = {
    id: crypto.randomUUID(),
    autor: "Tu",
    avatar: "/placeholder-user.jpg",
    categoria: nuevoPost.categoria,
    contenido: nuevoPost.contenido,
    likes: 0,
    liked: false,
    tiempo: "Ahora"
  }
  
  setPublicaciones(prev => [nuevaPublicacion, ...prev])
  setNuevoPost({ contenido: "", categoria: "general" })
  setMostrarFormulario(false)
}
```

### Uso

```tsx
import { MuralPanel } from "@/components/mural-panel"

export default function Page() {
  return (
    <TabsContent value="mural">
      <MuralPanel />
    </TabsContent>
  )
}
```

### Subcomponentes

- **PostCard**: Tarjeta individual de publicacion
- **FilterButtons**: Botones de filtro por categoria
- **NewPostForm**: Formulario para crear publicaciones

---

## UNALShield

Componente SVG del escudo de la Universidad Nacional.

### Ubicacion
```
components/unal-shield.tsx
```

### Props

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `className` | `string` | `""` | Clases CSS adicionales |
| `width` | `number` | `40` | Ancho en pixeles |
| `height` | `number` | `40` | Alto en pixeles |

### Uso

```tsx
import { UNALShield } from "@/components/unal-shield"

// Uso basico
<UNALShield />

// Con tamano personalizado
<UNALShield width={60} height={60} />

// Con clases adicionales
<UNALShield className="drop-shadow-lg" />
```

### Colores

El escudo utiliza los colores oficiales de la UNAL:
- Fondo circular: `#003380` (Azul UNAL)
- Elementos decorativos: `#FFCC00` (Dorado UNAL)
- Texto y detalles: `#FFFFFF` (Blanco)

---

## Componentes UI (shadcn/ui)

La aplicacion utiliza componentes de shadcn/ui basados en Radix UI.

### Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/usuario.jpg" alt="Nombre" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

// Variantes disponibles
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

### Button

```tsx
import { Button } from "@/components/ui/button"

// Variantes
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Tamanos
<Button size="sm">Pequeno</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grande</Button>
<Button size="icon"><Icon /></Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Titulo</CardTitle>
    <CardDescription>Descripcion</CardDescription>
  </CardHeader>
  <CardContent>
    Contenido principal
  </CardContent>
  <CardFooter>
    <Button>Accion</Button>
  </CardFooter>
</Card>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1">
    Contenido Tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Contenido Tab 2
  </TabsContent>
</Tabs>
```

### ScrollArea

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-[400px]">
  {/* Contenido largo */}
</ScrollArea>
```

---

## Patrones Comunes

### Animacion de Lista con Stagger

```tsx
import { motion } from "framer-motion"

{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.3,
      delay: index * 0.1 
    }}
  >
    <ItemCard item={item} />
  </motion.div>
))}
```

### Auto-scroll al Final

```tsx
const scrollRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }
}, [messages])

<ScrollArea ref={scrollRef}>
  {messages.map(msg => <Message key={msg.id} {...msg} />)}
</ScrollArea>
```

### Filtrado de Datos

```tsx
const [filtro, setFiltro] = useState("todos")

const datosFiltrados = filtro === "todos"
  ? datos
  : datos.filter(item => item.categoria === filtro)
```
