import { App, Editor, MarkdownView,  Plugin, PluginSettingTab, Setting } from 'obsidian';
import { findCycle } from './cycle';

interface CtrlXASettings {
	mySetting: string[][];
}

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
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'cycle-up',
			name: 'Cycle up',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
                cycle(editor, 1, this.settings.mySetting);
			}
		});

		this.addCommand({
			id: 'cycle-down',
			name: 'Cycle down',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
                cycle(editor, -1, this.settings.mySetting);
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new CtrlXASettingTab(this.app, this));
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

function cycle(parEditor: Editor, parDirection: number, parCycles: string[][]) {
	// console.log("Line >" + parEditor.getLine(parEditor.getCursor().line) + "<");
	// console.log("Word from >" + (parEditor.wordAt(parEditor.getCursor())?.from.ch ?? "") + "<");
	// console.log("Word to >" + (parEditor.wordAt(parEditor.getCursor())?.to.ch ?? "") + "<");

	let wordAt = parEditor.wordAt(parEditor.getCursor());
	if (wordAt != null) {
		let wordToReplace = parEditor.getRange(wordAt.from, wordAt.to);
		console.log("Replacing word >" + wordToReplace + "<");
		let wordNew = findCycle(wordToReplace,parDirection, parCycles);
		console.log("New word >" + wordNew + "<");
		parEditor.replaceRange(wordNew, wordAt.from, wordAt.to);
	} else {
		console.log("No word at cursor, doing nothing");
	}
}

class CtrlXASettingTab extends PluginSettingTab {
	plugin: CtrlXAPlugin;

	constructor(parApp: App, parPlugin: CtrlXAPlugin) {
		super(parApp, parPlugin);
		this.plugin = parPlugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'General Settings' });

		containerEl.createEl('h2', { text: 'Cycle Settings' });

		function createSetting(containerEl : HTMLElement, index : number) {
			new Setting(containerEl)
				.setName( 'Cycle lists ' + index)
				.setDesc('E.g. : "Monday, Tuesday, Wednesday,...')
				.addText(text => text
					.setPlaceholder('Monday,...')
					.setValue(this.plugin.settings.mySetting[index] ? this.plugin.settings.mySetting[index].join(",") : "")
					.onChange(async (value) => {
this.plugin.settings.mySetting[index] = value ? value.split(",").map(item => item.trim()) : [];
						await this.plugin.saveSettings();
					}));
		}

		createSetting(containerEl, 0);
		createSetting(containerEl, 1);
		createSetting(containerEl, 2);
		createSetting(containerEl, 3);
		createSetting(containerEl, 4);
		createSetting(containerEl, 5);
		createSetting(containerEl, 6);
		createSetting(containerEl, 7);
		createSetting(containerEl, 8);
		createSetting(containerEl, 9);
	}
}
