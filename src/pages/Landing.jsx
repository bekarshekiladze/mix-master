import axios from "axios";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const loader = async () => {
  const searchTerm = "margarita";
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  // throw new Error("artificial error from loader");
  return { drinks: response.data.drinks, searchTerm };
};

function Landing() {
  const { searchTerm, drinks } = useLoaderData();
  console.log(drinks);

  return <h1>Landing page</h1>;
}

export default Landing;
