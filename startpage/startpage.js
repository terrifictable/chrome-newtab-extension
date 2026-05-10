
const shortcut_map = Object.values(bookmarks)
  .flatMap(category => Object.entries(category))
  .reduce((acc, [name, item]) => {
    acc[item.shortcut] = name;
    return acc;
  }, {});


const clock_time = document.getElementById("time");
const clock_date = document.getElementById("date");


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
      link.id = name;
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

  let day = String(now.getDate()).padStart(2, "0");
  let month = String(now.getMonth()).padStart(2, "0");
  let year = now.getFullYear();

  clock_time.innerText = `${hours}:${minutes}`;
  clock_date.innerText = `${day}.${month}.${year}`
  
  setTimeout(update_time, 500);
}

window.onload = () => {
  setup_bookmarks(bookmarks);
  update_time();

  let search = "";
  document.addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
      case 'escape':
        search = "";
        break;

      case 'backspace':
        search = search.substring(0, search.length-1);
        break;
    }

    Object.entries(shortcut_map).forEach(([shortcut, name]) => {
      let elm = document.getElementById(name);
      if (search.length > 0 && shortcut.startsWith(search)) {
        elm.classList.add("highlight");
 
        let new_shortcut = document.createElement("span");
        new_shortcut.classList.add("shortcut");
        new_shortcut.innerText = shortcut.substring(search.length);
        
        let highlighted = document.createElement("span");
        highlighted.classList.add("highlight");
        highlighted.innerText = search;
        
        new_shortcut.prepend(highlighted)


        elm.removeChild(elm.children[0]);
        elm.appendChild(new_shortcut);
      } else {
        elm.classList.toggle("highlight", false);
        elm.removeChild(elm.children[0]);

        orig_shortcut = document.createElement("span");
        orig_shortcut.className = "shortcut";
        orig_shortcut.innerText = shortcut;
        elm.appendChild(orig_shortcut);
      }
    })
  });

  document.addEventListener('keypress', (event) => {
    search += event.key;

    let candidates = Object.entries(shortcut_map)
                           .filter(([shortcut]) => shortcut.startsWith(search))

    if (candidates.length == 1) {
      let candidate = candidates[0];

      let x = Object.values(bookmarks)
                    .flatMap(category => Object.entries(category))
                    .find(([name]) => name == candidate[1]);
      window.location.href = x[1].link;
    }
  })
}
