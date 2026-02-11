import axios from "axios";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const loader = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`${singleCocktailUrl}${id}`);
  const searchTerm = "a";
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  // throw new Error("artificial error from loader");
  return { drinks: response.data.drinks, searchTerm };
};

function Cocktail() {
  return <div>Cocktail</div>;
}

export default Cocktail;
