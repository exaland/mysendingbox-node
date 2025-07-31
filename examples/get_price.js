'use strict'

const { post } = require('request')
/*
 * List an array of company invoices, depending on example options
 * After, retrieve a single invoice with _id
 * Use your MySendingBox Account API Key live or test
 */

var seeuletterFactory = require('../lib/index.js')
var Seeuletter = new seeuletterFactory('API_KEY_HERE')


Seeuletter.LettersPrice.getPrice({
  // Letter type
  postage_type: 'ecopli',
  page_count: 11,
  channel: 'paper',
  color: 'color',
  pack: 'business',
  both_sides: false,
  postage_speed: 'express'
}).then(function (response) {
  console.log('[Get Price] The Seeuletter API responded : ', response)
}).catch(function (err) {
  console.log('[Get Price] Error message : ', err.message)
  console.log('[Get Price] Error status_code : ', err.status_code)
})

    // Letter weight in grams   
