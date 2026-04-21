# Weather DevOps App 🌤️

Modern weather app with Node.js/Express backend and responsive frontend.

## Features
- Real-time weather for any city (OpenWeatherMap API)
- Full weather details (temp, description, humidity, wind, icon)
- Loading states & error handling
- Search history (persists in localStorage, click to refetch)
- Fully responsive design (mobile/desktop)
- Client-side validation

## Quick Start
1. Clone/Download project
2. Copy `.env.example` to `.env` and add your [OpenWeatherMap API key](https://openweathermap.org/api)
3. `npm install`
4. `npm start`
5. Open http://localhost:3000

## Development
- `npm run dev` (with nodemon auto-restart)

## API Endpoints
- `GET /` - Health check
- `GET /weather?city=London` - Weather data

## Tech Stack
- Backend: Express, Axios
- Frontend: Vanilla JS, CSS3
- Styling: Responsive, gradients, animations

Built with improvements for production-readiness.

