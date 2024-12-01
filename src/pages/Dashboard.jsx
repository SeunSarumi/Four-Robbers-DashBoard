import styled from "styled-components";

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
    </StyledDashBoard>
  );
}

export default Dashboard;
