// get values from the UI
function getValues(){
    // get loan amount from the UI
    let loanAmount = document.getElementById("loanAmount").value;
    loanAmount = parseFloat(parseFloat(loanAmount).toFixed(2));

    // get payments from the UI
    let payments = document.getElementById("payments").value;
    payments = parseFloat(parseFloat(payments).toFixed(2));

    // get interest rate from the UI
    let interestRate = document.getElementById("interestRate").value;
    interestRate = parseFloat(parseFloat(interestRate).toFixed(2));

    // calculate the interest, payments
    calculateInterest(loanAmount, payments, interestRate);
}


// apply the formula and calculate arrays of new principal, interest, total interest, balance
function calculateInterest(principal, numberOfMonthlyPayments, interestRate){
    // create the table
    let returnValues = displayTable(numberOfMonthlyPayments, principal, interestRate);

    // retreive monthly payments and total interest value
    let monthlyPayments = returnValues.monthlyPayments;
    let totalInterestPayment = returnValues.totalInterestPayment;
    
    // now display details regarding total cost, principal, interest and monthly payments
    displayTotalValues(principal, totalInterestPayment, monthlyPayments * numberOfMonthlyPayments, monthlyPayments);
}


// display values on th UI 
// right hand side of input
function displayTotalValues(principal, totalInterest, accruedValue, monthlyPayments){

    accruedValue = parseFloat(parseFloat(accruedValue).toFixed(2));

    // monthlyPayments
    document.getElementById("monthlyPayments").innerHTML = `<strong>$${monthlyPayments}</strong>`;

    // totalPrincipal, totalInterest, totalCost
    document.getElementById("totalPrincipal").innerHTML = "Total Principal: $" + principal;
    document.getElementById("totalInterest").innerHTML = "Total Interest: $" + totalInterest;
    document.getElementById("totalCost").innerHTML = "" + `<strong>Total Cost: $${ + accruedValue}</strong>`;

}

// create the table with monthly details for remaniing balance, payments and interest
function displayTable(numberOfMonthlyPayments, principal, interestRate){
    // create the table body
    // <tr>
    //   <th scope="row">1</th>
    //   <td>Mark</td>
    //   <td>Otto</td>
    //   <td>@mdo</td>
    // </tr>

    let templateRows = ""; // to hold html format for rows
    let tempTemplate = ``; // to hold every table data element

    // monthly payments
    let monthlyPayments = parseFloat(parseFloat(principal * (interestRate/1200) / ( 1 - Math.pow(1 + interestRate/1200, -numberOfMonthlyPayments) ) ).toFixed(2));
    // remaining balance
    let remainingBalance = parseFloat(parseFloat(principal).toFixed(2));
    // interest payment
    let interestPayment = parseFloat(parseFloat(remainingBalance * interestRate / 1200).toFixed(2));
    // total Interest Payment
    let totalInterestPayment = parseFloat(parseFloat(interestPayment).toFixed(2));
    // principal payment
    let principalPayment = parseFloat(parseFloat(monthlyPayments - interestPayment).toFixed(2));

    for(let i = 1; i <= numberOfMonthlyPayments; i++){
        // Month and monthly payments
        tempTemplate = `<th scope="row">${i}</th><td>${monthlyPayments}</td>`;

        // principal payment
        tempTemplate += `<td>${principalPayment}</td>`;

        // interest payment
        tempTemplate += `<td>${interestPayment}</td>`;

        // total interest 
        tempTemplate += `<td>${totalInterestPayment}</td>`;

        // remaining balance
        remainingBalance = parseFloat(parseFloat(remainingBalance - principalPayment).toFixed(2));
        tempTemplate += `<td>${remainingBalance}</td>`;

        // updates for next round
        if(i != numberOfMonthlyPayments){
            interestPayment = parseFloat(parseFloat(remainingBalance * interestRate / 1200).toFixed(2));
            totalInterestPayment = parseFloat(parseFloat(totalInterestPayment + interestPayment).toFixed(2));
            principalPayment = parseFloat(parseFloat(monthlyPayments - interestPayment).toFixed(2));
        }
        
        // create a row
        templateRows += `<tr>${tempTemplate}</tr>`;
    }

    // updatye html body with table details
    document.getElementById("results").innerHTML = templateRows;

    return {
        'monthlyPayments' : monthlyPayments,
        'totalInterestPayment' : totalInterestPayment
    };

}