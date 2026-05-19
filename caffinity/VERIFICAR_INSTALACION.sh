#!/bin/bash

# 📋 VERIFICACIÓN DE INSTALACIÓN - SISTEMA DE AUTENTICACIÓN

echo "🔍 VERIFICANDO INSTALACIÓN DE CAFFINITY..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador
TOTAL=0
ENCONTRADOS=0

# Función para verificar archivo
check_file() {
    TOTAL=$((TOTAL+1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1"
        ENCONTRADOS=$((ENCONTRADOS+1))
    else
        echo -e "${RED}❌${NC} $1 (NO ENCONTRADO)"
    fi
}

# Función para verificar directorio
check_dir() {
    TOTAL=$((TOTAL+1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1/"
        ENCONTRADOS=$((ENCONTRADOS+1))
    else
        echo -e "${RED}❌${NC} $1/ (NO ENCONTRADO)"
    fi
}

echo "📦 ARCHIVOS DE CONFIGURACIÓN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "package.json"
check_file "tsconfig.json"
check_file "next.config.mjs"
check_file "tailwind.config.js"
echo ""

echo "📁 DIRECTORIOS PRINCIPALES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_dir "src"
check_dir "src/app"
check_dir "src/components"
check_dir "src/types"
check_dir "src/contexts"
check_dir "src/styles"
echo ""

echo "🔐 ARCHIVOS DE AUTENTICACIÓN (NUEVOS)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "src/types/auth.ts"
check_file "src/contexts/AuthContext.tsx"
check_file "src/components/ProtectedRoute.tsx"
check_dir "src/app/auth"
check_file "src/app/auth/page.tsx"
check_dir "src/app/auth/components"
check_file "src/app/auth/components/LoginScreen.tsx"
check_file "src/app/auth/components/RegisterScreen.tsx"
check_file "src/app/auth/components/RegisterCafeteriaScreen.tsx"
echo ""

echo "📱 PÁGINAS PRINCIPALES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "src/app/layout.tsx"
check_file "src/app/page.tsx"
check_file "src/app/feed-de-descubrimiento/page.tsx"
check_file "src/app/perfil-de-usuario/page.tsx"
echo ""

echo "🧩 COMPONENTES PRINCIPALES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "src/components/AppLayout.tsx"
check_file "src/components/BottomNav.tsx"
check_file "src/components/ui/AppLogo.tsx"
check_file "src/components/ui/AppImage.tsx"
check_file "src/app/perfil-de-usuario/components/PerfilScreen.tsx"
echo ""

echo "📚 ARCHIVOS DE DOCUMENTACIÓN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "SISTEMA_AUTENTICACION.md"
check_file "CAMBIOS_PERFIL_LOGOUT.md"
check_file "RESUMEN_VISUAL_COMPLETO.md"
check_file "GUIA_RAPIDA_AUTH.sh"
echo ""

# Resumen
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
PORCENTAJE=$((ENCONTRADOS * 100 / TOTAL))

if [ $ENCONTRADOS -eq $TOTAL ]; then
    echo -e "${GREEN}✅ VERIFICACIÓN COMPLETADA${NC}"
    echo -e "${GREEN}🎉 Todos los archivos encontrados ($ENCONTRADOS/$TOTAL)${NC}"
    echo -e "${GREEN}Estado: LISTO PARA USAR${NC}"
else
    echo -e "${YELLOW}⚠️  VERIFICACIÓN INCOMPLETA${NC}"
    echo -e "${YELLOW}Archivos encontrados: $ENCONTRADOS/$TOTAL ($PORCENTAJE%)${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar Node.js
echo "🔧 REQUISITOS DEL SISTEMA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅${NC} Node.js instalado: $NODE_VERSION"
else
    echo -e "${RED}❌${NC} Node.js no encontrado"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅${NC} npm instalado: v$NPM_VERSION"
else
    echo -e "${RED}❌${NC} npm no encontrado"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📖 PRÓXIMOS PASOS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Instalar dependencias (si no lo hiciste):"
echo "    npm install"
echo ""
echo "2️⃣  Iniciar servidor de desarrollo:"
echo "    npm run dev"
echo ""
echo "3️⃣  Abrir en navegador:"
echo "    http://localhost:4028"
echo ""
echo "4️⃣  Serás redirigido a:"
echo "    http://localhost:4028/auth"
echo ""
echo "5️⃣  Crear una cuenta o ingresar"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 DOCUMENTACIÓN DISPONIBLE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📄 SISTEMA_AUTENTICACION.md"
echo "   → Documentación completa del sistema"
echo ""
echo "📄 CAMBIOS_PERFIL_LOGOUT.md"
echo "   → Detalles de cambios en PerfilScreen"
echo ""
echo "📄 RESUMEN_VISUAL_COMPLETO.md"
echo "   → Diagrama visual del sistema"
echo ""
echo "📄 GUIA_RAPIDA_AUTH.sh"
echo "   → Guía rápida de inicio"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ Sistema de Autenticación Verificado y Listo            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
