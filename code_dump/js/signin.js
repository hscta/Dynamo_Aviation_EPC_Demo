$(function () {
	
	jQuery.support.placeholder = false;
	test = document.createElement('input');
	if('placeholder' in test) jQuery.support.placeholder = true;
	
	if (!$.support.placeholder) {
		
		$('.field').find ('label').show ();
		
	}





$('.jcarousel').jcarousel({wrap:"last"}).jcarouselAutoscroll();



        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        // $('.jcarousel-pagination')
        //     .on('jcarouselpagination:active', 'a', function() {
        //         $(this).addClass('active');
        //     })
        //     .on('jcarouselpagination:inactive', 'a', function() {
        //         $(this).removeClass('active');
        //     })
        //     .jcarouselPagination();
	
	
});


