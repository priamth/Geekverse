# Geekverse Full-Stack Application

Geekverse is a full-stack hub containing a React frontend, a Python FastAPI backend, and a MongoDB database. This repository has been fully modernized and containerized to completely wipe out environment bugs, package clashing, and network communication issues.

---

## 🛠️ The Debug Journey (What We Fixed)

Initially, spinning up the codebase locally threw several cascading environment failures:
1. **Dependency Mismatches (`npm error ERESOLVE`):** The frontend project relied on a newer version of `date-fns`, but structural date-picker pieces required an older version. This blocked standard `npm install` cycles and caused missing module crashes (`craco`, `ajv/dist/compile/codegen`).
2. **Missing Environment Keys (`KeyError`):** The Python backend crashed instantly because it couldn't find local system variables for `MONGO_URL` and `DB_NAME`.
3. **Routing & Port Loops:** The React frontend was trying to call raw routes on port `3000` while the backend listened on port `8000` behind an isolated `/api` prefix, causing persistent `404 Not Found` and `500 Internal Server Error` loops.

### The Turning Point: The Cursor Prompt That Fixed It
We completely broke out of the configuration loops by throwing the project into **Cursor Composer** and running this exact prompt:

> "Look at my frontend and backend files. My React frontend is calling relative URLs like '/categories' and '/stats' which default to port 3000.
> 
> My FastAPI Python backend is running on port 8000 and expects '/api/categories'. Please fix my frontend Axios configuration base URL or my docker-compose setup so all frontend API requests are automatically forwarded to http://localhost:8000/api without changing my backend routers back and forth."

### The Resolution
Cursor bypassed the problematic React local dev proxies by locating the global Axios instance configuration and hardcoding the connection lane directly to the host machine port. Once rebuilt inside **Docker Compose**, the backend successfully initialized, linked to the database container, and seeded **174 software utility links** automatically!

---

## 📦 System Dependencies List

Docker handles all of these setups automatically inside isolated containers, meaning you don't need to manually install them on your Windows host machine:

### Frontend Container (Node.js Environment)
* **React & React DOM:** Core layout and user interface architecture.
* **Axios:** Handles API network requests to the backend server.
* **Radix UI components:** Premium UI component accessibility tags (Accordion, Dialog, Select, Dropdown, Tabs).
* **Lucide React:** Icon library used for application visual grids.

### Backend Container (Python Environment)
* **FastAPI:** Asynchronous routing framework handling API requests.
* **Uvicorn:** The process runner engine serving the FastAPI code.
* **Motor & PyMongo:** Asynchronous database drivers that speak to MongoDB.
* **Python-Dotenv:** System utility for reading external `.env` variables.
* **Flask-CORS / Starlette:** Middleware allowing cross-origin resource sharing so the frontend can safely talk to the backend.

### Database Container
* **MongoDB (Latest Official Image):** NoSQL document store capturing tools, categories, and click counts.

---

## 🚀 How to Run the Application

Since the entire ecosystem is containerized, it runs side-by-side with your other containers (like Open WebUI or Ollama) inside Docker Desktop.

### Turning the Site On
1. Launch **Docker Desktop** on your computer.
2. Click on the **Containers** tab on the left sidebar.
3. Locate the project dropdown group named **`geekverse-main`**.
4. Click the blue **Play (Start)** button.
5. Open your web browser and go to: **`http://localhost:3000`**

### Turning the Site Off
When you are done using the application, open Docker Desktop and click the square **Stop** button next to the `geekverse-main` group. This pauses the servers and saves your computer's RAM and battery life while protecting your data volumes.

---

## ⚙️ Development & Code Rebuilds

You do not need a terminal to use the site normally. However, if you use Cursor to edit files in the future, you must force Docker to update its compiled code. Run this command in your terminal root directory:

```bash
docker compose down && docker compose up --build -d
```

## Cursor Prompt:
 ```  Look at my frontend and backend files. My React frontend is calling relative URLs like "/categories" and "/stats" which default to port 3000. My FastAPI Python backend is running on port 8000 and expects "/api/categories". Please fix my frontend Axios configuration base URL or my docker-compose setup so all frontend API requests are automatically forwarded to http://localhost:8000/api without changing my backend routers back and forth. ```


