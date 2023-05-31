class ContextMenu {
    constructor({ target = null, menuItems = [], mode = "dark" }) {
        this.target = target;
        this.menuItems = menuItems;
        this.mode = mode;
        this.targetNode = this.getTargetNode();
        this.menuItemsNode = this.getMenuItemsNode();
        this.rightClickNode = null;
        this.dataId = null;
        this.isOpened = false;
        this.listener = [];
        this.contextMenu = null;
    }

    getTargetNode() {
        const nodes = document.querySelectorAll(this.target);

        if (nodes && nodes.length !== 0) {
            return nodes;
        } else {
            console.error(`getTargetNode :: "${this.target}" target not found`);
            return [];
        }
    }

    getMenuItemsNode() {
        const nodes = [];

        if (!this.menuItems) {
            console.error("getMenuItemsNode :: Please enter menu items");
            return [];
        }

        this.menuItems.forEach((data, index) => {
            const item = this.createItemMarkup(data);

            nodes.push(item);
        });

        return nodes;
    }

    createItemMarkup(data) {
        const item = document.createElement("LI");
        item.classList.add("contextMenu-item");
        if (data.divider) item.setAttribute("data-divider", data.divider);
        return item;
    }

    updatedItem() {
        this.menuItemsNode.forEach((node, i) => {
            const button = document.createElement("BUTTON");
            const _content = this.menuItems[i].content;
            const _events = this.menuItems[i].events;
            if (typeof _content === "function") {
                button.innerHTML = _content();
            } else {
                button.innerHTML = _content;
            }
            button.setAttribute("style", `animation-delay: ${i * 0.08}s`);
            button.classList.add("contextMenu-button");
            node.innerHTML = "";
            if (_events && _events.length !== 0) {
                Object.entries(_events).forEach((event) => {
                    const [key, value] = event;
                    button.addEventListener(key, value);
                });
            }
            node.appendChild(button);
        });
    }

    renderMenu() {
        const menuContainer = document.createElement("UL");

        menuContainer.classList.add("contextMenu");
        menuContainer.setAttribute("data-theme", this.mode);

        this.menuItemsNode.forEach((item) => menuContainer.appendChild(item));
        this.updatedItem();
        return menuContainer;
    }

    closeMenu(menu) {
        if (this.isOpened) {
            this.isOpened = false;
            menu.remove();
        }
    }

    showMenu(e, contextMenu) {
        this.rightClickNode = e.target;
        this.dataId = e.target.dataset.id;
        this.isOpened = true;
        const { clientX, clientY } = e;
        document.body.appendChild(contextMenu);
        const positionY =
            clientY + contextMenu.scrollHeight >= window.innerHeight ?
            window.innerHeight - contextMenu.scrollHeight - 20 :
            clientY;
        const positionX =
            clientX + contextMenu.scrollWidth >= window.innerWidth ?
            window.innerWidth - contextMenu.scrollWidth - 20 :
            clientX;

        contextMenu.setAttribute(
            "style",
            `--width: ${contextMenu.scrollWidth}px;
      --height: ${contextMenu.scrollHeight}px;
      --top: ${positionY}px;
      --left: ${positionX}px;`
        );
        this.updatedItem();
    }

    init() {
        this.contextMenu = this.renderMenu();
        this.targetNode = this.getTargetNode();
        document.addEventListener("click", () => this.closeMenu(this.contextMenu));
        document.addEventListener("contextmenu", () =>
            this.closeMenu(this.contextMenu)
        );
        window.addEventListener("blur", () => this.closeMenu(this.contextMenu));

        this.targetNode.forEach((target) => {
            target.removeEventListener("contextmenu", (e) => {
                this.showMenu(e, this.contextMenu);
            });
        });

        this.targetNode.forEach((target) => {
            target.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                setTimeout(() => {
                    this.showMenu(e, this.contextMenu);
                }, 50);
            });
        });
    }
}
exports = module.exports = ContextMenu;