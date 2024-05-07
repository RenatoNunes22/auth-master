"use-client";
import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      backButtonHref="./register"
      backButtonLabel="Don't have a account?"
      showSocials={true}
      headerlabel="Welcome login form"
    >
      <h1></h1>
    </CardWrapper>
  );
};

export default LoginForm;
