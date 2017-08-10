exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('listings').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
      ]);
    });
};

import GUID from 'node-uuid';

exports.seed = function seed(knex, Promise) {
  const tableName = 'listings';

  const data = require('./data.json');

  let listing = {
    guid: null,
    listingid: null,
    mlsnumber: null,
    publicremarks: null,
    bathroomtotal: null,
    bedrooms: null,
    sizeinterior: null,
    sizetotal: null,
    type: null,
    price: null,
    pricehistory: null,
    propertytype: null,
    addresstext: null,
    longitude: null,
    latitude: null,
    postalcode: null,
    relativedetailsurl: null,
    statusid: null,
    pricechangedateutc: null,
    photochangedateutc: null,
    openhouseinsertdateutc: null,
    typeid: null,
    ownershiptype: null,
    zoningtype: null,
    brochurelink: null,
    photolink: null,
    soundlink: null,
    videolink: null,
  }

  let individual = {
    guid: null,
    individualid: null,
    name: null,
    phonetype1: null,
    phonetype2: null,
    phonetype3: null,
    phonetype4: null,
    phonetype5: null,
    websitetype1: null,
    websitetype2: null,
    websitetype3: null,
    websitetype4: null,
    websitetype5: null,
    email1: null,
    email2: null,
    email3: null,
    email4: null,
    photo: null,
    permitfreetextemail: null,
    firstname: null,
    lastname: null,
    corporationdisplaytypeid: null,
    permitshowlistinglink: null,
  }

  let refs = {
    listing: null,
    individuals: [

    ],
    orgs: [

    ],
    photos: [

    ],
  }

  let listings = [];

  let individuals = [];

  let photos = [];

  let orgs = [];

  for (let i = 0; i < data.length; i++) {
    
    listing.guid = GUID.v4();
    listing.listingid = data[i].Id;
    listing.mlsnumber = data[i].MlsNumber;
    listing.publicremarks = data[i].PublicRemarks;
    listing.bathroomtotal = data[i].Building.BathroomTotal;
    listing.bedrooms = data[i].Building.Bedrooms;
    listing.sizeinterior = data[i].Building.SizeInterior
    listing.sizetotal = data[i].Land.SizeTotal;
    listing.type = data[i].Building.Type;
    listing.price = data[i].Property.Price;
    listing.propertytype = data[i].Property.Type;
    listing.addresstext = data[i].Property.Address.AddressText;
    listing.longitude = data[i].Property.Address.Longitude;
    listing.latitude = data[i].Property.Address.Latitude;
    listing.postalcode = data[i].PostalCode;
    listing.relativedetailsurl = data[i].RelativeDetailsURL;
    listing.statusid = data[i].StatusId;
    listing.pricechangedateutc = data[i].PriceChangeDateUTC;
    listing.photochangedateutc = data[i].PhotoChangeDateUTC;
    listing.typeid = data[i].Property.TypeId;
    listing.ownershiptype = data[i].OwnershipType;
    listing.zoningtype = data[i].ZoningType;
    listing.openhouseinsertdateutc = data[i].OpenHouseInsertDateUTC;
    listing.brochurelink = data[i].AlternateURL.BrochureLink;
    listing.photolink = data[i].AlternateURL.PhotoLink;
    listing.soundlink = data[i].AlternateURL.SoundLink;
    listing.videolink = data[i].AlternateURL.VideoLink;
    console.log(listing);
  }

  var rows = [

  ];

  return knex(tableName)
    // Empty the table (DELETE)
    .del()
    .then(function () {
      return knex.insert(rows).into(tableName);
    });
};