export default require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3396,
        user: 'root',
        password: 'root',
        database: 'kl',
        charset: 'utf8',
    }
});