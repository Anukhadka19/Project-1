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


// Submit event on the menu
menuEl.on('submit',handleMenuSubmit);

// Menu options for meals
<ul id="menubar">
  <li>
    <div>Item 1</div>
  </li>
  <li>
    <div>Item 2</div>
  </li>
  <li>
    <div>Item 3</div>
    <ul>
      <li>
        <div>Item 3-1</div>
      </li>
      <li>
        <div>Item 3-2</div>
      </li>
      <li>
        <div>Item 3-3</div>
      </li>
    </ul>
  </li>
  <li>
    <div>Item 4</div>
  </li>
  <li>
    <div>Item 5</div>
  </li>
</ul>