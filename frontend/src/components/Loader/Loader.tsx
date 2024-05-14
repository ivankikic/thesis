import { FullPageLoader, LoaderText } from "./LoaderStyles";

const Loader = () => {
  return (
    <FullPageLoader>
      <div>
        farmsense
        <LoaderText>loading data...</LoaderText>
      </div>
    </FullPageLoader>
  );
};

export default Loader;
