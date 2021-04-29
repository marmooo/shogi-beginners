function loadConfig() {
  if (localStorage.getItem('darkMode') == 1) {
    document.documentElement.dataset.theme = 'dark';
  }
  if (localStorage.getItem('voice') != 1) {
    document.getElementById('voiceOn').classList.add('d-none');
    document.getElementById('voiceOff').classList.remove('d-none');
  }
}
loadConfig();

function toggleVoice(obj) {
  if (localStorage.getItem('voice') == 1) {
    localStorage.setItem('voice', 0);
    document.getElementById('voiceOn').classList.add('d-none');
    document.getElementById('voiceOff').classList.remove('d-none');
  } else {
    localStorage.setItem('voice', 1);
    document.getElementById('voiceOn').classList.remove('d-none');
    document.getElementById('voiceOff').classList.add('d-none');
    speechSynthesis.cancel();
    let msg = new SpeechSynthesisUtterance('音声読み上げを開始します。');
    msg.lang = 'ja-JP';
    msg.voice = japaneseVoices[Math.floor(Math.random() * japaneseVoices.length)];
    speechSynthesis.speak(msg);
  }
}

function toggleDarkMode() {
  if (localStorage.getItem('darkMode') == 1) {
    localStorage.setItem('darkMode', 0);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem('darkMode', 1);
    document.documentElement.dataset.theme = 'dark';
  }
}

let japaneseVoices = [];
function loadVoices() {
  // https://stackoverflow.com/questions/21513706/
  const allVoicesObtained = new Promise(function(resolve, reject) {
    let voices = speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(voices);
    } else {
      speechSynthesis.addEventListener("voiceschanged", function() {
        voices = speechSynthesis.getVoices();
        resolve(voices);
      });
    }
  });
  allVoicesObtained.then(voices => {
    japaneseVoices = voices.filter(voice => voice.lang == 'ja-JP' );
  });
}
loadVoices();

function getText(obj) {
  let text = '';
  [...obj.childNodes].forEach(node => {
    if (node.nodeType == node.TEXT_NODE) {
      text += node.wholeText;
    } else if (node.tagName == 'RUBY') {
      [...node.getElementsByTagName('rt')].forEach(rt => {
        text += rt.innerText;
      });
    }
  });
  return text;
}

