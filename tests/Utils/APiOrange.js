const { expect } = require('@playwright/test');

class APiOrange {
    constructor(apiContext,dataSet){
        this.apiContext = apiContext;
        this.dataSet = dataSet;
    }

    async getAccessToken() {

     let responses = {}

        const response = await this.apiContext.post('https://puma09-temp14-kord.orangehrm.com/oauth/issueToken',{
            data:this.dataSet
        })
  const responseJson = await response.json();

  responses.token = responseJson.access_token;
  return responses.token;
}

    async createEmployee(employee,token){

        employee = Array.isArray(employee) ? employee : [employee];
        for (const val of employee){

               console.log(val)
            const response = await this.apiContext.post('https://puma09-temp14-kord.orangehrm.com/api/employees',{
            data: val,
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
            expect (response.ok()).toBeTruthy();
            const responseJson = await response.json();
        }
    }


    async addNationality(nationality,token) {

        console.log(nationality.name)
        console.log(token)

        const nationalityResponse = await this.apiContext.post('https://puma09-temp14-kord.orangehrm.com/api/nationality', {
            data : nationality,
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
         expect (nationalityResponse.ok()).toBeTruthy();
        const responseJson = await nationalityResponse.json();
        console.log(responseJson);

    }
}
module.exports = {APiOrange};