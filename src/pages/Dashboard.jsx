import styled from "styled-components";

import QRScanner from "../features/QrScanner";

const StyledDashBoard = styled.div`
  color: #aaa;
`;

const StyledHeader = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

function Dashboard() {
  return (
    <StyledDashBoard>
      <StyledHeader>Scan Ticket here</StyledHeader>
      <QRScanner />
    </StyledDashBoard>
  );
}

export default Dashboard;
