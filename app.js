
// BUDGET CONTROLLER
const budgetController = (function () {
    //Some code here

})



//UI CONTROLLER
const UIController = (function () {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value

            };

        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();




//GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    const setupEventListeners = function () {
        const DOM = UICtrl.getDOMstrings();
        document
            .querySelector(DOM.inputBtn)
            .addEventListener("click", ctrlAddItem);

        document.addEventListener("kepress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    const ctrlAddItem = function () {
        //1. Get the field input data
        const input = UICtrl.getInput();
        //2. Add the item to the budget controller
        //3. Add the item to the UI
        //4. Calculate the budget
        //5. Display the budget on the UI

    };

    return {
        init: function () {
            console.log('Application has started!'); //Just checking if it works
            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();



















































































