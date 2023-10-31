import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";

export const secureTraversal = function (path) {
  return path.replace(/(\.\.\/|\.\/)/gi, "");
};
export const errorResponse = (code) => (res) => {
  res.statusCode = String(code);
  return res.end();
};

export const htmlTemplate = (content) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alexey Adoniev | Portfolio</title>
</head>

<body>
    <div class="root">${content}</div>
</body>

</html>`;

export const prepareFile = async (filePath) => {
  const exists = await fs.access(filePath).then(
    () => true,
    () => false
  );
  if (!exists) return null;
  const stream = createReadStream(filePath);
  return { stream, ext: path.extname(filePath).slice(1).toLowerCase() };
};
