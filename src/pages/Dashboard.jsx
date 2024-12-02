import styled from "styled-components";
import ScannerComp from "../features/ScannerComp";

const StyledDashBoard = styled.div`
  color: #aaa;
`;

const StyledHeader = styled.h1`
  font-size: 4rem;
  text-align: center;
`;

function Dashboard() {
  return (
    <StyledDashBoard>
      <StyledHeader>Scan Ticket here</StyledHeader>
      <ScannerComp />
    </StyledDashBoard>
  );
}

export default Dashboard;
