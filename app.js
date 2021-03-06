// BUDGET CONTROLLER
const budgetController = (function () {
    //Expense Constructor
    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
            this.percentage = -1;
        }
    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    //Income Constructor

    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }

    calculateTotal = function (type) {
        let sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum;
    };


    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },

        budget: 0,
        percentage: -1,
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

        deleteItem: function (type, id) {

            const ids = data.allItems[type].map(function (current) {
                return current.id;
            })

            const index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {

            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses 
            data.budget = data.totals.inc - data.totals.exp;
            // Calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            /*
            a=20
            b=10
            c=40
            income = 100
            a=20/100 = 20%
            b = 10/100 = 10%
            c = 40/100 = 40%
            
            */
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage();
            })
        },

        getPercentages: function () {
            const allPercentages = data.allItems.exp.map(function (cur) {
                return cur.getPercentage(data.totals.inc);

            });
            return allPercentages;

        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        expenseContainer: '.expense__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__percentage--percentage',
        container: '.container',
        expensesPercentsLabel: '.item__percentage',
        dateLabel: 'budget__title--month'
    };


    /* formating the amount */
    const formatNumber = function (num, type) {
        let numSplit, int, dec;
        num = Math.abs(num);
        num = num.toFixed(2);
        // Splitting the number
        numSplit = num.spit(".")
        int = numSplit[0]

        if (int.length > 3) {
            int = int.substr(0, int.lenth - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1]

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec
    };

    let nodeListForEach = function (list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i)
        }
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
                html = `<div class="item clearfix" id="inc-%id%">
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
                html = `<div class="item clearfix" id="exp-%id%">
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
            newHTML = newHTML.replace('%value%', formatNumber(obj.value));

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        deleteListItem: function (selectorID) {
            const el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },

        //CLEARING FIELDS
        clearFields: function () {
            
            const fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            const fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = '';
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            let type;

            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc);
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp);

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '---';
            }
        },

        displayPercentages: function (percentages) {
            let fields = document.querySelectorAll(DOMstrings.expensesPercentsLabel);

        

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---'
                }
            });

        },


        displayMonth: function () {
            let now, month, months, year
            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + " " + year;

        },

        changedType: function (){
            let fields = document.querySelectorAll(
                DOMstrings.inputType + "," + 
                DOMstrings.inputDescription + "," +
                DOMstrings.inputValue
            )

            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus')
            })

            document.querySelector(DOMstrings.inputBtn.toggle('red'))


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
        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    
    };



    const updateBudget = function () {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. returns the budget
        const budget = budgetCtrl.getBudget();

        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);

    }

    updatePercentages = function () {
        //1. calculate percentages
        budgetCtrl.calculatePercentages();
        //2. read percentages from the budget controller
        const percentages = budgetCtrl.getPercentages();
        //3. update the UI with the new percentages
        UICtrl.displayPercentages(percentages);


    }

    const ctrlAddItem = function () {
        
        //1. Get the field input data
        let input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2. Add the item to the budget controller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear fields
            UICtrl.clearFields;

            //5. Calculate and update Budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }


    };



    // event tells uses where the event came from

    const ctrlDeleteItem = function (event) {
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            //2. delete item from the UI
            UICtrl.deleteListItem(itemID);
            //3. update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();

        }
    }

    return {
        init: function () {
            console.log('Application has started!'); //Just checking if it works
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();



















































































