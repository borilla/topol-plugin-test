import template from "./template.json";

const API_KEY = "NQJVbkc4rLfpP1qy5IneLhBzPjvpPfCZQhk79LaMbpV3211NJKgIrk29KRLO";
const USER_ID = "user-1";

const TOPOL_OPTIONS: Topol.Options = {
	id: "#app",
	authorize: {
		apiKey: API_KEY,
		userId: USER_ID,
	},
	language: "en",
	callbacks: {
		onSaveAndClose: function(mjml, html) {
			console.log(html);
			console.log(mjml);
		},
		onSave: function(mjml, html) {
			console.log(html);
			console.log(mjml);
		},
	},
	light: true,
	// templateId: 1,
};

TopolPlugin.init(TOPOL_OPTIONS);
TopolPlugin.load(JSON.stringify(template.definition));
