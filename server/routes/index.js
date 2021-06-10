const router = require("express").Router();

router.get("/download-csv", async (req, res, next) => {
  res.status(200).json({
    message: "Download Csv",
  });
});

module.exports = router;
