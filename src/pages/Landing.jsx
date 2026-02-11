import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// loader
export const loader = async () => {
  const searchTerm = "a";
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  // throw new Error("artificial error from loader");
  return { drinks: response.data.drinks, searchTerm };
};

function Landing() {
  const { searchTerm, drinks } = useLoaderData();
  console.log(drinks);

  return (
    <>
      <SearchForm />
      <CocktailList drinks={drinks} />
    </>
  );
}

export default Landing;
