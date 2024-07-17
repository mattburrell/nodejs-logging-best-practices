import request from "supertest";
import { jest } from "@jest/globals";
import { app, logger } from "./server.js";

// Unit test for logging errors
describe("GET /process-order/:orderId", function () {
  let server;
  let loggerErrorSpy;
  let badOrderId = "abc";

  beforeAll((done) => {
    server = app.listen(0, done); // Listen on a random available port
  });

  beforeEach(() => {
    loggerErrorSpy = jest.spyOn(logger, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    loggerErrorSpy.mockRestore();
  });

  afterAll((done) => {
    server.close(done);
  });

  test("should log an error if orderId is not a number", async () => {
    const response = await request(app)
      .get(`/process-order/${badOrderId}`)
      .expect(500);

    expect(response.body).toHaveProperty("error", "Something went wrong!");
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

    const logMessage = loggerErrorSpy.mock.calls[0][0];
    const logMeta = loggerErrorSpy.mock.calls[0][1];

    expect(logMessage).toBe(
      "Error caught at top level: Order ID must be a number"
    );
    expect(logMeta).toEqual(
      expect.objectContaining({
        code: "INVALID_ORDER_ID",
        context: `Processing order context: ${badOrderId}`,
      })
    );
  });

  test("should not log an error if orderId is a number", async () => {
    const response = await request(app).get(`/process-order/123`).expect(200);

    expect(response.text).toBe("Order 123 processed successfully");
    expect(loggerErrorSpy).not.toHaveBeenCalled();
  });
});
