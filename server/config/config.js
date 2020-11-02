// Puerto

process.env.PORT=process.env.PORT || 3000;

// Base de Datos

// let urlDB='';

// urlDB='mongodb://localhost:27017/Coffee';

// urlDB='mongodb+srv://dbMiguel:uel8dTGYJ9zLylCD@cluster0.hpcrk.mongodb.net/Coffee';

// process.env.MongoURI=urlDB;

// console.log(process.env.MongoURI);

process.env.NODE_ENV=process.env.NODE_ENV || 'dev';

let urlDB;

if(process.env.NODE_ENV==='dev'){

    //Local MongoDB 
    urlDB='mongodb://localhost:27017/Coffee';
}else{
    //Remote MongoDB Cloud
    urlDB='mongodb+srv://dbMiguel:uel8dTGYJ9zLylCD@cluster0.hpcrk.mongodb.net/Coffee';
}

process.env.MONGOURI=urlDB;




