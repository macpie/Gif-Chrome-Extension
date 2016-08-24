(function() {
    var KEY = 'GIFS';

    function getData() {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    }

    // TO REMOVE @ SOME POINT
    if (!localStorage.getItem('gifs_v2')) {
        console.log('running migration');

        chrome.storage.local.get('gifs_v2', function(data) {
            var transformed = data.gifs_v2.map(function(obj) {
                return {
                    id: uuid.v4(),
                    name: obj.name,
                    url: obj.imgur_url || obj.url,
                    still_url: obj.imgur_square
                };
            });
            localStorage.setItem(KEY, JSON.stringify(transformed));

            localStorage.setItem('gifs_v2', new Date());
            console.log('migration done');
        });
    }

    // Priority Migration
    (function() {
        var data = getData(),
            transformed = data.map(function(o) {
                if (o.priority >= 0) {
                    return o;
                } else {
                    o.priority = 0;
                    return o;
                }
            });

        localStorage.setItem(KEY, JSON.stringify(transformed));
    })();

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