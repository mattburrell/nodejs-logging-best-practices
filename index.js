import { app, logger } from "./server.js";

const port = 3000;

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});
