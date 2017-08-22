function numToString(num){
    num=num.toString();
    var x = num.indexOf('.');
    if(x !== -1) num = num.slice(0, x);
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const RealtorRow = ({ name, guid, average, cnt, handler }) => {
    return (
        <tr onClick={() => handler(guid)}>
            <td>{name}</td>
            <td><b>{cnt}</b>&nbsp;</td>
            <td>${numToString(average)}</td>
        </tr>
    )
}

export default RealtorRow;


//{ id, name, guid, individualid, phonetype1, phonetype2, phonetype3, phonetype4, phonetype5, websitetype1, websitetype2, websitetype3, websitetype4, websitetype5, email1, email2, email3, email4, photo, position, permitfreetextemail, firstname, lastname, corporationdisplaytypeid, permitshowlistinglink, active, created_at, updated_at, handler }