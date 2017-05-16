# blocking-multi-shell

### Install

Add `blocking-multi-shell` to your dependencies in `kanso.json`

Run `kanso install` to fetch the package

### Usage

Add a `shell` section in `kanso.json`:
```javascript
   ...
   "shell": [
      "command1",
      "command2",
      ...
   ]
   ...
```

Special parameter `_url` could be added to the commands.
It will be replaced by the db url used during `kanso push` call


### Changelog

- 0.0.3: added 'cd path' before commands execution (to be able to do 'kanso push <folder> <db>')

- 0.0.2: added `_url` parameter

