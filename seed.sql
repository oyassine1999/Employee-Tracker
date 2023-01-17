-- Insert some departments
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Human Resources');
INSERT INTO departments (name) VALUES ('Marketing');

-- Insert some roles
INSERT INTO roles (title, salary, department_id) VALUES ('Developer', 60000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Tester', 50000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Manager', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Lawyer', 80000, 2);

-- Insert some employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Smith', 3, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Omar', 'Yassine', 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alix', 'Zoom', 5, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Adam', 'Mada', 6, 4);