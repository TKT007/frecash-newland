"use strict"; // Start of use strict

var name_hint = "Gloria Higuera";
var lang_locale = "es";

$(document).ready(function () {
  //Llamado al servido para emitir eventos de facebook
  const url = document.location + "request.php";

  if (typeof pixel !== "undefined") {
    fbq("init", pixel);
  }

  if (typeof pixel !== "undefined") {
    const data = new FormData();
    data.append("action", "pageEvent");
    // evento page View
    axios
      .post(url, data)
      .then((response) => {
        if (response.data.data != undefined) {
          let event_id = response.data.data.event_id;
          fbq("track", "PageView", {}, { eventID: event_id.pageView });
          fbq("track", "ViewContent", {}, { eventID: event_id.viewContent });
        } else {
          fbq("track", "PageView");
          fbq("track", "ViewContent");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status >= 500) {
          fbq("track", "PageView");
        }
      });
  }
});
