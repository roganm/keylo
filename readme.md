## KEYLO      

### Installation
-----

#### This guide will get you up and running. There are many steps.

1. Install [NodeJS](https://nodejs.org/en/download/)
2. Install [mySQL](https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-5.7.19.0.msi)
    * In order to not have to fiddle with configuring the database connection, use default port and set the root password to `root`, and use all other default settings
3. Install [Git](https://git-scm.com/download/win)
4. Clone the repository
    * Hit `wnd + r` type `cmd` to open a terminal
    * Hit enter
    * Navigate to an appropriate folder
    * Type `git clone https://github.com/roganm/keylo` and wait for it to finish
5. Navigate into the new directory using `cd keylo`
6. Install dependencies `npm install`
7. Install webpack CLI (command line interface) `npm install -g webpack`
8. Install Knex CLI `npm install -g knex`
9. Perform database migrations `knex migrate:latest`
10. Perform webpack compile `npm run dev`

At this point all dependencies should be installed.

### Database Seed
-----

To seed your database with data, run `node ./seeds/dataParser.js`. This should only take a few seconds, and you should see numbers count up the side of the window, ending at 204. You are now ready to fiddle.

### Starting the server
-----
1. Run `npm start`
2. Open your browser and navigate to `http://locahost:3000/realtors`
3. Pick a guid out of the list, eg. `579e4298-0777-434f-b507-be0a7a322f55`
4. Navigate to `http://locahost:3000/realtors/[CHOSEN GUID]` eg. `http://locahost:3000/realtors/579e4298-0777-434f-b507-be0a7a322f55`



