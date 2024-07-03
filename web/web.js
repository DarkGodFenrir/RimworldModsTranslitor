async function getFolder(fromInput) {
    console.log(fromInput)
    path = await eel.getPath(fromInput)();
    if(path == "Path no found"){
        path = ""
    }
    var input = document.getElementsByClassName('left_input')
    input[0].setAttribute('value', path)
    input[0].setAttribute('title', path)

    if(path != "Path no found"){
        modList = await eel.getModList(path)();

        var modsListDiv = document.getElementsByClassName('ModsList')[0];

        modsListDiv.innerHTML = '';

        for (var i = 0; i < modList.length; i++) {
            var mod = modList[i];

            var modDiv = document.createElement('div');
            modDiv.className = 'mod';

            var modIcon = document.createElement('img');
            modIcon.className = 'modIcon';
            modIcon.src = mod[3];

            var modInfoDiv = document.createElement('div');
            modInfoDiv.className = 'modInfo';

            var modNameDiv = document.createElement('div');
            modNameDiv.className = 'modName';
            modNameDiv.textContent = mod[2];

            var modIdDiv = document.createElement('div');
            modIdDiv.className = 'modId';
            modIdDiv.textContent = mod[1];

            modInfoDiv.appendChild(modNameDiv);
            modInfoDiv.appendChild(modIdDiv);
            modDiv.appendChild(modIcon);
            modDiv.appendChild(modInfoDiv);
            modsListDiv.appendChild(modDiv);

            modDiv.addEventListener('click', function() {
                const modId = this.querySelector('.modId').textContent;
                getModInfo(modId);
            });
        }
    } else {
        var modsListDiv = document.getElementsByClassName('ModsList')[0];
        modsListDiv.innerHTML = '';

        var modDiv = document.createElement('div');
        modDiv.className = 'noFoundText';
        modDiv.textContent = "Path no found";

        modsListDiv.appendChild(modDiv);
    }
}

function setListevers() {
    var searchButton = document.getElementById('setPath');
    var inputPath = document.getElementsByClassName('left_input');
    
    searchButton.addEventListener('click', function() {
        getFolder(inputPath.value);
    });
}

window.onload = getFolder("False");
DOMContentLoaded = setListevers();
// window.DOMContentLoaded = setListevers();

function bbcodeToHtml(text) {
    return text
        .replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1">')
        .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>')
        .replace(/\[b\](.*?)\[\/b\]/g, '<b>$1</b>')
        .replace(/\[i\](.*?)\[\/i\]/g, '<i>$1</i>')
        .replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>')
        .replace(/\[s\](.*?)\[\/s\]/g, '<s>$1</s>')
        .replace(/\[h1\](.*?)\[\/h1\]/g, '<h1>$1</h1>')
        .replace(/\[h2\](.*?)\[\/h2\]/g, '<h2>$1</h2>')
        .replace(/\[h3\](.*?)\[\/h3\]/g, '<h3>$1</h3>')
        .replace(/\[h4\](.*?)\[\/h4\]/g, '<h4>$1</h4>')
        .replace(/\[h5\](.*?)\[\/h5\]/g, '<h5>$1</h5>')
        .replace(/\[h6\](.*?)\[\/h6\]/g, '<h6>$1</h6>')
        .replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<span style="color:$1">$2</span>')
        .replace(/\[size=(.*?)\](.*?)\[\/size\]/g, '<span style="font-size:$1">$2</span>')
        .replace(/\[tr\](.*?)\[\/tr\]/g, '<tr>$1</tr>')
        .replace(/\[td\](.*?)\[\/td\]/g, '<td>$1</td>')
        .replace(/\[table\](.*?)\[\/table\]/g, '<table>$1</table>')
        .replace(/\[list=(.*?)\](.*?)\[\/list\]/g, '<$1>$2</$1>')
        .replace(/\[li\](.*?)\[\/li\]/g, '<li>$1</li>')
        .replace(/\[b\](.*?)\[\/b\]/g, '<b>$1</b>')
        .replace(/\[*\](.*?)\[\/\]/g, '<i>$1</i>')

}


async function getModInfo(modId) {
    console.log(modId)
    modInfo = await eel.getModInfo(modId)();

    var right_panel_content = document.getElementsByClassName('right_panel_content')[0];
    //изменить css display на flex
    right_panel_content.style.display = 'flex';

    var modName = document.getElementsByClassName('right_text_name')[0];
    modName.textContent = modInfo[0];

    var modDescriptionContainer = document.getElementsByClassName('right_description')[0];
    modDescriptionContainer.innerHTML = '';
    var modDescription = document.createElement('div');
    modDescription.className = 'modDescription';
    modDescription.innerHTML = bbcodeToHtml(modInfo[1]);
    modDescriptionContainer.appendChild(modDescription);

    var modVersion = document.getElementsByClassName('right_text_version')[0];
    modVersion.textContent = modInfo[2];

    var modIdElement = document.getElementsByClassName('right_text_id')[0];
    modIdElement.textContent = modId;

    var modImage = document.getElementsByClassName('right_text_img')[0];
    modImage.src = modInfo[3];
}
