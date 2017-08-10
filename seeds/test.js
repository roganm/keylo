const data = require('./data.json');
const GUID = require('node-uuid');
const Knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3396,
    user: 'root',
    password: 'root',
    database: 'keylo',
    charset: 'utf8',
  }
});

let listings = [];

let individuals = [];

let photos = [];

let organizations = [];

for (let i = 0; i < data.length; i++) {

  var listingref = null;

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
    photosequenceid: null,
    highrespath: null,
    medrespath: null,
    lowrespath: null,
    photolastupdated: null,
  }

  listing.GUID = GUID.v4();
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
  listing.pricechangedateutc = data[i].PriceChangeDateUTC ? data[i].PriceChangeDateUTC : null;
  listing.photochangedateutc = data[i].PhotoChangeDateUTC ? data[i].PhotoChangeDateUTC : null;
  listing.typeid = data[i].Property.TypeId;
  listing.ownershiptype = data[i].OwnershipType ? data[i].OwnershipType : null;
  listing.zoningtype = data[i].ZoningType ? data[i].ZoningType : null;
  listing.openhouseinsertdateutc = data[i].OpenHouseInsertDateUTC ? data[i].OpenHouseInsertDateUTC : null;
  listing.photosequenceid = data[i].Property.Photo.SequenceId;
  listing.highrespath = data[i].Property.Photo.HighResPath;
  listing.medrespath = data[i].Property.Photo.MedResPath;
  listing.lowrespath = data[i].Property.Photo.LowResPath;
  listing.photolastupdated = data[i].Property.Photo.LastUpdated;

  if (data[i].AlternateURL) {
    listing.brochurelink = data[i].AlternateURL.BrochureLink ? data[i].AlternateURL.BrochureLink : null;
    listing.photolink = data[i].AlternateURL.PhotoLink ? data[i].AlternateURL.PhotoLink : null;
    listing.soundlink = data[i].AlternateURL.SoundLink ? data[i].AlternateURL.SoundLink : null;
    listing.videolink = data[i].AlternateURL.VideoLink ? data[i].AlternateURL.VideoLink : null;
  }

  refs.listing = listing.GUID;

  listings.push(listing);

  for (let j = 0; j < data[i].Individual.length; j++) {

    // Check if this individual exists in the database
    const getOperation = Knex('individuals').where({
      'IndividualId': data[i].Individual[j].IndividualID
    }).select('GUID').then((org) => {
      if (org) {
        // Get their GUID for the refs table
        refs.
        // If their details have changed, lets update them
      } else {
        // New realtor, lets make them
      }
    }).catch((err) => {
      console.log(err);
    });

    let individual = {
      GUID: null,
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
    };

    organization = {
      GUID: null,
      name: null,
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

    refs.individuals.push(individual.GUID);
    individuals.push(individual);

    const getOperation = Knex('organizations').where({
      'OrganizationId': data[i].Individual[j].Organization.OrganizationID
    }).select('GUID').then((org) => {
      if (org) {
        refs.organizations
      } else {
        //New org
      }
    }).catch((err) => {
      console.log(err);
    });

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

    refs.organizations.push(organization.GUID);
    organizations.push(organization);
  }

}
