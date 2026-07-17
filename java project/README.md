# Customer Management System

A complete full-stack **Customer Management System** demonstrating CRUD
(Create, Read, Update, Delete) operations, built with **Spring Boot**
(backend) and **React.js (Vite)** (frontend).

---

## 📋 Project Overview

The Customer Management System allows an organization to maintain customer
records — name, email, phone number, and city — through a clean, responsive
web interface backed by a RESTful API and a MySQL database.

**Key Features**
- View all customers in a searchable, responsive table
- Add a new customer with client-side and server-side validation
- Edit existing customer details
- View full details of a single customer
- Delete a customer with a confirmation prompt
- Search customers by name
- Success and error alerts for every action
- Clean layered backend architecture with centralized exception handling
- CORS configured so the React app can call the API during development

---

## 🛠️ Technology Stack

### Backend
- Java 17
- Spring Boot 3.3.4
- Spring Web (REST API)
- Spring Data JPA (Hibernate)
- Spring Validation (Jakarta Bean Validation)
- MySQL 8
- Lombok
- Maven

### Frontend
- React 18 (Vite)
- React Router DOM v6
- Axios
- Bootstrap 5 + Bootstrap Icons

---

## 📁 Folder Structure

```
CustomerManagementSystem/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/cms/customermanagement/
│   │   │   │   ├── config/           # CORS configuration
│   │   │   │   ├── controller/       # REST controllers
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entity/           # JPA entities
│   │   │   │   ├── exception/        # Custom exceptions + global handler
│   │   │   │   ├── repository/       # Spring Data JPA repositories
│   │   │   │   ├── service/          # Service interfaces
│   │   │   │   │   └── impl/         # Service implementations
│   │   │   │   └── CustomerManagementSystemApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, Footer, CustomerList, CustomerForm
│   │   ├── pages/          # Home, AddCustomer, EditCustomer, ViewCustomer
│   │   ├── services/       # CustomerService.js (Axios API layer)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── customer_db.sql
├── docs/
│   ├── Customer_Management_System_Report.docx
│   └── Customer_Management_System_Report.pdf
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

| Tool             | Version        |
|------------------|-----------------|
| Java JDK         | 17 or higher    |
| Maven            | 3.8+            |
| Node.js          | 18+             |
| npm              | 9+              |
| MySQL            | 8.0+            |
| VS Code          | Latest          |

---

## 🗄️ MySQL Configuration

1. Start your MySQL server.
2. Run the provided SQL script to create the database, table, and seed data:

   ```bash
   mysql -u root -p < database/customer_db.sql
   ```

   This creates the `customer_db` database and the `customers` table, and
   inserts sample records. Alternatively, the application will
   auto-create the database (`createDatabaseIfNotExist=true`) and table
   (`ddl-auto=update`) on first run — you don't strictly need to run the
   script manually, but it's provided for convenience and for loading
   sample data.

3. Update credentials in `backend/src/main/resources/application.properties`
   if your MySQL username/password differ from the defaults (`root` / `root`):

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/customer_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=root
   ```

---

## 🚀 Backend Setup

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**.

You can verify it's running by visiting:
```
http://localhost:8080/api/customers
```

---

## 💻 Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the frontend and backend together
npm run dev

# Or start only the React frontend if Spring Boot is already running
npm run dev:frontend
```

The frontend will start on **http://localhost:5173** and will automatically
open in your default browser.

> The frontend is pre-configured (via `vite.config.js` proxy and
> `CustomerService.js` base URL) to talk to the backend at
> `http://localhost:8080`.

---

## 🔗 API Endpoints

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|---------------------------------------|
| GET    | `/api/customers`                | Get all customers                    |
| GET    | `/api/customers?name={term}`    | Search customers by name             |
| GET    | `/api/customers/{id}`           | Get a customer by ID                 |
| POST   | `/api/customers`                | Create a new customer                |
| PUT    | `/api/customers/{id}`           | Update an existing customer          |
| DELETE | `/api/customers/{id}`           | Delete a customer                    |

**Sample Request Body (POST / PUT)**
```json
{
  "customerName": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "phone": "9876543210",
  "city": "Hyderabad"
}
```

**Sample Success Response**
```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "id": 1,
    "customerName": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "phone": "9876543210",
    "city": "Hyderabad"
  },
  "timestamp": "2026-07-16T10:30:00"
}
```

**Sample Error Response**
```json
{
  "success": false,
  "message": "Validation failed for one or more fields",
  "status": 400,
  "validationErrors": {
    "email": "Email should be a valid email address"
  }
}
```

---

## 📸 Screenshots

> Add your application screenshots here after running the project.

| Screen              | Screenshot                    |
|----------------------|--------------------------------|
| Home / Customer List | `docs/screenshots/home.png`   |
| Add Customer         | `docs/screenshots/add.png`    |
| Edit Customer        | `docs/screenshots/edit.png`   |
| View Customer        | `docs/screenshots/view.png`   |

---

## ▶️ How to Run (Quick Start)

1. `mysql -u root -p < database/customer_db.sql`
2. `cd backend && mvn spring-boot:run`
3. In a new terminal: `cd frontend && npm install && npm run dev`
4. Open `http://localhost:5173` in your browser.

---

## ❗ Common Errors & Troubleshooting

| Issue                                             | Solution                                                                 |
|----------------------------------------------------|---------------------------------------------------------------------------|
| `Communications link failure` / DB connection error | Ensure MySQL is running and credentials in `application.properties` are correct |
| `Port 8080 already in use`                        | Stop the process using port 8080 or change `server.port` in `application.properties` |
| CORS error in browser console                     | Confirm backend is running and `app.cors.allowed-origin` matches the frontend URL |
| `Failed to fetch customers` on the frontend       | Make sure the backend is started **before** the frontend                 |
| `npm install` fails                                | Delete `node_modules` and `package-lock.json`, then retry                |
| Table not created automatically                   | Run `database/customer_db.sql` manually against your MySQL instance      |

---

## 📄 License

This project is developed for educational purposes and is distributed
under the [MIT License](https://opensource.org/licenses/MIT). You are
free to use, modify, and distribute this project.

---

## 👤 Author

Customer Management System — Full Stack Project (Spring Boot + React)
