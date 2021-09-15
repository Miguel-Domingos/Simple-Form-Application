// nextBottons[1].parentElement.classList[1]
articles = document.querySelectorAll("article");
backIcones = document.querySelectorAll("article span.back");
nextBottons = document.querySelectorAll("article button.proximo");
respostas = document.querySelector(".respostas");
progressiveBar = document.querySelector(".bar");
footerBottons = document.querySelectorAll(".footer .right button");
alertHeader = document.querySelector("header");
display = document.querySelector('section')
const defaulPositions = [];
const change = 150;
const res = [0, 0, 0, 0, 0, 0, 0, 0];
resposnse = 0;

bottomController = (pos) => {
	return articles[pos].getBoundingClientRect().bottom;
};

topController = (pos) => {
	return articles[pos].getBoundingClientRect().top;
};

passQuestion = () => {

	if (articleEnable() == 0) {
		footerBottons[0].classList.add("disable");
	} else if (articleEnable() > 0 && articleEnable() < 10) {
		footerBottons[0].classList.remove("disable");
		footerBottons[2].classList.remove("disable");
		for (let x = 0; x < articleEnable(); x++) {
			if (
				articleEnable() -
				eval(
					res
						.join("")
						.substring(0, articleEnable() - 1)
						.split("")
						.join("+")
				) -
				1 >
				0
			) {
				alertHeader.classList.add("alert");
				alertHeader.children[0].children[0].innerHTML = `${articleEnable() -
					eval(
						res
							.join("")
							.substring(0, articleEnable() - 1)
							.split("")
							.join("+")
					) -
					1
					} ${articleEnable() -
						eval(
							res
								.join("")
								.substring(0, articleEnable() - 1)
								.split("")
								.join("+")
						) -
						1 ==
						1
						? "item"
						: "itens"
					}`;
			} else alertHeader.classList.remove("alert");
		}
	} else {
		footerBottons[2].classList.add("disable");
	}
};

window.onscroll = () => {
	function setMarginBottom() {
		margin = window.screen.width <= 768 ? 200 : 260
		newMarginBottom = window.screen.height >= margin ? window.screen.height - margin : 0;
		return newMarginBottom
	}
	display.style.setProperty('margin-bottom', `${setMarginBottom()}px`)
	for (let x = 0; x < articles.length; x++) {
		if (topController(x) <= change && bottomController(x) > change) {
			articles[x].classList.remove("disable");
			backIcones[x].classList.remove("disable");
			if (articles[x].lastElementChild.type == "submit") {
				articles[x].lastElementChild.classList.remove("disable");
			}
		} else {
			articles[x].classList.add("disable");
			backIcones[x].classList.add("disable");
			if (articles[x].lastElementChild.type == "submit" && x < articles.length - 1) {
				articles[x].lastElementChild.classList.add("disable");
			}
		}
	}
	passQuestion();
	respostas.innerHTML =
		eval(res.join("").substring(0, articleEnable()).split("").join("+")) >= 0
			? eval(res.join("").substring(0, articleEnable()).split("").join("+"))
			: 0;
	progressiveBar.style.width = `${(100 / res.length) *
		eval(res.join("").substring(0, articleEnable()).split("").join("+"))
		}%`;
};

articleEnable = () => {
	// Retorna a posição do article enable [0,10]
	for (let x = 0; x < articles.length; x++) {
		if (
			articles[x].classList[0] != "disable" &&
			articles[x].classList[1] != "disable"
		) {
			return x;
		}
	}
};

window.onload = () => {
	alert("Importante: \n Este Form está em construção \n Algumas das funcionalidades encontram-se indisponíveis")
	display = document.querySelector('section')
	// Retorna um array com as posições iniciais dos articles
	window.scrollTo({ top: 0, behavior: "smooth" });
	for (let x = 0; x < articles.length; x++) {
		defaulPositions[x] = articles[x].getBoundingClientRect().top;
	}
	return defaulPositions;

};

window.onclick = (where) => {
	// Função de controlo de click

	if (where.target.type == "button" || where.target.type == "textarea") {
		yourChoice(where, where.target.type, where.target);
	}
	if (
		// scroll para cima quando botão back ou up é clicado
		where.target.parentElement.classList[0] == "back" ||
		where.target.classList[0] == "up"
	) {
		window.scrollTo({
			top: defaulPositions[articleEnable() - 1],
			behavior: "smooth",
		});
	}
	if (
		// scroll para baixo quando botão down ou próximo é clicado
		where.target.classList[0] == "proximo" ||
		where.target.classList[0] == "down"
	) {
		window.scrollTo({
			top: defaulPositions[articleEnable() + 1],
			behavior: "smooth",
		});
	}
};

const yourChoice = (where, type, cod) => {
	/*
	Função de controlo de escolha
	Em cada article contém uma div que armazena as suas respostas e cada resposta tem um código único
	Ex: Q1r2. onde:
		Q -> question
		1 -> o número da question
		r -> response
		3 -> número da response selecionada
	*/
	if (type == "button") {
		counterOptions = cod.parentElement;
		// pegando o codigo da resposta selecionada
		cod = cod.value;

		for (let x = 0; x < counterOptions.childElementCount; x++) {
			// counterOptions.childElementCount retorna o numero de opcões que a div tem
			if (counterOptions.children[x].value == cod) {
				// verificando qual opção foi escolhida
				counterOptions.children[x].classList.toggle("selected");
				if (counterOptions.children[x].classList[0] == "selected") {
					res[cod[1] - 1] = 1;
					window.scrollTo({
						top: defaulPositions[articleEnable() + 1],
						behavior: "smooth",
					});
				} else {
					res[cod[1] - 1] = 0;
				}
			} else {
				counterOptions.children[x].classList.remove("selected");
			}
		}
	}
	if (type == "textarea") {
		window.onkeyup = () => {
			if (cod.value.length > 0) {
				res[cod.name[1] - 1] = 1;
			} else {
				res[cod.name[1] - 1] = 0;
			}
			respostas.innerHTML = eval(res.join("+"));
			progressiveBar.style.width = `${(100 / res.length) * eval(res.join("+"))
				}%`;
		};
	}
	respostas.innerHTML =
		eval(res.join("").substring(0, articleEnable()).split("").join("+")) >= 0
			? eval(res.join("").substring(0, articleEnable()).split("").join("+"))
			: 0;
	progressiveBar.style.width = `${(100 / res.length) *
		eval(res.join("").substring(0, articleEnable()).split("").join("+"))
		}%`;

	passQuestion();
};
