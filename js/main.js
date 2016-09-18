window.onload = function(){


	var controller = new ScrollMagic.Controller({globalSceneOptions: { triggerHook: "onLeave"}});
	var comtrollerOut = new ScrollMagic.Controller({globalSceneOptions: { triggerHook: "onEnter"}});
	var currH = $("#terrain").outerHeight();
	// build scenes

	/*new ScrollMagic.Scene({triggerElement:"#menu-trigger", offset: currH * 0.5})
		.setPin("#menu-button-group")
		.addTo(controller);


	new ScrollMagic.Scene({triggerElement:"#menu-trigger", duration: currH * 0.5})
		.setTween("#menu-button-group", {css:{transform:"translateX(100%)"}})
		.addTo(controller)
		//.addIndicators()
		.on("enter", function (event) {$('.menu-btn').eq(0).addClass("active");});*/


	tweenTopMovement(controller, "#platform-1", "#platform-trigger-1a", "46%", 0.15);
	tweenTopMovement(controller, "#platform-1", "#platform-trigger-1b", "75.2%", 0.15);

	tweenTopMovement(controller, "#platform-2", "#platform-trigger-2a", "90%", 0.15);
	tweenTopMovement(controller, "#platform-2", "#platform-trigger-2b", "115.15%", 0.15);

	tweenTopMovement(controller, "#platform-2-b", "#platform-trigger-2a", "92%", 0.15);
	tweenTopMovement(controller, "#platform-2-b", "#platform-trigger-2b", "116.2%", 0.15);

	tweenTopMovement(controller, "#platform-3", "#platform-trigger-3a", "127.5%", 0.15);
	tweenTopMovement(controller, "#platform-3", "#platform-trigger-3b", "149.19%", 0.15);

	tweenTopMovement(controller, "#platform-4", "#platform-trigger-4a", "169%", 0.15);
	tweenTopMovement(controller, "#platform-4", "#platform-trigger-4b", "185.7%", 0.15);

	tweenTopMovement(controller, "#platform-5", "#platform-trigger-5a", "215%", 0.15);
	tweenTopMovement(controller, "#platform-5", "#platform-trigger-5b", "234.3%", 0.15);

	animateTower(0, '#rating-tower-1-img', controller, 0)
	animateTower(0, '#rating-tower-2-img', controller, 0.2)
	animateTower(12, '#rating-tower-3-img', controller, 0.4)
	animateTower(0, '#rating-tower-4-img', controller, 0.6)
	animateTower(24, '#rating-tower-5-img', controller, 0.8)
	animateTower(36, '#rating-tower-6-img', controller, 1)


	tweenScale(controller, "#tower-text-1", "#tower-trigger-1", 1, 0.2);
	tweenScale(controller, "#tower-text-2", "#tower-trigger-1", 1, 0.4);
	tweenScale(controller, "#tower-text-3", "#tower-trigger-1", 1, 0.6);
	tweenScale(controller, "#tower-text-4", "#tower-trigger-1", 1, 0.8);
	tweenScale(controller, "#tower-text-5", "#tower-trigger-1", 1, 1);
	tweenScale(controller, "#tower-text-6", "#tower-trigger-1", 1, 1.2);

	tweenBoatMovement(comtrollerOut, "#rating-boat-small-1", "#boat-trigger-1", "234.5%", "55%", 2, "boats");
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-2", "#boat-trigger-1", "233.5%", "70%", 2.5, "boats");
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-3", "#boat-trigger-1", "229%", "85%", 2, "boats", 1);

	tweenScale(comtrollerOut, "#boat-text-1", "#boat-trigger-1", 1, 1.5, true);
	tweenScale(comtrollerOut, "#boat-text-2", "#boat-trigger-1", 1, 2, true);
	tweenScale(comtrollerOut, "#boat-text-3", "#boat-trigger-1", 1, 2.5, true);

	tweenBoatMovement(comtrollerOut, "#rating-boat-small-4", "#boat-trigger-2", "255%", "23%", 2, "boats");
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-5", "#boat-trigger-2", "262.7%", "25.7%", 3.2, "boats", 0.1);
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-6", "#boat-trigger-2", "265.5%", "14%", 3.2, "boats", 0.4);

	tweenScale(comtrollerOut, "#boat-text-4", "#boat-trigger-2", 1, 1.5, true);
	tweenScale(comtrollerOut, "#boat-text-5", "#boat-trigger-2", 1, 2.5, true);
	tweenScale(comtrollerOut, "#boat-text-6", "#boat-trigger-2", 1, 2.9, true);

	tweenBoatMovement(comtrollerOut, "#rating-boat-small-7", "#boat-trigger-3", "273.5%", "78%", 2.2, "boats");
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-8", "#boat-trigger-3", "280%", "71%", 3, "boats", 0.7);
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-9", "#boat-trigger-3", "287.5%", "68.5%", 3.5, "boats", 1.4);
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-10", "#boat-trigger-3", "289%", "78%", 2.5, "boats", 2.4);
	tweenBoatMovement(comtrollerOut, "#rating-boat-small-11", "#boat-trigger-3", "297%", "75%", 3.25, "boats", 3.2);

	tweenScale(comtrollerOut, "#boat-text-7", "#boat-trigger-3", 1, 2, true);
	tweenScale(comtrollerOut, "#boat-text-8", "#boat-trigger-3", 1, 3, true);
	tweenScale(comtrollerOut, "#boat-text-9", "#boat-trigger-3", 1, 4, true);
	tweenScale(comtrollerOut, "#boat-text-10", "#boat-trigger-3", 1, 4.7, true);
	tweenScale(comtrollerOut, "#boat-text-11", "#boat-trigger-3", 1, 5.5, true);



};

function tweenTopMovement(controller, toTween, trigger, topAmount, durationMult)
{
	var parent = document.getElementById(toTween.substring(1)).parentElement;
	var child = document.getElementById(toTween.substring(1)).getBoundingClientRect().top +
	(document.documentElement.scrollTop || document.body.scrollTop);
	topAmount = parent.clientHeight * parseFloat(topAmount) / 100 - child;

	var currH = $("#terrain").outerHeight();
	new ScrollMagic.Scene({triggerElement:trigger, duration: currH * durationMult})
	.setTween(toTween, 0.5, {css:{transform:'translateY(' + topAmount + 'px)'}})
	.addTo(controller);
}

function tweenScale(controller, toTween, trigger, scaleAmout, delayAmount, notReversed)
{
	var currH = $("#terrain").outerHeight();
	new ScrollMagic.Scene({triggerElement:trigger, reverse:!notReversed})
	.setTween(toTween, 0.5, {css:{scale:scaleAmout}, delay:delayAmount})
	.addTo(controller);
}

function tweenBoatMovement(controller, toTween, trigger, topAmount, leftAmount, duration, indicatorName, delayAmount)
{
	var parent = document.getElementById(toTween.substring(1)).parentElement;
	var child = document.getElementById(toTween.substring(1)).getBoundingClientRect();
	var top = child.top + (document.documentElement.scrollTop || document.body.scrollTop);
	var left = child.left;

	topAmount = parent.clientHeight * parseFloat(topAmount) / 100 - top;
	leftAmount = parent.clientWidth * parseFloat(leftAmount) / 100 - left;

	var currH = $("#terrain").outerHeight();
	new ScrollMagic.Scene({triggerElement:trigger, reverse:false})
	.setTween(toTween, duration, {css:{transform:'translate(' + leftAmount + 'px,' + topAmount + 'px)'}, ease: Sine.easeOut, delay:delayAmount})
	.addTo(controller);
}


function animateTower(level, towerName, controller, delayAmount)
{
	var arr_1 = [100, 100, 0, 100, 0, 90, 50, 100, 100, 90];
	var arr_2 = [100, 100, 0, 100, 0, 12 + level, 50,   22 + level, 100, 12 + level];

	arr_2.onUpdate = function() {
	TweenMax.set(towerName, {css:{'-webkit-clip-path':'polygon('+arr_1[0]+'%'+arr_1[1]+'%,'+arr_1[2]+'%'+arr_1[3]+'%,'+arr_1[4]+'%'+arr_1[5]+'%,'+arr_1[6]+'%'+arr_1[7]+'%,'+arr_1[8]+'%'+arr_1[9]+'%)',
								  'clip-path':'polygon('+arr_1[0]+'%'+arr_1[1]+'%,'+arr_1[2]+'%'+arr_1[3]+'%,'+arr_1[4]+'%'+arr_1[5]+'%,'+arr_1[6]+'%'+arr_1[7]+'%,'+arr_1[8]+'%'+arr_1[9]+'%)'
	}});};

	var tween = TweenLite.to(arr_1, 0.5, arr_2);
	tween.delay(delayAmount);

	new ScrollMagic.Scene({triggerElement: '#tower-trigger-1'})
		.setTween(tween)
		.addTo(controller);
}
