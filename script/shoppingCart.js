(function(window){
    let shoppingCart = window.shoppingCart || {};
    let productList = shoppingCart.dataCenter.getList();
    if(productList){
        let listHTML = '';
        for(let i = 0;i<productList.length;i++){

            let liEle = 
            `<li>
                <div>${productList[i].name}
                    <span style="margin-left:10px;display:${productList[i].sale === 1?'none':'inline'}">${productList[i].sale*10}折</span>
                    <span style="margin-left:10px;">单价：${productList[i].price}元</span>
                    <span style="margin-left:10px;">折后：${productList[i].price*productList[i].sale}元</span>
                </div>
                <button onclick='shoppingCart.addResource(${productList[i].index})'>添加</button>
            </li>`
            listHTML += liEle;
        }
        let warpEle = document.querySelector('#product-list');
        warpEle.innerHTML = listHTML;
    }
    buildSelectedRes=(res)=>{
        let selectRes = productList.filter((product)=>{
            return product.index === res;
        })
        if(selectRes.length === 0){
            alert('商品不存在');
        }else{
            return {
                index: res,
                name: selectRes[0].name,
                price: selectRes[0].price,
                sale: selectRes[0].sale,
                count: 1
            }
        }
    }
    shoppingCart.selectedProducts = [];
    shoppingCart.addResource = (res)=>{
        if(shoppingCart.selectedProducts.length === 0){
            shoppingCart.selectedProducts.push(buildSelectedRes(res))
        }else{
            let dontHaveThisProd = shoppingCart.selectedProducts.every((data)=>{
                if(data.index === res){
                    data.count+=1;
                    return false
                }else{
                    return true
                }
            })
            if(dontHaveThisProd){
                shoppingCart.selectedProducts.push(buildSelectedRes(res))
            }  
        }
    }
    shoppingCart.payment = ()=>{
        totallyPrice = 0;
        let selectListInner = '';
        if(shoppingCart.selectedProducts.length === 0){
            alert('您还没有选购任何商品')
        }else{
            shoppingCart.selectedProducts.map((res)=>{
                totallyPrice += res.count*res.price*res.sale;
                selectListInner += `
                <li class="">
                    <div>${res.name}</div>
                    <div>数量 ${res.count}</div>
                </li>
                ` 
                return res;
            })
            return {totallyPrice,selectListInner}
        }

    }
    shoppingCart.showSelectedList = ()=>{
        let shoppingCartInfo = shoppingCart.payment();
        if(totallyPrice !== undefined){
            let tickets = shoppingCart.dataCenter.getTicket();
            let selectOptions = '<option value=0 disabled selected>请选择优惠券</option><option value=0>不使用优惠</option>';
            tickets.map((ticket)=>{
                if(ticket.totallyPrice <= totallyPrice){
                    selectOptions+=`<option value=${ticket.sale}>实付金额满${ticket.totallyPrice}减${ticket.sale}</option>`;
                }
                return ticket.totallyPrice <= totallyPrice;
            })

            let dialogEle = document.createElement('div');
            dialogEle.className = 'dialog';
            dialogEle.innerHTML = `
            <div>
                <ul class="selectList">
                    ${shoppingCartInfo.selectListInner}
                </ul>
                <div>
                    您一共需要支付<span class="payment">${shoppingCartInfo.totallyPrice}</span>元
                </div>
                <select onchange="shoppingCart.selectTicket()">
                    ${selectOptions}
                </select>
                <div class="button">
                    <button onclick="shoppingCart.paymentSuccessful()">确认</button>
                    <button onclick="shoppingCart.hideSelectedList()">取消</button>
                </div>
            </div>
            `;
            document.body.appendChild(dialogEle);
        }
    }
    
    shoppingCart.paymentSuccessful = ()=>{
        alert('支付成功');
        shoppingCart.hideSelectedList();
        shoppingCart.selectedProducts = [];
    }

    shoppingCart.hideSelectedList = ()=>{
        let dialogEle = document.querySelector('.dialog');
        if(dialogEle){
            document.body.removeChild(dialogEle);
        }
    }
    shoppingCart.selectTicket = ()=>{
        let totallyPrice = shoppingCart.payment().totallyPrice
        let sale = document.querySelector('select').value;
        document.querySelector('.payment').innerHTML = totallyPrice - Number(sale);
    }
})(window)
