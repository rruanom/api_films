const filmsController = require('../controllers/films.controller');
const router = require('express').Router();

router.post("/", filmsController.getFilms)
router.get("/films/:title", filmsController.printFilms)

module.exports = router;