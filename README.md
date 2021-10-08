# Custom Popup

### How to run

- add `<link rel="stylesheet" href="./CustomPopupStyle.css">` to your .html
- add `<script src="./CustomPopupScript.js"></script>` to your .html
- make a config with following options:

```
const config = {
	type: "",
	title: "Title",
	text: "Text of popup",
	notVanish: true,
	timeout: 1000,
	onClick: () => <callback>,
}
```

`type`: success/info/warning/danger/message // *you will see default popup without it
`title` // Just a title, in type:"message" without it you will see title "Message"
`text` // *required or you will see default message
`notVanish` // *default "false"; if "true", it will not disappear after timeout
`timeout` // *timeout in millisecond, default "5000"
`onClick` // \*you can pass a callback to handle click on popup

- call `CustomPopup.show(<config>)` in your code with made config to show a popup
- enjoy :)

### Description

This is a module that allows you to call pop-ups of six different types:

1. success - green
2. info - blue
3. warning - yellow
4. danger - red
5. standard - gray
6. message - turquoise
