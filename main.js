require('./config/db'); 
const createHttpServer = require('./http/http_server');
const todoRoutes = require('./routes/index');

const server = createHttpServer({ port: 3333 }); 
 
server.getApp().use('/api', todoRoutes);

server.start();
