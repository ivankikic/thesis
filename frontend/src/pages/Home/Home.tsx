import { Container } from "react-bootstrap";
import { useAuthContext } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";
import { HomeContainer, SubTitle, Title } from "./HomeStyles";

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  return (
    <Container>
      <HomeContainer>
        <Title>
          {t("HOME_WELCOME")}, {user?.name}
        </Title>
        <SubTitle>{t("CHOOSE_SOMETHING_FROM_MENU")}</SubTitle>
      </HomeContainer>
    </Container>
  );
};

export default Home;
