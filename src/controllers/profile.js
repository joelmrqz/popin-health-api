const router = require('express').Router();

router.get('/', (request, response) => {
  try {
    response.status(200).json({
      age: 10950,
      weight: 120,
      height: 70,
      bodyFat: 200,
      bmi: 100,
    }).end();
  } catch (error) {
    response.status(500).json({ message: 'Server Error' }).end();
  }
});

module.exports = router;
