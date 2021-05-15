

/*
Copyright (C) 2021 fHYeemRLTX

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/


if (!window.localStorage.appSettings) {
	// default settings
	window.localStorage.appSettings = JSON.stringify({
		"excludeList": [
			"youtube.com",
			"tiktok.com",
			"vimeo.com",
			"vevo.com",
			"ted.com",
			"odysee.com",
			"netflix.com",
			"primevideo.com",
			"disneyplus.com",
			"twitch.tv",
			"spotify.com",
			"soundcloud.com",
			"deezer.com",
			"tidal.com",
			"music.apple.com"
		].sort(),
		"appVersion": chrome.app.getDetails().version
	});
}


var EXCLUDELIST = JSON.parse(window.localStorage.appSettings).excludeList;
var TABLIST = {};


function onLocalStorageChange(e)
{
	EXCLUDELIST = JSON.parse(window.localStorage.appSettings).excludeList;
}


function onTabUpdate(tabId, updateInfo, tabObject)
{
	if (updateInfo.status == 'loading')
	{
		if (updateInfo.url && updateInfo.url.startsWith('http'))
		{
			// a page was loaded and it has an http or https URL!
			var tabIsMuted = tabObject.mutedInfo.muted;
			var fqdn = updateInfo.url.split('/')[2];
			tabIdStr = '' + tabId;
			if (TABLIST[tabIdStr] != fqdn)
			{
				// fqdn in the URL is different
				var excluded = false;
				for (var i = 0; i < EXCLUDELIST.length; i++)
				{
					if (fqdn.endsWith(EXCLUDELIST[i]))
					{
						excluded = true;
					}
				}

				// check for a correct muted status
				if (tabIsMuted == excluded)
				{
					// fix the muted status
					//tabObject.mutedInfo.muted = !excluded;	// doesn't work
					chrome.tabs.update(tabId, {"muted": !excluded});
				}

				// cache previous fqdn so we don't override manual user changes for this tab
				TABLIST[tabIdStr] = fqdn;
			}
		}
	}
}


chrome.tabs.onUpdated.addListener(onTabUpdate);
document.addEventListener('localDataStorage', onLocalStorageChange, false);

