# Weather App

This repository contains the source code for a weather station web app developed using React and Django. The app integrates with a public weather API to retrieve weather data and displays it in a user-friendly manner. Users can log in using Google OAuth to access the dashboard, where they can view weather details and visualizations.

## Core Features

- Integrate a public weather API to retrieve data.
- Display weather data in a user-friendly manner within the application.
- Implement proper error handling and loading states while fetching data from the API.
- User authentication using Google OAuth to access the dashboard.
- Role-based authorization with two roles: Admin and User.
- Admins have access to all dashboard features, including user management.
- Users have limited access to the dashboard but not to user management.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Arshad-asd/WeatherApp.git
```

2. Create and activate a virtual environment:

```bash
python -m venv env
```

```bash
# On Windows: .\env\Scripts\activate
# On macOS/Linux: source venv/bin/activate
```

```bash
cd backend
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the development server:

```bash
python manage.py runserver
```

6. Access the API at [http://localhost:8000/api/](http://localhost:8000/api/)

## API Endpoints


#### 1. User Management:

- `POST /api/users/register/`: Register a new user.
- `POST /api/users/login/`: Log in an existing user.
- `POST /api/admin/users-all/`: List all users exlude admin.
- `PUT /api/admin/block-ublock/id/`: block & unblock user.

## API Documentation


### `POST /api/user/register/`

**Description:**

Create a new User.

**Request:**
- **Method:** `POST`
- **Endpoint:** `/api/user/register/`
- **Body:**
  - `username` (string, required): User's username.
  - `email` (string, required): User's email.
  - `password` (string, required): User's password. "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."

**Response:**
- **Success Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "id": 1,
      "email": "jhon@example.com"
      "username": "jhon"
    }
    ```

- **Error Response:**
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    {
      "error": "Invalid data. Please provide valid information."
    }
    ```

    ### `POST /api/login/`

**Request:**
- **Method:** `POST`
- **Endpoint:** `/api/login/`
- **Body:**
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.

**Response:**
- **Success Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."
    }
    ```

- **Error Response:**
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

```bash
python manage.py runserver
```

5. Access the web app at [http://localhost:8000/](http://localhost:8000/)

