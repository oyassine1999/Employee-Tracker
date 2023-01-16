import inquirer from 'inquirer';
import consoleTable from 'console.table';
import mysql2 from 'mysql2/promise';

async function main() {
  // Create a connection
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
  });

  let exit = false;
  while (!exit) {
    try {
      // Prompt user for the option they want to perform
      const { option } = await inquirer.prompt([
        {
          type: 'list',
          name: 'option',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
          ]
        }
      ]);

      if (option === 'Exit') {
        exit = true;console.log('Exiting...');
        break;
      }

      // Execute different query based on the option chosen
      let results;
      switch (option) {
        case 'View all employees':
          results = await connection.execute(`
            SELECT 
              employees.id,
              employees.first_name, 
              employees.last_name, 
              departments.name as department,
              roles.title,
              roles.salary
            FROM 
              employees 
            LEFT JOIN 
              departments 
            ON 
              employees.department_id = departments.id
            LEFT JOIN
              roles
            ON 
              employees.role_id = roles.id
          `);
          console.table(results[0]);
          break;
        case 'View all roles':
          results = await connection.execute('SELECT * FROM roles');
          console.table(results[0]);
          break;
        case 'View all departments':
          results = await connection.execute('SELECT * FROM departments');
          console.table(results[0]);
          break;
        case 'Add a department':
          // prompt user for department name
          const { name } = await inquirer.prompt([
            {
              type: 'input',
              name: 'name',
              message: 'Enter the department name:'
            }
          ]);
          // insert department into the table
          await connection.execute(`INSERT INTO departments (name) VALUES (?)`, [name]);
          console.log(`Department ${name} added`);
          break;
        case 'Add a role':
          // prompt user for role details
          const { title, salary, department_id } = await inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the role title:'
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the role salary:'
            },
            {
              type: 'input',
              name: 'department_id',
              message: 'Enter the department id:'
            }
          ]);
          // insert role into the table
          await connection.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
          console.log(`Role ${title} added`);
          break;
        case 'Add an employee':
          // prompt user for employee details
          const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'Enter the employee first name:'
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'Enter the employee last name:'
            },
            {
              type: 'input',
              name: 'role_id',
              message: 'Enter the employee role id:'
            },
            {
              type: 'input',
              name: 'manager_id',
              message: 'Enter the employee manager id:'
            }
          ]);
          // insert employee into the table
          await connection.execute('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
          console.log(`Employee ${first_name} ${last_name} added`);
          break;
        case 'Update an employee role':
          // prompt user for the employee id and the new role id
          const { employee_id, new_role_id } = await inquirer.prompt([
            {
              type: 'input',
              name: 'employee_id',
              message: 'Enter the employee id:'
            },
            {
              type: 'input',
              name: 'new_role_id',
              message: 'Enter the new role id:'
            }
          ]);
          // update the employee's role
          await connection.execute('UPDATE employees SET role_id = ? WHERE id = ?', [new_role_id, employee_id]);
          console.log(`Employee's role updated`);
          break;
        // ...
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Close the connection
  connection.end();
}

main();