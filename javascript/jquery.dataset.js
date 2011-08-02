(function ($, document, window, undefined) {

	$.fn.dataset = function () {
	
		var init = function () {
			var self = this;
			
			$(self).find("input:checkbox.select-all").bind("click", function () {
				if (this.checked) {
					$(this).closest(".dataset").find("input:checkbox").attr("checked", "checked");
				} else {
					$(this).closest(".dataset").find("input:checkbox").removeAttr("checked");
				}					
			});
			
			$(self).find("tbody tr")
				.bind("click", function () {
					location.href = $(this).find("a").attr("href");
				})
				.css("cursor", "pointer");	

		}
		
		return this.each(init);
	}

})(jQuery, document, this);