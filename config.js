window.env="dev";

(function() {
	config = {
		dev: {
			root: "something"
		},
		prod: {
			root: "something/else"
		}
	}
	window.config = config[window.env];
})();

console.log(config.root);