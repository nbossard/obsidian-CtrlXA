# Ctrl XA Plugin

Inspired by vim plugin : <https://github.com/Konfekt/vim-CtrlXA>

This Obsidian plug-in makes the key bindings <Ctrl-X/A>
additionally cycle through lists of keywords such as for example:

- Monday/Tuesday/Wednesday/...
- true/false
- yes/no
- set/unset
- yesterday/today/tomorrow
- roman numerals I, II, III...

## Usage

Install and enable this plugin.

Go to settings of plugin, fill the lists you need.

Go to settings/hotkeys, define hotkeys for commands "Ctrl-XA cycle various items: Cycle up" and "Ctrl-XA cycle various items: Cycle Down", could be Ctrl-X and Ctrl-A, or anything you want...

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
