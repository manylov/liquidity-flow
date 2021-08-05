
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app_config');
//jobs configuration
require('./jobs/index');

const seeder = require('./seeders');
seeder();

app.listen(process.env.PORT,()=>{
  console.log(`your application is running on ${process.env.PORT}`);
});
