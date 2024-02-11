# Ctrl XA Plugin

![GitHub release (latest by date)](https://img.shields.io/github/v/release/nbossard/obsidian-CtrlXA)
![GitHub Release Date](https://img.shields.io/github/release-date/nbossard/obsidian-CtrlXA)
![GitHub issues](https://img.shields.io/github/issues/nbossard/obsidian-CtrlXA)

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=blue&label=downloads&query=%24%5B%22ctrl-xa%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)
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

Refer to [changelog](https://github.com/nbossard/obsidian-CtrlXA/blob/master/CHANGELOG.md)

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
- check everything is saved and commited
- git tag and push
- let github actions generate the new draft release <https://github.com/nbossard/obsidian-CtrlXA/actions>
- go to release page <https://github.com/nbossard/obsidian-CtrlXA/releases>
  edit latest draft and publish it
- bump version number in "CHANGELOG.md", "versions.json", "manifest.json", "package.json"
- save stage and commit

## Development environment

### tools

- **open another terminal running `npm run dev`**
- developped using neovim
- Plugin obsidian "Hot Reload" also helped a lot <https://github.com/pjeby/hot-reload>

### branches

Apparently Obsidian is checking content of manifest.json on "main" branch to detect for new versions.
So "main" branch will now contain only releases and work will be done in "develop" branch.

### github actions

This project uses "github actions" to generate (draft) releases out of tags.
This is configured in file [release.yml](./.github/orkflows/release.yml)
Refer to documentation: <https://docs.github.com/en/actions>
