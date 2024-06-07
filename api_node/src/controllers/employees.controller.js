// Imports de constantes
import {pool} from '../db.js'

// Logica de los endpoints

// Obtener todos los empleados
export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employees');
        res.send(rows);
    } catch (error) {
        res.status(500).send({error: 'Error al obtener los empleados'});
    }
}

// Crear un nuevo empleado
export const createEmployee = async (req, res) => {
    const {name, salary} = req.body;
    try {
        const [result] = await pool.query('INSERT INTO employees (name, salary) VALUES (?,?)', [name, salary]);
        const insertedId = result.insertId;

        // Devolvemos los datos del nuevo empleado
        res.send({
            id: insertedId,
            name: name,
            salary: salary
        });
    } catch (error) {
        res.status(500).send({error: 'Error al crear el empleado'});
    }
}

// Actualizar un empleado
export const updateEmployee = async (req, res) => {
    const {id} = req.params;
    const {name, salary} = req.body;
    try {
        const [result] = await pool.query('UPDATE employees SET name = ?, salary = ? WHERE id = ?', [name, salary, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({error: 'Empleado no encontrado'});
        }

        res.send({message: 'Empleado actualizado satisfactoriamente'});
    } catch (error) {
        res.status(500).send({error: 'Error al actualizar el empleado'});
    }
}

// Eliminar un empleado
export const deleteEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({error: 'Empleado no encontrado'});
        }

        res.send({message: 'Empleado eliminado satisfactoriamente'});
    } catch (error) {
        res.status(500).send({error: 'Error al eliminar el empleado'});
    }
}
