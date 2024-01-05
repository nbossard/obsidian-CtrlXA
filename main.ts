import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { findCycle } from './cycle';

interface CtrlXASettings {
	mySetting: string[][];
}

// These are the defaullt settings to inspire user.
const DEFAULT_SETTINGS: CtrlXASettings = {
	mySetting: [
		["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		["true", "false"],
		["yes", "no"],
		['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],
		['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
		['verbose', 'debug', 'info', 'warn', 'error', 'fatal']
	]
}

export default class CtrlXAPlugin extends Plugin {
	settings: CtrlXASettings;

	async onload() {
		console.log('CtrlXA - loading plugin');
		await this.loadSettings();

		// This adds an editor command to cycle up
		// e.g. : from "Monday" to "Tuesday", "January" to "February"
		this.addCommand({
			id: 'cycle-up',
			name: 'Cycle up',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				cycle(editor, 1, this.settings.mySetting);
			}
		});

		// This adds an editor command to cycle down
		// e.g. : from "Tuesday" to "Monday"
		this.addCommand({
			id: 'cycle-down',
			name: 'Cycle down',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				cycle(editor, -1, this.settings.mySetting);
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		// especially the lists contents
		this.addSettingTab(new CtrlXASettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		// trigger spaces in settings.mySetting
		for (let i = 0; i < this.settings.mySetting.length; i++) {
			this.settings.mySetting[i] = this.settings.mySetting[i].map(item => item.trim());
		}
		// logging settings.mySetting
		console.log('CtrlXA - settings loaded and trimmed');
		for (let i = 0; i < this.settings.mySetting.length; i++) {
			console.log('CtrlXA - settings.mySetting[' + i + '] = ' + this.settings.mySetting[i]);
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

function cycle(parEditor: Editor, parDirection: number, parCycles: string[][]) {
	// console.log("Line >" + parEditor.getLine(parEditor.getCursor().line) + "<");
	// console.log("Word from >" + (parEditor.wordAt(parEditor.getCursor())?.from.ch ?? "") + "<");
	// console.log("Word to >" + (parEditor.wordAt(parEditor.getCursor())?.to.ch ?? "") + "<");

	let wordAt = parEditor.wordAt(parEditor.getCursor());
	if (wordAt != null) {
		let wordToReplace = parEditor.getRange(wordAt.from, wordAt.to);
		console.log("CtrlXA - Replacing word >" + wordToReplace + "<");
		let wordNew = findCycle(wordToReplace, parDirection, parCycles);
		console.log("CtrlXA - New word >" + wordNew + "<");
		parEditor.replaceRange(wordNew, wordAt.from, wordAt.to);
	} else {
		console.log("CtrlXA - No word at cursor, doing nothing");
	}
}

class CtrlXASettingTab extends PluginSettingTab {
	plugin: CtrlXAPlugin;

	constructor(parApp: App, parPlugin: CtrlXAPlugin) {
		super(parApp, parPlugin);
		this.plugin = parPlugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'General Settings' });

		containerEl.createEl('h2', { text: 'Cycle Settings' });

		function createSetting(containerEl : HTMLElement, parIndex : number, parPlugin: CtrlXAPlugin) {
			new Setting(containerEl)
				.setName( 'Cycle lists ' + parIndex)
				.setDesc('E.g. : "Monday, Tuesday, Wednesday,...')
				.addText(text => text
					.setPlaceholder('Monday,...')
					.setValue(parPlugin.settings.mySetting[parIndex] ? parPlugin.settings.mySetting[parIndex].join(",") : "")
					.onChange(async (value) => {
parPlugin.settings.mySetting[parIndex] = value ? value.split(",").map(item => item.trim()) : [];
						await parPlugin.saveSettings();
						console.log('CtrlXA - settings saved');
					}));
		}

		createSetting(containerEl, 0, this.plugin);
		createSetting(containerEl, 1, this.plugin);
		createSetting(containerEl, 2, this.plugin);
		createSetting(containerEl, 3, this.plugin);
		createSetting(containerEl, 4, this.plugin);
		createSetting(containerEl, 5, this.plugin);
		createSetting(containerEl, 6, this.plugin);
		createSetting(containerEl, 7, this.plugin);
		createSetting(containerEl, 8, this.plugin);
		createSetting(containerEl, 9, this.plugin);
	}
}
