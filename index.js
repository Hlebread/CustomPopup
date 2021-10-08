const popupsConfigs = [
  {
    type: "success",
    title: "This is success message",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt id minima sed, a iure nihil amet placeat ipsum consequatur accusantium.",
    notVanish: true,
    timeout: 1000,
    onClick: () => alert("Success!"),
  },
  {
    type: "info",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit debitis odit illum. Ut, soluta est.",
    timeout: 2000,
    onClick: () => alert("Info!"),
  },
  {
    type: "warning",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, magnam?",
    timeout: 3000,
    onClick: () => alert("Warning!"),
  },
  {
    type: "danger",
    text: "Lorem ipsum dolor sit amet.",
    timeout: 4000,
    onClick: () => alert("Danger!"),
  },
  {
    type: "message",
    text: "Hello my friend!",
    img: "https://s0.rbk.ru/v6_top_pics/media/img/5/46/756038770746465.jpg",
  },
  {},
];

document.querySelector("button").onclick = () =>
  CustomPopup.show(
    popupsConfigs[Math.floor(Math.random() * popupsConfigs.length)]
  );

popupsConfigs.forEach((e) => CustomPopup.show(e));
