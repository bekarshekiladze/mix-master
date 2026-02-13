import { useRouteError } from "react-router-dom";

function SinglePageError() {
  const error = useRouteError();
  console.log({ error });
  return <h2>SinglePageError: {error.message}</h2>;
}
export default SinglePageError;
