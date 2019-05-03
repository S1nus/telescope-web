var express = require('express');
var router = express.Router();
var fs = require('fs')
const { spawn } = require('child_process');

router.post('/', (req, res, next) => {
  var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, '');

  fs.writeFile('telescope-nn/web/trimap.png', base64Data, 'base64', function (err) {
    if (err) {
      throw err;
    }

    const logOutput = (name) => (data) => console.log(`[${name}] ${data.toString()}`);

    function run() {
      const process = spawn('python', ['telescope-nn/telescope.py', 'telescope-nn/web/image.png', 'telescope-nn/web/trimap.png']);

      process.stdout.on(
        'data',
        logOutput('stdout')
      );

      process.stderr.on(
        'data',
        logOutput('stderr')
      );
    }

    (() => {
      try {
        run()
        // process.exit(0)
      } catch (e) {
        console.error(e.stack);
        process.exit(1);
      }
    })();
  });

  res.json(req.body.imgBase64);
});

module.exports = router;