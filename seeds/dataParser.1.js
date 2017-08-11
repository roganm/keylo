const data = require('./data.json');
const GUID = require('node-uuid');
const Knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'keylo',
    charset: 'utf8',
  }
});

let listings = [];
let individuals = [];
let organizations = [];
let relations = [];

function

for (let i = 0; i < data.length; i++) {

  const getOperation1 = Knex('listings').where({
    'listingid': data[i].Id
  }).select('guid').then((data) => {
    if (data) {
      console.log(data[0].guid);
    } else {
      createListing();
    }
  }).catch((err) => {
    console.log(err);
  });

  var listingref = null;
  var indrefs = [];
  var orgrefs = [];

  var listing = {
    guid: null,
    listingid: null,
    mlsnumber: null,
    publicremarks: null,
    bathroomtotal: null,
    bedrooms: null,
    sizeinterior: null,
    sizetotal: null,
    type: null,
    propertytype: null,
    price: null,
    pricehistory: [],
    addresstext: null,
    longitude: null,
    latitude: null,
    postalcode: null,
    relativedetailsurl: null,
    statusid: null,
    photochangedateutc: null,
    pricechangedateutc: null,
    openhouseinsertdateutc: null,
    typeid: null,
    ownershiptype: null,
    zoningtype: null,
    brochurelink: null,
    photolink: null,
    soundlink: null,
    videolink: null,
    photosequenceid: null,
    highrespath: null,
    medrespath: null,
    lowrespath: null,
    photolastupdated: null,
  }

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
  listing.pricehistory.push(data[i].Property.Price);
  listing.pricehistory = JSON.stringify(listing.pricehistory);
  listing.propertytype = data[i].Property.Type;
  listing.addresstext = data[i].Property.Address.AddressText;
  listing.longitude = data[i].Property.Address.Longitude;
  listing.latitude = data[i].Property.Address.Latitude;
  listing.postalcode = data[i].PostalCode;
  listing.relativedetailsurl = data[i].RelativeDetailsURL;
  listing.statusid = data[i].StatusId;
  listing.pricechangedateutc = data[i].PriceChangeDateUTC ? data[i].PriceChangeDateUTC : null;
  listing.photochangedateutc = data[i].PhotoChangeDateUTC ? data[i].PhotoChangeDateUTC : null;
  listing.typeid = data[i].Property.TypeId;
  listing.ownershiptype = data[i].OwnershipType ? data[i].OwnershipType : null;
  listing.zoningtype = data[i].ZoningType ? data[i].ZoningType : null;
  listing.openhouseinsertdateutc = data[i].OpenHouseInsertDateUTC ? data[i].OpenHouseInsertDateUTC : null;
  listing.photosequenceid = data[i].Property.Photo[0].SequenceId;
  listing.highrespath = data[i].Property.Photo[0].HighResPath;
  listing.medrespath = data[i].Property.Photo[0].MedResPath;
  listing.lowrespath = data[i].Property.Photo[0].LowResPath;
  listing.photolastupdated = data[i].Property.Photo[0].LastUpdated;

  if (data[i].AlternateURL) {
    listing.brochurelink = data[i].AlternateURL.BrochureLink ? data[i].AlternateURL.BrochureLink : null;
    listing.photolink = data[i].AlternateURL.PhotoLink ? data[i].AlternateURL.PhotoLink : null;
    listing.soundlink = data[i].AlternateURL.SoundLink ? data[i].AlternateURL.SoundLink : null;
    listing.videolink = data[i].AlternateURL.VideoLink ? data[i].AlternateURL.VideoLink : null;
  }

  listingref = listing.guid;
  listings.push(listing);

  for (let j = 0; j < data[i].Individual.length; j++) {

    const getOperation2 = Knex('individuals').where({
      'individualid': data[i].Individual[j].IndividualID
    }).select('guid').then((data) => {
      if (data) {
        indrefs.push(data);
      } else {

        var individual = {
          name: null,
          guid: null,
          individualid: null,
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
        };

        individual.GUID = GUID.v4();
        individual.individualid = data[i].Individual[j].IndividualID;
        individual.name = data[i].Individual[j].Name;
        individual.photo = data[i].Individual[j].Photo;
        individual.permitfreetextemail = data[i].Individual[j].PermitFreeTextEmail;
        individual.firstname = data[i].Individual[j].FirstName;
        individual.lastname = data[i].Individual[j].LastName;
        individual.corporationdisplaytypeid = data[i].Individual[j].CorporationDisplayTypeId;
        individual.permitshowlistinglink = data[i].Individual[j].PermitShowListingLink;


        if (data[i].Individual[j].Phones) {
          for (let k = 0; k < data[i].Individual[j].Phones.length; k++) {
            switch (data[i].Individual[j].Phones[k].PhoneTypeId) {
              case '1':
                individual.phonetype1 = data[i].Individual[j].Phones[k].AreaCode + '-' + data[i].Individual[j].Phones[k].PhoneNumber;
                break;
              case '2':
                individual.phonetype2 = data[i].Individual[j].Phones[k].AreaCode + '-' + data[i].Individual[j].Phones[k].PhoneNumber;
                break;
              case '3':
                individual.phonetype3 = data[i].Individual[j].Phones[k].AreaCode + '-' + data[i].Individual[j].Phones[k].PhoneNumber;
                break;
              case '4':
                individual.phonetype4 = data[i].Individual[j].Phones[k].AreaCode + '-' + data[i].Individual[j].Phones[k].PhoneNumber;
                break;
              case '5':
                individual.phonetype5 = data[i].Individual[j].Phones[k].AreaCode + '-' + data[i].Individual[j].Phones[k].PhoneNumber;
                break;
            }
          }
        }

        if (data[i].Individual[j].Websites) {
          for (let k = 0; k < data[i].Individual[j].Websites.length; k++) {
            switch (data[i].Individual[j].Websites[k].WebsiteTypeId) {
              case '1':
                individual.websitetype1 = data[i].Individual[j].Websites[k].Website;
                break;
              case '2':
                individual.websitetype2 = data[i].Individual[j].Websites[k].Website;
                break;
              case '3':
                individual.websitetype3 = data[i].Individual[j].Websites[k].Website;
                break;
              case '4':
                individual.websitetype4 = data[i].Individual[j].Websites[k].Website;
                break;
              case '5':
                individual.websitetype5 = data[i].Individual[j].Websites[k].Website;
                break;
            }
          }
        }

        individual.email1 = data[i].Individual[j].Emails[0].ContactId;

        indrefs.push(individual.GUID);
        individuals.push(individual);
      }
    }).catch((err) => {
      console.log(err);
    });

    const getOperation3 = Knex('organizations').where({
      'organizationid': data[i].Individual[j].Organization.OrganizationID
    }).select('guid').then((data) => {
      if (data) {
        orgrefs.push(data);
      } else {

        var organization = {
          name: null,
          guid: null,
          organizationid: null,
          logo: null,
          addresstext: null,
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
          permitfreetextemail: null,
          permitshowlistinglink: null,
        }

        organization.GUID = GUID.v4();
        organization.name = data[i].Individual[j].Organization.Name;
        organization.logo = data[i].Individual[j].Organization.Logo;
        organization.organizationid = data[i].Individual[j].Organization.OrganizationID;
        organization.addresstext = data[i].Individual[j].Organization.Address.AddressText;
        organization.permitfreetextemail = data[i].Individual[j].Organization.PermitFreeTextEmail;
        organization.permitshowlistinglink = data[i].Individual[j].Organization.PermitShowListingLink;

        if (data[i].Individual[j].Organization.Phones) {
          for (let k = 0; k < data[i].Individual[j].Organization.Phones.length; k++) {
            switch (data[i].Individual[j].Organization.Phones[k].PhoneTypeId) {
              case '1':
                individual.phonetype1 = data[i].Individual[j].Organization.Phones[k].AreaCode + '-' + data[i].Individual[j].Organization.Phones[k].PhoneNumber;
                break;
              case '2':
                individual.phonetype2 = data[i].Individual[j].Organization.Phones[k].AreaCode + '-' + data[i].Individual[j].Organization.Phones[k].PhoneNumber;
                break;
              case '3':
                individual.phonetype3 = data[i].Individual[j].Organization.Phones[k].AreaCode + '-' + data[i].Individual[j].Organization.Phones[k].PhoneNumber;
                break;
              case '4':
                individual.phonetype4 = data[i].Individual[j].Organization.Phones[k].AreaCode + '-' + data[i].Individual[j].Organization.Phones[k].PhoneNumber;
                break;
              case '5':
                individual.phonetype5 = data[i].Individual[j].Organization.Phones[k].AreaCode + '-' + data[i].Individual[j].Organization.Phones[k].PhoneNumber;
                break;
            }
          }
        }

        if (data[i].Individual[j].Organization.Websites) {
          for (let k = 0; k < data[i].Individual[j].Organization.Websites.length; k++) {
            switch (data[i].Individual[j].Organization.Websites[k].WebsiteTypeId) {
              case '1':
                individual.websitetype1 = data[i].Individual[j].Organization.Websites[k].Website;
                break;
              case '2':
                individual.websitetype2 = data[i].Individual[j].Organization.Websites[k].Website;
                break;
              case '3':
                individual.websitetype3 = data[i].Individual[j].Organization.Websites[k].Website;
                break;
              case '4':
                individual.websitetype4 = data[i].Individual[j].Organization.Websites[k].Website;
                break;
              case '5':
                individual.websitetype5 = data[i].Individual[j].Organization.Websites[k].Website;
                break;
            }
          }
        }

        organization.email1 = data[i].Individual[j].Organization.Emails[0].ContactId;

        orgrefs.push(organization.GUID);
        organizations.push(organization);

      }

    }).catch((err) => {
      console.log(err);
    });
  }

  for(let l = 0; l < indrefs.length; l++){
    relations.push = {
      guid: GUID.v4(),
      listingid: listingref,
      individualid: indrefs[l],
      organizationid: orgrefs[l]
    }
  }
}

console.log(data);

const insertOperation1 = Knex('listings').insert(listings)
  .then((res) => {
    console.log('listings: success');
  }).catch((err) => {
    console.log(err);
  });

const insertOperation2 = Knex('individuals').insert(individuals)
  .then((res) => {
    console.log('individuals: success');
  }).catch((err) => {
    console.log(err);
  });

const insertOperation3 = Knex('organizations').insert(organizations)
  .then((res) => {
    console.log('organizations: success');
  }).catch((err) => {
    console.log(err);
  });

const insertOperation4 = Knex('listing_realtor_organization').insert(relations)
  .then((res) => {
    console.log('relations: success');
  }).catch((err) => {
    console.log(err);
  });