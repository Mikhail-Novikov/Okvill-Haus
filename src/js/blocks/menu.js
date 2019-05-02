export default intializeMenu;

	var settings = {
		shrinktogglerAfter: 'firstpage',
		dismissmenuDelay: 200
	}

	function intializeMenu(){
		var $menuwrapper = $('.hamburger-icon-menu-wrapper')
		var $fullscreenmenu = $menuwrapper.find('.full-screen-menu')
		var $hamburgerui = $('.hamburger-ui')
		var $toggler = $('.nav-toggler').parent()
		var scrolltop
		var strinkafter
		var shrinktimer
		var dismisstimer
	
		$toggler.on('click', function(e){
			$menuwrapper.toggleClass('open')
			e.preventDefault()
		})

		$fullscreenmenu.on('click', function(e){
			clearTimeout(dismisstimer)
			dismisstimer = setTimeout(function(){
				$menuwrapper.removeClass('open')				
			}, settings.dismissmenuDelay)
		})

		if ($menuwrapper.length == 1 && settings.shrinktogglerAfter != 0){
			var shrinktogglerAfter = settings.shrinktogglerAfter
			$(window).on('scroll resize', function(e){
				clearTimeout(shrinktimer)
				shrinktimer = setTimeout(function(){
					scrolltop = $(window).scrollTop()
					strinkafter = (shrinktogglerAfter == 'firstpage')? $(window).height() : parseInt(shrinktogglerAfter)
					if ( scrolltop > strinkafter && !$hamburgerui.hasClass('shrink') ){
						$hamburgerui.addClass('shrink')
					}
					else if ( scrolltop < strinkafter && $hamburgerui.hasClass('shrink') ){
						$hamburgerui.removeClass('shrink')
					}
				}, 50)
			})
		}
	}
