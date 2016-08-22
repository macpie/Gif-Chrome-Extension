(function() {
    var KEY = 'GIFS';

    function getData() {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    }

    function clickHandler(info) {
        var name = prompt("Name? "),
            data = getData(),
            gif = {
                id: uuid.v4(),
                name: name,
                url: info.srcUrl,
                still_url: info.srcUrl
            };

        data.push(gif);

        localStorage.setItem(KEY, JSON.stringify(data));
    }

    chrome.contextMenus.create({
        title: "Save Gif",
        contexts: ["image"],
        onclick: clickHandler
    });
})();