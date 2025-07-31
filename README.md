
# mysendingbox-node

  

[downloads-image]: http://img.shields.io/npm/dm/mysendingbox.svg

[npm-url]: https://npmjs.org/package/mysendingbox

[npm-image]: https://badge.fury.io/js/mysendingbox.svg

  

[![NPM version][npm-image]][npm-url] [![Dependency Status](https://gemnasium.com/badges/github.com/exaland/mysendingbox-node.svg)](https://gemnasium.com/github.com/exaland/mysendingbox-node)

  
  
  

MySendingBox.com Node.js Client is a simple but flexible wrapper for the [MySendingBox.fr](https://www.mysendingbox.fr) API.

  

See full Seeuletter.com documentation [here](https://docs.mysendingbox.fr/).

  

For best results, be sure that you're using the latest version of the Seeuletter API and the latest version of the Node.js wrapper.

  

#### French

Un module NPM pour envoyer du courrier postal ou electronique en ligne depuis votre application Node.Js.

  

Seeuletter propose une API permettant d'envoyer très facilement du courrier postal ou électronique depuis votre ERP, CRM ou application web.

  

Pas de frais d'installation. Pas d'engagement. Vous payez ce que vous consommez.

  

Documentation : https://docs.mysendingbox.fr/

  

Bien démarrer : https://www.mysendingbox.fr/guide/bien-demarrer-avec-l-api-d-envoi-de-courrier

  

## Table of Contents

  

- [Getting Started](#getting-started)

- [Registration](#registration)

- [Installation](#installation)

- [Letters](#letters)

- [Postcards](#postcards)

- [Price](#price) **new update**

- [Accounts](#accounts)

- [Invoices](#invoices)

- [Examples](#examples)

  

## Getting Started

  

Here's a general overview of the Seeuletter services available, click through to read more.

  

Please read through the official [API Documentation](https://docs.mysendingbox.fr/) to get a complete sense of what to expect from each endpoint.

  

### Registration

  

First, you will need to first create an account at [Seeuletter.com](https://www.mysendingbox.fr/signup) and obtain your Test and Live API Keys.

  

Once you have created an account, you can access your API Keys from the [Settings Panel](https://www.mysendingbox.fr/app/dashboard/keys).

  
  

### Installation

  

mysendingbox-node can be installed through the npm:

  

```

$ npm install -S mysendingbox

```

  

To build and install from the latest source:

  

```

$ git clone git@github.com:exaland/mysendingbox-node.git

$ npm install

```

  

### Letters

  

#### Create a new letter - Callback style

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// callback pattern

Seeuletter.letters.create({

description: 'Test Letter from the Node.js Wrapper',

to: {

name: 'Erlich',

address_line1: '30 rue de rivoli',

address_line2: '',

address_city: 'Paris',

address_country: 'France',

address_postalcode: '75004'

},

postage_type: 'prioritaire',

color: 'bw',

source_file: '<html>Hello, {{nom}}</html>',

source_file_type: 'html',

variables: {

nom : 'Seeuletter'

}

}, function  (err, body) {

if (err) console.log('err : '  ,  err.message);

console.log('body : ',  body)

})

```

  

#### Create a new letter - Promise style

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// promise pattern

Seeuletter.letters.create({

description: 'Test Letter from the Node.js Wrapper',

to: {

name: 'Erlich',

address_line1: '30 rue de rivoli',

address_line2: '',

address_city: 'Paris',

address_country: 'France',

address_postalcode: '75004'

},

postage_type: 'prioritaire',

color: 'bw',

source_file: '<html>Hello, {{nom}}</html>',

source_file_type: 'html',

variables: {

nom : 'Seeuletter'

}

})

.then(function  (response) {

console.log('response : ',  response);

})

.catch(function  (err) {

console.log('err : ',  err);

});

```

  

#### Create a new electronic letter - Promise style

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// promise pattern

Seeuletter.letters.createElectronic({

description: 'Test electronic letter from the Node.js Wrapper',

to: {

email: 'erlich.dumas@example.com',

first_name: 'Erlich',

last_name: 'Dumas',

status: 'individual'

},

postage_type: 'lre',

content: 'Please review the attached documents:',

source_file: '<html>Hello, {{nom}}</html>',

source_file_type: 'html',

variables: {

nom : 'Seeuletter'

}

})

.then(function  (response) {

console.log('response : ',  response);

})

.catch(function  (err) {

console.log('err : ',  err);

});

```

  

#### List all Letters

  

```javascript

var  Seeuletter  =  require('seeuletter')('test_12345678901234567890')

  

Seeuletter.letters.list()

.then(function  (response) {

console.log('response : ',  response);

})

.catch(function  (err) {

console.log('err : ',  err);

});

```

  

#### Retrieve a specific Letter

  

```javascript

var  Seeuletter  =  require('seeuletter')('test_12345678901234567890')

  

Seeuletter.letters.retrieve('LETTER_ID')

.then(function  (response) {

console.log('response : ',  response);

})

.catch(function  (err) {

console.log('err : ',  err);

});

```

  

### Postcards

  

#### Create a new postcard - Promise style

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// Create the address

Seeuletter.postcards.create({

description: 'Test Postcard from the Node.js Wrapper',

to: {

name: 'Erlich',

address_line1: '30 rue de rivoli',

address_line2: '',

address_city: 'Paris',

address_country: 'France',

address_postalcode: '75004'

},

// https://www.mysendingbox.fr/templates

source_file_front: 'YOUR TEMPLATE ID',

source_file_front_type: 'template_id',

source_file_back: 'YOUR TEMPLATE ID',

source_file_back_type: 'template_id',

  

variables: {

PRENOM: 'Erlich',

NOM: 'Bachman',

CODE_PROMO_BIENVENUE: 'CODE',

URL_COURTE_BIENVENUE: 'https://goo.gl/uqTHnD',

ADRESSE: '30 rue de Rivoli',

CODE_POSTAL : '75004',

VILLE : 'Paris',

PAYS : 'France'

}

})

.then(function  (letter) {

console.log('The Seeuletter API Postcard responded : ',  letter)

})

.catch(function  (err) {

console.log('Error message : ',  err.message)

})

  

```
### Price

  

#### Get Price for MySendingBox- Promise style

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// Get the Letter Price
Seeuletter.LettersPrice.getPrice({

// Letter type

postage_type: 'ecopli',

page_count: 11,

channel: 'paper',

color: 'color',

pack: 'business',

both_sides: false,

postage_speed: 'express'

}).then(function  (response) {

console.log('[Get Price] The Seeuletter API responded : ',  response)

}).catch(function  (err) {

console.log('[Get Price] Error message : ',  err.message)

console.log('[Get Price] Error status_code : ',  err.status_code)

})
  ```

### Accounts

  

#### Create a new account for the company

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// Create the account

Seeuletter.accounts.create({

email: "msb.partner@example.com",

name: "Erlich Bachman",

phone: "+33104050607",

company_name: "MSB Partner",

address_line1: '30 rue de rivoli',

address_line2: '',

address_city: 'Paris',

address_country: 'France',

address_postalcode: '75004'

})

.then(function  (account) {

console.log('The Seeuletter API Account responded : ',  account)

})

.catch(function  (err) {

console.log('Error message : ',  err.message)

})

  

```

  

#### Update the account company email

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// Update the account

Seeuletter.accounts.updateEmail("ACCOUNT COMPANY ID", "UPDATED EMAIL")

.then(function  () {

console.log('The Seeuletter API Account responded with success')

})

.catch(function  (err) {

console.log('Error message : ',  err.message)

})

  

```

  

### Invoices

  

#### List all invoices for a company

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// Getting the invoice list

Seeuletter.invoices.list({

// Pass optional filter here as object

})

.then(function  (response) {

console.log('The Seeuletter API Invoices responded : ',  response)

})

.catch(function  (err) {

console.log('Error message : ',  err.message)

})

  

```

  

#### Retrieve a specific invoice

  

```javascript

var  Seeuletter  =  require('seeuletter')('YOUR API KEY');

  

// Getting the invoice list

Seeuletter.invoices.retrieve("INVOICE ID")

.then(function  (invoice) {

console.log('The Seeuletter API Invoice responded : ',  invoice)

})

.catch(function  (err) {

console.log('Error message : ',  err.message)

})

  

```

  

=======================

  

Copyright &copy; 2025 Exaland.app

  

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.