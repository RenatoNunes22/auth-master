const AuthLayout = ({ children }: any) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__content">{children}</div>
    </div>
  );
};

export default AuthLayout;
