function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function loadPackageInfo() {
	var urlSelf = window.location.href;
	var packageID = getParameterByName("id", urlSelf);
	var form_url = urlSelf.split('description.html')[0] + "packageInfo/" + packageID;
	$("#loader").show();
	$.ajax({
		url: form_url,
		type: "GET",
		cache: false,
		crossDomain: true,
		success: function (returnhtml) {
			$("#tweakStatusInfo").hide();
			var decodeResp = eval('('+returnhtml+')');
			if(decodeResp.name) {
				document.title = decodeResp.name;
				$("#name").html(decodeResp.name);
				$("#name").show();
			}
			if(decodeResp.desc_short) {
				$("#desc_short").html(decodeResp.desc_short);
				$("#desc_short_").show();
			}
			if(decodeResp.desc_long) {
				$("#desc_long").html(decodeResp.desc_long);
				$("#desc_long_").show();
			}
			if(decodeResp.compatitle) {
				$("#compatitle").html(decodeResp.compatitle);
				$("#compatitle_").show();
			}
			if(decodeResp.changelog) {
				$("#changelog").html(decodeResp.changelog);
				$("#changelog_").show();
			}
			if(decodeResp.screenshot) {
				$("#screenshot").html(decodeResp.screenshot);
				$("#screenshot_").show();
			}
        },
		error: function (err) {
			$("#errorInfo").html("Description Unavailable for package "+packageID);
		}
	});
}