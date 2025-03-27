import request from "supertest";
import * as mockDb from "./mockDb.js";
import app from "./mockServer.js"; // Ensure the `mockServer.js` exports `app` for testing

jest.mock("./mockDb.js"); // Mock the mockDb module

describe("Mock Server API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock data before each test
  });

  it("fetches sourceGridData successfully", async () => {
    const mockSourceGridData = [
      { id: 1, name: "Test Source Row 1", description: "Test Description 1" },
      { id: 2, name: "Test Source Row 2", description: "Test Description 2" },
    ];

    // Mock the db sourceGridData getter
    jest.spyOn(mockDb.db, "sourceGridData", "get").mockReturnValue(mockSourceGridData);

    const response = await request(app).get("/api/sourceGridData");

    // Assert that the response contains the mocked data
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSourceGridData);
    expect(mockDb.db.sourceGridData).toEqual(mockSourceGridData); // Ensure db was accessed
  });

  it("updates sourceGridData successfully", async () => {
    const updatedSourceGridData = [
      { id: 1, name: "Updated Source Row 1", description: "Updated Description 1" },
      { id: 2, name: "Updated Source Row 2", description: "Updated Description 2" },
    ];

    // Mock the db sourceGridData setter
    const sourceGridDataSetterSpy = jest.spyOn(mockDb.db, "sourceGridData", "set");

    const response = await request(app)
      .put("/api/sourceGridData")
      .send(updatedSourceGridData)
      .set("Content-Type", "application/json");

    // Assert that the response contains the updated data
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedSourceGridData);

    // Ensure the db's setter was called with the correct data
    expect(sourceGridDataSetterSpy).toHaveBeenCalledWith(updatedSourceGridData);
  });

  it("fetches targetGridData successfully", async () => {
    const mockTargetGridData = [
      { id: 3, name: "Test Target Row 1", description: "Test Description 1" },
      { id: 4, name: "Test Target Row 2", description: "Test Description 2" },
    ];

    // Mock the db targetGridData getter
    jest.spyOn(mockDb.db, "targetGridData", "get").mockReturnValue(mockTargetGridData);

    const response = await request(app).get("/api/targetGridData");

    // Assert that the response contains the mocked data
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTargetGridData);
    expect(mockDb.db.targetGridData).toEqual(mockTargetGridData); // Ensure db was accessed
  });

  it("updates targetGridData successfully", async () => {
    const updatedTargetGridData = [
      { id: 3, name: "Updated Target Row 1", description: "Updated Description 1" },
      { id: 4, name: "Updated Target Row 2", description: "Updated Description 2" },
    ];

    // Mock the db targetGridData setter
    const targetGridDataSetterSpy = jest.spyOn(mockDb.db, "targetGridData", "set");

    const response = await request(app)
      .put("/api/targetGridData")
      .send(updatedTargetGridData)
      .set("Content-Type", "application/json");

    // Assert that the response contains the updated data
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedTargetGridData);

    // Ensure the db's setter was called with the correct data
    expect(targetGridDataSetterSpy).toHaveBeenCalledWith(updatedTargetGridData);
  });
});
