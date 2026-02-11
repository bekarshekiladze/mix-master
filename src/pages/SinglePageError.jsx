import { useRouteError } from "react-router-dom";

function SinglePageError() {
  const error = useRouteError();
  console.log(error.message);
  return <div>SinglePageError: {error.message}</div>;
}
export default SinglePageError;
