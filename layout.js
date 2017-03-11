export default Layout = (props) => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css" />
      </Head>
      {props.children}
    </div>
  );
};

