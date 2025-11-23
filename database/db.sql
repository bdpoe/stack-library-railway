-- ===========================
--   CREAR TABLA USERS
-- ===========================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'student') NOT NULL DEFAULT 'student'
);

-- Usuarios iniciales
INSERT INTO users (username, password, role) VALUES
('bibliotecario1', '1234', 'admin'),
('alumno1', '1234', 'student');


-- ===========================
--   CREAR TABLA TASKS
-- ===========================
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ===========================
--   CREAR TABLA LOANS
-- ===========================
CREATE TABLE IF NOT EXISTS loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student VARCHAR(100) NOT NULL,
  book VARCHAR(100) NOT NULL,
  date_loan DATE NOT NULL,
  date_return DATE,
  returned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
