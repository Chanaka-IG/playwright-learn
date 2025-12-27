class APiUtils {

    constructor(apiContext,dataSet){
        this.apiContext = apiContext;
        this.dataSet = dataSet;
    }


    async geteToken() {

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
            data:this.dataSet
        })

        const responseJson = await loginResponse.json();
        return responseJson.token;
    }


    async createOrder(orderSet) {

          let response = {}
          response.token = await this.geteToken(); 
          const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
            data:orderSet,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
          })
        
          const orderID = await orderResponse.json()
          response.orderID = orderID.orders[0];
          return response;
    }

}

module.exports = {APiUtils};
