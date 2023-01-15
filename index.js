import inquirer from 'inquirer';
import consoleTable from 'console.table';
import mysql2 from 'mysql2/promise';

async function main() {
  // Prompt user for name and age
  const { name, age } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'age',
      message: 'What is your age?'
    }
  ]);

  console.log(`Hello ${name}, your age is ${age}`);

  // Create a connection
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
  });

  try {
    // Execute query to get users from the database
    const [results] = await connection.query('SELECT * FROM users');

    // Print the results in a table
    console.table(results);
  } catch (error) {
    console.log(error);
  } finally {
    // Close the connection
    connection.end();
  }
}

main();