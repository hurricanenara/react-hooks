import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  useEffect(() => {
    const query =
      enteredFilter.length == 0
        ? ""
        : `?orderBy="title&equalTo="${enteredFilter}""`;
    fetch(
      "https://react-hooks-dc979-default-rtdb.firebaseio.com/ingredients.json" +
        query
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]); // will only fire again if onLoadIngredients change

  //firebase rule
  //   {
  //   "rules": {
  //     ".read": "now < 1619841600000",  // 2021-5-1
  //     ".write": "now < 1619841600000",  // 2021-5-1
  //       "ingredients": {
  //         ".indexOn" : ["title"]
  //       }
  //   }
  // }

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
