import dotenv from 'dotenv'
dotenv.config()

export default{
    app:{
        port: process.env.PORT || 4000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || "notaSecreta"
    },
    mysql:{
        host:process.env.MYSQL_HOST || 'localhost',
        user:process.env.MYSQL_USER || 'root',
        password:process.env.MYSQL_PASSWORD || '',
        database:process.env.MYSQL_DB || '',
    }
}