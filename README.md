# Ctrl XA Plugin

![GitHub release (latest by date)](https://img.shields.io/github/v/release/nbossard/obsidian-CtrlXA)
![GitHub Release Date](https://img.shields.io/github/release-date/nbossard/obsidian-CtrlXA)
![GitHub issues](https://img.shields.io/github/issues/nbossard/obsidian-CtrlXA)

![GitHub all releases](https://img.shields.io/github/downloads/nbossard/obsidian-CtrlXA/total)
![GitHub](https://img.shields.io/github/license/nbossard/obsidian-CtrlXA)

Inspired by vim plugin : <https://github.com/Konfekt/vim-CtrlXA>

This Obsidian plug-in allows easy cycle through lists of keywords such as for example:

- Monday/Tuesday/Wednesday/...
- true/false
- yes/no
- set/unset
- yesterday/today/tomorrow
- roman numerals I, II, III...

It also automatically increases/decreases numbers.

Coming soon : dates support.

## Usage

Install and enable this plugin.

Go to settings of plugin, fill the lists you need.

Go to settings/hotkeys,
define hotkeys for commands *"Ctrl-XA cycle various items: Cycle up"*
and *"Ctrl-XA cycle various items: Cycle Down"*,
could be Ctrl-X and Ctrl-A (like in Vim), or any key you want...

You are ready to use it:

- please input a sentence like *"Will do it on Monday"*
- place your cursor on "Monday"
- press hotkey you defined for cycle up.
- sentence is now *"Will do it on Tuesday"*

## What's new

Refer to [changelog](./CHANGELOG.mg)

## Various

Note: this plugin has been started using <https://github.com/obsidianmd/obsidian-sample-plugin>

## Manual installation

This is to get latest version in development.

Go to the folder containing your vault, then in subfolder ".obsidian/plugins".
Git clone there the repo : <https://github.com/nbossard/obsidian-CtrlXA>.
Restart Obsidian.

## Releasing process

- check content of [changelog.md](./changelog.md) and add release date
- check content of [versions.json](./versions.json)
- check **"version"** field in [manifest.json](manifest.json)
- check **"version"** field in [package.json](package.json)
- check everyting is saved and commited
- git tag and push
- bump version number in "changelog.md", "versions.json", "manifest.json", "package.json"
- save stage and commit

## Development environment

- **open another terminal running `npm run dev`**
- developped using neovim
- Plugin obsidian "Hot Reload" also helped a lot <https://github.com/pjeby/hot-reload>
