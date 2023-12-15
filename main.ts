import { App, Editor, MarkdownView,  Plugin, PluginSettingTab, Setting } from 'obsidian';
import { findCycle } from './cycle';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class CtrlXAPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'cycle-up',
			name: 'Cycle up',
			editorCallback: (editor: Editor, _view: MarkdownView) => {

				console.log("Line >" + editor.getLine(editor.getCursor().line) + "<");
				console.log("Word from >" + (editor.wordAt(editor.getCursor())?.from.ch ?? "") + "<");
				console.log("Word to >" + (editor.wordAt(editor.getCursor())?.to.ch ?? "") + "<");

				let wordAt = editor.wordAt(editor.getCursor());
				if (wordAt != null) {
					let wordToReplace = editor.getRange(wordAt.from, wordAt.to);
					console.log("Replacing word >" + wordToReplace + "<");
					let wordNew = findCycle(wordToReplace,1);
					console.log("New word >" + wordNew + "<");
					editor.replaceRange(wordNew, wordAt.from, wordAt.to);
				} else {
					console.log("No word at cursor, doing nothing");
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class SampleSettingTab extends PluginSettingTab {
	plugin: CtrlXAPlugin;

	constructor(app: App, plugin: CtrlXAPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
