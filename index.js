// const app = require("./src/app");
// const port = 3000;

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

require('dotenv').config(); // Load .env variables
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
