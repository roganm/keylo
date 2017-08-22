exports.up = function(knex, Promise) {
 return knex
        .schema
        .createTable('individuals', function(indsTable) {
            // Primary Key
            indsTable.increments();

            // Data
            indsTable.string('name', 250).notNullable();
            indsTable.string('guid', 50).notNullable().unique();
            indsTable.integer('individualid').notNullable().unique();
            indsTable.string('phonetype1', 14);
            indsTable.string('phonetype2', 14);
            indsTable.string('phonetype3', 14);
            indsTable.string('phonetype4', 14);
            indsTable.string('phonetype5', 14);
            indsTable.string('websitetype1', 250);
            indsTable.string('websitetype2', 250);
            indsTable.string('websitetype3', 250);
            indsTable.string('websitetype4', 250);
            indsTable.string('websitetype5', 250);
            indsTable.string('email1', 50);
            indsTable.string('email2', 50);
            indsTable.string('email3', 50);
            indsTable.string('email4', 50);
            indsTable.string('photo', 250);
            indsTable.string('position', 250);
            indsTable.boolean('permitfreetextemail');
            indsTable.string('firstname', 250);
            indsTable.string('lastname', 250);
            indsTable.decimal('corporationdisplaytypeid');
            indsTable.boolean('permitshowlistinglink');
            indsTable.boolean('active').notNullable().defaultTo(true);

            indsTable.timestamps(true, true);
        })

        .createTable('organizations', function(orgsTable) {
            // Primary
            orgsTable.increments();

            // Data
            orgsTable.string('name', 250).notNullable();
            orgsTable.string('guid', 50).notNullable().unique();
            orgsTable.integer('organizationid').notNullable().unique();
            orgsTable.string('logo', 250);
            orgsTable.string('addresstext', 250);
            orgsTable.string('phonetype1', 14);
            orgsTable.string('phonetype2', 14);
            orgsTable.string('phonetype3', 14);
            orgsTable.string('phonetype4', 14);
            orgsTable.string('phonetype5', 14);
            orgsTable.string('websitetype1', 250);
            orgsTable.string('websitetype2', 250);
            orgsTable.string('websitetype3', 250);
            orgsTable.string('websitetype4', 250);
            orgsTable.string('websitetype5', 250);
            orgsTable.string('email1', 50);
            orgsTable.string('email2', 50);
            orgsTable.string('email3', 50);
            orgsTable.string('email4', 50);
            orgsTable.boolean('permitfreetextemail');
            orgsTable.boolean('permitshowlistinglink');
            orgsTable.boolean('active').notNullable().defaultTo(true);

            orgsTable.timestamps(true, true);
        })

        .createTable('listings', function(listTable) {
            // Primary Key
            listTable.increments();

            // Data
            listTable.string('guid', 50).notNullable().unique();
            listTable.string('listingid', 250).notNullable().unique();
            listTable.string('mlsnumber', 250).notNullable().unique();
            listTable.text('publicremarks', 'longtext');
            listTable.string('bathroomtotal', 250);
            listTable.string('bedrooms', 250);
            listTable.string('sizeinterior', 250);
            listTable.string('storiestotal', 250);
            listTable.string('sizetotal', 250);
            listTable.string('type', 250);
            listTable.string('propertytype', 250);
            listTable.integer('price');
            listTable.text('pricehistory', 'longtext');
            listTable.string('addresstext', 250);
            listTable.string('longitude', 250);
            listTable.string('latitude', 250);
            listTable.string('postalcode', 250);
            listTable.string('relativedetailsurl', 250);
            listTable.string('statusid', 250);
            listTable.string('photochangedateutc', 250);
            listTable.string('pricechangedateutc', 250);
            listTable.string('openhouseinsertdateutc', 250);
            listTable.string('parking', 250);
            listTable.string('typeid', 250);
            listTable.string('ownershiptype', 250);
            listTable.string('ammenitiesnearby', 250);
            listTable.string('zoningtype', 250);
            listTable.string('brochurelink', 250);
            listTable.string('photolink', 250);
            listTable.string('soundlink', 250);
            listTable.string('videolink', 250);
            listTable.string('photosequenceid', 250);
            listTable.string('highrespath', 250);
            listTable.string('medrespath', 250);
            listTable.string('lowrespath', 250);
            listTable.string('photolastupdated', 250);
            listTable.boolean('active').notNullable().defaultTo(true);
            listTable.timestamps(true, true);
        })
        .createTable('listing_realtor_organization', function(lroTable) {
            // Primary Key
            lroTable.increments();

            // Data
            lroTable.string('guid', 50).notNullable().unique();
            lroTable.string('listingid', 50).references('guid').inTable('listings');
            lroTable.string('individualid', 50).references('guid').inTable('individuals');
            lroTable.string('organizationid', 50).references('guid').inTable('organizations');
            lroTable.boolean('active').notNullable().defaultTo(true);
            lroTable.timestamps(true, true);
        })

        .createTable('listing_business', function(lbTable) {
            // Primary Key
            lbTable.increments();

            // Data
            lbTable.string('guid', 50).notNullable().unique();
            lbTable.string('listingid', 50).notNullable();
            lbTable.string('businessid', 50).notNullable();

            lbTable.boolean('active').notNullable().defaultTo(true);
            lbTable.timestamps(true, true);
        });
};

exports.down = function(knex, Promise) {
    return knex
        .schema
        .dropTableIfExists('individuals')
        .dropTableIfExists('organizations')
        .dropTableIfExists('photos')
        .dropTableIfExists('listing_realtor_organization')
        .dropTableIfExists('listing_business');
};
