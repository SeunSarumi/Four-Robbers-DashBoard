import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";

const StyledAppLayout = styled.div``;

const Main = styled.main``;

const Container = styled.div``;

function AppLayout() {
  return (
    <StyledAppLayout>
      <NavBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
