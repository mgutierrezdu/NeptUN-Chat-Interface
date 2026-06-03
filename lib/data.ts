// UNamigo Data Constants

export const RECURSOS = [
  { icon: "🎓", label: "SIA", desc: "Sistema de Información Académica", url: "https://sia.unal.edu.co", cat: "Académico", bg: "#e8f0fe", border: "#3b5fc0", tx: "#1a3a8f" },
  { icon: "📚", label: "SIBU", desc: "Sistema de Bibliotecas UNAL", url: "https://bibliotecas.unal.edu.co", cat: "Biblioteca", bg: "#e8f5e9", border: "#2e7d32", tx: "#1b5e20" },
  { icon: "📧", label: "Correo Institucional", desc: "Correo @unal.edu.co", url: "https://correo.unal.edu.co", cat: "Comunicación", bg: "#fce4ec", border: "#c62828", tx: "#7f0000" },
  { icon: "📰", label: "UN Periódico", desc: "Noticias y actualidad universitaria", url: "https://unperiodico.unal.edu.co", cat: "Información", bg: "#fff3e0", border: "#e65100", tx: "#bf360c" },
  { icon: "📜", label: "Reglamento Estudiantil", desc: "Acuerdo 008 de 2008 y normativas", url: "https://www.unal.edu.co/reglamento-estudiantil/", cat: "Normativa", bg: "#f3e5f5", border: "#6a1b9a", tx: "#4a148c" },
  { icon: "🏥", label: "Bienestar Universitario", desc: "Salud, deporte, cultura y apoyo", url: "https://bienestar.medellin.unal.edu.co", cat: "Bienestar", bg: "#e0f7fa", border: "#006064", tx: "#004d40" },
  { icon: "📅", label: "Calendario Académico", desc: "Fechas clave del semestre 2025-I", url: "https://www.unal.edu.co/calendario-academico/", cat: "Académico", bg: "#e8f0fe", border: "#3b5fc0", tx: "#1a3a8f" },
  { icon: "⚽", label: "Deportes", desc: "Actividades deportivas y torneos", url: "https://bienestar.medellin.unal.edu.co/deportes/", cat: "Bienestar", bg: "#e0f7fa", border: "#006064", tx: "#004d40" },
  { icon: "🎭", label: "Cultura", desc: "Eventos artísticos y culturales", url: "https://bienestar.medellin.unal.edu.co/cultura/", cat: "Bienestar", bg: "#e0f7fa", border: "#006064", tx: "#004d40" },
  { icon: "💻", label: "Aula Virtual", desc: "Plataforma Moodle UNAL", url: "https://aulavirtual.unal.edu.co", cat: "Académico", bg: "#e8f0fe", border: "#3b5fc0", tx: "#1a3a8f" },
  { icon: "🏛️", label: "Dirección de Sede", desc: "Trámites y servicios administrativos", url: "https://medellin.unal.edu.co", cat: "Gestión", bg: "#f9fbe7", border: "#827717", tx: "#524c00" },
  { icon: "🔬", label: "Oferta Académica", desc: "Programas de pregrado y posgrado", url: "https://medellin.unal.edu.co/oferta-academica/", cat: "Académico", bg: "#e8f0fe", border: "#3b5fc0", tx: "#1a3a8f" },
]

export const FECHAS = [
  { fecha: "Ene 27", ev: "Inicio de clases" },
  { fecha: "Feb 14", ev: "Último día adición de materias" },
  { fecha: "Mar 28", ev: "Semana de receso" },
  { fecha: "Abr 11", ev: "Semana Santa" },
  { fecha: "May 16", ev: "Último día cancelación" },
  { fecha: "Jun 6", ev: "Fin de clases" },
  { fecha: "Jun 9-20", ev: "Evaluaciones finales" },
  { fecha: "Jun 27", ev: "Publicación de notas" },
]

export const POST_CATS = ["General", "Académico", "Eventos", "Oportunidades", "Deportes", "Arte", "Información"]

export const CAT_COLORS: Record<string, string> = {
  General: "#64748b",
  Académico: "#3b5fc0",
  Eventos: "#b45309",
  Oportunidades: "#047857",
  Deportes: "#be123c",
  Arte: "#7c3aed",
  Información: "#0369a1",
}

export interface Post {
  id: number
  autor: string
  avatar: string
  cat: string
  titulo: string
  body: string
  likes: number
  time: string
  liked: boolean
}

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    autor: "Estudiante Ingeniería",
    avatar: "🧑‍💻",
    cat: "Académico",
    titulo: "¿Alguien tiene apuntes de Cálculo III?",
    body: "Busco apuntes del tema de series de Fourier para el parcial del viernes. ¡Gracias!",
    likes: 12,
    time: "hace 2 horas",
    liked: false,
  },
  {
    id: 2,
    autor: "Club de Fotografía",
    avatar: "📸",
    cat: "Eventos",
    titulo: "Exposición fotográfica: 'La ciudad desde el campus'",
    body: "Este viernes en el bloque M5, primer piso. Entrada libre. Bienvenidos todos.",
    likes: 34,
    time: "hace 5 horas",
    liked: false,
  },
  {
    id: 3,
    autor: "Representación Estudiantil",
    avatar: "🏛️",
    cat: "Información",
    titulo: "Resultados del proceso electoral 2025",
    body: "Ya están disponibles los resultados oficiales. Gracias a todos los que participaron.",
    likes: 56,
    time: "hace 1 día",
    liked: false,
  },
  {
    id: 4,
    autor: "Semillero Robótica",
    avatar: "🤖",
    cat: "Oportunidades",
    titulo: "Convocatoria semillero de investigación 2025-II",
    body: "Abrimos convocatoria para nuevos integrantes. No se requiere experiencia previa, solo ganas de aprender.",
    likes: 28,
    time: "hace 2 días",
    liked: false,
  },
]

export const BOT_RESPONSES: Record<string, string> = {
  matrícula:
    "El proceso de matrícula se realiza a través del SIA (sia.unal.edu.co). Debes liquidar el recibo antes de la fecha límite del calendario académico. ¿Necesitas más detalles?",
  matricula:
    "El proceso de matrícula se realiza a través del SIA (sia.unal.edu.co). Debes liquidar el recibo antes de la fecha límite del calendario académico. ¿Necesitas más detalles?",
  reglamento:
    "El reglamento estudiantil de la UNAL está en el Acuerdo 008 de 2008. Puedes consultarlo en la sección Recursos. Regula cancelaciones, pérdida de calidad de estudiante, estímulos y sanciones.",
  cancelar:
    "Según el Artículo 47 del Reglamento, puedes cancelar hasta el 20% de los créditos inscritos sin autorización. Para más, necesitas aval del Comité Asesor. Plazo: semana 8 del semestre.",
  cancelación:
    "Según el Artículo 47 del Reglamento, puedes cancelar hasta el 20% de los créditos inscritos sin autorización. Para más, necesitas aval del Comité Asesor. Plazo: semana 8 del semestre.",
  papa: "El PAPA (Promedio Aritmético Ponderado Acumulado) es el promedio de todas tus materias ponderado por créditos. Un PAPA menor a 3.0 puede implicar pérdida de calidad de estudiante.",
  biblioteca:
    "El SIBU te da acceso a bases de datos como Scopus, Web of Science y JSTOR. Ingresa con tu correo institucional en bibliotecas.unal.edu.co",
  sibu: "El SIBU te da acceso a bases de datos como Scopus, Web of Science y JSTOR. Ingresa con tu correo institucional en bibliotecas.unal.edu.co",
  bienestar:
    "Bienestar Universitario ofrece salud, psicología, deportes y cultura. El apoyo psicológico es gratuito para todos los estudiantes. Más info en bienestar.medellin.unal.edu.co",
  hola: "¡Hola! Puedes preguntarme sobre matrículas, reglamento, biblioteca, bienestar, trámites y más.",
  buenas: "¡Buenas! Estoy aquí para ayudarte con todo lo relacionado con la UNAL Sede Medellín.",
}

export const DEFAULT_RESP =
  "Esa es una buena pregunta. Actualmente mi base de conocimiento está siendo cargada con los documentos oficiales de la UNAL. Pronto podré responderte con más precisión."

export const CHIPS = [
  "¿Cómo cancelo una materia?",
  "¿Qué es el PAPA?",
  "¿Dónde está el reglamento?",
  "Horarios de biblioteca",
  "Apoyo psicológico",
]
