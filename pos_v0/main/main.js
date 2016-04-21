function printReceipt(inputs) {
  var cartItems  = buildCartItems(inputs);
  var  items= buildItems( cartItems );
  var receipt = buildReceipt(items);

  console.log(receipt);
}

function buildCartItems(inputs) {
  var cartItems = [];

  inputs.forEach(function (input) {
    var subtotal = (input.count * input.price);

    cartItems.push({cartItems: input, subtotal: subtotal});
  });

  return cartItems;
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
    text += ('名称：' + citem.cartItems.name + '，' + '数量：' + citem.cartItems.count + citem.cartItems.unit + '，' + '单价：' + (citem.cartItems.price).toFixed(2)
    + '(元)' + '，' + '小计：' + (citem.subtotal).toFixed(2) + '(元)\n');
  });

  return text;
}


