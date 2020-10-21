
declare namespace Topol {
	type HTML = string;
	type JSON = string;
	type ImageUrl = string;

	interface MJML {
		tagName: string;
		attributes: object;
		children?: MJML[];
		content?: string;
	}

	type Block = {
		/**
		 * Name to display for block
		 */
		name: string;
		/**
		 * MJML for block
		 */
		definition: MJML[];
	} | {
		/**
		 * URL of image to display for block. For best experience use width > 330px
		 */
		img: ImageUrl;
		/**
		 * Name for block (won't be shown if image is set)
		 */
		name?: string;
		/**
		 * MJML for block
		 */
		definition: MJML[];
	};

	type PremadeBlocks = {
		headers?: Block[];
		content?: Block[];
		ecomm?: Block[];
		footers?: Block[];
	};

	type SavedBlocks = (Block & {
		/**
		 * Unique ID for saved block. If not set then it will use its array index
		 */
		id?: number;
	})[];

	interface Options {
		/**
		 * ID of DOM element in which to show editor
		 */
		id: string;
		/**
		 * Plugin authorization
		 */
		authorize: {
			/**
			 * API key for the TOPOL.io account
			 */
			apiKey: string;
			/**
			 * Unique string to identify current user
			 */
			userId: string;
		};
		language: "en";
		/**
		 * List of google fonts to load, eg	`['Roboto', 'K2D', 'Mali']`
		 */
		googleFonts: string[];
		/**
		 * List of fonts shown in select box
		 */
		fonts: {
			/**
			 * Label shown to user
			 */
			label: string;
			/**
			 * CSS style applied with font selected, eg `'Roboto, Tahoma, sans-serif'`
			 */
			style: string;
		}[];
		/**
		 * Disable built-in file manager in order to use your own
		 */
		customFileManager?: boolean;
		callbacks: {
			/**
			 * Called when "Save & Close" button is clicked
			 */
			onSaveAndClose?(mjml: MJML, html: HTML): void;
			/**
			 * Called when "Save" button is clicked
			 */
			onSave?(mjml: MJML, html: HTML): void;
			/**
			 * Called when send test email button is clicked
			 */
			onTestSend?(email: string, mjml: MJML, html: HTML): void;
			/**
			 * Called when user clicks "Choose a file". Override if implementing your own file manager
			 */
			onOpenFileManager?(): void;
			/**
			 * Called when the editor decides that it needs an autosave. Mostly when the user makes a change and does not save it immediately
			 * @param json
			 */
			onAutoSave?(mjml: MJML): void;
			/**
			 * Called when user saves a block
			 * @param json
			 */
			onBlockSave?(mjml: MJML): void;
			/**
			 * Called when user removes a block
			 * @param id Id of block to remove
			 */
			onBlockRemove?(id: number): void;
			/**
			 * Called when user edits a block
			 * @param id Id of block to edit
			 */
			onBlockEdit?(id: number): void;
			/**
			 * Called when Editor is loaded. Can be useful for implementing custom loading before Editor is loaded
			 */
			onInit?(): void;
			/**
			 * Called when the user clicks "Send Test"
			 */
			onTestSend?(emailAddress: string, json: JSON, html: HTML): void;
		};
		/**
		 * Use light theme for editor [default is dark]
		 */
		light?: boolean;
		/**
		 * Unique ID of template of template to edit
		 *
		 * If used then template will be stored on TOPOL.io's servers
		 */
		templateId?: number;
		/**
		 * Premade blocks to use as part of email
		 *
		 * To hide this option, set to `false`
		 */
		premadeBlocks?: false | PremadeBlocks;
		/**
		 * Blocks that have been saved by the user
		 *
		 * To enable, set to `[]`
		 * To disable, set to `null` or leave undefined
		 * To hide the option, set to `false`
		 */
		savedBlocks?: SavedBlocks | null | false;
		/**
		 * Alignment for menu within the editor [default is "left"]
		 */
		mainMenuAlign?: "left" | "right";
		/**
		 * Selectively show elements in top bar [shows all elements by default]
		 */
		topBarOptions?: ("undoRedo" | "changePreview" | "previewSize" | "previewTestMail" | "save" | "saveAndClose")[];
		/**
		 * Completely remove the top bar from the editor
		 */
		removeTopBar?: boolean;
	}

	interface Plugin {
		/**
		 * Initialize plugin
		 */
		init(options: Options): void;
		/**
		 * Load MJML JSON template into editor
		 */
		load(json: JSON): void;
		/**
		 * Force template to save. The onSave callback will be called with the JSON and HTML of the template
		 */
		save(): void;
		/**
		 * Toggle preview mode on/off
		 */
		togglePreview(): void;
		/**
		 * Send URL of chosen file in response to onOpenFileManager callback. Use when implementing you own file manager
		 */
		chooseFile(imageUrl: ImageUrl): void;
		/**
		 * Sets the premade blocks, or set to false to hide this option
		 */
		setPremadeBlocks(blocks: PremadeBlocks | false): void;
		/**
		 * Sets the user-saved blocks - this should be called with the updated list of saved blocks after all actions: onBlockSave, onBlockRemove, onBlockEdit to update the editor with the updated information
		 */
		setSavedBlocks(blocks: SavedBlocks): void;
		/**
		 * Undo last user action
		 */
		undo(): void;
		/**
		 * Redo undone user action
		 */
		redo(): void;
		createNotification(options: {
			/** Works only in editor v3 */
			title: string;
			text: string;
			type: "info" | "error" | "success";
		}): void
	}
}

/**
 * The global TOPOL.io plugin object
 */
declare var TopolPlugin: Topol.Plugin;
