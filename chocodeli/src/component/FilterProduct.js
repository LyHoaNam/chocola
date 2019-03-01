import product from "../data/product.json";

export default function filterProduct(searchText, maxResult) {
	return product
		.filter(item => {
			if(item.toLowerCase().includes(searchText.toLowerCase())){
				return true;
			}
			return false;
		})
		.slice(0,maxResult);

}