const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Projects.get()
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'Projects not found' });
      }
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Projects.get(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: `Project with the id of ${id} not found` });
      }
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id/actions', (req, res, next) => {
  const { id } = req.params
  Projects.getProjectActions(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json([{ message: `Project with the id of ${id} not found` }]);
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const content = req.body;
  if (!content.name || !content.description) {
    res.status(400).json({ message: 'Please enter a valid project_id, description, and notes' });
  } else {
    Projects.insert(content)
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
  if (!changes.name || !changes.description) {
    res.status(400).json({ message: 'Please enter a valid project_id, description, and notes' });
  } else {
    Projects.update(id, changes)
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
  Projects.remove(id)
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