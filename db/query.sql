SELECT e.first_name, e.last_name, r.title, d.name, r.salary
FROM employees e
JOIN roles r ON e.role_id = r.id
JOIN departments d ON r.department_id = d.id
WHERE d.name = 'Engineering'
ORDER BY r.salary DESC;