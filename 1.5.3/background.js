chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.options) {

      case "use":
        var use = getUse()
        sendResponse({
          use: use
        });
        break;

      case "nbIcons":
        var nb = getNbIcons();
        sendResponse({
          nbIcons: nb
        })
        break;

      case 'wikipediaLocale':
        var rep = getWikipediaLocale()
        sendResponse({
          wikipediaLocale: rep
        });
        break;

      case 'transparency':
        var rep = getTransparency()
        sendResponse({
          transparency: rep
        });
        break;

      case 'size':
        var rep = getWidth()
        var rep2 = getHeight()
        sendResponse({
          size: rep,
          height: rep2
        });
        break;

      case 'times':
        var rep = getFadeTime()
        var rep2 = getRemoveTime()
        sendResponse({
          fadeTime: rep,
          removeTime: rep2
        });
        break;

      case 'openIn':
        var rep = getOpenIn()
        sendResponse({
          openIn: rep
        });
        break;

      case 'goto':
        var dest = request.dest
        chrome.tabs.create({
          active: false,
          url: dest
        }, function (tab) {});
        break;

      case 'gotofront':
        var dest = request.dest
        chrome.tabs.create({
          active: true,
          url: dest
        }, function (tab) {});
        break;
        
      case 'links':
        sendResponse({
          linksText: links()
        });

      case 'setcp':
        clipboardholder = document.getElementById("clipboardholder");
        clipboardholder.style.display = "block";
        clipboardholder.value = request.text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        clipboardholder.style.display = "none";
        break;
        
      case 'toClipBoard':
        clipboardholder = document.getElementById("clipboardholder");
        clipboardholder.style.display = "block";
        clipboardholder.select();
        document.execCommand("Copy");
        clipboardholder.style.display = "none";
        break;

      default:
        sendResponse({}); // snub them.   
        return true;
        
    }

  });