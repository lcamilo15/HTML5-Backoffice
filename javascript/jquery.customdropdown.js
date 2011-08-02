(function ($, document, window, undefined) {
			
	$.fn.customDropDown = function (args) {
	
		var $dropdown = $("<div />", {"class": "dropdown"})
							.append($("<div />", {"class": "selected"}))
							.append($("<div />", {"class": "options"}));
							
		var settings = {
				maxHeight : 200
		    };
			
		$.extend(settings, args);
		
		return this.each( function () {
			var self          = this,
				options       = $(self).find("option"),						
				selectedIndex = self.selectedIndex,
				$container    = $dropdown.clone(),
				$selectedDiv  = $container.find(".selected"),
				$optionsDiv   = $container.find(".options"),
				items         = "",
				scrolling     = 0;
				
			function toggleOptions() {
				if ($optionsDiv.hasClass("open")) {
					hideOptions();
				} else {
					showOptions();
				}
				
				return false;
			}
				
			function showOptions () {
				$container.addClass("active");
				$optionsDiv.addClass("open").show();				
				$(document).bind("click", hideOptions);
				return false;
			}
			
			function hideOptions () {
				$container.removeClass("active");
				$optionsDiv.removeClass("open").hide();
				$(document).unbind("click").unbind("keydown");
				return false;
			}
			
			function updateSelected (e) {
				$selectedDiv.html($(this).html());
				self.selectedIndex = $(this).attr("data-index");
				hideOptions();
				return false;
			}
			
			function setFocus () {
				showOptions();
				$(document).bind("keydown", handleKeyDown);
			}
			
			function handleKeyDown(event) {
				var keyId = event.which;
				
				switch (keyId) {
					case 9 :
						console.log("TAB");
						break;
						
					case 13 :
						console.log("ENTER");
						break;
						
					case 32 :
						console.log("SPACE");
						break;
						
					case 38 :
						console.log("UP");
						break;
						
					case 40 :
						console.log("DOWN");
						break;
					
					default: 
						console.log(keyId);
						break;
				}
				
				return false;
			}
				
			for (i = 0, length = options.length; i < length; i++) {
				if (i === selectedIndex) {
					$selectedDiv
						.html($(options[i]).html())
						.bind("click", toggleOptions);
				}				
				
				items += '<li><a href="#" data-index="'+i+'">'+$(options[i]).html()+'</a></li>';					
			}
			
			$optionsDiv.html("<ul>"+items+"</ul>");
			$optionsDiv.find("a").bind("click", updateSelected);
			
			$(self).after($container);
			
			scrolling = ($optionsDiv.find("ul").height() > settings.maxHeight) ? 1 : 0;
			
			if (scrolling) {
				$optionsDiv.find("ul")
					.height(settings.maxHeight)
					.css({
						"overflow-y": "auto",
						"padding-right": "25px"
					});
			}
			
			$optionsDiv.hide();				
			
			$container.show();				
			$container.width($(self).width());
			$container.attr("tabindex", "0");
			/* $container.bind({
				"focus": setFocus, 
				"blur" : hideOptions
			}); */
			
			$(self).hide();
		} );
	}
	
})(jQuery, document, this);