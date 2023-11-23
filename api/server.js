const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
// const { loadUsersData } = require('./models/users.model');
// const { loadOrdersData } = require('./models/orders.model');
// const { loadTransfersData } = require('./models/transfers.model');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  // await loadUsersData();
  // await loadOrdersData();
  // await loadTransfersData();
  
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();