const colouring = function () {
    var colors = ['#fea3aa', '#f8b88b', '#faf884', '#baed91', '#b2cefe', '#f2a2e8'];
    var nextColorIndex = 0;
    var versions = [];

    // Octopus v2025.4.1297
    var elems = document.querySelectorAll('table > tbody > tr > td > div > a > div > div > span');
    console.log(`Octodash found ${elems.length} items`);

    for (var i = 0; i < elems.length; i++) {
        var version = elems[i].innerHTML;
        var color = null;
        for (var j = 0; j < versions.length; j++) {
            if (versions[j].version == version) {
                color = versions[j].color;
                break;
            }
        }
        
        if (!color) {
            color =  colors[nextColorIndex];
            versions.push({
                version: version,
                color: color
            });
            
            nextColorIndex++;
            if (nextColorIndex >= colors.length) {
                nextColorIndex = 0;
            }
        }

        elems[i].parentElement.parentElement.parentElement.style.backgroundColor = color;
    }
};

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: colouring
    });
  });
