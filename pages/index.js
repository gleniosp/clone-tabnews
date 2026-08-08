import DefaultLayout from "interface/DefaultLayout";

function Home() {
  return (
    <DefaultLayout
      metadata={{
        description: "tech content for developers",
      }}
    >
      <h1>Tech content for developers.</h1>
    </DefaultLayout>
  );
}

export default Home;
