const resetButton = document.querySelector(".reset-btn")
const billAmount = document.querySelector("#bill")
let allButton = document.querySelectorAll("#button")
const noOfPerson = document.querySelector("#person")
const tipAmount = document.querySelector(".amount-tip")
const totalAmount = document.querySelector(".amount-total")
const inputBtn = document.querySelector(".lower-input-button")
const error = document.querySelector('.people-section')
let result;
let customBtn = inputBtn.lastElementChild;

resetButton.addEventListener('click', (e) => {
    e.preventDefault()
    tipAmount.innerText = `$0.00`
    totalAmount.innerText = `$0.00`
    noOfPerson.value = ""
    billAmount.value = ""
    result = ""
    allButton.forEach((e) => {
        e.classList.remove('active');
    })
    customBtn.value = ""
})

function calculateTipPerPerson() {
    const bill = Number(billAmount.value)
    const totalNumberOfPerson = Number(noOfPerson.value)
    const tipPercent = result / 100;
    const totalTip = bill * tipPercent
    const tipPerPerson = (totalTip / totalNumberOfPerson).toFixed(2)
    tipAmount.innerText = `$${tipPerPerson}`
}

function calculateTotalAmountPerPerson() {
    const bill = Number(billAmount.value)
    const totalNumberOfPerson = Number(noOfPerson.value)
    const tipPercent = result / 100;
    const totalTip = bill * tipPercent
    const tipPerPerson = totalTip / totalNumberOfPerson
    totalAmount.innerText = `$${((bill / totalNumberOfPerson) + tipPerPerson).toFixed(2)}`
}

allButton.forEach((e) => {
    e.addEventListener('click', (button) => {
        if (button.target == customBtn) {
                customBtn.addEventListener('blur', (e) => {
                    if (Number(noOfPerson.value) === 0) {
                        tipAmount.innerText = `$0.00`
                        totalAmount.innerText = `$0.00`  
                    } else {
                        allButton.forEach((e) => {
                            e.classList.remove('active');
                        })
                        calculateTipPerPerson()
                        calculateTotalAmountPerPerson()
                        result = Number(e.target.value)
                    }
                    
                })
        } else {
            if (Number(noOfPerson.value) === 0) {
                tipAmount.innerText = `$0.00`
                totalAmount.innerText = `$0.00`
                error.classList.add('error')
            } else {
                allButton.forEach((e) => {
                    e.classList.remove('active');
                })
                button.target.classList.add('active')
                result = Number(button.target.value.slice(0, -1));
                calculateTipPerPerson()
                calculateTotalAmountPerPerson()
                error.classList.remove('error')
            }
        }
    })
})

billAmount.addEventListener('blur', (e) => {
    if (Number(noOfPerson.value) === 0) {
        tipAmount.innerText = `$0.00`
        totalAmount.innerText = `$0.00`
    } else {
        calculateTipPerPerson()
        calculateTotalAmountPerPerson()
    }
})

noOfPerson.addEventListener('blur', (e) => {
    if (!result) {
        tipAmount.innerText = `$0.00`
        totalAmount.innerText = `$0.00`
    } else {
        calculateTipPerPerson()
        calculateTotalAmountPerPerson()
    }
})

