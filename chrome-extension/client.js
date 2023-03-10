function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  )
    setTimeout(fn, 1);
  else document.addEventListener("DOMContentLoaded", fn);
}
let callback = () => {
  let body = { titles: "" };
  let titles = [];
  let videos = document.getElementsByClassName("title-and-badge");
  let videoDivMix = document.querySelectorAll("[id='dismissable']");
  let videoComp = [...videoDivMix];
  let videoDiv = videoComp.filter(v => {
    return v.className === "style-scope ytd-video-renderer";
  });
  console.log(videoDiv);
  if (videos.length != 0) {
    [...videos].forEach(video => {
      let videoA = video.getElementsByTagName("a");
      videoA[0].removeAttribute("style");
      let title = videoA[0].getAttribute("title");
      titles.push(title);
    });

    videoDiv.forEach(v => {
      v.removeAttribute("style");
    });

    body.titles = titles;
    let Http = new XMLHttpRequest();
    let url = "https://ytclickbait.azurewebsites.net/";
    Http.open("POST", url);
    console.log(JSON.stringify(body));
    Http.setRequestHeader("Content-type", "application/json");
    Http.send(JSON.stringify(body));

    Http.onreadystatechange = e => {
      console.log(Http.responseText);
      body.titles = "";
      titles = [];
      let responseText = Http.responseText;
      let responses = responseText.split(" ");
      let confidence = [];
      responses.forEach(r => {
        confidence.push(parseInt(r, 10));
      });

      for (i = 0; i < videos.length; i++) {
        let videoAEle = videos[i].getElementsByTagName("a");
        if (confidence[i + 1] >= 75) {
          videoDiv[i].setAttribute(
            "style",
            "border: 2px solid red; border-radius: 10px;padding:10px"
          );
          videoAEle[0].setAttribute("style", "color: #ff797f");
        } else if (confidence[i + 1] >= 50 && confidence[i + 1] < 75) {
          videoDiv[i].setAttribute(
            "style",
            "border: 2px solid #39abfd; border-radius: 10px;padding:10px"
          );

          videoAEle[0].setAttribute("style", "color: #39abfd");
        }
      }
    };
  }
};

//event handlers
let searchDiv = document.getElementById("search-input");
let searchInputs = searchDiv.getElementsByTagName("input");
let searchInput = searchInputs[0];
console.log(searchInput);
searchInput.onkeyup = event => {
  console.log("logg");
  if (event.key === "Enter") setTimeout(() => docReady(callback), 2000);
  let suggestionList = document.getElementsByClassName("sbsb_c");
  suggestionList.onclick = event => {
    console.log(event);
    setTimeout(() => docReady(callback), 2000);
  };
};

let searchButton = document.getElementById("search-icon-legacy");
searchButton.onclick = event => {
  event.preventDefault();
  setTimeout(() => docReady(callback), 1000);
};

setTimeout(() => docReady(callback), 1000);
