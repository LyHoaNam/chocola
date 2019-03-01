
export default function Data() {
	let rule =[];
	fetch ("http://127.0.0.1:5000/api/fpgrowth")
	.then(results => {results.json();
	}).then(data => rule:data)
	console.log('rule',rule);
	return rule;
}