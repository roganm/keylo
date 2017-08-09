module.exports = {

    development: {
        migrations: {tableName: 'knex_migrations'},
        seeds: {tableName: './seeds'},
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3396,
            user: 'root',
            password: 'root',
            database: 'kl',
            charset: 'utf8',
        },
    },
};
