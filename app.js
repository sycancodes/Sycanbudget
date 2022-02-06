// BUDGET CONTROLLER
const budgetController = (function () {
    //Expense Constructor
    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }

    //Income Constructor

    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }


    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            //Create New ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id;
            } else {
                ID = 0;
            }

            //Creating the new item based on on the type

            if (type === "exp") {
                new Expense(ID, des, val);
            }

            if (type === "inc") {
                new Income(ID, des, val);
            }

            //Adding the new item to our data structure
            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function () {
            console.log(data);
        },
    };

})


//UI CONTROLLER
const UIController = (function () {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expense__list'
    }

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)

            };

        },

        addListItem: function (obj, type) {
            let html, newHTML, element;
            //Create HTML STRING WITH PLACEHOLDER TEXT AND
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = `<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            }

            //Replace the placeholder text with some actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%desciption%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);


            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },


        //CLEARING FIELDS
        clearFields: function () {
            const fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = '';
            });

            fieldsArr[0].focus();
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

    const updateBudget = function () {
        //1. Calculate the budget

        //2. returns the budget

        //3. Display the budget on the UI

    }

    const ctrlAddItem = function () {
        const input, newItem;
        //1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear fields
            UICtrl.clearFields;

            //5. Calculate and update Budget
            updateBudget();
        }


    };

    return {
        init: function () {
            console.log('Application has started!'); //Just checking if it works
            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();



















































































