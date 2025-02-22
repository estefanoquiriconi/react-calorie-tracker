# Contador de Calorías - React + TypeScript

Una aplicación web para el seguimiento de calorías consumidas y quemadas,
desarrollada con React y TypeScript.

## 🚀 Características

- Registro de actividades (comidas y ejercicios)
- Cálculo automático de calorías netas
- Persistencia de datos en localStorage
- Interfaz responsive con Tailwind CSS
- Gestión de estado con useReducer
- Tipado estricto con TypeScript

## 🛠️ Tecnologías

- React 19
- TypeScript
- Tailwind CSS
- Vite
- UUID
- Hero Icons

## 💡 Implementación Técnica

### Gestión de Estado

El proyecto utiliza `useReducer` para manejar el estado global de la aplicación,
implementando un patrón similar a Redux pero más ligero. Las acciones
principales incluyen:

- SAVE_ACTIVITY
- SET_ACTIVE_ID
- DELETE_ACTIVITY
- RESTART_APP

### Hooks Utilizados

- `useReducer`: Para la gestión del estado global
- `useEffect`: Para la persistencia de datos en localStorage
- `useMemo`: Para optimizar cálculos de calorías
- `useState`: Para el manejo de estados locales en formularios

## 🔍 Características Destacadas

- Validación de formularios
- Edición y eliminación de actividades
- Cálculo en tiempo real de calorías
- Diseño responsive
- Persistencia de datos
