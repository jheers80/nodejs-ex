$(document).on("click","div#training_instance_data_list a.pluslink", function(e) {
	e.preventDefault();
	console.log('Plus Link was clicked');
	$(this).siblings(".addDataForm").slideDown();
	$(this).removeClass('pluslink').addClass('neglink').html('&minus;');
});

$(document).on("click","div#training_instance_data_list a.neglink", function(e) {
	e.preventDefault();
	console.log('Neg Link was clicked');
	$(this).siblings(".addDataForm").slideUp();
	$(this).removeClass('neglink').addClass('pluslink').html('&plus;');
});