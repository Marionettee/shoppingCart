(function (window) {
	const dummyData = [
        {
            "index":1,
            "name": "ipad",
            "type": "electronic",
            "price": 2500,
            "sale": 1
        },
        {
            "index":2,
            "name": "iphone",
            "type": "electronic",
            "price": 6990,
            "sale": 0.95
        },
        {
            "index":3,
            "name": "面包",
            "type": "food",
            "price": 5,
            "sale": 0.8
        },
        {
            "index":4,
            "name": "咖啡杯",
            "type": "dailyNecessities",
            "price": 20,
            "sale": 1
        },
        {
            "index":5,
            "name": "白酒",
            "type": "drinks",
            "price": 200,
            "sale": 0.9
        },
        {
            "index":6,
            "name": "伏特加",
            "type": "drinks",
            "price": 300,
            "sale": 0.95
        }
    ]
    const customerDetails = [
        {
            "totallyPrice":500,
            "sale":50
        },
        {
            "totallyPrice":1000,
            "sale":200
        },
        {
            "totallyPrice":2000,
            "sale":500
        }
    ]

	window.shoppingCart = window.shoppingCart || {};
	window.shoppingCart.dataCenter = {
		getList:function(){
			return dummyData;			
        },
        getTicket:function(){
            return customerDetails;
        }
    };
})(window);
