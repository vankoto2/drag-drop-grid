import fs from "fs";

const dbFilePath = "./db.json";

export const readDb = () => {
  const data = fs.readFileSync(dbFilePath, "utf-8");
  return JSON.parse(data);
};

export const writeDb = (data: any) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
};
