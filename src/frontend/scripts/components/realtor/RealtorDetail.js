import RealtorDetailRow from './RealtorDetailRow';
import { Table, Grid, Row, Col } from 'react-bootstrap';

const RealtorDetail = ({ realtor, org, listings }) => {
    
    if(org.addresstext) var add = org.addresstext.split("|")
        else {
            add[0] = '';
            add[1] = '';
        }

    return (
        <Grid fluid>
            <Row>
                <Col md={12}>
                    <Grid fluid>
                        <div className="Listing">
                            <Row>
                                <Col md={2}>
                                    <div><img src={realtor.photo} /></div>
                                </Col>
                                <Col md={4}>
                                    <div>{realtor.name}</div>
                                    <div>{org.name}</div>
                                    <div>{add[0]}</div>
                                    <div>{add[1]}</div>
                                </Col>
                                <Col md={2}>
                                    <div className="Star">4.7</div>
                                </Col>
                                <Col md={4}>
                                    <div><img src="star.jpg" className="resize" /></div>
                                </Col>
                            </Row>
                        </div>
                        {listings.map((listing, i) =>
                            <div className="Listing" key={i}>
                                <RealtorDetailRow
                                    {...listing} />
                            </div>
                        )}

                    </Grid>
                </Col>
            </Row>
            <Row>
            </Row>
        </Grid>


        /*
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>MLSNumber</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
                {listings.map((listing, i) =>
                    <RealtorDetailRow key={i}
                        {...listing} />
                )}
            </tbody>
        </Table>
        */
    )
}

export default RealtorDetail;