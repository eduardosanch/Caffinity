import { type Actividad } from '../../components/cafeterias-data';

export interface Publicacion {
  id: string;
  imagen: string;
  imagenAlt: string;
  descripcion?: string;
  autor: {
    id: string;
    nombre: string;
    avatar: string;
    avatarAlt: string;
    username: string;
  };
  cafeteria?: {
    id: string;
    nombre: string;
    zona: string;
  };
  actividades: Actividad[];
  likes: number;
  comentarios: number;
  fechaPublicacion: string;
  aspectRatio: 'tall' | 'square' | 'wide';
}

// Backend integration point: replace with GET /api/feed?page=1&limit=20&filter=actividad
export const publicacionesData: Publicacion[] = [
{
  id: 'post-001',
  imagen: "https://images.unsplash.com/photo-1615324606777-e44e600daba7",
  imagenAlt: 'Latte art en forma de corazón en taza blanca sobre mesa de madera clara con libro abierto al lado',
  descripcion: 'El latte art de Alma Tostada es un poema ☕❤️ Imposible no fotografiarlo antes de tomarlo',
  autor: { id: 'user-001', nombre: 'Valentina Cruz', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a59e2d00-1772547096340.png", avatarAlt: 'Joven mujer con cabello oscuro sonriendo', username: 'vale.cruz' },
  cafeteria: { id: 'cafe-001', nombre: 'Alma Tostada', zona: 'Polanco' },
  actividades: ['fotos', 'amigos'],
  likes: 342,
  comentarios: 28,
  fechaPublicacion: '2026-05-03',
  aspectRatio: 'tall'
},
{
  id: 'post-002',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_18e6cf8e3-1772302350626.png",
  imagenAlt: 'Sesión de estudio con laptop, café negro y cuadernos sobre mesa de madera en cafetería tranquila',
  descripcion: 'Modo productividad activado 💻 Bruma Café nunca falla para entregar proyectos',
  autor: { id: 'user-002', nombre: 'Diego Ramírez', avatar: "https://images.unsplash.com/photo-1676641140940-ec1acde6deae", avatarAlt: 'Hombre joven con lentes mirando a la cámara', username: 'diegoram' },
  cafeteria: { id: 'cafe-002', nombre: 'Bruma Café', zona: 'Roma Norte' },
  actividades: ['estudiar'],
  likes: 189,
  comentarios: 14,
  fechaPublicacion: '2026-05-03',
  aspectRatio: 'square'
},
{
  id: 'post-003',
  imagen: "https://images.unsplash.com/photo-1723532108634-4bacae8aef26",
  imagenAlt: 'Croissant dorado con mantequilla sobre plato de cerámica blanca junto a capuchino con espuma',
  descripcion: 'El croissant de La Florería es la razón por la que existo 🥐✨',
  autor: { id: 'user-003', nombre: 'Camila Torres', avatar: "https://images.unsplash.com/photo-1717454396563-a8e605c98a86", avatarAlt: 'Mujer joven con cabello rubio sonriendo', username: 'cami.t' },
  cafeteria: { id: 'cafe-003', nombre: 'La Florería', zona: 'Condesa' },
  actividades: ['comida', 'fotos'],
  likes: 567,
  comentarios: 41,
  fechaPublicacion: '2026-05-02',
  aspectRatio: 'tall'
},
{
  id: 'post-004',
  imagen: "https://images.unsplash.com/photo-1688683035769-c82129c9bcf2",
  imagenAlt: 'Vista aérea de mesa con dos tazas de café, flores secas y revista sobre superficie de mármol',
  descripcion: 'Domingo de café en Nube Rosada con las mejores compañías 💜',
  autor: { id: 'user-004', nombre: 'Sofía Mendoza', avatar: "https://images.unsplash.com/photo-1646388996215-fa7d7f7c9a4b", avatarAlt: 'Mujer joven con cabello negro rizado y aretes dorados', username: 'sofi.mndz' },
  cafeteria: { id: 'cafe-005', nombre: 'Nube Rosada', zona: 'Nápoles' },
  actividades: ['amigos', 'fotos'],
  likes: 421,
  comentarios: 33,
  fechaPublicacion: '2026-05-02',
  aspectRatio: 'square'
},
{
  id: 'post-005',
  imagen: "https://images.unsplash.com/photo-1655240632879-a631b058df8d",
  imagenAlt: 'Granos de café tostados esparcidos sobre superficie de madera oscura con taza de café negro al fondo',
  descripcion: 'El tueste de Tostado Profundo es otro nivel 🔥 Notas de chocolate y frutos rojos',
  autor: { id: 'user-005', nombre: 'Andrés Leal', avatar: "https://images.unsplash.com/photo-1641723345469-e7cd0c037f62", avatarAlt: 'Hombre joven con barba sonriendo a la cámara', username: 'andres.leal' },
  cafeteria: { id: 'cafe-004', nombre: 'Tostado Profundo', zona: 'Doctores' },
  actividades: ['comida', 'estudiar'],
  likes: 98,
  comentarios: 7,
  fechaPublicacion: '2026-05-01',
  aspectRatio: 'tall'
},
{
  id: 'post-006',
  imagen: "https://images.unsplash.com/photo-1683899800990-c43813c9c4f4",
  imagenAlt: 'Latte de lavanda color morado pálido en vaso transparente con flores lavanda al lado sobre mesa blanca',
  descripcion: 'El latte de lavanda de Nube Rosada es demasiado bonito para tomarlo 💜📸',
  autor: { id: 'user-001', nombre: 'Valentina Cruz', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a59e2d00-1772547096340.png", avatarAlt: 'Joven mujer con cabello oscuro sonriendo', username: 'vale.cruz' },
  cafeteria: { id: 'cafe-005', nombre: 'Nube Rosada', zona: 'Nápoles' },
  actividades: ['fotos'],
  likes: 734,
  comentarios: 62,
  fechaPublicacion: '2026-05-01',
  aspectRatio: 'square'
},
{
  id: 'post-007',
  imagen: "https://images.unsplash.com/photo-1630176849565-09b828c0d802",
  imagenAlt: 'Jardín cafetería con mesas de hierro blancas rodeadas de plantas verdes y flores coloridas bajo la luz del sol',
  descripcion: 'Refugio Verde literalmente me cambió la vida. El jardín es un sueño 🌿',
  autor: { id: 'user-006', nombre: 'Lucía Vargas', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15d44bed4-1772335739115.png", avatarAlt: 'Mujer joven con cabello castaño y sonrisa amplia', username: 'lu.vargas' },
  cafeteria: { id: 'cafe-006', nombre: 'Refugio Verde', zona: 'Coyoacán' },
  actividades: ['fotos', 'amigos', 'estudiar'],
  likes: 289,
  comentarios: 19,
  fechaPublicacion: '2026-04-30',
  aspectRatio: 'tall'
},
{
  id: 'post-008',
  imagen: "https://images.unsplash.com/photo-1605601934199-627b27bb02e5",
  imagenAlt: 'Pastel de tres leches decorado con fresas frescas y crema en plato de cerámica artesanal',
  descripcion: 'El pastel de tres leches de La Florería merece todos los premios del universo 🍰',
  autor: { id: 'user-003', nombre: 'Camila Torres', avatar: "https://images.unsplash.com/photo-1717454396563-a8e605c98a86", avatarAlt: 'Mujer joven con cabello rubio sonriendo', username: 'cami.t' },
  cafeteria: { id: 'cafe-003', nombre: 'La Florería', zona: 'Condesa' },
  actividades: ['comida'],
  likes: 445,
  comentarios: 37,
  fechaPublicacion: '2026-04-30',
  aspectRatio: 'square'
},
{
  id: 'post-009',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_15685a9ef-1768084452803.png",
  imagenAlt: 'Grupo de amigos riendo alrededor de mesa con múltiples bebidas de café en cafetería iluminada',
  descripcion: 'Reunión de tesis en Bruma Café. Sobrevivimos 📖💪',
  autor: { id: 'user-007', nombre: 'Mateo Ríos', avatar: "https://images.unsplash.com/photo-1702316004281-9dc21e40e304", avatarAlt: 'Hombre joven con cabello rizado y sonrisa', username: 'mateo.rios' },
  cafeteria: { id: 'cafe-002', nombre: 'Bruma Café', zona: 'Roma Norte' },
  actividades: ['estudiar', 'amigos'],
  likes: 156,
  comentarios: 22,
  fechaPublicacion: '2026-04-29',
  aspectRatio: 'tall'
},
{
  id: 'post-010',
  imagen: "https://images.unsplash.com/photo-1599354852488-8db99aec5133",
  imagenAlt: 'Barista preparando café de especialidad con técnica pour-over en cafetera de vidrio, vista de cerca',
  descripcion: 'Así se prepara el café en Alma Tostada. Cada taza es arte ☕🎨',
  autor: { id: 'user-002', nombre: 'Diego Ramírez', avatar: "https://images.unsplash.com/photo-1676641140940-ec1acde6deae", avatarAlt: 'Hombre joven con lentes mirando a la cámara', username: 'diegoram' },
  cafeteria: { id: 'cafe-001', nombre: 'Alma Tostada', zona: 'Polanco' },
  actividades: ['fotos'],
  likes: 612,
  comentarios: 48,
  fechaPublicacion: '2026-04-29',
  aspectRatio: 'square'
}];