import { Row, Col } from 'react-bootstrap';

const RealtorDetailRow = ({ id, guid, listingid, mlsnumber, publicremarks, bathroomtotal, bedrooms, sizeinterior, storiestotal, sizetotal, type, propertytype, price, pricehistory, addresstext, longitude, latitude, postalcode, relativedetailsurl, statusid, photochangedateutc, pricechangedateutc, openhouseinsertdateutc, parking, typeid, ownershiptype, ammenitiesnearby, zoningtype, brochurelink, photolink, soundlink, videolink, photosequenceid, highrespath, medrespath, lowrespath, photolastupdated, active, created_at, updated_at }) => {
    var add = addresstext.split("|")

    return (
        <Row>
            <Col md={2}>
                <div>
                    <a href={"https://www.realtor.ca"+relativedetailsurl}><img src={lowrespath} /></a>
                </div>
            </Col>
            <Col md={2}>
                <div>
                    <div>{price}</div>
                    <div>{sizeinterior}</div>
                    <div>{bedrooms} Beds {bathroomtotal} Baths</div>
                    <div>{add[0]}</div>
                </div>
            </Col>
            <Col md={8}>
                <div>
                    {publicremarks}
                </div>
            </Col>
        </Row>
    )
}

export default RealtorDetailRow;