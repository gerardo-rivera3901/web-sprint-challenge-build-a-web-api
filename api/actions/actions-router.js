const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get()
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'Actions not found' });
      }
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Actions.get(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: `Action with the id of ${id} not found` });
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const content = req.body;
  if (!content.project_id || !content.description || !content.notes) {
    res.status(400).json({ message: 'Please enter a valid project_id, description, and notes' });
  } else {
    Actions.insert(content)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        next(err);
      });
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.project_id || !changes.description || !changes.notes) {
    res.status(400).json({ message: 'Please enter a valid project_id, description, and notes' });
  } else {
    Actions.update(id, changes)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        next(err);
      });
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(() => {
      next();
    })
    .catch(err => {
      next(err);
    })
});

router.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = router;