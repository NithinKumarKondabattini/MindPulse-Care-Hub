# MindPulse Care Hub

MindPulse Care Hub is a responsive login and dashboard website inspired by an AI-powered mental health tracking platform with smartwatch integration. It includes:

- a login page
- a protected dashboard
- logout functionality
- Docker and Nginx configuration
- GitHub Actions and Azure DevOps pipeline files for CI validation

## Features

- Client-side session persistence using `localStorage`
- Dashboard cards for stress state, recovery score, interventions, and AI recommendations
- Mobile-friendly responsive layout
- Container-ready deployment with Nginx

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static file server.

## Run with Docker

```bash
docker build -t mindpulse-site .
docker run -p 8080:80 mindpulse-site
```

Then open `http://localhost:8080`.

## Demo login

Use any valid email address and any password with at least 6 characters.
