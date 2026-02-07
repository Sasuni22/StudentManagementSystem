🎓 Student Management System

A full-stack Student Management System designed to simplify and automate academic data management for educational institutions. This application enables efficient handling of student and course records while maintaining data integrity through detailed audit logging.

🚀 Features

➕ Add new Students and Courses
✏️ Edit existing Student and Course records
❌ Delete Students and Courses securely
📋 Audit Logs to track all system activities
🔒 Ensures data integrity, consistency, and smooth user interaction
⚡ Responsive and user-friendly interface


🛠️ Technology Stack

Frontend

React.js – Component-based UI development
Tailwind CSS – Modern and responsive styling

Backend

Java Spring Boot – RESTful API development and business logic

Database

PostgreSQL – Reliable and scalable relational database


🏗️ System Architecture
Frontend (React.js) communicates with the backend via REST APIs
Backend (Spring Boot) handles business logic, validation, and audit logging
PostgreSQL stores student data, course data, and audit logs


⚙️ Installation & Setup

Prerequisites

Node.js (v16 or later)
Java JDK 17+
Maven
PostgreSQL

1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

2️⃣ Backend Setup (Spring Boot)

1. Configure PostgreSQL database
2. Update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/student_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

3. Run the backend:

```bash
mvn spring-boot:run
```

3️⃣ Frontend Setup (React.js)

```bash
cd frontend
npm install
npm start
```

📋 Audit Logging

The system records all critical actions such as:
      Student creation, updates, and deletion
      Course creation, updates, and deletion

These logs help ensure transparency, traceability, and accountability.


🌱 Future Enhancements
Role-based authentication (Admin / Staff)
Student enrollment and grading modules
Advanced search and filtering
Export reports (PDF / Excel)


If you found this projec

