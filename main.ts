import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { findCycle } from './cycle';
import { ObjType, tryExpandPosToMachADate } from './expandToDate';
import { Logger, LogLevel } from './logger';

interface CtrlXASettings {
	// list of cycles of words
	mySetting: string[][];
	// logging level for this plugin, default is INFO
	// possible values are DEBUG, INFO, WARN, ERROR, NONE
	loggingLevel: string;
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
	],
	loggingLevel: 'INFO',
}

const logger= new Logger(LogLevel.INFO);

export default class CtrlXAPlugin extends Plugin {
	settings: CtrlXASettings;

	async onload() {
		logger.info('Loading plugin');
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
		logger.info('Settings loaded and trimmed');
		logger.info('Log level is ' + this.settings.loggingLevel);
		logger.setLogLevel(this.settings.loggingLevel);
		for (let i = 0; i < this.settings.mySetting.length; i++) {
			logger.debug('settings.mySetting[' + i + '] = ' + this.settings.mySetting[i]);
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


function cycle(parEditor: Editor, parDirection: number, parCycles: string[][]) {

	const curLine = parEditor.getLine(parEditor.getCursor().line);
	const fromPos = parEditor.wordAt(parEditor.getCursor())?.from.ch ?? -1;
	const toPos = parEditor.wordAt(parEditor.getCursor())?.to.ch ?? -1;
	const wordAt = parEditor.wordAt(parEditor.getCursor());

	const obj:ObjType = {
		curLine,
		fromPos,
		toPos,
	};

	logger.debug("Line >" + curLine + "<");
	logger.debug("Word from pos >" + fromPos + "<");
	logger.debug("Word to pos >" + toPos + "<");
	logger.debug("Word at cursor >" + wordAt + "<");

	if (wordAt == null) {
		logger.debug("No word at cursor, doing nothing");
		return;
	}

	const expanded:bool = tryExpandPosToMachADate(obj)
	if (expanded) {
		logger.debug("Selection expanded to match a date");
		logger.debug("New word from pos >" + obj.fromPos + "<");
		logger.debug("New word to pos >" + obj.toPos + "<");
	}

	const wordToReplace = curLine.slice(obj.fromPos, obj.toPos);
	logger.debug("Replacing word >" + wordToReplace + "<");
	const wordNew = findCycle(wordToReplace, parDirection, parCycles);
	logger.debug("New word >" + wordNew + "<");

	parEditor.replaceRange(wordNew,
			{ line: parEditor.getCursor().line, ch: obj.fromPos },
			{ line: parEditor.getCursor().line, ch: obj.toPos });
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

		containerEl.createEl('h2', { text: 'Cycle Lists' });

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
						logger.debug('settings saved');
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

		containerEl.createEl('h2', { text: 'Advanced' });

		new Setting(containerEl)
			.setName('Logging level')
			.setDesc('Logging level for this plugin, default is INFO. Choose NONE to disable logging.')
			.addDropdown(dropdown => dropdown
				.addOption('NONE', 'NONE')
				.addOption('ERROR', 'ERROR')
				.addOption('WARN', 'WARN')
				.addOption('INFO', 'INFO')
				.addOption('DEBUG', 'DEBUG')
				.setValue(this.plugin.settings.loggingLevel)
				.onChange(async (value) => {
					this.plugin.settings.loggingLevel = value;
					await this.plugin.saveSettings();
					logger.setLogLevel(value);
					logger.info('settings loglevel saved');
				}));
	}
}
