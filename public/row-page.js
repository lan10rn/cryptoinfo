let fetchRes = fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=dogecoin%2Cbitcoin%2Clitecoin%2Ctether%2Ctron%2Cmonero%2Ccardano%2Cpolygon%2Csolana%2Ctoncoin%2Cuniswap%2Cchainlink%2Cstellar%2Cdash&vs_currencies=inr&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true");
// fetchRes is the promise to resolve it by using.then() method
fetchRes.then(res => res.json()).then(json => {
    const container = document.querySelector('.row')

    // This returns all the properties of an object as an array 
    const coins = Object.getOwnPropertyNames(json)
    for (let coin of coins) {

        const coinInfo = json[`${coin}`];
        const price = coinInfo.inr;
        const change = coinInfo.inr_24h_change.toFixed(5);

        container.innerHTML += `
        <div class="col-4">
		<div class="card ${change < 0 ? 'falling' : 'rising'}">
			<div class="card-title">
				<h3>${coin}</h3>
			</div>
			<div class="card-body">
				<div class="coin-logo">
					<img src="https://cryptologos.cc/logos/thumbs/${coin}.png?v=023">
				</div>
				<div class="coin-price">
					<span class="price">₹ ${price} / coin</span>
                    <span class="change">Change : ${change}</span>
					<span class="MarketCap">Market Cap : ${coinInfo.inr_market_cap}</span>
				</div>
			</div>
		</div>
	</div>
        `
    }
    // coin-name card-title
})