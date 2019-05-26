describe("shoppingCart Test", function() {
    describe("test productList", function() {
        it("should get six products", function() {
            let productList = shoppingCart.dataCenter.getList();
            expect(productList.length).toEqual(6);
        });
        it("should add select product to select list when click add button", function() {
            shoppingCart.selectedProducts = [];
            shoppingCart.addResource(1);
            expect(shoppingCart.selectedProducts[0].index).toEqual(1);
        });
        it("should add count to select list when product have been exist", function() {
            shoppingCart.selectedProducts = [];
            shoppingCart.addResource(1);
            shoppingCart.addResource(1);
            expect(shoppingCart.selectedProducts[0].count).toEqual(2);
        }); 
        it("should show dialog", function() {
            shoppingCart.selectedProducts = [];
            shoppingCart.addResource(1);
            shoppingCart.showSelectedList();
            expect(document.querySelector('.dialog')).toBeTruthy();
        }); 
        it("should cancel dialog when click cancel button", function() {
            shoppingCart.selectedProducts = [];
            shoppingCart.addResource(1);
            shoppingCart.showSelectedList();
            shoppingCart.hideSelectedList();
            expect(document.querySelector('.dialog')).toBeFalsy();
        }); 
    })   
});
