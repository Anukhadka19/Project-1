(function ($) {

//Variables

const drinkContainer = $("#drinkMenu");
const foodContainer = $("#foodMenu");
// const orderContainer = $("#order");


// Functions

// Makes API call (on drinks) and renders menu in the DOM
function grabDrinkArray(drink) {
    const drinkFetchUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}&api_key=1`;
    fetch(drinkFetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                let results = randomSixArray(data.drinks);
                for (let i = 0; i < 6; i++) {
                    let cardContainer = $("<div>");
                    cardContainer.addClass("card");
                    cardContainer.attr("data-name", results[i].strDrink);
                    let imageContainer = $("<div>");
                    imageContainer.addClass("card-image").html(`<img src="${results[i].strDrinkThumb}" alt="${results[i].strDrink}" class="responsive">`)

                    let contentContainer = $("<div>");
                    contentContainer.addClass("card-content").html(`<p class="title is-size-4">${results[i].strDrink}</p>`);
                    cardContainer.append(imageContainer).append(contentContainer);

                    const priceEl = $("<p>");
                    priceEl.addClass("subtitle is-size-6").text(createRandomPrice(8, 20));
                    const addBtnEl = $('<button>').text('Add').addClass('subtitle is-size-6 has-text-white p-1 addButton');
                    contentContainer.append(priceEl,addBtnEl);

                    drinkContainer.append(cardContainer);
                }
            }
        })
        .catch(function (error) {
            console.log(error.message);
            window.location.href = `../html/error.html`;
        })
}

// Makes API call (on food) and renders menu in the DOM
function grabFoodArray(meal) {
    const mealFetchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}&api_key=1`;
    fetch(mealFetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                let results = randomSixArray(data.meals);
                for (let i = 0; i < 6; i++) {

                    let cardContainer = $("<div>");
                    cardContainer.addClass("card");
                    cardContainer.attr("data-name", results[i].strMeal);
                    let imageContainer = $("<div>");
                    imageContainer.addClass("card-image").html(`<img src="${results[i].strMealThumb}" alt="${results[i].strMeal}" class="responsive">`)

                    let contentContainer = $("<div>");
                    contentContainer.addClass("card-content").html(`<p class="title is-size-4">${results[i].strMeal}</p>`);
                    cardContainer.append(imageContainer).append(contentContainer);

                    const priceEl = $("<p>");
                    priceEl.addClass("subtitle is-size-6").text(createRandomPrice(10, 30));
                    const addBtnEl = $('<button>').text('Add').addClass('subtitle is-size-6 has-text-white p-1 addButton');
                    contentContainer.append(priceEl,addBtnEl);

                    foodContainer.append(cardContainer);

                }
            }
        })
        .catch(function (error) {
            console.log(error.message);
            window.location.href = `../html/error.html`;
        });
}

// Will return a dollar amount within the two numbers given (inclusive)
function createRandomPrice(minNum, maxNum) {
    return `Price: $${Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum}`;
}

// Takes in an array and builds an new array with six of the original arrays elements, chosen at random, but without repeating any
function randomSixArray(itemArray) {
    const sixArray = [];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * itemArray.length);
        sixArray.push(itemArray[randomIndex]);
        itemArray.splice(randomIndex, 1);
    }
    return sixArray;
}

// Updates local storage, and returns an array with instructions for updating an existing 'li'
function updateStorage (menuObject) {
    let needsNewLi = true;
    let newAmount;
    let newPrice;
    const storageArray = JSON.parse(localStorage.getItem("orderList"));
    if (!storageArray) {
        // If nothing in storage, creates an array with the object in its first index (0)
        localStorage.setItem("orderList", JSON.stringify([menuObject]));
    } else {
        let match = false;
        // Check to see (by its name) if the item already exists in the order; if so, update the two values, but do not push to array
        for (let itemObj of storageArray) {
            if (menuObject.name === itemObj.name) {
                match = true;
                needsNewLi = false;
                newAmount = itemObj.units += menuObject.units;
                newPrice = itemObj.price += menuObject.price;
            }
        }
        // If it wasn't in there, just add to array
        if (!match) {
            storageArray.push(menuObject);
        }
        localStorage.setItem("orderList", JSON.stringify(storageArray));
    }
    return [needsNewLi, `x${newAmount}`, `$${newPrice}`];
}

// Upon page load, if there are items in the order (i.e. localStorage), add them to the DOM ('your order')
function persistStorage() {
    const storageArray = JSON.parse(localStorage.getItem("orderList"));
    if (storageArray) {
        for (let arrayObj of storageArray) {
            const item = $('<li>').addClass("orderItem m-1");
            const orderName = $('<p>').text(arrayObj.name).addClass("orderName");
            const orderPrice = $('<p>').text(`$${arrayObj.price}`).addClass("orderPrice");
            const amount = $('<span>').text(`x${arrayObj.units}`).addClass("spanAmount");
            const button = $('<button>').text("Remove").addClass("remove-item-btn");
        
            orderPrice.append(amount);
        
            item.append(orderName, orderPrice, button);
            $("#order").append(item);
        }
        document.getElementById('clearBtn').disabled = false;
        document.getElementById('orderBtn').disabled = false;
    }
}


// Event listeners

// // Event lis on card to add to menu cart
$("main").on("click", ".addButton", function(event){
    //Enable buttons
    document.getElementById('clearBtn').disabled = false;
    document.getElementById('orderBtn').disabled = false;

    //Grab values from card
    const card = event.target.parentElement.parentElement;
    const itemName = card.children[1].children[0].innerText;
    const price = card.children[1].children[1].innerText;

    const priceArray = price.split(" ")
    const priceOnly = priceArray[1];

    //Build object for storage; run the function on it
    const menuObject = {name: itemName, price: parseInt(priceOnly.slice(1)), units: 1};
    const storageResult = updateStorage(menuObject);

    if (!storageResult[0]) {
        //Select all existing list items
        const allLis = $('.orderItem');
        // Match name and update that list item (amount and price)
        for (let listItem of allLis) {
            if (listItem.children[0].innerText === itemName) {
                listItem.children[1].firstChild.textContent = storageResult[2];
                listItem.children[1].children[0].innerText = storageResult[1];
            }
        }
    } else {
        // Build new list item
        const item = $('<li>').addClass("orderItem m-1");
        const orderName = $('<p>').text(itemName).addClass("orderName");
        const orderPrice = $('<p>').text(priceOnly).addClass("orderPrice");
        const amount = $('<span>').text("x1").addClass("spanAmount");
        const button = $('<button>').text("Remove").addClass("remove-item-btn");
    
        orderPrice.append(amount);
    
        item.append(orderName, orderPrice, button);
        $("#order").append(item);
    }
});

// Event listener on 'clear order' button
$("#orderContainer").on("click", "#clearBtn", function(event) {
    $("#order").empty();
    localStorage.clear();
    document.getElementById('orderBtn').disabled = true;
    document.getElementById('clearBtn').disabled = true;
});

// Event listener on 'remove one item from order' button
    // !! This one need more work -- going into local storage and removing just this one item from it
$("#orderContainer").on("click", ".remove-item-btn", function(event) {
    const removeBtn = event.target;
    const listItem = removeBtn.parentElement;

    // Remove the ONE from lcoal sotrage with matching name
    const liName = listItem.children[0].innerText;
    const storedArray = JSON.parse(localStorage.getItem("orderList"));
    // Almost certainly don't need the broad level 'if', but it's just a safeguard
    if (storedArray) {
        for (let i = 0; i < storedArray.length; i++) {
            if (liName === storedArray[i].name) {
                storedArray.splice(i, 1);
                break;
            }
        }
    }
    //Have to add this in the case there was only one item in there, but then was removed
    if (storedArray.length) {
        localStorage.setItem("orderList", JSON.stringify(storedArray));
    } else {
        // Need to clear local storage instead of putting an empty array back in
            // This is due to how a first object goes into storage is 'updateStorage' function
        localStorage.clear();
        document.getElementById('orderBtn').disabled = true;
        document.getElementById('clearBtn').disabled = true;
    }
    // Remove from DOM
    listItem.remove();
});

const menuMsg = document.querySelectorAll(".menu-msg");

// Event listener for selecting drink menu
$("#drinkSelect").on("click", function(event) {
    const clickedOp = event.target;
    $("#drinkMenu").empty();
    // menuMsg[0].hidden = true;

    grabDrinkArray(clickedOp.value);
});

// Event listener for selecting food menu
$("#foodSelect").on("click", function(event) {
    const clickedOp = event.target;
    $("#foodMenu").empty();
    // menuMsg[1].hidden = true;
    
    grabFoodArray(clickedOp.value);
})



// Code for the modal
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
});


// Call function which loads the user's order, if there are still items in there
persistStorage();




}) (jQuery);