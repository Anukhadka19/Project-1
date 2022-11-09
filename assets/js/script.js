
const mealTypeEl = document.querySelector('#meal-type');
const drinkTypeEl = document.querySelector('#drink-type');
const mealInputEl = document.querySelector('#meal-input');
const drinkInputEl = document.querySelector('#drink-input');
const mealListEl = document.querySelector('#meal-list');

// This function takes in an array of objects, looping through them and rendering a menu item for each
function renderMenu (menuArray) {
    for (o of menuArray) {
        const subContain = $('<div>').addClass('subContain');
        const instanceImg = $('<img>').attr('src', o.imgUrl);
        const instanceName =  $('<p>').text(o.name);
        subContain.append(instanceImg, instanceName);
        $('Container').append(subContain);
    }
};

//Meal selection function//
function selectMeal () {
    
    var mealSeclected = $("input[name=selector]:checked").val();
    console.log(mealselection);
}

// Submit event on the menu
// menuEl.on('submit',handleMenuSubmit);

// Menu options for meals
//<ul id="menubar">
//  <li>
//    <div>Item 1</div>
//  </li>
//  <li>
 //   <div>Item 2</div>
//  </li>
//  <li>
//    <div>Item 3</div>
 //   <ul>
//      <li>
 //       <div>Item 3-1</div>
  //    </li>
 //     <li>
 //       <div>Item 3-2</div>
 //     </li>
 //     <li>
 //       <div>Item 3-3</div>
 //     </li>
//    </ul>
//  </li>
//  <li>
//    <div>Item 4</div>
//  </li>
//  <li>
 //   <div>Item 5</div>
//  </li>
//</ul>


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
