# 🔐 Diagrama de Flujo del Sistema de Autenticación

## 1️⃣ Flujo de Login

```
┌─────────────────────────────────────────────────────┐
│              PANTALLA DE LOGIN                      │
│  Email: [user@ejemplo.com]                          │
│  Password: [••••••••]                               │
│  [Iniciar Sesión]                                   │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ Validar Email      │
          │ Validar Password   │
          └────────┬───────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼ Válido              ▼ Inválido
    ┌────────────┐        ┌────────────────┐
    │ Buscar en  │        │ Mostrar Error  │
    │localStorage│        │ "Credenciales  │
    └────┬───────┘        │  incorrectas"  │
         │                └────────────────┘
    ┌────▼──────┐
    │ ¿Existe?  │
    └────┬──────┘
         │
    ┌────┴─────┐
    │ Sí        │
    ▼           ▼ No
 ┌──────┐  ┌──────────────┐
 │Compa │  │Mostrar Error │
 │rar   │  │"Usuario no   │
 │Pass  │  │encontrado"   │
 └──┬───┘  └──────────────┘
    │
    └─────────────┬────────────┐
                  ▼            ▼ Contraseña Incorrecta
             ✅ Correcto    ❌ Error
                  │
                  ▼
    ┌─────────────────────────────┐
    │ Guardar en localStorage:    │
    │ caffinity_user = {...}      │
    │ (sin password)              │
    └──────────┬──────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Redirigir a Home /       │
    │ AuthProvider actualiza   │
    │ estado global            │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ ✅ AUTENTICADO           │
    │ Acceso a todas las       │
    │ pantallas protegidas     │
    └──────────────────────────┘
```

## 2️⃣ Flujo de Registro de Usuario

```
┌──────────────────────────────────────────────────────┐
│         PANTALLA DE REGISTRO - USUARIO               │
│  Nombre: [Juan Pérez]                                │
│  Email: [juan@ejemplo.com]                           │
│  Teléfono: [+34 612 345 678]  (Opcional)            │
│  Password: [••••••••]                                │
│  Confirmar: [••••••••]                               │
│  [Crear Cuenta]                                      │
└───────────────┬────────────────────────────────────┘
                │
                ▼
      ┌─────────────────────┐
      │ VALIDACIONES        │
      ├─────────────────────┤
      │ □ Nombre requerido  │
      │ □ Email válido      │
      │ □ Password ≥ 6 car  │
      │ □ Passwords iguales │
      └────────┬────────────┘
               │
    ┌──────────┴──────────┐
    ▼ Error               ▼ Válido
┌──────────┐        ┌──────────────┐
│Mostrar   │        │Verificar     │
│Mensaje   │        │email único   │
│Error     │        │en localStorage
└──────────┘        └────┬─────────┘
                         │
                   ┌─────┴──────┐
                   ▼            ▼ Email ya existe
              ✅ Único    ❌ Duplicado
                   │           │
                   │      ┌─────▼────────┐
                   │      │Mostrar Error │
                   │      │"Email ya     │
                   │      │registrado"   │
                   │      └──────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │ Crear nuevo usuario:         │
    │ {                            │
    │   id: 'user_TIMESTAMP',      │
    │   email: '...',              │
    │   fullName: '...',           │
    │   phone: '...',              │
    │   role: 'user',              │
    │   password: '...',           │
    │   createdAt: ISO             │
    │ }                            │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ localStorage[caffinity_users]│
    │ = [...prevUsers, newUser]    │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ Guardar usuario actual:      │
    │ localStorage[caffinity_user] │
    │ = {...newUser (sin pass)}    │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ ✅ CUENTA CREADA             │
    │ Redirigir a Home             │
    │ Usuario autenticado          │
    └──────────────────────────────┘
```

## 3️⃣ Flujo de Registro de Cafetería

```
┌────────────────────────────────────────────────────┐
│     PANTALLA DE REGISTRO - CAFETERÍA               │
│                                                    │
│  📋 Información Personal                           │
│  Nombre: [María García]                            │
│  Email: [cafe@ejemplo.com]                         │
│  Teléfono: [+34 698 765 432]  (Opcional)          │
│  Password: [••••••••]                              │
│  Confirmar: [••••••••]                             │
│                                                    │
│  ☕ Información de Cafetería                      │
│  Nombre Cafetería: [Café La Esquina]               │
│  Dirección: [Calle Principal 123]                  │
│  Ciudad: [Madrid] Zona: [Centro]                   │
│  Descripción: [Cafetería artesanal con...]         │
│                                                    │
│  [Registrar Cafetería]                             │
└───────────────┬────────────────────────────────────┘
                │
                ▼
      ┌──────────────────────────┐
      │ VALIDACIONES ESTRICTAS   │
      ├──────────────────────────┤
      │ □ Nombre completo        │
      │ □ Email único y válido   │
      │ □ Password ≥ 6 caracteres│
      │ □ Passwords iguales      │
      │ □ Nombre cafetería       │
      │ □ Dirección              │
      │ □ Ciudad                 │
      │ □ Zona                   │
      │ □ Descripción            │
      └────────┬─────────────────┘
               │
    ┌──────────┴────────────┐
    ▼ Error                 ▼ Válido
┌──────────────┐    ┌──────────────┐
│Mostrar Error │    │Verificar     │
│específico    │    │email único   │
└──────────────┘    └────┬─────────┘
                         │
                   ┌─────┴──────┐
                   ▼            ▼ Existe
              ✅ Único    ❌ Error
                   │
                   ▼
    ┌──────────────────────────────────┐
    │ Crear usuario de cafetería:      │
    │ {                                │
    │   id: 'cafe_TIMESTAMP',          │
    │   email: '...',                  │
    │   fullName: '...',               │
    │   phone: '...',                  │
    │   role: 'cafeteria',             │
    │   password: '...',               │
    │   cafeteriaName: '...',          │
    │   address: '...',                │
    │   city: '...',                   │
    │   zone: '...',                   │
    │   description: '...',            │
    │   createdAt: ISO                 │
    │ }                                │
    └──────────┬───────────────────────┘
               │
               ▼
    ┌──────────────────────────────────┐
    │ localStorage[caffinity_users]    │
    │ = [...prevUsers, newCafeteria]   │
    └──────────┬───────────────────────┘
               │
               ▼
    ┌──────────────────────────────────┐
    │ Guardar cafetería actual:        │
    │ localStorage[caffinity_user]     │
    │ = {...newCafeteria (sin pass)}   │
    └──────────┬───────────────────────┘
               │
               ▼
    ┌──────────────────────────────────┐
    │ ✅ CAFETERÍA REGISTRADA          │
    │ Redirigir a Home                 │
    │ Usuario (Cafetería) autenticado  │
    └──────────────────────────────────┘
```

## 4️⃣ Protección de Rutas

```
┌──────────────────────────────────────────────────┐
│  Usuario intenta acceder a ruta protegida        │
│  (/, /feed-de-descubrimiento, /perfil-usuario)  │
└──────────────┬───────────────────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ <ProtectedRoute>     │
    │ Verifica:            │
    │ ¿está autenticado?   │
    └────────┬─────────────┘
             │
       ┌─────┴──────┐
       ▼            ▼
    ✅ Sí       ❌ No
    (user)   (no user)
       │            │
       │            ▼
       │    ┌────────────────────┐
       │    │ Redirigir a /auth  │
       │    └────────────────────┘
       │
       ▼
   ✅ Renderizar
      Componente
      Protegido
       │
       ▼
   ┌──────────────────────┐
   │ Mostrar barra nav    │
   │ (con botón Salir)    │
   └──────────────────────┘
```

## 5️⃣ Flujo de Logout

```
┌─────────────────────────────┐
│  Usuario en home protegido  │
│  (Barra nav visible)        │
└──────────────┬──────────────┘
               │
               ▼
    ┌────────────────────┐
    │ Click en "Salir"   │
    │ (BottomNav)        │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────────┐
    │ handleLogout():        │
    │ • logout()             │
    │ • router.push('/auth') │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ AuthContext:           │
    │ • setUser(null)        │
    │ • localStorage.remove()│
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Redirigir a /auth      │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ ✅ SESIÓN CERRADA      │
    │ Volver a pantalla      │
    │ de login               │
    └────────────────────────┘
```

## 6️⃣ Gestión del Estado Global

```
┌─────────────────────────────────────────────────────┐
│  <AuthProvider> (Envuelve toda la app)              │
│  ┌───────────────────────────────────────────────┐  │
│  │  AuthContext.tsx                              │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │ Estado:                                  │  │  │
│  │  │ • user: User | CafeteriaUser | null    │  │  │
│  │  │ • loading: boolean                       │  │  │
│  │  │ • error: string | null                   │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  │                                               │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │ Métodos:                                 │  │  │
│  │  │ • login(email, password)                │  │  │
│  │  │ • registerUser(data)                     │  │  │
│  │  │ • registerCafeteria(data)                │  │  │
│  │  │ • logout()                               │  │  │
│  │  │ • clearError()                           │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  │                                               │  │
│  │  localStorage:                                │  │
│  │  • caffinity_user (usuario actual)            │  │
│  │  • caffinity_users (todos los usuarios)       │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                     ▲
         ┌───────────┤
         │           │
         ▼           ▼
   LoginScreen   RegisterScreen   RegisterCafeteriaScreen
         │           │                    │
         └───────────┴────────────────────┘
                     │
                     ▼
        useAuth() → Acceso a estado
                  global y métodos
```

## 7️⃣ Estructura de localStorage

```
┌─────────────────────────────────────────┐
│     LOCALSTORAGE - caffinity            │
├─────────────────────────────────────────┤
│                                         │
│  caffinity_users: [                     │
│    {                                    │
│      id: 'user_1234567890',            │
│      email: 'usuario@ejemplo.com',      │
│      fullName: 'Juan Pérez García',    │
│      phone: '+34 612 345 678',         │
│      password: '123456',                │
│      role: 'user',                      │
│      createdAt: '2026-05-16T...',      │
│      updatedAt: '2026-05-16T...'       │
│    },                                   │
│    {                                    │
│      id: 'cafe_1234567891',            │
│      email: 'cafe@ejemplo.com',         │
│      fullName: 'María García López',   │
│      phone: '+34 698 765 432',         │
│      password: '123456',                │
│      role: 'cafeteria',                 │
│      cafeteriaName: 'Café La Esquina', │
│      address: 'Calle Principal 123',   │
│      city: 'Madrid',                    │
│      zone: 'Centro',                    │
│      description: '...',                │
│      createdAt: '2026-05-16T...',      │
│      updatedAt: '2026-05-16T...'       │
│    }                                    │
│  ]                                      │
│                                         │
│  caffinity_user: {                      │
│    id: 'user_1234567890',              │
│    email: 'usuario@ejemplo.com',        │
│    fullName: 'Juan Pérez García',      │
│    phone: '+34 612 345 678',           │
│    role: 'user',                        │
│    createdAt: '2026-05-16T...',        │
│    updatedAt: '2026-05-16T...'         │
│  }                                      │
│  (Sin password por seguridad)           │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Estados Posibles

```
┌─────────────────────────────────────────────────────┐
│             MÁQUINA DE ESTADOS                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [NO AUTENTICADO]                                   │
│  user = null                                        │
│  loading = false                                    │
│  error = null | string                              │
│  ┌────────────────────────────────────┐            │
│  │ En pantalla /auth                  │            │
│  │ • LoginScreen                      │            │
│  │ • RegisterScreen                   │            │
│  │ • RegisterCafeteriaScreen          │            │
│  └────────────┬───────────────────────┘            │
│               │                                     │
│      (login success) (register success)             │
│               │                                     │
│               ▼                                     │
│  [AUTENTICADO]                                      │
│  user = User | CafeteriaUser                        │
│  loading = false                                    │
│  error = null                                       │
│  ┌────────────────────────────────────┐            │
│  │ En pantalla protegida              │            │
│  │ • Home (/)                         │            │
│  │ • Feed                             │            │
│  │ • Perfil                           │            │
│  │ • BottomNav con botón Salir       │            │
│  └────────────┬───────────────────────┘            │
│               │                                     │
│              (logout)                               │
│               │                                     │
│               ▼                                     │
│  [CERRADA SESIÓN]                                   │
│  Regresa a [NO AUTENTICADO]                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

**Diagrama creado para facilitar la comprensión del flujo de autenticación** 🎯
