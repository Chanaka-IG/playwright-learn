const {test,expect,request} = require('@playwright/test')
const {APiOrange} = require('./Utils/APiOrange') 


// test.beforeAll("Get AccessTOken", async () => {
//     const dataSet = {client_id: "public_rest_api_client", grant_type: "password",username: "_ohrmSysAdmin_", password: "admin@OHRM123"};
//     const employee = [{
//     firstName: "Janaka",
//     middleName: "hasara",
//     lastName: "Weera",
//     locationId: "2",
//     joinedDate: "2022-05-02",
//     chkLogin: false,
//     autoGenerateEmployeeId: true
// },
// {
//     firstName: "Mandana",
//     middleName: "Gamya",
//     lastName: "Kumaaa",
//     locationId: "2",
//     joinedDate: "2022-05-02",
//     chkLogin: false,
//     autoGenerateEmployeeId: true
// }
// ]

//     const nationality = {name: "Indian-south"}

//     const apiContext = await request.newContext();
//     const apiOrange = new APiOrange(apiContext,dataSet);
//     const token = await apiOrange.getAccessToken();
//     const employeeResponseMsg = await apiOrange.createEmployee(employee,token);
//     const nationalityResponse = await apiOrange.addNationality(nationality,token)


// })

test("Validate the login page", async ({page}) => {
    await page.route("**/*.{css,svg}", route => route.abort())
    await page.goto("https://puma09-temp14-kord.orangehrm.com/")
   

    await page.waitForTimeout(3000)

})