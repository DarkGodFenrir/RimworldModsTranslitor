from base64 import b64encode
import eel
import os

global pathToMainFolder
@eel.expose
def getPath(fromInput):
    #проверить есть ли такие пути
    print(fromInput)
    if fromInput != "False":
        paths = [fromInput]
    else:
        paths = ["C:\\Program Files (x86)\\Steam\\steamapps\\workshop\\content\\294100", "C:\\Program Files\\Steam\\steamapps\\workshop\\content\\294100"]

    for path in paths:
        if os.path.exists(path):
            global pathToMainFolder
            pathToMainFolder = path
            return path
    return "Path not found"

@eel.expose
def getModList(path):
    mods = os.listdir(path)
    modsNames = []
    for mod in mods:
        # get name tag from xml
        pathToXml = f"{path}\\{mod}\\About\\About.xml"
        pathToIcon = f"{path}\\{mod}\\About\\ModIcon.png"
        print(pathToXml)
        if os.path.exists(pathToXml):
            if os.path.exists(pathToIcon):
                with open(pathToIcon, 'rb') as image:
                    f = image.read()
                    b = bytearray(f)
                    pathToIcon = 'data:image/png;base64,' + b64encode(b).decode('utf-8')
            else:
                pathToIcon = 'icon.png'
            with open(pathToXml, 'r', encoding='utf-8') as f:
                content = f.read()
                name = content.split("<name>")[1].split("</name>")[0]
                modAray = [f"{path}\\{mod}", mod, name, pathToIcon]
                modsNames.append(modAray)
    
    return modsNames

@eel.expose
def getModInfo(modId):
    pathToFolder = f"{pathToMainFolder}\\{modId}"

    if os.path.exists(f"{pathToFolder}\\About\\About.xml"):
        # get image Preview with base64
        with open(f"{pathToFolder}\\About\\Preview.png", 'rb') as image:
            f = image.read()
            b = bytearray(f)
            image = 'data:image/png;base64,' + b64encode(b).decode('utf-8')

        with open(f"{pathToFolder}\\About\\About.xml", 'r', encoding='utf-8') as f:
            content = f.read()
            name = content.split("<name>")[1].split("</name>")[0]
            description = content.split("<description>")[1].split("</description>")[0]
            supportedVersions = content.split("<supportedVersions>")[1].split("</supportedVersions>")[0]
            supportedVersions = supportedVersions.replace("<li>", "")
            supportedVersions = supportedVersions.replace("</li>\n", " ")

    
    return [name, description, supportedVersions, image]

eel.init('web')
eel.start('index.html', size=(800, 600))