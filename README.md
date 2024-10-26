# ChallengeEldarFrontend

Este proyecto fue realizado con la version 17.3.8. de Angular

## Instalacion de dependencias

Correr en consola ubicado en la raiz del proyecto `npm install` para instalar las dependencias del proyecto

## Development server

Correr en consola ubicado en la raiz del proyecto `ng serve` para servidor de desarrollo local. 
Para poder visualizarlo navegar a `http://localhost:4200/` como puerto predeterminado

## Credenciales de Usuarios

Credenciales de rol usuario:
email: user@gmail.com
pwd: user123

Credenciales de rol admin:
email: admin@gmail.com
pwd: admin123

## Backend

Este proyecto se conecta a un json server con la siguiente URL:
https://my-json-server.typicode.com/Santibdea/bd-challenge-eldar

## Estructura del Proyecto

La estructura de carpetas del proyecto está organizada de la siguiente manera para mantener un código modular, reutilizable y fácil de mantener.

```plaintext
src/
│
├── app/
│   ├── core/                   # Núcleo de la aplicación
│   │   ├── guards/             # Guardias de rutas para proteger el acceso a ciertas páginas
│   │   ├── interceptors/       # Interceptores para manejar peticiones HTTP
│   │   ├── interfaces/         # Definición de interfaces compartidas
│   │   └── services/           # Servicios compartidos
│   │       ├── generic/        # Servicios genéricos reutilizables
│   │       ├── private/        # Servicios específicos para la sección privada
│   │       └── public/         # Servicios específicos para la sección pública
│   │
│   ├── shared/                 # Recursos compartidos (componentes, pipes, etc.)
│   │   ├── components/         # Componentes de la aplicación
│   │   └── store/              # Gestión del estado de la aplicación con NGRX
│   │
│   ├── views/                  # Vistas principales
│   │   ├── private/            # Vistas privadas
│   │   └── public/             # Vistas públicas
│   │
│   ├── app.component.*         # Archivos principales del componente raíz de la aplicación
│   ├── app.config.ts           # Archivo de configuración de la aplicación
│   └── app.routes.ts           # Definición de rutas principales de la aplicación
│
├── assets/                     # Recursos estáticos (imágenes, fuentes, etc.)
└── environments/               # Configuración de entornos (producción, desarrollo)

