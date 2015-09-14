$('#my-form').submit(function(){
	var form = $('#my-form');

	var location = $('#location').val().split(' ').join('%20');

	var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22"+ location +"%22&format=json";
	$('.button-search').removeClass("ui-state-visited");
	$.ajax({
		url:query,
		type:form.attr('method'),
		data:form.serialize(),
		success:function(data){
			var locationID = data.query.results.place[0].woeid;
			var weatherQuery = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20"+locationID+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

			$.ajax({
				url:weatherQuery,
				type:"GET",
				data:form.serialize(),
				success:function(data){
					console.log(data);
					var temp = "It is " + data.query.results.channel.item.condition.temp + " degrees out!";
					$('#weather').html(temp);
				},
				error:function(data){
					console.log("error");
				}
			});	
		},
		error:function(data){
			console.log("error");
		}
	});

	return false;
});

