

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


function onSaveClick()
{
	document.getElementById('saveresult').innerHTML = 'Saving...';
	var settings = JSON.parse(window.localStorage.appSettings);
	var list = document.getElementById('excludelist').value;
	settings.excludeList = list.replaceAll("\r","\n").replaceAll("\n\n","\n").replaceAll("\n\n","\n").trim().split("\n");
	window.localStorage.appSettings = JSON.stringify(settings);
	document.getElementById('excludelist').value = settings.excludeList.join("\n");
	document.getElementById('saveresult').innerHTML = '<strong>Saved</strong>';
	setTimeout(ClearSaveResult, 3000);
}


function ClearSaveResult()
{
	document.getElementById('saveresult').innerHTML = '';
}


function onShowLicenseClick()
{
	document.getElementById('excludelistlabel').style.display = 'none';
	document.getElementById('excludelist').style.display = 'none';
	document.getElementById('save').style.display = 'none';
	document.getElementById('showlicense').style.display = 'none';
	document.getElementById('license').style.display = 'inline';
}

//document.onload = function() {
function onDocumentLoad()
{
	var settings = JSON.parse(window.localStorage.appSettings);
	document.getElementById('excludelist').value = settings.excludeList.join("\n");
	document.getElementById('save').onclick = onSaveClick;
	document.getElementById('showlicense').onclick = onShowLicenseClick;
	document.getElementById('excludelist').onchange = ClearSaveResult;
	document.getElementById('excludelist').onfocus = ClearSaveResult;
}
onDocumentLoad();

