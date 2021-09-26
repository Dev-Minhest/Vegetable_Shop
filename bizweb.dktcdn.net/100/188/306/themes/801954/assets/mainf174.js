window.awe = window.awe || {};
awe.init = function () {
	awe.showPopup();
	awe.hidePopup();	
};

$('[data-toggle="tooltip"]').tooltip({container: 'body'}); 

function convertToSlug(text) {
	return text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}window.convertToSlug=convertToSlug;

function convertVietnamese(str) { 
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str= str.replace(/đ/g,"d"); 
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,""); 

	return str; 
} window.convertVietnamese=convertVietnamese;
function product_action(str) { 
	/*Product action*/
	$('.product-box .btn-circle').mouseenter(function() {		
		var tt = $(this).attr('data-title');		
		$(this).parents('form').find('.action-info').html(tt);
	});
	$('.product-box .btn-circle').mouseleave(function() {					
		$(this).parents('form').find('.action-info').html('Chọn hoạt động');
	});

} window.product_action=product_action;
function resizeimage() { 
	$('.product-box .product-thumbnail a img').each(function(){
		var t1 = (this.naturalHeight/this.naturalWidth);
		var t2 = ($(this).parent().height()/$(this).parent().width());
		if(t1<= t2){
			$(this).addClass('bethua');
		}

		var m1 = $(this).height();
		var m2 = $(this).parent().height();
		if(m1 <= m2){
			$(this).css('padding-top',(m2-m1)/2 + 'px');
		}
	})	
} window.resizeimage=resizeimage;

function callbackW() {
	iWishCheck();				  
	iWishCheckInCollection();
	$(".iWishAdd").click(function () {			
		var iWishvId = iWish$(this).parents('form').find("[name='id']").val();
		if (typeof iWishvId === 'undefined') {
			iWishvId = iWish$(this).parents('form').find("[name='variantId']").val();
		};
		var iWishpId = iWish$(this).attr('data-product');
		if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
			iWishvId = iWish$(this).attr('data-variant');
		}
		if (typeof iWishvId === 'undefined' || typeof iWishpId === 'undefined') {
			return false;
		}
		if (iwish_cid == 0) {
			iWishGotoStoreLogin();
		} else {
			var postObj = {
				actionx : 'add',
				cust: iwish_cid,
				pid: iWishpId,
				vid: iWishvId
			};
			iWish$.post(iWishLink, postObj, function (data) {
				if (iWishFindAndGetVal('#iwish_post_result', data) == undefined) return;
				var result = (iWishFindAndGetVal('#iwish_post_result', data).toString().toLowerCase() === 'true');
				var redirect = parseInt(iWishFindAndGetVal('#iwish_post_redirect', data), 10);
				if (result) {
					if (Bizweb.template == "product") {
						iWish$('.iWishAdd').addClass('iWishHidden'), iWish$('.iWishAdded').removeClass('iWishHidden');
						if (redirect == 2) {
							iWishSubmit(iWishLink, { cust: iwish_cid });
						}
					}
					else if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
						iWish$.each(iWish$('.iWishAdd'), function () {
							var _item = $(this);
							if (_item.attr('data-variant') == iWishvId) {
								_item.addClass('iWishHidden'), _item.parent().find('.iWishAdded').removeClass('iWishHidden');
							}
						});
					}
				}
			}, 'html');
		}
		return false;
	});
	$(".iWishAdded").click(function () {
		var iWishvId = iWish$(this).parents('form').find("[name='id']").val();
		if (typeof iWishvId === 'undefined') {
			iWishvId = iWish$(this).parents('form').find("[name='variantId']").val();
		};
		var iWishpId = iWish$(this).attr('data-product');
		if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
			iWishvId = iWish$(this).attr('data-variant');
		}
		if (typeof iWishvId === 'undefined' || typeof iWishpId === 'undefined') {
			return false;
		}
		if (iwish_cid == 0) {
			iWishGotoStoreLogin();
		} else {
			var postObj = {
				actionx: 'remove',
				cust: iwish_cid,
				pid: iWishpId,
				vid: iWishvId
			};
			iWish$.post(iWishLink, postObj, function (data) {
				if (iWishFindAndGetVal('#iwish_post_result', data) == undefined) return;
				var result = (iWishFindAndGetVal('#iwish_post_result', data).toString().toLowerCase() === 'true');
				var redirect = parseInt(iWishFindAndGetVal('#iwish_post_redirect', data), 10);
				if (result) {
					if (Bizweb.template == "product") {
						iWish$('.iWishAdd').removeClass('iWishHidden'), iWish$('.iWishAdded').addClass('iWishHidden');
					}
					else if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
						iWish$.each(iWish$('.iWishAdd'), function () {
							var _item = $(this);
							if (_item.attr('data-variant') == iWishvId) {
								_item.removeClass('iWishHidden'), _item.parent().find('.iWishAdded').addClass('iWishHidden');
							}
						});
					}
				}
			}, 'html');
		}
		return false;
	});

}  window.callbackW=callbackW;
/********************************************************
# Sidebar category
********************************************************/
$('.nav-category .fa-angle-down').click(function(e){
	$(this).parent().toggleClass('active');
});
/********************************************************
# Offcanvas menu
********************************************************/
jQuery(document).ready(function ($) {
	$('#nav-mobile .fa').click(function(e){		
		e.preventDefault();
		$(this).parent().parent().toggleClass('open');
	});
	$('.menu-bar').click(function(e){
		e.preventDefault();
		$('#nav-mobile').toggleClass('open');
	});

	$('.open-filters').click(function(e){

		$(this).toggleClass('open');
		$('.dqdt-sidebar').toggleClass('open');
	});

	$('.inline-block.account-dr>a').click(function(e){
		if($(window).width() < 992){
			e.preventDefault();

		}
	})

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		$('.sidebar-category .aside-content .nav-item .fa.fa-caret-right').css('top','19px');
		$('.sidebar-category .aside-content .nav-item .nav-item .fa.fa-caret-right').css('top','16px');

	}

});
/********************************************************
# Footer
********************************************************/
$('.site-footer h3').click(function() {
	$(this).parent().find('.list-menu').toggleClass('active'); 	
	$(this).toggleClass('active'); 	
}); 
$('.aside.aside-mini-products-list .aside-title h3').click(function() {
	$(this).parents('.aside-mini-products-list').find('#collection-filters-container').toggleClass('active'); 	
}); 

/**/
/********************************************************
# toggle-menu
********************************************************/

$('.toggle-menu .caret').click(function() {
	$(this).closest('li').find('> .sub-menu').slideToggle("fast");
	$(this).closest('li').toggleClass("open");
	return false;              
}); 
$('.off-canvas-toggle').click(function(){
	$('body').toggleClass('show-off-canvas');
	$('.off-canvas-menu').toggleClass('open');
})
$('body').click(function(event) {
	if (!$(event.target).closest('.off-canvas-menu').length) {
		$('body').removeClass('show-off-canvas');
	};
});

/********************************************************
# accordion
********************************************************/
$('.accordion .nav-link').click(function(e){
	e.preventDefault;

	$(this).parent().toggleClass('active');
})
/********************************************************
# Dropdown
********************************************************/
$('.dropdown-toggle').click(function() {
	$(this).parent().toggleClass('open'); 	
}); 
$('#dropdownMenu1').click(function() {
	var ofh= $(this).parent().find('.dropdown-menu').width();

	var mm = $('.menu-mobile'). offset().left;

	$('.site-header-inner button.btn-close').css('left',ofh - mm +'px');
}); 
$('.btn-close').click(function() {
	$(this).parents('.dropdown').toggleClass('open');
}); 
$('body').click(function(event) {
	if (!$(event.target).closest('.dropdown').length) {
		$('.dropdown').removeClass('open');
	};
});

$('body').click(function(event) {
	if (!$(event.target).closest('.collection-selector').length) {
		$('.list_search').css('display','none');
	};
});

/********************************************************
# Tab
********************************************************/
$(".e-tabs:not(.not-dqtab)").each( function(){
	$(this).find('.tabs-title li:first-child').addClass('current');
	$(this).find('.tab-content').first().addClass('current');

	$(this).find('.tabs-title li').click(function(){
		var tab_id = $(this).attr('data-tab');

		var url = $(this).attr('data-url');
		$(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);
		$(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
		$(this).closest('.e-tabs').find('.tab-content').removeClass('current');
		$(this).addClass('current');
		$(this).closest('.e-tabs').find(".data-"+tab_id).addClass('current');
	});    
});

/********************************************************
# SHOW NOITICE
********************************************************/
awe.showNoitice = function (selector) {   
	$(selector).animate({right: '0'}, 500);
	setTimeout(function() {
		$(selector).animate({right: '-300px'}, 500);
	}, 3500);
};

/********************************************************
# SHOW LOADING
********************************************************/
awe.showLoading = function (selector) {    
	var loading = $('.loader').html();
	$(selector).addClass("loading").append(loading);  
}

/********************************************************
# HIDE LOADING
********************************************************/
awe.hideLoading = function (selector) {  
	$(selector).removeClass("loading"); 
	$(selector + ' .loading-icon').remove();
}


/********************************************************
# SHOW POPUP
********************************************************/
awe.showPopup = function (selector) {
	$(selector).addClass('active');
};

/********************************************************
# HIDE POPUP
********************************************************/
awe.hidePopup = function (selector) {
	$(selector).removeClass('active');
}


/************************************************/
$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	awe.hidePopup('.awe-popup'); 
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;
})

$(window).on("load resize",function(e){
	if($(window).width() < 1200 ){

		$('.header-icon .fa-search,.header-icon .fa-user').click(function(e){
			e.preventDefault();
		})
	}
	setTimeout(function(){					 
		resizeimage();
	},200);

	setTimeout(function(){	

		resizeimage();
	},1000);
});

$(document).on('keydown','#qty, #quantity-detail, .number-sidebar',function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
$(document).on('click','.qtyplus',function(e){
	e.preventDefault();   
	fieldName = $(this).attr('data-field'); 
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal)) { 
		$('input[data-field='+fieldName+']').val(currentVal + 1);
	} else {
		$('input[data-field='+fieldName+']').val(0);
	}
});

$(document).on('click','.qtyminus',function(e){
	e.preventDefault(); 
	fieldName = $(this).attr('data-field');
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal) && currentVal > 1) {          
		$('input[data-field='+fieldName+']').val(currentVal - 1);
	} else {
		$('input[data-field='+fieldName+']').val(1);
	}
});


jQuery(document).ready(function ($) {

	$('.owl-carousel:not(.not-dqowl)').each( function(){
		var small_xs_item = $(this).attr('data-smxs-items');
		var xs_item = $(this).attr('data-xs-items');
		var md_item = $(this).attr('data-md-items');
		var lg_item = $(this).attr('data-lg-items');
		var sm_item = $(this).attr('data-sm-items');	
		var margin=$(this).attr('data-margin');
		var dot=$(this).attr('data-dot');
		var nav=$(this).attr('data-nav');
		if (typeof margin !== typeof undefined && margin !== false) {    
		} else{
			margin = 30;
		}
		if (typeof small_xs_item !== typeof undefined && small_xs_item !== false) {    
		} else{
			small_xs_item = 1;
		}
		if (typeof xs_item !== typeof undefined && xs_item !== false) {    
		} else{
			xs_item = 1;
		}
		if (typeof sm_item !== typeof undefined && sm_item !== false) {    

		} else{
			sm_item = 3;
		}	

		if (typeof md_item !== typeof undefined && md_item !== false) {    
		} else{
			md_item = 3;
		}
		if (typeof lg_item !== typeof undefined && lg_item !== false) {    
		} else{
			lg_item = 4;
		}
		if (typeof dot !== typeof undefined && dot !== true) {   
			dot= dot;
		} else{
			dot = false;
		}
		if (typeof nav !== typeof undefined && nav !== true) {   
			nav= nav;
		} else{
			nav = false;
		}		

		$(this).owlCarousel({
			loop:false,
			margin:Number(margin),
			responsiveClass:true,
			dots:dot,
			responsive:{
				0:{
					items:Number(small_xs_item),
					nav:nav
				},
				350:{
					items:Number(xs_item),
					nav:nav
				},
				768:{
					items:Number(sm_item),
					nav:nav
				},
				992:{
					items:Number(md_item),
					nav:nav					
				},
				1200:{
					items:Number(lg_item),
					nav:nav					
				}
			}
		})
	})
	resizeimage();
	/* Back to top */
	if ($('.back-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.back-to-top').addClass('show');
				} else {
					$('.back-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('.back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
	product_action();


});