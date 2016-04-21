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
  allItems.forEach(function (allItem) {
    inputs.forEach(function (input) {
      cartItems.forEach(function (cartItem) {
        if (cartItem.cartItems.barcode == allItem.barcode)
          flag = 1;
      });
      if (input == allItem.barcode && flag == 0)
        cartItems.push({cartItems: allItem, count: 0, subtotal: 0});
      else
        flag = 0;
    });

  });
  countSameNumber(cartItems, inputs);

  return cartItems;
}

function countSameNumber(cartItems, inputs) {
  cartItems.forEach(function (cartItem) {
    inputs.forEach(function (input) {
      if (input == cartItem.cartItems.barcode) {
        cartItem.count++;
      }

    });
    cartItem.subtotal = (cartItem.count * cartItem.cartItems.price);

  });
}

function buildItems(cartItems) {
  var Items = [];
  var total = 0;

  cartItems.forEach(function (cartItem) {
    total += cartItem.subtotal;
  });

  Items = {items: cartItems, total: total};

  return Items;
}

function buildReceipt(Items) {
  return ('***<没钱赚商店>收据***\n' + build(Items) + '----------------------\n' +
  '总计：' + ((Items.total).toFixed(2)) + '(元)\n' + '**********************');
}


function build(Items) {
  var text = '';
  (Items.items).forEach(function (citem) {
    text += ('名称：' + citem.cartItems.name + '，' + '数量：' + citem.count + citem.cartItems.unit + '，' + '单价：' + (citem.cartItems.price).toFixed(2)
    + '(元)' + '，' + '小计：' + (citem.subtotal).toFixed(2) + '(元)\n');
  });

  return text;
}





