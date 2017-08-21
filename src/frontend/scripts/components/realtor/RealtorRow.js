const RealtorRow = ({ id, name, guid, individualid, phonetype1, phonetype2, phonetype3, phonetype4, phonetype5, websitetype1, websitetype2, websitetype3, websitetype4, websitetype5, email1, email2, email3, email4, photo, position, permitfreetextemail, firstname, lastname, corporationdisplaytypeid, permitshowlistinglink, active, created_at, updated_at, handler }) => {
    return (
        <tr className="Row" onClick={() => handler(guid)}>
            <td>{id}</td>
            <td>{name}</td>
            <td><b>{phonetype1}</b>&nbsp;</td>
            <td>{guid}</td>
            <td>{updated_at}</td>
        </tr>
    )
}

export default RealtorRow;