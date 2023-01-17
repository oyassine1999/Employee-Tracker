import inquirer from 'inquirer';
import mysql2 from 'mysql2/promise';
import figlet from 'figlet';
import updateSeed from './Assets/updateSeed.js';

console.log("\n");
figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

async function crudOperation(option, connection) {
  let query;
  switch (option) {
    case 'View all employees':
      query = `SELECT 
    employees.id,
    employees.first_name, 
    employees.last_name, 
    managers.first_name as manager_first_name,
    roles.title,
    departments.name as department,
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
  JOIN
    employees as managers
  ON
    employees.manager_id = managers.id`;
      break;
    case 'View all roles':
      query = 'SELECT * FROM roles';
      break;
    case 'View all departments':
      query = 'SELECT * FROM departments';
      break;
    case 'Add a department':
      const { name } = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the department name:'
      }]);
      query = `INSERT INTO departments (name) VALUES (?)`;
      updateSeed({name}, 'department');
      break;
    case 'Add a role':
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
      query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
      break;
    case 'Update an employee role':
      
      break;
    case 'Assign an employee to a department':
    
      break;
    default:
      console.log('Invalid option selected');
      return;
  }
  const [results] = await connection.execute(query);
  console.table(results);
}async function main() {
  // Create a connection
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker'
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
            'Assign an employee to a department',
            'Exit'
        ]
    }
]);

      if (option === 'Exit') {
        exit = true;console.log('Exiting...');
        break;
      }

      // Execute different query based on the option chosen
      await crudOperation(option, connection);
    } catch (err) {
      console.log(err);
    }
  }
}

main();