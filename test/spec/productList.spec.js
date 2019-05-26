describe("productList Test", function() {
	describe("test productList", function() {
		it("should get product list", function() {
			let productList = shoppingCart.dataCenter.getList();
			expect(productList[0]).toEqual({
				"index":1,
				"name": "ipad",
				"type": "electronic",
				"price": 2500,
				"sale": 1
			});
		});
		
		it("should get customer's tickets info", function() {
			let ticketList = shoppingCart.dataCenter.getTicket();
			expect(ticketList[0]).toEqual({
				"totallyPrice":500,
				"sale":50
			});
		});
	});
});