const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;

app.use(
  cors({ origin: true, credentials: true }),
  express.json(),
);

app.get('/', (req, res) => {
	res.send('API, "/"');
});

app.listen(port, () => {
  console.log("서버가 정상적으로 실행되었습니다.");
});

require("./routes/index.js")(app);