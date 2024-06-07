CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) DEFAULT NULL,
    salary INT
);

INSERT INTO employees (name, salary) VALUES
('Joe', 1000),
('Henry', 2000),
('Sam', 5000);