const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');


/// Read data from file
// Template
const temploan = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
 );

 /////////////////////////////////
// Template
const templateHTMLloan = fs.readFileSync(
    `${__dirname}/template/templateLoan.html`,
    'utf-8'
  );

 const dataObj = JSON.parse(temploan);// string to JavaScript Object JSON

////////////////////////////////
//Create Server
const server = httpServer.createServer( (req, res) =>{// call back function

    const {query,pathname} = url.parse(req.url, true); // object distructors
    if(query.id){// if there is query parameter named id read as string
        // loans page
        if (pathname === '/' || pathname.toLowerCase() === '/loans') {
            res.writeHead(200, {// Every thing ran successfully
                'Content-type': 'text/html'
            });
            const loan = dataObj[Number(query.id)];// convert string to numeric value
            const strloanName = JSON.stringify(loan);
            const loanHTML = replaceTemplate(templateHTMLloan, loan);// function that will replace the loan values in the HTML
            res.end(loanHTML);
        }
    }
    else{
            res.writeHead(404, {// Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    });

//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000');
});

