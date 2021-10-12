const CustomPopup = (function () {
	function Controller() {
		let myModel = null;
		let myView = null;
		let ui = null;
		let timer = null;
		let myConfig = null;

		this.init = (model, view, config) => {
			myModel = model;
			myView = view;
			myConfig = myModel.init(config);
			ui = myView.init(myConfig);

			if (!myConfig.notVanish) {
				this.setVanish(myConfig.timeout);
				ui.popup.addEventListener("mouseover", () => {
					clearTimeout(timer);
				});
				ui.popup.addEventListener("mouseout", () => {
					this.setVanish(myConfig.timeout);
				});
			}

			ui.popup.addEventListener("click", () => {
				myConfig.onClick?.();
				this.vanish();
			});

			ui.popup.addEventListener(ui.uniqueName, () => myView.setPosition());

			ui.close?.addEventListener("click", () => this.vanish());
		};

		this.vanish = () => {
			myView.fadeOut();
			setTimeout(() => myView.destroy(), 400);
		};

		this.setVanish = (timeout) =>
			(timer = setTimeout(() => {
				myView.fadeOut();
				setTimeout(() => myView.destroy(), 400);
			}, timeout));
	}

	function Model() {
		this.init = (config) => ({
			type: config.type ? config.type.toLowerCase() : "default",
			title: config.title || (config.type === "message" ? "Message" : ""),
			text: config.text || "Your have a new popup!",
			timeout: config.timeout || 5000,
			notVanish: config?.notVanish || false,
			img: config.img || "",
			onClick: config.onClick,
		});
	}

	function View() {
		let ui = null;

		this.init = (config) => {
			ui = { uniqueName: "ej28jg94bIEf794bed6zxr" };
			ui.popup = document.createElement("div");
			ui.popup.innerHTML = this.getPopupHTML(
				config.type,
				config.title,
				config.text,
				config.notVanish,
				config.img
			);
			ui.popup.className = `${config.type} ${ui.uniqueName}`;
			ui.close = ui.popup.querySelector(".close");
			document.body.append(ui.popup);
			this.setPosition();
			return ui;
		};

		this.checkOtherPopups = () =>
			document.querySelectorAll(`.${ui.uniqueName}`);

		this.setPosition = () => {
			const popups = this.checkOtherPopups();
			if (popups.length)
				[...popups].forEach(
					(element, i) => (element.style.top = i * 80 + 20 + "px")
				);
		};

		this.fadeOut = () => {
			ui.popup.classList.add("beforeClose");
			ui.popup.style.animation = "fadeOut .5s linear";
		};

		this.destroy = () => {
			ui.popup.remove();
			ui.popup.dispatchEvent(new Event(ui.uniqueName));
		};

		this.getPopupHTML = (type, title, text, notVanish, img) => {
			return `
			 ${this.getIcon(type, img)}
			 <div class="text ${title ? "withTitle" : ""}">
				 <div class="title">${title}</div>
				 <div>${text}</div>
			 </div>
			 ${notVanish ? "<div class='close'></div>" : ""}
		 `;
		};

		this.getIcon = (type, img) => {
			let icon = { b: "" };
			switch (type) {
				case "message":
					icon.i = `<img src="${img}" />`;
					break;
				case "success":
					icon.i = "&#10004;";
					break;
				case "warning":
				case "danger":
					icon.b = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 29" x="0px" y="0px"><path d="M19.3175 1.61864C18.0472 -0.536587 14.8694 -0.536585 13.5992 1.61864L0.904968 23.1565C-0.364594 25.3106 1.22359 28.0022 3.76413 28.0022H29.1526C31.6931 28.0022 33.2813 25.3106 32.0117 23.1565L19.3175 1.61864Z"/><text x="0" y="44" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by HideMaru</text><text x="0" y="49" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`;
					icon.i = "!";
					break;
				case "info":
				default:
					icon.i = "i";
					break;
			}
			return `
			 <div class="icon-container">
				 <div class="icon-background">${icon.b}</div>
				 <div class="icon">${icon.i}</div>
			 </div>
		  `;
		};
	}

	return {
		show: function (config) {
			const moduleView = new View();
			const moduleModel = new Model();
			const moduleController = new Controller();
			moduleController.init(moduleModel, moduleView, config);
		},
	};
})();
