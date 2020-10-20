
declare namespace Topol {
	type Html = string;
	type Json = string;
	type ImageUrl = string;

	interface Mjml {
		tagName: string;
		attributes: object;
		children?: Mjml[];
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
			onSaveAndClose?(mjml: Mjml, html: Html): void;
			/**
			 * Called when "Save" button is clicked
			 */
			onSave?(mjml: Mjml, html: Html): void;
			/**
			 * Called when send test email button is clicked
			 */
			onTestSend?(email: string, mjml: Mjml, html: Html): void;
			/**
			 * Override to implement your own file manager
			 */
			onOpenFileManager?(): void;
			/**
			 * Called when the editor decides that it needs an autosave. Mostly when the user makes a change and does not save it immediately
			 * @param json
			 */
			onAutoSave?(mjml: Mjml): void;
			/**
			 * Called when user saves a block
			 * @param json
			 */
			onBlockSave?(mjml: Mjml): void;
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
	}

	type Block = {
		/**
		 * Unique ID for block
		 */
		id: number;
		/**
		 * Name to display for block
		 */
		name: string;
		/**
		 * MJML object(s) for block
		 */
		definition: Mjml[];
	} | {
		/**
		 * Unique ID for block
		 */
		id: number;
		/**
		 * URL of image to display for block
		 */
		img: ImageUrl;
		/**
		 * MJML object(s) for block
		 */
		definition: Mjml[];
	};

	interface Plugin {
		/**
		 * Initialize plugin
		 */
		init(options: Options): void;
		/**
		 * Load MJML JSON template into editor
		 */
		load(json: Json): void;
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
		 * Sets the saved blocks - this should be called with updated list of saved blocks after all actions: onBlockSave, onBlockRemove, onBlockEdit to update the editor with the updated information
		 */
		setSavedBlocks(blocks: Block[]): void;
	}
}

/**
 * The global TOPOL.io plugin object
 */
declare var TopolPlugin: Topol.Plugin;
