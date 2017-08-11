const bulk_data = require('./data.json');
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

function parse(data, i) {

  console.log(i);

  Knex('listings').select('guid').where({
    'listingid': data[i].Id
  }).then((lst) => {
    if (lst[0]) {
      //console.log(lst);
      if (data[++i]) {
        parse(data, i);
      } else {
        Knex.destroy();
      }
    } else {
      createListing(data[i])
        .then((listid) => {

          createIndividual(data[i].Individual, 0, listid)
            .then((ind) => {

              if (data[++i]) {
                parse(data, i);
              } else {
                Knex.destroy();
              }

            }).catch((err) => {
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
      parking: null,
      ammenitiesnearby: null,
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
    if (data.Property.Parking) listing.parking = data.Property.Parking.Name;
    listing.ammenitiesnearby = data.Property.AmmenitiesNearBy;
    if (data.Property.Photo) {
      listing.photosequenceid = data.Property.Photo[0].SequenceId;
      listing.highrespath = data.Property.Photo[0].HighResPath;
      listing.medrespath = data.Property.Photo[0].MedResPath;
      listing.lowrespath = data.Property.Photo[0].LowResPath;
      listing.photolastupdated = data.Property.Photo[0].LastUpdated;
    }

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

function createIndividual(data, j, listid) {
  return new Promise((resolve, reject) => {
    Knex('individuals').select('guid').where({
      'individualid': data[j].IndividualID
    }).then((ind) => {

      if (ind[0]) {
        createOrg(data[j].Organization, listid, ind[0].guid)
          .then((orgid) => {
            if (data[++j]) {

              createIndividual(data, j, listid)
                .then((recur) => {

                  resolve([recur, ind[0].guid]);
                })
                .catch((err) => {
                  reject(err);
                });

            } else {
              resolve(ind[0].guid)
            }
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });

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
          position: null,
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
        individual.position = data[j].Position;
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
            createOrg(data[j].Organization, listid, individual.guid)
              .then((orgid) => {
                if (data[++j]) {

                  createIndividual(data, j, listid)
                    .then((recur) => {

                      resolve([recur, individual.guid]);
                    })
                    .catch((err) => {
                      reject(err);
                    });

                } else {
                  resolve(individual.guid)
                }
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });

          }).catch((err) => {
            console.log(err);
            reject(err);
          });
      }
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  })
}

function createOrg(data, listid, individ) {
  return new Promise((resolve, reject) => {
    Knex('organizations').select('guid').where({
      'organizationid': data.OrganizationID
    }).then((org) => {
      if (org[0]) {
        Knex('listing_realtor_organization').insert({
          guid: GUID.v4(),
          listingid: listid,
          individualid: individ,
          organizationid: org[0].guid
        }).then((res) => {
          resolve(org[0].guid);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
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

        organization.guid = GUID.v4();
        organization.name = data.Name;
        organization.logo = data.Logo;
        organization.organizationid = data.OrganizationID;
        organization.addresstext = data.Address.AddressText;
        organization.permitfreetextemail = data.PermitFreeTextEmail;
        organization.permitshowlistinglink = data.PermitShowListingLink;

        if (data.Phones) {
          for (let k = 0; k < data.Phones.length; k++) {
            switch (data.Phones[k].PhoneTypeId) {
              case '1':
                organization.phonetype1 = data.Phones[k].AreaCode + '-' + data.Phones[k].PhoneNumber;
                break;
              case '2':
                organization.phonetype2 = data.Phones[k].AreaCode + '-' + data.Phones[k].PhoneNumber;
                break;
              case '3':
                organization.phonetype3 = data.Phones[k].AreaCode + '-' + data.Phones[k].PhoneNumber;
                break;
              case '4':
                organization.phonetype4 = data.Phones[k].AreaCode + '-' + data.Phones[k].PhoneNumber;
                break;
              case '5':
                organization.phonetype5 = data.Phones[k].AreaCode + '-' + data.Phones[k].PhoneNumber;
                break;
            }
          }
        }

        if (data.Websites) {
          for (let k = 0; k < data.Websites.length; k++) {
            switch (data.Websites[k].WebsiteTypeId) {
              case '1':
                organization.websitetype1 = data.Websites[k].Website;
                break;
              case '2':
                organization.websitetype2 = data.Websites[k].Website;
                break;
              case '3':
                organization.websitetype3 = data.Websites[k].Website;
                break;
              case '4':
                organization.websitetype4 = data.Websites[k].Website;
                break;
              case '5':
                organization.websitetype5 = data.Websites[k].Website;
                break;
            }
          }
        }

        if (data.Emails) {
          organization.email1 = data.Emails[0].ContactId;
        }

        Knex('organizations').insert(organization)
          .then((res) => {

            Knex('listing_realtor_organization').insert({
              guid: GUID.v4(),
              listingid: listid,
              individualid: individ,
              organizationid: organization.guid
            }).then((res) => {
              resolve(organization.guid);
            }).catch((err) => {
              console.log(err);
              reject(err);
            });

          }).catch((err) => {
            reject(err);
          });
      }
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

parse(bulk_data, 0);
