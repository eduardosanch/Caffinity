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
    resenas: number;
    seguidores: number;
    siguiendo: number;
  };
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
    resenas: 7,
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
export const resenasData: Resena[] = [
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