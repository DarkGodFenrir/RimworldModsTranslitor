async function getFolder(fromInput) {
    // console.log(fromInput)
    path = await eel.getPath(fromInput)();

    console.log(path)

    if(path != "Path not found"){
        var input = document.getElementsByClassName('left_input')
        input[0].setAttribute('value', path)
        input[0].setAttribute('title', path)

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
                var aboutButton = document.getElementById('About');
                aboutButton.style.backgroundColor = "rgb(92, 92, 211)";

                var translateButton = document.getElementById('Translate');
                translateButton.style.backgroundColor = "white";


                var right_about_container = document.getElementsByClassName('right_panel_text')[0];
                right_about_container.style.display = 'flex';
                right_about_container.style.flexDirection = 'column';

                var right_translate_container = document.getElementsByClassName('right_translate_container')[0];
                right_translate_container.style.display = 'none';

                const modId = this.querySelector('.modId').textContent;
                getModInfo(modId);
            });
        }
    } else {
        var input = document.getElementsByClassName('left_input')
        input[0].setAttribute('value', "")
        input[0].setAttribute('title', "Enter path to *\\Steam\\steamapps\\workshop\\content\\294100")

        var modsListDiv = document.getElementsByClassName('ModsList')[0];
        modsListDiv.innerHTML = '';

        var modDiv = document.createElement('div');
        modDiv.className = 'noFoundText';
        modDiv.textContent = "Path no found";
        modDiv.style.color = "red";

        modsListDiv.appendChild(modDiv);
    }
}

function showAbout() {
    var aboutButton = document.getElementById('About');
    aboutButton.style.backgroundColor = "rgb(92, 92, 211)";

    var translateButton = document.getElementById('Translate');
    translateButton.style.backgroundColor = "white";

    var right_about_container = document.getElementsByClassName('right_panel_text')[0];
    right_about_container.style.display = 'flex';
    right_about_container.style.flexDirection = 'column';

    var right_translate_container = document.getElementsByClassName('right_translate_container')[0];
    right_translate_container.style.display = 'none';
    rigght_translate_container.style.flexDirection = 'column';
}

function showTranslate() {
    var translateButton = document.getElementById('Translate');
    translateButton.style.backgroundColor = "rgb(92, 92, 211)";

    var aboutButton = document.getElementById('About');
    aboutButton.style.backgroundColor = "white";

    var right_about_container = document.getElementsByClassName('right_panel_text')[0];
    right_about_container.style.display = 'none';

    var right_translate_container = document.getElementsByClassName('right_translate_container')[0];
    right_translate_container.style.display = 'flex';
}

function setListevers() {
    var searchButton = document.getElementById('setPath');
    var inputPath = document.getElementsByClassName('left_input')[0];
    
    searchButton.addEventListener('click', function() {
        console.log(inputPath.value)
        getFolder(inputPath.value);
    });

    var steamButton = document.getElementById('Steam');
    steamButton.style.backgroundColor = "rgb(92, 92, 211)";

    var aboutButton = document.getElementById('About');
    aboutButton.style.backgroundColor = "rgb(92, 92, 211)";

    aboutButton.addEventListener('click', showAbout);

    translateButton = document.getElementById('Translate');
    translateButton.addEventListener('click', showTranslate);
}

window.onload = getFolder("False");
// DOMContentLoaded = setListevers();
// window.DOMContentLoaded = setListevers();
document.onreadystatechange = function() {
    if (document.readyState == "complete") {
        setListevers();
    }
}

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

    var languagesDiv = document.getElementsByClassName('right_translate_list')[0];
    languagesDiv.innerHTML = '';
    
    console.log(modInfo[4])
    //если mod[4] - это массив, то вставляем его
    if(Array.isArray(modInfo[4])){
        for (var j = 0; j < modInfo[4].length; j++) {
            var modLanguageDiv = document.createElement('button');
            modLanguageDiv.className = 'modLanguage';
            modLanguageDiv.textContent = modInfo[4][j];
            languagesDiv.appendChild(modLanguageDiv);
        }
    }
}
