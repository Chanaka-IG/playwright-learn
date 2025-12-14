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
        const token = responseJson.token;
        return token;
    }


    async createOrder(orderSet) {
          const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
            data:this.orderSet,
            headers: {
                'Authorization': this.geteToken(),
                'Content-Type': 'application/json'
            }
          })
        
          await orderResponse.json().then(value => {
            orderID = value.orders[0];
          })
    }

}

module.exports = {APiUtils};
