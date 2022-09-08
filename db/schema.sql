DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id),
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) 
  REFERENCES departments(id)
  ON DELETE CASCADE
  
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
  ON DELETE CASCADE,
  manager_id INT
);