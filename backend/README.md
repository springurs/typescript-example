# IUNU Exercise Backend

This is the backend server for the IUNU exercise. It provides API endpoints to retrieve facility data.

The stack is built using Node.js with the Hono framework. It has CORS enabled for all /api origins.

## Setup and Run

```
npm install
npm run dev
```

```
open http://localhost:5555
```

## API Endpoints

- `GET /api/facilities` - Returns a list of facility IDs.
- `GET /api/facility/:id` - Returns detailed information for a specific facility by ID.
