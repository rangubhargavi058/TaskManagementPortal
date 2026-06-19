const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all tasks
router.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// ADD new task
router.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;

    const sql =
        'INSERT INTO tasks(title, description, status) VALUES (?, ?, ?)';

    db.query(sql, [title, description, status], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Task Added Successfully',
            id: result.insertId
        });
    });
});

// UPDATE task
router.put('/tasks/:id', (req, res) => {

    const id = req.params.id;
    const { title, description, status } = req.body;

    const sql =
        'UPDATE tasks SET title=?, description=?, status=? WHERE id=?';

    db.query(
        sql,
        [title, description, status, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Task Updated Successfully'
            });
        }
    );
});
// DELETE task
router.delete('/tasks/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM tasks WHERE id=?';

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Task Deleted Successfully'
        });
    });
});
module.exports = router;