
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
			 * Override to implement your own file manager
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
		};
		/**
		 * Use light theme for editor [default is dark]
		 */
		light?: boolean;
		/**
		 * Unique ID of template of template to edit
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
		savedBlocks?: [] | null | false;
	}

	type Block = {
		/**
		 * Name to display for block
		 */
		name: string;
		/**
		 * MJML object(s) for block
		 */
		definition: MJML[];
	} | {
		/**
		 * URL of image to display for block
		 */
		img: ImageUrl;
		/**
		 * Name to for block (won't be shown if image is set)
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

	type SavedBlock = Block & {
		/**
		 * Unique ID for saved block
		 */
		id: number;
	};

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
		 * After onOpenFileManager is called, it is waiting for this function to be called with the url of the chosen file
		 */
		chooseFile(imageUrl: ImageUrl): void;
		/**
		 * Sets the premade blocks
		 *
		 * Set to `false` to hide this option
		 * @param blocks
		 */
		setPremadeBlocks(blocks: PremadeBlocks | false);
		/**
		 * Sets the saved blocks - this should be called with updated list of saved blocks after all actions: onBlockSave, onBlockRemove, onBlockEdit to update the editor with the updated information
		 */
		setSavedBlocks(blocks: SavedBlock[]): void;
	}
}

/**
 * The global TOPOL.io plugin object
 */
declare var TopolPlugin: Topol.Plugin;
