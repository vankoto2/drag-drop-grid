import axios from "axios";
import { fetchData } from "../services/apiService";

jest.mock("axios");

describe("fetchData function", () => {
  it("fetches data successfully", async () => {
    const mockData = [
      { id: 1, name: "Test Row 1" },
      { id: 2, name: "Test Row 2" },
    ];

    // Mock axios.get to resolve with mock data
    jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockData });

    const data = await fetchData();

    // Assert that axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/data");
    expect(data).toEqual(mockData);
  });
});
