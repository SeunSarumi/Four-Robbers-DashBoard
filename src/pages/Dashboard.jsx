import styled from "styled-components";

import QRScanner from "../features/QrScanner";
import TicketValidator from "../features/TicketValidator";

const StyledDashBoard = styled.div`
  color: #aaa;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const StyledHeader = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;

  @media only screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

function Dashboard() {
  return (
    <StyledDashBoard>
      <StyledHeader>Scan Ticket here</StyledHeader>
      <QRScanner />
      <TicketValidator />
    </StyledDashBoard>
  );
}

export default Dashboard;
