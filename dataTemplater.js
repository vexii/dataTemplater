/*!
 * jQuery dataTemplater
 * Build on  jQuery 1.6.1 (Copyright 2011, John Resig)
 * jQuery Templating Plugin (Copyright 2010, John Resig) 
 * Authored by Salomon "VeXii" Sumbundu
 * 25. may 2011
 */
(function($){
	$.fn.dataTemplater = function (options){
		var settings ={
			catchedTemplates : [],
			host: "dataTemplater/",
			templatesExtension: ".tmp.html",
			repoExtension: ".php",
			templateMethods:{}
		};
		function catchTemplate(name){
			/* getData( name, target )
			// loads the template markup
			// @parameter: name
			// The name of the file contaning the template markup
			*/
			var url = settings.host + name + settings.templatesExtension;
			$.ajax({
				url: url,
				cache: true,
				type: "GET",
				dataType:"html",
				processData: false,
				error: function()  {
					console.log("ERROR in: catchTemplate: " + url);
				},
				success: function(data){
					$(data).each(function(){
						var tmp = $(this),tmpName=tmp.attr("id");
						$.template(tmpName,tmp.html());
						settings.catchedTemplates.push(tmpName);
					});
				}
			});
		}
		function test(){
			
			return true;
		}
		function getData(name,target,jsonData){
			/* getData( name, target )
			// loads a JSON data array in template of same name
			// @parameter: name
			// The name of the file returning the JSON data
			// @parameter: target
			// The Object to append the template whith data on
			*/
			var url = settings.host + name + settings.repoExtension;
			$.ajax({
				url:url,
				cache:false,
				type:"GET",
				dataType: "json",
				data: jsonData,
				error: function(e){
					console.log("ERROR IN: getData(): "+ url,e);
				},
				success:function(data){
					$.tmpl(name,data,settings.templateMethods).appendTo(target).trigger("dataLoadet",[name,data]);
					
				}
			});
		}
		
		var options = $.extend(settings, options);
		return this.each(function(){
			var obj,content,template;
			obj = $(this);
			content = obj.attr("data-host");
			template = obj.attr("data-templateName") || content;
			
			if(!settings.catchedTemplates[content]){
				catchTemplate(content);
			}
			getData(content,$(this));
		});
	};
})(jQuery);