const base = require('@playwright/test')
const test = require('node:test')


exports.customTest =  base.test.extend({
  testData: {
     myEmail: "igcpa@gmail.com",
     password : "0773379002Chanaka!",
     item: "ZARA COAT 3",
     creditCCardCountry: "Sri Lanka",
     expiryMMonth:"10",
     expiryDDate: "25",
     cvv: "123",
     nameOnCCard: "Chanaka Prasad",
     coupon: "rahulshettyacademy"

}

})










