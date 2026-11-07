const colouring = function () {
    const colors = ['#fea3aa', '#f8b88b', '#faf884', '#baed91', '#b2cefe', '#f2a2e8'];
    const textColors = ['#5a1018', '#5c2406', '#473d00', '#144d18', '#0f2b66', '#52144b'];
    let nextColorIndex = 0;
    const versions = [];

    // Octopus v2025.4.1297
    const deployments = document.querySelectorAll('table > tbody > tr > td > div > a > div > div > span');
    console.log(`Octodash found ${deployments.length} items`);

    for (var i = 0; i < deployments.length; i++) {
        const version = deployments[i].innerHTML;
        let color = null;
        let textColor = null;

        for (let j = 0; j < versions.length; j++) {
            if (versions[j].version == version) {
                color = versions[j].color;
                textColor = versions[j].textColor;
                break;
            }
        }

        if (!color) {
            color = colors[nextColorIndex];
            textColor = textColors[nextColorIndex];
            versions.push({
                version: version,
                color: color,
                textColor: textColor
            });

            nextColorIndex++;
            if (nextColorIndex >= colors.length) {
                nextColorIndex = 0;
            }
        }

        const container = deployments[i].parentElement.parentElement.parentElement;
        container.style.backgroundColor = color;
        container.style.color = textColor;

        const descendants = container.querySelectorAll('*');
        for (var k = 0; k < descendants.length; k++) {
            descendants[k].style.color = textColor;
        }
    }
};

chrome?.action?.onClicked && chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: colouring
    });
});
