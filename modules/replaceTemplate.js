
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
    const pv = Number(loan.loanAmount);
    const n = Number(loan.loanTermYears) * 12;
    let pow = (1+i);
    pow = Math.pow(pow, -n);
    pow = 1-pow;
    owed = (i*pv) / pow;
    owed = owed * n;
    output = output.replace(/{%AMOUNTOWED%}/g, owed);

    return output;
}