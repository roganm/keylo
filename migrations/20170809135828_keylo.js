exports.up = function(knex, Promise) {
 return knex
        .schema
        .createTable('INDIVIDUALS', function(indsTable) {
            // Primary Key
            indsTable.increments();

            // Data
            indsTable.string('Name', 50).notNullable();
            indsTable.string('GUID', 50).notNullable().unique();
            indsTable.string('IndividualId', 10);
            indsTable.string('PhoneType1', 14);
            indsTable.string('PhoneType2', 14);
            indsTable.string('PhoneType3', 14);
            indsTable.string('PhoneType4', 14);
            indsTable.string('PhoneType5', 14);
            indsTable.string('WebsiteType1', 250);
            indsTable.string('WebsiteType2', 250);
            indsTable.string('WebsiteType3', 250);
            indsTable.string('WebsiteType4', 250);
            indsTable.string('WebsiteType5', 250);
            indsTable.string('Email1', 50);
            indsTable.string('Email2', 50);
            indsTable.string('Email3', 50);
            indsTable.string('Email4', 50);
            indsTable.string('Photo', 250);
            indsTable.boolean('PermitFreetextEmail');
            indsTable.string('FirstName', 250);
            indsTable.string('LastName', 250);
            indsTable.decimal('CorporationDisplayTypeId', 2);
            indsTable.boolean('PermitShowListingLink');
            indsTable.boolean('Active').notNullable().defaultTo(true);

            indsTable.timestamp('Created_At').notNullable();
            indsTable.timestamp('Deleted_At').notNullable();
            indsTable.timestamp('Updated_At').notNullable();
        })

        .createTable('organizations', function(orgsTable) {
            // Primary Key
            orgsTable.increments();

            // Data
            orgsTable.string('Name', 50).notNullable();
            orgsTable.string('GUID', 50).notNullable().unique();
            orgsTable.string('OrganizationId', 10);
            orgsTable.string('Logo', 250);
            orgsTable.string('AddressText', 250);
            orgsTable.string('PhoneType1', 14);
            orgsTable.string('PhoneType2', 14);
            orgsTable.string('PhoneType3', 14);
            orgsTable.string('PhoneType4', 14);
            orgsTable.string('PhoneType5', 14);
            orgsTable.string('WebsiteType1', 250);
            orgsTable.string('WebsiteType2', 250);
            orgsTable.string('WebsiteType3', 250);
            orgsTable.string('WebsiteType4', 250);
            orgsTable.string('WebsiteType5', 250);
            orgsTable.string('Email1', 50);
            orgsTable.string('Email2', 50);
            orgsTable.string('Email3', 50);
            orgsTable.string('Email4', 50);
            orgsTable.boolean('PermitFreetextEmail');
            orgsTable.boolean('PermitShowListingLink');
            orgsTable.boolean('Active').notNullable().defaultTo(true);

            orgsTable.timestamp('Created_At').notNullable();
            orgsTable.timestamp('Deleted_At').notNullable();
            orgsTable.timestamp('Updated_At').notNullable();
        })

        .createTable('photos', function(photsTable) {
            // Primary Key
            photsTable.increments();

            // Data
            photsTable.string('GUID', 50).notNullable().unique();

            photsTable.string('SequenceId', 250);
            photsTable.string('HighResPath', 250);
            photsTable.string('MedResPath', 250);
            photsTable.string('LowResPath', 250);
            photsTable.string('LastUpdated', 250);

            photsTable.boolean('Active').notNullable().defaultTo(true);

            photsTable.timestamp('Created_At').notNullable();
            photsTable.timestamp('Deleted_At').notNullable();
            photsTable.timestamp('Updated_At').notNullable();
        })

        .createTable('listings', function(listTable) {
            // Primary Key
            listTable.increments();

            // Data
            listTable.string('GUID', 50).notNullable().unique();
            listTable.string('ListingId', 250);
            listTable.string('MlsNumber', 250);
            listTable.string('PublicRemarks', 250);
            listTable.string('BathroomTotal', 250);
            listTable.string('Bedrooms', 250);
            listTable.string('SizeInterior', 250);
            listTable.string('SizeTotal', 250);
            listTable.string('Type', 250);
            listTable.string('Price', 250);
            listTable.string('PriceHistory', 250);
            listTable.string('AddressText', 250);
            listTable.string('Longitude', 250);
            listTable.string('Latitude', 250);
            listTable.string('PostalCode', 250);
            listTable.string('RelativeDetailsURL', 250);
            listTable.string('StatusId', 250);
            listTable.string('PhotoChangeDateUTC', 250);
            listTable.string('TypeId', 250);
            listTable.string('OwnershipType', 250);
            listTable.string('ZoningType', 250);
            listTable.string('BrochureLink', 250);
            listTable.string('PhotoLink', 250);
            listTable.string('SoundLink', 250);
            listTable.string('VideoLink', 250);

            listTable.boolean('Active').notNullable().defaultTo(true);
            listTable.datetime('Created_At').notNullable();
            listTable.datetime('Updated_At').notNullable();
            listTable.datetime('Deleted_At').notNullable();
        })
        .createTable('listing_realtor_organization', function(lroTable) {
            // Primary Key
            lroTable.increments();

            // Data
            lroTable.string('GUID', 50).notNullable().unique();
            lroTable.string('ListingId', 50).notNullable();
            lroTable.string('RealtorId', 50).notNullable();
            lroTable.string('OrganizationId', 50);
            lroTable.boolean('Active').notNullable().defaultTo(true);
            lroTable.string('Created_At').notNullable();
            lroTable.string('Updated_At').notNullable();
            lroTable.string('Deleted_At').notNullable();
        })

        .createTable('listing_photo', function(lpTable) {
            // Primary Key
            lpTable.increments();

            // Data
            lpTable.string('GUID', 50).notNullable().unique();
            lpTable.string('ListingId', 50).notNullable();
            lpTable.string('PhotoId', 50).notNullable();
            lpTable.boolean('Active').notNullable().defaultTo(true);
            lpTable.string('Created_At').notNullable();
            lpTable.string('Updated_At').notNullable();
            lpTable.string('Deleted_At').notNullable();
        })

        .createTable('listing_business', function(lbTable) {
            // Primary Key
            lbTable.increments();

            // Data
            lbTable.string('GUID', 50).notNullable().unique();
            lbTable.string('ListingId', 50).notNullable();
            lbTable.string('BusinessId', 50).notNullable();
            lbTable.boolean('Active').notNullable().defaultTo(true);
            lbTable.string('Created_At').notNullable();
            lbTable.string('Updated_At').notNullable();
            lbTable.string('Deleted_At').notNullable();
        });
};

exports.down = function(knex, Promise) {
    return knex
        .schema
        .dropTableIfExists('birds')
        .dropTableIfExists('users')
        .dropTableIfExists('individuals')
        .dropTableIfExists('organizations')
        .dropTableIfExists('photos')
        .dropTableIfExists('listing_realtor_organization')
        .dropTableIfExists('listing_photo')
        .dropTableIfExists('listing_business');
};
