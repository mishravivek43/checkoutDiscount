install packages first with npm i

TEST =>
npm run test
dev =>
npm run dev
server=>
npm run start

The Checkout can be tested via test cases
or via api

curl =>
curl --location 'localhost:3005/getCheckoutTotal' \
--header 'Content-Type: application/json' \
--data '{
"items":["wtch", "op11", "op11", "op11", "buds", "buds", "op11", "op11"],
"pricingRule":[
{
"sku": "op10",
"price": 100
},
{
"sku": "op11",
"price": 300,
"discountQuantity": 4,
"discountPrice": 200
},
{
"sku": "buds",
"price": 50,
"discountQuantity": 3,
"isFreeItem": true,
"freeItems": 1
},
{
"sku": "wtch",
"price": 100
}
]
}'
where pricingRule is optional if not provided default pricing rule will be used
which is
"pricingRule":[
{
"sku": "op10",
"price": 849.99
},
{
"sku": "op11",
"price": 949.99,
"discountQuantity": 4,
"discountPrice": 200
},
{
"sku": "buds",
"price": 129.99,
"discountQuantity": 3,
"isFreeItem": true,
"freeItems": 1
},
{
"sku": "wtch",
"price": 229.99
}
]
