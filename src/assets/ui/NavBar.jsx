import styled from "styled-components";

const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled.a`
  padding: 2rem 4rem;

  cursor: pointer;
`;

function NavBar() {
  return (
    <StyledNavBar>
      <StyledLink>Home</StyledLink>
      <StyledLink>Tickets</StyledLink>
    </StyledNavBar>
  );
}

export default NavBar;
