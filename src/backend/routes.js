import Knex from './knex';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import GUID from 'node-uuid';

function hashPassword(password, callback) {
    // Generate a salt at level 10 strength
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
}

const routes = [
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: true
            }
        }
    },
    {
        path: '/users',
        method: 'POST',
        config: {
            auth: {
                strategy: 'token'
            }
        },
        handler: (request, reply) => {
            const { user } = request.payload;

            const getOperation = Knex('users').where({
                'email': user.email
            }).select('guid').then((user) => {
                if (user) {
                    reply({
                        error: true,
                        errMessage: 'a user with that e-mail already exists',
                    });
                }

            }).catch((err) => {
                reply('server-side error: ' + err);
            });

            const guid = GUID.v4();

            hashPassword(user.password, (err, hash) => {
                if (err) {
                    reply('server-side error: ' + err);
                }

                const insertOperation = Knex('users').insert({
                    email: user.email,
                    password: hash,
                    guid,
                }).then((res) => {
                    reply({
                        data: guid,
                        message: 'successfully created user'
                    });
                }).catch((err) => {
                    reply('server-side error: ' + err);
                });
            });
        }
    },
    {
        path: '/birds',
        method: 'GET',
        handler: (request, reply) => {
            // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
            const getOperation = Knex('birds').where({
                isPublic: true
            }).select('name', 'species', 'picture_url').then((results) => {
                if (!results || results.length === 0) {
                    reply({
                        error: true,
                        errMessage: 'no public bird found',
                    });
                }
                reply({
                    dataCount: results.length,
                    data: results,
                });
            }).catch((err) => {
                reply('server-side error: ' + err);
            });
        }
    },
    {
        path: '/auth',
        method: 'POST',
        handler: (request, reply) => {
            // This is a ES6 standard
            const { username, password } = request.payload;
            const getOperation = Knex('users').where({
                // Equiv. to `username: username`
                username,
            }).select('guid', 'password').then((users) => {
                if (users.length === 0) {
                    reply({
                        error: true,
                        errMessage: 'the specified user was not found',
                    });

                    return;
                }

                // Honestly, this is VERY insecure. Use some salted-hashing algorithm and then compare it.
                if (users[0].password === password) {
                    const token = jwt.sign({
                        // You can have anything you want here. ANYTHING. As we'll see in a bit, this decoded token is passed onto a request handler.
                        username,
                        scope: users[0].guid,
                    }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                            algorithm: 'HS256',
                            expiresIn: '1h',
                        });
                    reply({
                        token,
                        scope: users[0].guid,
                    });
                } else {
                    reply('incorrect password');
                }
            }).catch((err) => {
                reply('server-side error: ' + err);
            });
        }
    },
    {
        path: '/birds',
        method: 'POST',
        config: {
            auth: {
                strategy: 'token',
            }
        },
        handler: (request, reply) => {
            const { bird } = request.payload;

            const guid = GUID.v4();

            const insertOperation = Knex('birds').insert({

                owner: request.auth.credentials.scope,
                name: bird.name,
                species: bird.species,
                picture_url: bird.picture_url,
                guid,

            }).then((res) => {

                reply({

                    data: guid,
                    message: 'successfully created bird'

                });

            }).catch((err) => {

                reply('server-side error: ' + err);

            });
        }
    },
    {
        path: '/birds/{birdGuid}',
        method: 'PUT',
        config: {
            auth: {
                strategy: 'token',
            },
            pre: [
                {
                    method: (request, reply) => {
                        const { birdGuid } = request.params,
                            { scope } = request.auth.credentials;
                        const getOperation = Knex('birds').where({

                            guid: birdGuid,

                        }).select('owner').then(([result]) => {
                            if (!result) {

                                reply({

                                    error: true,
                                    errMessage: `the bird with id ${birdGuid} was not found`

                                }).takeover();

                            }

                            if (result.owner !== scope) {

                                reply({

                                    error: true,
                                    errMessage: `the bird with id ${birdGuid} is not in the current scope`

                                }).takeover();

                            }

                            return reply.continue();
                        });
                    }
                }
            ]
        },
        handler: (request, reply) => {
            const { birdGuid } = request.params,
                { bird } = request.payload;

            const insertOperation = Knex('birds').where({

                guid: birdGuid,

            }).update({

                name: bird.name,
                species: bird.species,
                picture_url: bird.picture_url,
                isPublic: bird.isPublic,

            }).then((res) => {

                reply({

                    message: 'successfully updated bird'

                });

            }).catch((err) => {

                reply('server-side error');

            });
        }
    }
]

export default routes