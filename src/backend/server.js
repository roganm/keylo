'use strict'

import Path from 'path';
import Hapi from 'hapi';
import routes from './routes';

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../frontend/public')
            }
        }
    },
    debug: { request: ['error'] }
});

server.connection({
    host: 'localhost',
    port: 3000
});

server.register([require('hapi-auth-jwt'), require('inert')], (err) => {
    server.auth.strategy('token', 'jwt', {

        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

        verifyOptions: {
            algorithms: ['HS256'],
        }

    });

    routes.forEach((route) => {

        console.log(`attaching ${route.path}`);
        server.route(route);

    });

});

server.start(err => {
    if (err) {

        // Error handling
        console.error('Error was handled!');
        console.error(err);

    }

    console.log(`Server started at ${server.info.uri}`);
});