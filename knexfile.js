module.exports = {

    development: {
        migrations: {tableName: 'knex_migrations'},
        seeds: {tableName: './seeds'},
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'keylo',
            charset: 'utf8',
        },
    },
};
