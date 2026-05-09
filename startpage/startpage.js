const bookmarks = {
  "work": {
    "gmail": { shortcut: "gm", link: "https://gmail.com/" },
    "teams": { shortcut: "tm", link: "https://teams.microsoft.com/" },
    "ebiza": { shortcut: "eb", link: "" },
    "fiori": { shortcut: "fi", link: "" }
  },
  "tools": {
    "github": { shortcut: "gh", link: "https://github.com/" },
    "cobalt": { shortcut: "cb", link: "https://cobalt.tools/" },
    "habits": { shortcut: "hb", link: "https://habitualized.com/" },
    "lopaka": { shortcut: "lp", link: "https://lopaka.app/" }
  },
  "media": {
    "youtube": { shortcut: "yt", link: "https://youtube.com/" },
    "spotify": { shortcut: "sp", link: "https://open.spotify.com/" },
    "discord": { shortcut: "dc", link: "https://discord.com/app" }
  },
  "other": {
    "timer":      { shortcut: "ti", link: "https://pomofocus.io/" },
    "excalidraw": { shortcut: "ed", link: "https://excalidraw.com/" }
  }
};


const clock_time = document.getElementById("time");
const clock_date = document.getElementById("date");
const search     = document.getElementById("search");


const setup_bookmarks = (_boxes) => {
  for (const [k, v] of Object.entries(_boxes)) {
    elm = document.createElement("div");
    elm.className = "box"

    header = document.createElement("div");
    header.className = "box-header"
    header.innerText = k;
    elm.appendChild(header);
    
    for (const [name, info] of Object.entries(v)) {
      item = document.createElement("div");
      item.className = "bookmark";

      link = document.createElement("a");
      link.className = "link"
      link.innerText = name;
      link.href = info["link"];

      shortcut = document.createElement("span")
      shortcut.className = "shortcut"
      shortcut.innerText = info["shortcut"]

      link.appendChild(shortcut);
      item.appendChild(link);
      elm.appendChild(item)
    }

    document.getElementById("boxes").appendChild(elm);
  }
}

const update_time = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, "0");

  let day = String(now.getDay()).padStart(2, "0");
  let month = String(now.getMonth()).padStart(2, "0");
  let year = now.getFullYear();

  clock_time.innerText = `${hours}:${minutes}`;
  clock_date.innerText = `${day}.${month}.${year}`
  
  setTimeout(update_time, 500);
}

window.onload = () => {
  setup_bookmarks(bookmarks);
  update_time();

  // search.focus();
  // search.onblur = search.focus;
  // search.addEventListener('input', () => {
  //   Array.from(document.getElementsByClassName("bookmark")).forEach(parent => {
  //     let shortcut = parent.getElementsByClassName("shortcut")[0].innerText.toLowerCase();
  //     let str = search.value.toLowerCase()

  //     if (str && shortcut.startsWith(str)) {
  //       console.log(shortcut, str)

  //       parent.classList.add("highlighted")
  //     }
  //   });
  // })
}
