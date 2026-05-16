export type Actividad = 'estudiar' | 'amigos' | 'comida' | 'fotos';

export interface Cafeteria {
  id: string;
  nombre: string;
  zona: string;
  ciudad: string;
  precioRango: string;
  calificacion: number;
  totalResenas: number;
  actividades: Actividad[];
  descripcion: string;
  imagen: string;
  imagenAlt: string;
  distancia: string;
  horario: string;
  wifi: boolean;
  destacada: boolean;
}

export const actividadConfig: Record<Actividad, {label: string;emoji: string;color: string;}> = {
  estudiar: { label: 'Estudiar', emoji: '📚', color: '#522C5D' },
  amigos: { label: 'Amigos', emoji: '👯', color: '#845162' },
  comida: { label: 'Comida', emoji: '🍰', color: '#E3B6B1' },
  fotos: { label: 'Fotos', emoji: '📸', color: '#29104A' }
};

// Backend integration point: replace with API call to GET /api/cafeterias?lat=...&lng=...&limit=10
export const cafeteriasData: Cafeteria[] = [
{
  id: 'cafe-001',
  nombre: 'Alma Tostada',
  zona: 'Polanco',
  ciudad: 'Ciudad de México',
  precioRango: '$$',
  calificacion: 4.8,
  totalResenas: 312,
  actividades: ['fotos', 'amigos', 'estudiar'],
  descripcion: 'Espacio luminoso con plantas tropicales, lattes de especialidad y ambiente perfecto para sesiones fotográficas. Arquitectura moderna con luz natural todo el día.',
  imagen: "https://images.unsplash.com/photo-1633944241961-e511ab23455f",
  imagenAlt: 'Interior luminoso de cafetería con plantas tropicales, mesas de madera y luz natural entrando por ventanales',
  distancia: '1.2 km',
  horario: '7:00 – 21:00',
  wifi: true,
  destacada: true
},
{
  id: 'cafe-002',
  nombre: 'Bruma Café',
  zona: 'Roma Norte',
  ciudad: 'Ciudad de México',
  precioRango: '$',
  calificacion: 4.6,
  totalResenas: 198,
  actividades: ['estudiar', 'amigos'],
  descripcion: 'El rincón favorito de los estudiantes. WiFi ultrarrápido, enchufes en cada mesa y música lo-fi que ayuda a concentrarse. El cold brew es legendario.',
  imagen: "https://images.unsplash.com/photo-1695738655574-3a11b87394b8",
  imagenAlt: 'Cafetería acogedora con estantes de libros, laptops sobre mesas de madera y ambiente íntimo con luz cálida',
  distancia: '0.8 km',
  horario: '6:30 – 22:00',
  wifi: true,
  destacada: false
},
{
  id: 'cafe-003',
  nombre: 'La Florería',
  zona: 'Condesa',
  ciudad: 'Ciudad de México',
  precioRango: '$$$',
  calificacion: 4.9,
  totalResenas: 541,
  actividades: ['fotos', 'amigos', 'comida'],
  descripcion: 'Cafetería boutique rodeada de flores frescas. Pastelería artesanal con croissants de mantequilla francesa y café de origen único. El lugar más instagrameable de la ciudad.',
  imagen: "https://images.unsplash.com/photo-1626916772777-dc79f882253f",
  imagenAlt: 'Cafetería boutique con arreglos florales coloridos, vitrinas de pasteles y decoración vintage elegante',
  distancia: '2.1 km',
  horario: '8:00 – 20:00',
  wifi: false,
  destacada: true
},
{
  id: 'cafe-004',
  nombre: 'Tostado Profundo',
  zona: 'Doctores',
  ciudad: 'Ciudad de México',
  precioRango: '$',
  calificacion: 4.5,
  totalResenas: 87,
  actividades: ['estudiar', 'comida'],
  descripcion: 'Café de especialidad con tueste propio. Menú de desayunos contundentes y el mejor espresso de la colonia. Ambiente tranquilo y sin pretensiones.',
  imagen: "https://images.unsplash.com/photo-1543148369-2b0672c4b686",
  imagenAlt: 'Barra de café con granos de café tostados, máquina espresso profesional y barista preparando bebidas',
  distancia: '3.4 km',
  horario: '7:30 – 19:00',
  wifi: true,
  destacada: false
},
{
  id: 'cafe-005',
  nombre: 'Nube Rosada',
  zona: 'Nápoles',
  ciudad: 'Ciudad de México',
  precioRango: '$$',
  calificacion: 4.7,
  totalResenas: 276,
  actividades: ['fotos', 'amigos', 'comida'],
  descripcion: 'Aesthetic café en tonos pastel con lattes de lavanda y mariposa azul. Las bebidas son obras de arte. Ideal para contenido de redes sociales y tardes con amigas.',
  imagen: "https://images.unsplash.com/photo-1675940529917-ffbcb6e1e326",
  imagenAlt: 'Cafetería en tonos pastel rosa y lavanda con bebidas coloridas decoradas con flores comestibles',
  distancia: '1.8 km',
  horario: '9:00 – 21:30',
  wifi: true,
  destacada: true
},
{
  id: 'cafe-006',
  nombre: 'Refugio Verde',
  zona: 'Coyoacán',
  ciudad: 'Ciudad de México',
  precioRango: '$$',
  calificacion: 4.4,
  totalResenas: 143,
  actividades: ['estudiar', 'fotos', 'amigos'],
  descripcion: 'Jardín secreto con mesas entre plantas y árboles. Menú vegano y opciones de café de especialidad. El lugar perfecto para leer o trabajar en un ambiente natural.',
  imagen: "https://images.unsplash.com/photo-1646116370969-27fedd2393e7",
  imagenAlt: 'Cafetería jardín exterior con mesas rodeadas de plantas verdes exuberantes y luz solar filtrada entre hojas',
  distancia: '4.2 km',
  horario: '8:00 – 20:30',
  wifi: true,
  destacada: false
}];