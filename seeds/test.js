const data = require('./data.json');
const GUID = require('node-uuid');

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
  }
    console.log(listing);