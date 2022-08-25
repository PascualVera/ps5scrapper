const { chromium } = require("playwright");

const shops = [
	{
		vendor: "Amazon",
		url: "https://www.amazon.es/Playtation-Disc-Versi%C3%B3n-PS-5-Consola/dp/B09YQLQ2LJ/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=ps5+consola&qid=1661448092&refinements=p_89%3ASony&rnid=1692911031&s=videogames&sr=1-1",
		checkStock: async ({ page }) => {
			const content = await page.textContent(".a-color-price");
			return content.includes("No disponible.") === false;
		},
	},
	{
		vendor: "Carrefour",
		url: "https://www.carrefour.es/playstation-5-digital-825gb-blanco-2-dualsense-pulse-3d-negro-psn-50/VC4A-18742548/p",
		checkStock: async ({ page }) => {
			const content = await page.textContent(".add-to-cart-button");
			return content.includes("Agotado temporalmente") === false;
		},
	},
	// Not working on headless mode
	// {
	// 	vendor: "El Corte Ingles",
	// 	url: "https://www.elcorteingles.es/videojuegos/A37046605-consola-playstation-5-digital-edition/",
	// 	checkStock: async ({ page }) => {
	// 		setTimeout(() => {}, 5000);
	// 		const content = await page.textContent("#js_add_to_cart_desktop");
	// 		return content.includes("Agotado") === false;
	// 	},
	// },
];
(async () => {
	const browser = await chromium.launch();

	for (const shop of shops) {
		const { checkStock, vendor, url } = shop;
		const page = await browser.newPage(url);
		page.goto(url);
		const hasStock = await checkStock({ page });
		console.log(`${vendor}: ${hasStock ? "hasStock" : "out of stock"}`);
	}

	await browser.close();
})();
