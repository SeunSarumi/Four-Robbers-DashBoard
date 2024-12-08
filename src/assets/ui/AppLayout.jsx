import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";

const StyledAppLayout = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  padding: 2rem 3rem;
`;

const Main = styled.main``;

const Container = styled.div`
  padding: 8rem 8rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      {/* <NavBar /> */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
