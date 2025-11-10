# FanPage Chicago Bulls

**Proyecto del Taller de Desarrollo Web**

Sitio web dedicado a los Chicago Bulls que aplica conceptos de **HTML5**, **CSS3** y **JavaScript** para construir una fanpage completa y responsive.

---

## Índice

1. [Autores](#autores)
2. [Enlace del proyecto](#enlace-del-proyecto)
3. [Contenido de la página](#contenido-de-la-página)
4. [Tecnologías usadas](#tecnolog%C3%ADas-usadas)
5. [Frontend React (carpeta `frontend/`)](#subproyecto-frontend-react-carpeta-frontend)

---

## Autores

| Nombre |
|---|
| Juan Ignacio García |
| Francisco García |
| Tomás Volodarsky |

---

## Enlace del proyecto

El sitio está publicado mediante **GitHub Pages** desde un fork del repositorio para permitir el despliegue desde una cuenta personal.

🔗 Enlace: <https://tomyvolo.github.io/proyecto2025-garcia-garcia-volodarsky/>

---

## Contenido de la página

### Home
- Hero con título principal
- Noticias destacadas
- Próximo partido
- Botonera de navegación
- Sponsors

### Roster (`/roster.html`)
- Filtro por posición
- Plantilla del equipo (jugadores y entrenador)

### Calendario (`/calendario.html`)
- Filtro por mes
- Listado de partidos de la temporada

### Historia (`/historia.html`)
- Línea temporal con momentos icónicos del equipo

### Nosotros (`/nosotros.html`)
- Ciudad de Chicago
- Estadio United Center
- Galería de imágenes

### Shop (`/shop.html`)
- Productos ficticios de los Bulls
- Filtros por categoría, talle, precio y orden
- Carrito de compras dinámico

---

## Tecnologías usadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de las páginas |
| CSS3 | Estilos responsivos y layout (Grid / Flexbox) |
| JavaScript | Funcionalidades dinámicas (filtros, carrito, includes) |
| Markdown | Documentación (README) |

---

## Subproyecto: Frontend React (carpeta `frontend/`)

Además de la versión estática del sitio (archivos en la raíz), en `frontend/` hay una aplicación React + Vite que implementa una versión SPA moderna de la tienda y el carrito. Esta carpeta se desarrolló como un subproyecto independiente y contiene lo añadido recientemente al repositorio.

### Qué incluye

- **Vite + React** como base (`frontend/package.json`, `vite.config.js`).
- **Estado global del carrito** con `CartProvider` (`frontend/src/components/CartContext.jsx`):
  - Persistencia en **localStorage** (`bulls_cart`).
  - Migración automática desde claves antiguas (`bullsCart`, `carrito`).
  - Sincronización entre pestañas usando el evento `storage`.
- **Componentes principales**:
  - `CartSidebar.jsx` — sidebar del carrito y controles de cantidad.
  - `Button.jsx` — componente reutilizable para botones/enlaces con estilo unificado.
  - Páginas React en `frontend/src/pages/` (`shop.jsx`, `cart.jsx`, `checkout.jsx`, etc.).
- **Cliente API ligero** en `frontend/src/api/` que consume `http://localhost:4000` (JSON Server / `db.json`).
- **Estilos en SCSS** en `frontend/src/styles/` (reglas específicas de tienda en `Shop.scss`).

### Tecnologías (frontend)

| Tecnología | Uso |
|---|---|
| **React** | UI declarativa y componentes |
| **Vite** | Bundler y dev server (HMR) |
| **SCSS** | Estilos modulares y variables |

### Comandos importantes

```powershell
cd frontend
npm install
npm run dev
```

Para ejecutar los datos de ejemplo con JSON Server :

```powershell
# desde la raíz o frontend/src/data
npx json-server --watch frontend/src/data/db.json --port 4000
```

