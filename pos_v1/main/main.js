function printReceipt(inputs) {
  var cartItems = buildCartItems(inputs);
  var items = buildItems(cartItems);
  var receipt = buildReceipt(items);

  console.log(receipt);
}

function buildCartItems(inputs) {
  var cartItems = [];
  var flag = 0;
  var allItems = loadAllItems();
  var promotions = loadPromotions();

  allItems.forEach(function (allItem) {
    inputs.forEach(function (input) {
      cartItems.forEach(function (cartItem) {
        if (cartItem.cartItems.barcode == allItem.barcode)
          flag = 1;
      });
      var s = input.split('-');

      if (s[0] == allItem.barcode && flag == 0)
        cartItems.push({cartItems: allItem, count: 0, discountsubtotal: 0, subtotal: 0});
      else
        flag = 0;
    });
  });
  countSameNumber(cartItems, inputs);

  return cartItems;
}

function countSameNumber(cartItems, inputs) {
  var promotions = loadPromotions();

  cartItems.forEach(function (cartItem) {
    inputs.forEach(function (input) {
      var s = input.split('-');
      if (s[0] == cartItem.cartItems.barcode && input.length == 10) {
        cartItem.count++;
      }
      if (input.length != 10 && cartItem.cartItems.barcode == s[0]) {
        cartItem.count = s[1];

      }
    });
    cartItem.discountsubtotal = (cartItem.count * cartItem.cartItems.price);
    cartItem.subtotal = (cartItem.count * cartItem.cartItems.price);

    promotions.forEach(function (promotion) {
      if (promotion.type == 'BUY_TWO_GET_ONE_FREE') {
        var barcodes = promotion.barcodes;
        barcodes.forEach(function (barcode) {
          if (cartItem.cartItems.barcode == barcode)
            cartItem.discountsubtotal = (cartItem.count - 1) * cartItem.cartItems.price;
        });
      }
    });
  });

}

function buildItems(cartItems) {
  var Items = [];
  var discounttotal = 0;
  var total = 0;

  cartItems.forEach(function (cartItem) {
    discounttotal += cartItem.discountsubtotal;
    total += cartItem.subtotal;
  });
  Items = {items: cartItems, discounttotal: discounttotal, total: total};

  return Items;
}

function buildReceipt(cartItems) {
  return ('***<没钱赚商店>收据***\n' + build(cartItems) + '----------------------\n' +
  '总计：' + ((cartItems.discounttotal).toFixed(2)) + '(元)\n' + '节省：' + ((cartItems.total - cartItems.discounttotal).toFixed(2)) +
  '(元)\n' + '**********************');
}


function build(Items) {
  var text = '';
  (Items.items).forEach(function (citem) {
    text += ('名称：' + citem.cartItems.name + '，' + '数量：' + citem.count + citem.cartItems.unit + '，' + '单价：' +
    (citem.cartItems.price).toFixed(2)
    + '(元)' + '，' + '小计：' + (citem.discountsubtotal).toFixed(2) + '(元)\n');
  });

  return text;
}





