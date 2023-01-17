INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Human Resources');
INSERT INTO departments (name) VALUES ('Marketing');

-- Insert some roles
INSERT INTO roles (title, salary, department_id) VALUES ('Developer', 60000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Tester', 50000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Manager', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Lawyer', 80000, 4);

-- Insert some employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Smith', 1, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Omar', 'Yassine', 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alix', 'Zoom', 4, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Adam', 'Mada', 4, 4);INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('john', 'marsten', 1, 1);
