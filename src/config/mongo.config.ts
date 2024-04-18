import { registerAs } from '@nestjs/config';

/** 
* Mongo database connection config 
*/ 

export default registerAs('DATABASE', () => { 
  const { MONGO_URI } = process.env; // from .env file
  return {
    uri:`${MONGO_URI}`, 
  }; 
});