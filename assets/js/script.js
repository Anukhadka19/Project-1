// const drinkType = ['vodka', 'rum', 'gin', 'whiskey'];
// const mealType = ['breakfast', 'vegetarian', 'seafood', 'dessert'];

// Need to make sure the 'category' passed in matches exactly one/any of the potential user inputs -- meaning the 'select' options should be exactly the same
function grabDrinkArray (category) {
    const drinkFetchUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${category}&api_key=1`;
    fetch(drinkFetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                const drinkArray = []
                for (let i = 0; i < 6; i++) {
                    const drinkObject = {name: `${data.drinks[i].strDrink}`,
                                        imgUrl: `${data.drinks[i].strDrinkThumb}`
                                    }
                    drinkArray.push(drinkObject);
                }
                // The function that builds the elements based on this array goes here
            }
        })
        // Will want to do more (eventually) than just logging the error message
        .catch(function (error) {
            console.log(error.message);
        })
}

// Need to make sure the 'category' passed in matches exactly one/any of the potential user inputs -- meaning the 'select' options should be exactly the same
function grabFoodArray (category) {
    const mealFetchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}&api_key=1`;
    fetch(mealFetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                const mealArray = []
                for (let i = 0; i < 6; i++) {
                    const mealObject = {name: `${data.meals[i].strMeal}`,
                                        imgUrl: `${data.meals[i].strMealThumb}`
                                    }
                    mealArray.push(mealObject);
                }
                // The function that builds the elements based on this array goes here
            }
        })
        // Will want to do more (eventually) than just logging the error message
        .catch(function (error) {
            console.log(error.message);
        });
}