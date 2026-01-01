const { expect } = require('@playwright/test');

class APiOrange {
    constructor(apiContext, dataSet) {
        this.apiContext = apiContext;
        this.dataSet = dataSet;
    }

    async getAccessToken() {
        let responses = {}
        const response = await this.apiContext.post('https://puma30n-lts-kord.orangehrm.com/oauth/issueToken', {
            data: this.dataSet
        })
        const responseJson = await response.json();
        responses.token = responseJson.access_token;
        return responses.token;
    }

    async createEmployee(employee, token) {
        console.log(token)
        employee = Array.isArray(employee) ? employee : [employee];
        for (const val of employee) {
            const response = await this.apiContext.post('https://puma30n-lts-kord.orangehrm.com/api/employees', {
                data: val,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            expect(response.ok()).toBeTruthy();
            const responseJson = await response.json();
        }
    }


    async addNationality(nationality, token) {

        console.log(nationality.name)
        console.log(token)

        const nationalityResponse = await this.apiContext.post('https://puma30n-lts-kord.orangehrm.com/api/nationality', {
            data: nationality,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        expect(nationalityResponse.ok()).toBeTruthy();
        const responseJson = await nationalityResponse.json();        
    }
}
module.exports = { APiOrange };