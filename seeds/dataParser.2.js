const bulk_data = require('./data.json');
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

function parse(data) {
  var listref;

  Knex('listings').select('guid').where({
    'listingid': data.Id
  }).then((lst) => {
    if (lst[0]) {
      console.log(lst);
    } else {
      createListing(data)
        .then((list) => {
          console.log(list);
          /*************************************** */
          parseInd(data.Individual, 0, data.Individual.length)
            .then((lt) => {
              console.log(lt);
            })
            .catch((err) => {
              console.log(err);
            });

        })
        .catch((err) => {
          console.log(err);
        });

    }
  }).catch((err) => {
    console.log(err);
  });
}

function createListing(data) {
  return new Promise((resolve, reject) => {

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
    listing.listingid = data.Id;
    listing.mlsnumber = data.MlsNumber;
    listing.publicremarks = data.PublicRemarks;
    listing.bathroomtotal = data.Building.BathroomTotal;
    listing.bedrooms = data.Building.Bedrooms;
    listing.sizeinterior = data.Building.SizeInterior
    listing.sizetotal = data.Land.SizeTotal;
    listing.type = data.Building.Type;
    listing.price = data.Property.Price;
    listing.pricehistory.push(data.Property.Price);
    listing.pricehistory = JSON.stringify(listing.pricehistory);
    listing.propertytype = data.Property.Type;
    listing.addresstext = data.Property.Address.AddressText;
    listing.longitude = data.Property.Address.Longitude;
    listing.latitude = data.Property.Address.Latitude;
    listing.postalcode = data.PostalCode;
    listing.relativedetailsurl = data.RelativeDetailsURL;
    listing.statusid = data.StatusId;
    listing.pricechangedateutc = data.PriceChangeDateUTC ? data.PriceChangeDateUTC : null;
    listing.photochangedateutc = data.PhotoChangeDateUTC ? data.PhotoChangeDateUTC : null;
    listing.typeid = data.Property.TypeId;
    listing.ownershiptype = data.OwnershipType ? data.OwnershipType : null;
    listing.zoningtype = data.ZoningType ? data.ZoningType : null;
    listing.openhouseinsertdateutc = data.OpenHouseInsertDateUTC ? data.OpenHouseInsertDateUTC : null;
    listing.photosequenceid = data.Property.Photo[0].SequenceId;
    listing.highrespath = data.Property.Photo[0].HighResPath;
    listing.medrespath = data.Property.Photo[0].MedResPath;
    listing.lowrespath = data.Property.Photo[0].LowResPath;
    listing.photolastupdated = data.Property.Photo[0].LastUpdated;

    if (data.AlternateURL) {
      listing.brochurelink = data.AlternateURL.BrochureLink ? data.AlternateURL.BrochureLink : null;
      listing.photolink = data.AlternateURL.PhotoLink ? data.AlternateURL.PhotoLink : null;
      listing.soundlink = data.AlternateURL.SoundLink ? data.AlternateURL.SoundLink : null;
      listing.videolink = data.AlternateURL.VideoLink ? data.AlternateURL.VideoLink : null;
    }

    Knex('listings').insert(listing)
      .then((res) => {
        resolve(listing.guid)
      }).catch((err) => {
        reject(err);
      });
  })
}

function parseInd(data, j, max) {

  Knex('individuals').select('guid').where({
    'individualid': data[j].IndividualID
  }).then((lst) => {
    if (lst[0]) {
      console.log(lst);
    } else {
      createIndividual(data, j, max)
        .then((list) => {
          console.log(list);
          /*************************************** */
          createIndividual(data.Individual, 0)
            .then((lt) => {
              console.log(lt);
            })
            .catch((err) => {
              console.log(err);
            });

        })
        .catch((err) => {
          console.log(err);
        });

    }
  }).catch((err) => {
    console.log(err);
  });
}


function createIndividual(data, j, max) {
  return new Promise((resolve, reject) => {

    Knex('individuals').where({
      'individualid': data[j].IndividualID
    }).select('guid').then((ind) => {
      if (ind[0]) {
        console.log(ind);

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

        individual.guid = GUID.v4();
        individual.individualid = data[j].IndividualID;
        individual.name = data[j].Name;
        individual.photo = data[j].Photo;
        individual.permitfreetextemail = data[j].PermitFreeTextEmail;
        individual.firstname = data[j].FirstName;
        individual.lastname = data[j].LastName;
        individual.corporationdisplaytypeid = data[j].CorporationDisplayTypeId;
        individual.permitshowlistinglink = data[j].PermitShowListingLink;


        if (data[j].Phones) {
          for (let k = 0; k < data[j].Phones.length; k++) {
            switch (data[j].Phones[k].PhoneTypeId) {
              case '1':
                individual.phonetype1 = data[j].Phones[k].AreaCode + '-' + data[j].Phones[k].PhoneNumber;
                break;
              case '2':
                individual.phonetype2 = data[j].Phones[k].AreaCode + '-' + data[j].Phones[k].PhoneNumber;
                break;
              case '3':
                individual.phonetype3 = data[j].Phones[k].AreaCode + '-' + data[j].Phones[k].PhoneNumber;
                break;
              case '4':
                individual.phonetype4 = data[j].Phones[k].AreaCode + '-' + data[j].Phones[k].PhoneNumber;
                break;
              case '5':
                individual.phonetype5 = data[j].Phones[k].AreaCode + '-' + data[j].Phones[k].PhoneNumber;
                break;
            }
          }
        }

        if (data[j].Websites) {
          for (let k = 0; k < data[j].Websites.length; k++) {
            switch (data[j].Websites[k].WebsiteTypeId) {
              case '1':
                individual.websitetype1 = data[j].Websites[k].Website;
                break;
              case '2':
                individual.websitetype2 = data[j].Websites[k].Website;
                break;
              case '3':
                individual.websitetype3 = data[j].Websites[k].Website;
                break;
              case '4':
                individual.websitetype4 = data[j].Websites[k].Website;
                break;
              case '5':
                individual.websitetype5 = data[j].Websites[k].Website;
                break;
            }
          }
        }

        individual.email1 = data[j].Emails[0].ContactId;

        Knex('individuals').insert(individual)
          .then((res) => {
            resolve(individual.guid)
          }).catch((err) => {
            reject(err);
          });

      }
    }).catch((err) => {
      reject(err);
    });
  })
}

for (let i = 0; i < bulk_data.length; i++) {
  parse(bulk_data[i]);
}

/*
  const getOperation3 = Knex('organizations').where({
    'organizationid': data.Individual[j].Organization.OrganizationID
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
      organization.name = data.Individual[j].Organization.Name;
      organization.logo = data.Individual[j].Organization.Logo;
      organization.organizationid = data.Individual[j].Organization.OrganizationID;
      organization.addresstext = data.Individual[j].Organization.Address.AddressText;
      organization.permitfreetextemail = data.Individual[j].Organization.PermitFreeTextEmail;
      organization.permitshowlistinglink = data.Individual[j].Organization.PermitShowListingLink;

      if (data.Individual[j].Organization.Phones) {
        for (let k = 0; k < data.Individual[j].Organization.Phones.length; k++) {
          switch (data.Individual[j].Organization.Phones[k].PhoneTypeId) {
            case '1':
              individual.phonetype1 = data.Individual[j].Organization.Phones[k].AreaCode + '-' + data.Individual[j].Organization.Phones[k].PhoneNumber;
              break;
            case '2':
              individual.phonetype2 = data.Individual[j].Organization.Phones[k].AreaCode + '-' + data.Individual[j].Organization.Phones[k].PhoneNumber;
              break;
            case '3':
              individual.phonetype3 = data.Individual[j].Organization.Phones[k].AreaCode + '-' + data.Individual[j].Organization.Phones[k].PhoneNumber;
              break;
            case '4':
              individual.phonetype4 = data.Individual[j].Organization.Phones[k].AreaCode + '-' + data.Individual[j].Organization.Phones[k].PhoneNumber;
              break;
            case '5':
              individual.phonetype5 = data.Individual[j].Organization.Phones[k].AreaCode + '-' + data.Individual[j].Organization.Phones[k].PhoneNumber;
              break;
          }
        }
      }

      if (data.Individual[j].Organization.Websites) {
        for (let k = 0; k < data.Individual[j].Organization.Websites.length; k++) {
          switch (data.Individual[j].Organization.Websites[k].WebsiteTypeId) {
            case '1':
              individual.websitetype1 = data.Individual[j].Organization.Websites[k].Website;
              break;
            case '2':
              individual.websitetype2 = data.Individual[j].Organization.Websites[k].Website;
              break;
            case '3':
              individual.websitetype3 = data.Individual[j].Organization.Websites[k].Website;
              break;
            case '4':
              individual.websitetype4 = data.Individual[j].Organization.Websites[k].Website;
              break;
            case '5':
              individual.websitetype5 = data.Individual[j].Organization.Websites[k].Website;
              break;
          }
        }
      }

      organization.email1 = data.Individual[j].Organization.Emails[0].ContactId;

      orgrefs.push(organization.GUID);
      organizations.push(organization);

    }

  }).catch((err) => {
    console.log(err);
  });
}

for (let l = 0; l < indrefs.length; l++) {
  relations.push = {
    guid: GUID.v4(),
    listingid: listingref,
    individualid: indrefs[l],
    organizationid: orgrefs[l]
  }
}
}




/*


for (let i = 0; i < data.length; i++) {

  const getOperation1 = Knex('listings').where({
    'listingid': data.Id
  }).select('guid').then((data) => {
    if (data) {
      console.log(data[0].guid);
    } else {
      createListing(i);
    }
  }).catch((err) => {
    console.log(err);
  });

  var listingref = null;
  var indrefs = [];
  var orgrefs = [];



 
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

  */