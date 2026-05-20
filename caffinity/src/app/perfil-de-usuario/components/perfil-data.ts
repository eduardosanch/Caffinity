import { type Cafeteria } from '../../components/cafeterias-data';
import { cafeteriasData } from '../../components/cafeterias-data';

export interface Resena {
  id: string;
  cafeteria: {id: string;nombre: string;zona: string;imagen: string;imagenAlt: string;};
  calificacion: number;
  texto: string;
  fecha: string;
  utilidad: number;
}

export interface UsuarioPerfil {
  id: string;
  nombre: string;
  username: string;
  bio: string;
  avatar: string;
  avatarAlt: string;
  coverImage: string;
  coverImageAlt: string;
  ubicacion: string;
  miembroDesde: string;
  stats: {
    matches: number;
    listaDeseos: number;
    reseñas: number;
    seguidores: number;
    siguiendo: number;
  };
}

export interface Publicacion {
  id: string;
  imagen: string;
  imagenAlt: string;
  titulo: string;
  descripcion: string;
  cafeteria: {
    id: string;
    nombre: string;
    zona: string;
  };
  fecha: string;
  likes: number;
  comentarios: number;
}

// Backend integration point: GET /api/users/me
export const usuarioActual: UsuarioPerfil = {
  id: 'user-001',
  nombre: 'Valentina Cruz',
  username: 'vale.cruz',
  bio: 'Cazadora de cafés perfectos ☕ | Estudiante de diseño | Fan del latte art y los croissants de mantequilla 🥐',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b16f1962-1772813758078.png",
  avatarAlt: 'Foto de perfil de Valentina Cruz, joven mujer con cabello oscuro sonriendo en cafetería',
  coverImage: "https://images.unsplash.com/photo-1653903058305-3931c60169a8",
  coverImageAlt: 'Imagen de portada mostrando interior acogedor de cafetería boutique con flores y café',
  ubicacion: 'Ciudad de México',
  miembroDesde: 'Enero 2026',
  stats: {
    matches: 18,
    listaDeseos: 12,
    reseñas: 7,
    seguidores: 284,
    siguiendo: 97
  }
};

// Backend integration point: GET /api/users/me/wishlist
export const listaDeseosData: Cafeteria[] = [
cafeteriasData[2], // La Florería
cafeteriasData[4], // Nube Rosada
cafeteriasData[5], // Refugio Verde
cafeteriasData[0] // Alma Tostada
];

// Backend integration point: GET /api/users/me/matches
export const matchesData: Cafeteria[] = [
cafeteriasData[0], // Alma Tostada
cafeteriasData[2], // La Florería
cafeteriasData[4], // Nube Rosada
cafeteriasData[1], // Bruma Café
cafeteriasData[5] // Refugio Verde
];

// Backend integration point: GET /api/users/me/reviews
export const reseñasData: Resena[] = [
{
  id: 'review-001',
  cafeteria: {
    id: 'cafe-001',
    nombre: 'Alma Tostada',
    zona: 'Polanco',
    imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_13d22eb8c-1777856673016.png",
    imagenAlt: 'Interior de Alma Tostada con plantas y luz natural'
  },
  calificacion: 5,
  texto: 'El ambiente es absolutamente perfecto para trabajar y tomar fotos. El latte de vainilla con canela es mi favorito de toda la ciudad. El personal es súper amable y siempre hay buena música. Definitivamente mi cafetería número uno.',
  fecha: '2026-04-28',
  utilidad: 24
},
{
  id: 'review-002',
  cafeteria: {
    id: 'cafe-003',
    nombre: 'La Florería',
    zona: 'Condesa',
    imagen: "https://images.unsplash.com/photo-1595669380426-69e78b3dc7d0",
    imagenAlt: 'Vitrina de pasteles en La Florería con flores decorativas'
  },
  calificacion: 5,
  texto: 'Los croissants son de otro mundo. La decoración floral hace que cada rincón sea fotogénico. Un poco caro pero vale completamente la pena para una ocasión especial.',
  fecha: '2026-04-15',
  utilidad: 18
},
{
  id: 'review-003',
  cafeteria: {
    id: 'cafe-002',
    nombre: 'Bruma Café',
    zona: 'Roma Norte',
    imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_18391ffc5-1777856673337.png",
    imagenAlt: 'Mesa de trabajo en Bruma Café con laptop y café'
  },
  calificacion: 4,
  texto: 'Ideal para estudiar. El WiFi nunca falla y hay enchufes en cada mesa. El cold brew es el mejor que he probado. A veces se llena mucho entre semana pero siempre encuentras lugar.',
  fecha: '2026-03-22',
  utilidad: 31
}];

// Backend integration point: GET /api/users/me/posts
export const publicacionesData: Publicacion[] = [
  {
    id: 'post-001',
    imagen: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7",
    imagenAlt: 'Latte art en forma de hoja en taza blanca',
    titulo: 'El arte perfecto de la mañana',
    descripcion: 'Cuando el barista capta tu esencia en espuma. Este latte de Alma Tostada fue mi inicio perfecto de día. ☕✨',
    cafeteria: { id: 'cafe-001', nombre: 'Alma Tostada', zona: 'Polanco' },
    fecha: '2026-05-15',
    likes: 42,
    comentarios: 8
  },
  {
    id: 'post-002',
    imagen: "https://images.unsplash.com/photo-1587521177117-45a470f063e1",
    imagenAlt: 'Croissant de mantequilla recién salido del horno',
    titulo: 'Tentación de panadería',
    descripcion: 'Los croissants de La Florería son sinónimo de perfección. Crujientes por fuera, mantequillosos por dentro. 🥐💛',
    cafeteria: { id: 'cafe-003', nombre: 'La Florería', zona: 'Condesa' },
    fecha: '2026-05-12',
    likes: 58,
    comentarios: 12
  },
  {
    id: 'post-003',
    imagen: "https://images.unsplash.com/photo-1511537190424-e0d03c4f9e8e",
    imagenAlt: 'Mesa de trabajo en cafetería con plantas verdes',
    titulo: 'Mi oficina favorita',
    descripcion: 'Bruma Café es mi coworking secreto. Vibes tranquilas y WiFi de velocidad de luz. 📱☕',
    cafeteria: { id: 'cafe-002', nombre: 'Bruma Café', zona: 'Roma Norte' },
    fecha: '2026-05-08',
    likes: 36,
    comentarios: 6
  },
  {
    id: 'post-004',
    imagen: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    imagenAlt: 'Taza de café con patrón de espuma decorativo',
    titulo: 'Viernes de cafe',
    descripcion: 'Iniciando el fin de semana con mi bebida favorita. ¿Ya visitaron La Nube Rosada? 🌸☕',
    cafeteria: { id: 'cafe-004', nombre: 'Nube Rosada', zona: 'San Ángel' },
    fecha: '2026-05-05',
    likes: 67,
    comentarios: 14
  },
  {
    id: 'post-005',
    imagen: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
    imagenAlt: 'Café americano en taza de cerámica artesanal',
    titulo: 'Minimalismo en taza',
    descripcion: 'A veces lo simple es lo mejor. Un buen café americano y una vista hermosa. Todo lo que necesito. ☕️🖤',
    cafeteria: { id: 'cafe-005', nombre: 'Refugio Verde', zona: 'Coyoacán' },
    fecha: '2026-04-30',
    likes: 45,
    comentarios: 9
  },
  {
    id: 'post-006',
    imagen: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
    imagenAlt: 'Desayuno completo en mesa de madera rústica',
    titulo: 'Combo perfecto para el desayuno',
    descripcion: 'Cuando todo encaja: café espresso, pan tostado y buena compañía. Alma Tostada always delivers 💚☕',
    cafeteria: { id: 'cafe-001', nombre: 'Alma Tostada', zona: 'Polanco' },
    fecha: '2026-04-25',
    likes: 53,
    comentarios: 11
  }
];