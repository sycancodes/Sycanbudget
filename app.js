
// BUDGET CONTROLLER
const budgetController = (function(){
    //Some code here
    
})



//UI CONTROLLER
const UIController = (function() {
    
    //Some Code
    
})();




//GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl) {

    const ctrlAddItem = function(){
      //1. Get the field input data
      //2. Add the item to the budget controller
      //3. Add the item to the UI
      //4. Calculate the budget
      //5. Display the budget on the UI
      console.log('Clicked');
    }
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
        
    document.addEventListener("kepress", function (event) {
       if (event.keyCode === 13 || event.which === 13) {
           ctrlAddItem();
       }
     });

    }) (budgetController, UIController);






















































































