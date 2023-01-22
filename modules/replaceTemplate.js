
module.exports = (htmlStr, loan)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%NAME%}/g, loan.customerName);
    output = output.replace(/{%PHONE%}/g, loan.phoneNumber);
    output = output.replace(/{%FROM%}/g, loan.address);
    output = output.replace(/{%AMOUNT%}/g, loan.loanAmount);
    output = output.replace(/{%INTEREST%}/g, loan.interest);
    output = output.replace(/{%YEARS%}/g, loan.loanTermYears);
    output = output.replace(/{%TYPE%}/g, loan.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, loan.description);

    //Calculate the annuity
    const i = Number(loan.interest) / 100 / 12;
    let pow = i + 1;
    const n = Number(loan.loanTermYears) * 12;
    pow = Math.pow(pow, -n);
    const annuity = (i / (1 - pow)) * Number(loan.loanAmount);
    output = output.replace(/{%AMOUNTOWED%}/g, annuity);

    return output;
}