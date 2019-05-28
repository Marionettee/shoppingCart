(function(window){
    let productList = window.shoppingCart.dataCenter.getList();
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
    shoppingCart.selectedProductsInfo = {
        list:[],
        totallyPrice:0
    };
    (function(value){
        Object.defineProperty(shoppingCart.selectedProductsInfo,'list',{
            get:function(){
                return value;
            },
            set:function(newVal){
                value = newVal;
                shoppingCart.selectedProductsInfo.list.map((res)=>{
                    shoppingCart.selectedProductsInfo.totallyPrice += res.count*res.price*res.sale;
                    return res;
                })
                // console.log(shoppingCart.selectedProductsInfo.list)
            }
        })
    })([])
    let shoppingCartObj = {
        ...window.shoppingCart,
        addResource:function(res){
            if(shoppingCart.selectedProductsInfo.list.length === 0){
                shoppingCart.selectedProductsInfo.list = [buildSelectedRes(res)];
            }else{
                countCaculate('add');
            }
        },
        payment:function(){
            totallyPrice = 0;
            let selectListInner = '';
            if(shoppingCart.selectedProductsInfo.list.length === 0){
                alert('您还没有选购任何商品')
            }else{
                this.selectedProductsInfo.list.map((res)=>{
                    totallyPrice += res.count*res.price*res.sale;
                    selectListInner += `
                    <li class="">
                        <div>${res.name}</div>
                        <div>数量 <button onclick="shoppingCart.countReduce(${res.index},event)">-</button><span class="count">${res.count}</span><button onclick="shoppingCart.countAdd(res)">+</button></div>
                    </li>
                    ` 
                    return res;
                })
                return {totallyPrice,selectListInner}
            }
    
        },
        showSelectedList:function(){
            let shoppingCartInfo = this.payment();
            if(totallyPrice !== undefined){
                let tickets = this.dataCenter.getTicket();
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
        }, 
        paymentSuccessful:function(){
            alert('支付成功');
            this.hideSelectedList();
            this.selectedProductsInfo.list = [];
        },
        hideSelectedList:()=>{
            let dialogEle = document.querySelector('.dialog');
            if(dialogEle){
                document.body.removeChild(dialogEle);
            }
        },
        selectTicket:function(){
            let totallyPrice = this.payment().totallyPrice
            let sale = document.querySelector('select').value;
            document.querySelector('.payment').innerHTML = totallyPrice - Number(sale);
        },
        countReduce:function(index,event){
            console.log(index)
            let count =  event.target.parentElement.children[1].innerText;
            if(count === '1'){
                let rootElement = event.target.parentElement.parentElement;
                document.querySelector('.selectList').removeChild(rootElement);
            }else{
                event.target.parentElement.children[1].innerText -=1; 
            }
            // window.clickBtn =

        }
    }
    function countCaculate(method){
        let dontHaveThisProd = true
        let newList = shoppingCart.selectedProductsInfo.list.map((data)=>{
            if(data.index === res){
                if(method === 'add'){
                    data.count+=1;
                }else if(method === 'reduce'){
                    data.count -=1
                }
                dontHaveThisProd = false;
            }
            return data
        });
        if(dontHaveThisProd){
            if(method === 'add'){
                shoppingCart.selectedProductsInfo.list = [...shoppingCart.selectedProductsInfo.list,buildSelectedRes(res)];                
            }else if(method === 'reduce'){
                alert('未找到该资源');
            }
        }else{
            shoppingCart.selectedProductsInfo.list = newList;
        }
    }
    window.shoppingCart = shoppingCartObj;
})(window)
