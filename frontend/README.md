# DoorMaster Installation Ops - Frontend Application

Modern Angular 21 Single Page Application for DoorMaster Precision Installation & Operations Management.

## Architecture
- **Framework**: Angular 21 with Signals & Angular Material
- **Styling**: Tailwind CSS & Vanilla CSS Design System with light/dark modes
- **Local Dev Proxy**: `proxy.conf.json` forwards `/api/*` requests to the Node.js backend at `http://127.0.0.1:3001`
- **Dual Mode**:
  - **Demo Mode**: Instant local simulated state for rapid testing and demonstrations
  - **API Mode (MySQL)**: Live authentication and data synchronization with MySQL via the backend API

## Available Scripts
- `npm start`: Start Angular dev server with API proxy on port 4200
- `npm run dev`: Start Angular dev server with API proxy on port 4200
- `npm run build`: Compile production distribution into `dist/`
- `npm run lint`: Run Angular ESLint
