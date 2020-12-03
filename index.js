const background = document.getElementById("background");
const foreground = document.getElementById("foreground");
const border = document.getElementById("border");
const shadow = document.getElementById("shadow");
const root = document.querySelector(":root");
const editBoard = document.getElementById("editBoard");

//create instances of vanilla picker and apply it to the respective parent elements
let picker1 = new Picker({
  parent: background,
  popup: "left",
  color: getComputedStyle(document.documentElement).getPropertyValue(
    "--background-color"
  ),
  onChange({ rgbaString }) {
    root.style.setProperty("--background-color", rgbaString);
  },
});
let picker2 = new Picker({
  parent: foreground,
  popup: "left",
  color: getComputedStyle(document.documentElement).getPropertyValue(
    "--foreground-color"
  ),

  onChange({ rgbaString }) {
    root.style.setProperty("--foreground-color", rgbaString);
  },
});
let picker3 = new Picker({
  parent: border,
  popup: "left",
  color: getComputedStyle(document.documentElement).getPropertyValue(
    "--border-color"
  ),

  onChange({ rgbaString }) {
    root.style.setProperty("--border-color", rgbaString);
  },
});
let picker4 = new Picker({
  parent: shadow,
  popup: "left",
  color: getComputedStyle(document.documentElement).getPropertyValue(
    "--shadow-color"
  ),

  onChange({ rgbaString }) {
    root.style.setProperty("--shadow-color", rgbaString);
  },
});

//function to generate random Hexadecimal colors
//toString(base) - accepts base as a parameter - which is an integer which represents base numerical values from 1-36
const generateRandomHexColor = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(1, 7);
};
console.log(generateRandomHexColor());

//function to set the root styles with the random Hex colors
const randomize = () => {
  root.style.setProperty("--background-color", generateRandomHexColor());
  root.style.setProperty("--foreground-color", generateRandomHexColor());
  root.style.setProperty("--border-color", generateRandomHexColor());
};
randomize();

//download the image part by capturing using html2canvas
//view https://html2canvas.hertzen.com/documentation for more info
const download = () => {
  html2canvas(editBoard, {
    scale: 2.0,
  }).then((canvas) => {
    console.log(canvas);
    saveAs(canvas.toDataURL(), "pretty-cover.png");
  });
};

// saving the image
const saveAs = (uri, filename) => {
  const imageLink = document.createElement("a");
  if (typeof imageLink.download === "string") {
    imageLink.href = uri;
    imageLink.download = filename;
    document.body.appendChild(imageLink);
    imageLink.click();
    document.body.removeChild(imageLink);
  } else {
    window.open(uri);
  }
};


//creating various functions for updating their values with the inputs from the user
//using es6 destructuring to grab the 'value' property using 'this' as function parameter
const borderWidth = ({value}) => root.style.setProperty("--borderWidth-size", `${value}px`);
const fontSize = ({value}) => root.style.setProperty("--font-size", `${value}px`);
const shadowX = ({value}) => root.style.setProperty("--shadowX-size", `${value}px`);
const shadowY = ({value}) => root.style.setProperty("--shadowY-size", `${value}px`);
const shadowBlur = ({value}) => root.style.setProperty("--shadowBlur-size", `${value}px`);
const heightRatio = ({value}) => root.style.setProperty("--height-editboard", `${value}vh`);

//text alignment
const textAlign = ({ classList }, a, b) => {
    document.querySelector('.current').classList.toggle('current')
    editBoard.style.textAlign = a;
    editBoard.style.justifyContent = b;
    classList.add("current")
}

