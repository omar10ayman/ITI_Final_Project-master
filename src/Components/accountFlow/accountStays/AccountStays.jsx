import { useContext } from "react";
import { searchContext } from "../../../store/searchStore";
import AccountTicketCard from "../../AccountTicketCard/AccountTicketCard";
import AccountFlight from "../accountFlight/accountFlight";
import { Container } from "react-bootstrap";
import { BookedTicket } from "../../BookedTicket/BookedTicket";

const AccountStays = () => {
  const { currentUserObj } = useContext(searchContext);
  console.log(currentUserObj.bookingsStays)
  return (
    <>
      {currentUserObj?.bookingsStays?.map((item,ind) => (
        <BookedTicket item={item.booked} key={ind}  />
      ))}
    </>
  );
};

export default AccountStays;
