# crmenu
A beautiful right-click menu，

Improved and encapsulated by the example of the original author knyttneve
https://codepen.io/knyttneve/pen/YzxEBew

## Install

```bash
npm install crmenu
```

## Demo

```js
import ContextMenu from 'nice-right-menu'
import '../node_modules/nice-right-menu/style.css'

const copyIcon = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`

const menuItems = [
  {
    content: `${copyIcon}复制`,
    events: {
      click: (e) => {
        console.log(rightMenu)
        console.log(`此处被点击了`)
      },
    },
  },
]

const rightMenu = new ContextMenu({
  target: '.rigth-menu-box',
  mode: 'light', // dark
  menuItems,
})

rightMenu.init()

```
