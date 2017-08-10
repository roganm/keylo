const data = require('./data.json');
const GUID = require('node-uuid');

let listings = [];

let individuals = [];

let photos = [];

let orgs = [];

for (let i = 0; i < data.length; i++) {

  var refs = {
    listing: null,
    individuals: [

    ],
    photos: [

    ],
  }

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
  if (data[i].AlternateURL) {
    listing.brochurelink = data[i].AlternateURL.BrochureLink ? data[i].AlternateURL.BrochureLink : null;
    listing.photolink = data[i].AlternateURL.PhotoLink ? data[i].AlternateURL.PhotoLink : null;
    listing.soundlink = data[i].AlternateURL.SoundLink ? data[i].AlternateURL.SoundLink : null;
    listing.videolink = data[i].AlternateURL.VideoLink ? data[i].AlternateURL.VideoLink : null;
  }

  refs.listing = listing.guid;

  listings.push(listing);

  for (let j = 0; j < data[i].Individual.length; j++) {
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

    individual.guid = GUID.v4();
    individual.individualid = data[i].Individual[j].IndividualID;
    individual.name = data[i].Individual[j].Name;
    individual.photo = data[i].Individual[j].Photo;
    individual.permitfreetextemail = data[i].Individual[j].PermitFreeTextEmail;
    individual.firstname = data[i].Individual[j].FirstName;
    individual.lastname = data[i].Individual[j].LastName;
    individual.corporationdisplaytypeid = data[i].Individual[j].CorporationDisplayTypeId;
    individual.permitshowlistinglink = data[i].Individual[j].PermitShowListingLink;


    if(data[i].Individual[j].Phones) {
      for(let k = 0; k < data[i].Individual[j].Phones.length; k++){
        switch(data[i].Individual[j].Phones[k].PhoneTypeId){
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

    if(data[i].Individual[j].Websites) {
      for(let k = 0; k < data[i].Individual[j].Websites.length; k++){
        switch(data[i].Individual[j].Websites[k].WebsiteTypeId){
          case '1':
            individual.websitetype1 = data[i].Individual[j].Websites[k].Website
            break;
          case '2':
            individual.websitetype2 = data[i].Individual[j].Websites[k].Website
            break;
          case '3':
            individual.websitetype3 = data[i].Individual[j].Websites[k].Website
            break;
          case '4':
            individual.websitetype4 = data[i].Individual[j].Websites[k].Website
            break;
          case '5':
            individual.websitetype5 = data[i].Individual[j].Websites[k].Website
            break;
        }
      }
    }

    individual.email1 = data[i].Individual[j].Emails[0].ContactId;

    refs.individuals.push(individual.guid);
    individuals.push(individual);


  }
console.log(refs);
}

