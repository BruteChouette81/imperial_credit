

/* to way:
-1st: Moon pay checkout
    -get the credit on centralized exchange and use an api Wyre
    //secret TEST-SK-9GZ74QRR-BPN327QT-WB8RLWGW-Y3T7PZY3

    each new F2C interpretation: 
    get the exact amount transfert on wyre. Then use the market contract to access those credits 

const sdk = require('api')('@wyre-hub/v4#a7v9oa26lbyb5rxw');

sdk.auth('TEST-SK-9GZ74QRR-BPN327QT-WB8RLWGW-Y3T7PZY3');
sdk.createWalletOrderReservation({
  referrerAccountId: 'AC_JGDWVJ3PDEL', //always the same
  amount: '100',
  sourceCurrency: 'USD',
  destCurrency: 'ETH', //$CREDIT
  dest: 'ethereum:0xfa99F46DD28933b56bFdB829d2a2d59EFacEB2d5',
  firstName: 'Thomas',
  lastName: 'Berthiaume',
  phone: '4189066360',
  country: 'CA',
  postalCode: 'G0S2C0',
  state: 'Quebec',
  city: 'Saint-Antoine-de-Tilly',
  street1: '4172 Rte Marie-Victorin'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

  with imperial account, get already the payment method  using owner parameter

*/


function placeOrder(amount, address) {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer TEST-SK-9GZ74QRR-BPN327QT-WB8RLWGW-Y3T7PZY3'
        },
        body: JSON.stringify({
        referrerAccountId: 'AC_JGDWVJ3PDEL', //always the same
        amount: amount,
        sourceCurrency: 'USD',
        destCurrency: 'ETH', //$CREDIT
        dest: `ethereum:${address}`, //not toLowerCase
        firstName: 'Thomas',
        lastName: 'Berthiaume',
        phone: '14189066360',
        country: 'CA',
        postalCode: 'G0S2C0',
        state: 'Quebec',
        city: 'Saint-Antoine-de-Tilly',
        street1: '4172 Rte Marie-Victorin',
        autoRedirect: true, 
        redirectUrl: `localhost:3000/F2C/${address}`,
        failureRedirectUrl: 'localhost:3000/market'}) //add owner
      };
      
      fetch('https://api.testwyre.com/v3/orders/reserve', options)
        .then(response => response.json())
        .then(response => window.location.replace(response.url))
        .catch(err => console.error(err));
}


export default placeOrder;