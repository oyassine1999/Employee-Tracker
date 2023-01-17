import fs from 'fs'
import path from 'path'

function updateSeed(newData, type) {
    // read the existing data from the seed.sql file
    let seedData = fs.readFileSync('seed.sql', 'utf8');
    // create a new insert statement for the new data
    let newInsert;
    switch(type){
        case 'employee':
            newInsert = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${newData.first_name}', '${newData.last_name}', ${newData.role_id}, ${newData.manager_id});\n`;
            break;
        case 'role':
            newInsert = `INSERT INTO roles (title, salary, department_id) VALUES ('${newData.title}', ${newData.salary}, ${newData.department_id});\n`;
            break;
        case 'department':
            newInsert = `INSERT INTO departments (name) VALUES ('${newData.name}');\n`;
            break;
    }
    // append the new insert statement to the existing seed data
    seedData += newInsert;
    // write the updated seed data back to the seed.sql file
    fs.writeFileSync('seed.sql', seedData);
    console.log(`New ${type} added to seed.sql: ${newData}`);
}

export default updateSeed;