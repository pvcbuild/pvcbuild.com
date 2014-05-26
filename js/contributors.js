(function () {
	var contributorNames = [];
	var anonMap = {
		"Michael Sarchet": { type: "User", login: "msarchet", avatar_url: "https://avatars2.githubusercontent.com/u/399084?" }
	};

	var contributorNames = [];
	var contributors = [];

	$.get("https://api.github.com/repos/pvcbuild/pvc/contributors?anon=1", function (data) {
		data.forEach(function (contributor) {
			if (contributor.type == "Anonymous") {
				var anonContrib = anonMap[contributor.name];
				if (anonContrib != null) {
					anonContrib.login = anonContrib.login;
					anonContrib.hasLink = true;
					anonContrib.contributions = contributor.contributions;
				} else {
					anonContrib = {
						login: contributor.name,
						avatar_url: "https://github.com/identicons/pvcbuild.png?",
						contributions: contributor.contributions
					};
				}

				contributors.push(anonContrib);
			} else {
				contributors.push({
					login: contributor.login,
					avatar_url: contributor.avatar_url,
					contributions: contributor.contributions,
					hasLink: true
				});
			}
		});
	})
	.then(function () {
		$.get("https://api.github.com/search/repositories?q=Pvc+Plugin+language:csharp&order=desc", function (data) {
			data.items.forEach(function (plugin) {
				if ($.inArray(plugin.owner.login, contributorNames) == -1) {
					contributors.push({
						login: plugin.owner.login,
						avatar_url: plugin.owner.avatar_url,
						contributions: plugin.owner.contributions,
						hasLink: true
					});
				}
			});

			var elements = [];
			contributors.forEach(function (contributor) {
				elements.push("<li>" + 
						"<img class=\"media-object\" src=\"" + contributor.avatar_url + "s=35\" class=avatar />" +
						(
							contributor.hasLink ?
								"<span class=name><a href=\"https://github.com/" + contributor.login + "\" target=\"_blank\">@" + contributor.login + "</a></span>"
							:
								"<span class=name>" + contributor.login + "</span>"
						) + 
				"</li>");
			});

			$(".contributor-list").append($.unique(elements));
		});
	});
})();