// src/hash.ts
async function deriveKey(password, salt, iterations, keyLength) {
  let enc = new TextEncoder;
  let passwordBuffer = enc.encode(password);
  let saltBuffer = enc.encode(salt);
  let importedKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);
  let derivedKeyBuffer = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: saltBuffer, iterations, hash: "SHA-256" }, importedKey, keyLength);
  return new Uint8Array(derivedKeyBuffer);
}
function getRegString(options) {
  let regexString = "[^";
  if (options.hasUpper)
    regexString += "A-Z";
  if (options.hasLower)
    regexString += "a-z";
  if (options.hasNumber)
    regexString += "0-9";
  regexString += "]";
  return regexString;
}
function getBase64Len(options) {
  let sum = Number(options.hasUpper) + Number(options.hasLower) + Number(options.hasNumber) + Number(options.hasSymbol);
  return options.len - sum;
}
function fixBase64(arr, options) {
  let str0 = btoa(String.fromCharCode(...arr));
  let str1 = str0.replace(new RegExp(getRegString(options), "g"), "");
  if (str1.length === 0) {
    alert("empty");
    throw "empty";
  } else {
    let len = getBase64Len(options);
    let repeatCount = Math.ceil(len / str1.length);
    return str1.repeat(repeatCount).slice(0, len);
  }
}
function insert(str, index, value) {
  let index1 = index % (str.length + 1);
  return str.slice(0, index1) + value + str.slice(index1);
}
function insertChar(str, arr, options) {
  if (options.hasUpper) {
    let A = String.fromCharCode(65 + arr[28] % 26);
    str = insert(str, arr[28], A);
  }
  if (options.hasLower) {
    let a = String.fromCharCode(97 + arr[29] % 26);
    str = insert(str, arr[29], a);
  }
  if (options.hasNumber) {
    let num = String.fromCharCode(48 + arr[30] % 10);
    str = insert(str, arr[30], num);
  }
  if (options.hasSymbol) {
    let sym = arr[31] % 2 ? "_" : "=";
    str = str + sym;
  }
  return str;
}
async function convert(text, options) {
  let arr = await deriveKey(text, "PasswordHash", 1e6, 256);
  let str = fixBase64(arr, options);
  return insertChar(str, arr, options);
}

// src/popup.ts
var pass = document.getElementById("passwordInput");
var button = document.getElementById("enter");
var phidden = document.getElementById("phidden");
var show = document.getElementById("show");
var tips = document.getElementById("tips");
var clear = document.getElementById("clear");
var upper = document.getElementById("upper");
var lower = document.getElementById("lower");
var symbol = document.getElementById("symbol");
var number = document.getElementById("number");
var lenSelect = document.getElementById("len");
function makeLenOption() {
  for (let i = 4;i <= 20; i++) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = i.toString();
    lenSelect.appendChild(option);
  }
  lenSelect.value = "16";
  lenSelect.onchange = () => {
    parseInt(lenSelect.value, 10);
  };
}
function getOptions() {
  let hasUpper = upper.checked;
  let hasLower = lower.checked;
  let hasSymbol = symbol.checked;
  let hasNumber = number.checked;
  let len = parseInt(lenSelect.value, 10);
  return { hasUpper, hasLower, hasSymbol, hasNumber, len };
}
function hiddenChar(str) {
  return Array.from(str).map((c) => "*").join("");
}
function showPHidden(text, password) {
  if (show.checked) {
    phidden.textContent = text + `
` + password;
  } else {
    let last = password[0] + hiddenChar(password.slice(1));
    phidden.textContent = hiddenChar(text) + `
` + last;
  }
}
async function writeClipboard(text) {
  let password = await convert(text, getOptions());
  await window.navigator.clipboard.writeText(password);
  showPHidden(text, password);
  show.onchange = (e) => {
    showPHidden(text, password);
  };
  tips.textContent = "copy success, please paste within 30 seconds";
  if (chrome.runtime) {
    chrome.runtime.sendMessage({ kind: "clear" }, () => {});
  } else {
    clear.hidden = false;
  }
}
button.onclick = () => {
  writeClipboard(pass.value);
};
pass.onkeyup = (e) => {
  if (e.key === "Enter") {
    writeClipboard(pass.value);
  } else {
    tips.textContent = "";
  }
};
clear.onclick = async () => {
  await window.navigator.clipboard.writeText("");
  tips.textContent = "clear success";
};
makeLenOption();
pass.focus();
