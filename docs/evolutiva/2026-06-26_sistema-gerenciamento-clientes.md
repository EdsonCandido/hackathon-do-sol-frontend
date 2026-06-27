# Sistema de Gerenciamento de Clientes

## Objetivo

Criar SPA React + Vite + TypeScript com login, dashboard, cards de clientes e mapa interativo. Dados 100% mockados localmente.

## Alterações

- Scaffold Vite + React 19 + TypeScript
- Chakra UI 3, Framer Motion, React Router 7, next-themes
- Auth com Context + localStorage + rotas privadas/públicas
- Login com validação client-side
- Dashboard com navbar, sidebar, stats, cards e mapa Leaflet
- Services mock: `authService`, `clienteService`
- Biome para lint/format

## Telas/Componentes afetados

- `LoginPage`
- `DashboardPage`
- `MainLayout`, `Navbar`, `Sidebar`
- `ClienteCard`, `ClientesMap`
- `AuthContext`, `PrivateRoute`

## Regras de negócio

- Login exige e-mail e senha válidos (mín. 6 chars)
- Credenciais demo: `admin@clientehub.com` / `123456`
- Usuário autenticado salvo em `localStorage`
- Rotas `/dashboard` protegidas; não autenticado → `/login`
- Logout limpa storage e redireciona

## Observações

- Mapa usa OpenStreetMap + react-leaflet (sem API key)
- Dark mode via next-themes + tokens Chakra
- Lazy loading de rotas com Suspense
