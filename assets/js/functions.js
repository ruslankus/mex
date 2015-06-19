// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs
// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }
//
// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);


// remap jQuery to $
(function($){

	/* trigger when page is ready */
	$(document).ready(function (){
	
		initialize();
	
	});

    function initialize(){
        //click on nav to load external content through AJAX
        $('#topnav a,  #bottomnav a').not('#bottomnav #fbcallus a').click(function(e){

            e.preventDefault();
            $.ajaxSetup({async:false});
            $('<div></div>').attr('id','spinner').appendTo('#pages');

            $('#pages').load(e.target.href + " #loadcontent",function(){
                //stop spinner
                fadespinner();
                foodclicks();
                tabclicks();
            });

        });//click on nav

        $(document).scroll(function(){
            scrollfix();
        });


        $( window ).bind( "orientationchange", function( e ) {
            console.log('chnaged');
            //reset the overlay's width, height and position
            $('#overlay').css('width', window.innerWidth + 'px');
            $('#overlay').css('height', window.innerHeight + 'px');
            $('#overlay').css('top', window.pageYOffset + 'px');

            centerImage();
        });


        foodclicks();
        tabclicks();

    }


    function whichmobile(){
        var userAgents = navigator.userAgent.toLowerCase();

        var mobileList=new Array(
            "iphone os 5",
            "ipad",
            "cpu os 5",
            "iphone","android"
            ,"ipad","blackberry",
            "palmos");
        for(var arrIndex in mobileList){
            if(userAgents.indexOf(mobileList[arrIndex]) >= 0 ){
                return userAgents[arrIndex];
                break;
            }
        }

    }

    function centerImage(){
        //center the image
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        $('#overlayimg').css('top',((window.innerHeight - $('#overlayimg').outerHeight()) / 2)+'px');
        $('#overlayimg').css('left',((window.innerWidth - $('#overlayimg').outerWidth()) / 2)+'px');
    }



    function scrollfix(){
        isMobile = whichmobile();
        if(isMobile == 'iphone'){
            $('footer').css('top',(window.pageYOffset + window.innerHeight-$('footer').height()) + 'px'); // scroll the footer navigation
            $('#overlay').css('top', window.pageYOffset+ 'px'); // scroll the overlay so it stays centered
            $('#overlay').css('height',window.innerHeight+"px"); //make the overlay the height of the device
        }
    }


    function tabclicks(){
        $('#tabs li').click(function(e){
            $('#tabs li').attr('class','');
            $(this).attr('class','tapped');

            var whichPage = $(this).attr('id').substr(3);
            $('#pages section').attr('class','foodlist hide');
            $('#pages #'+ whichPage).attr('class','foodlist show');

        });
    }



    function foodclicks(){

        $('.foodlist li').click(function(e){

            $('<div></div>').attr('id','overlay')
                .appendTo('body')
                .hide()
                .fadeIn('slow');

            $('#overlay').click(function(e){
                console.log(this);
                $('#overlay').fadeOut('slow',function(){
                    $(this).remove();
                })
            });
            //Make copy from info area and appen to overlay
            $(this).children('.info').clone().appendTo('#overlay');

            //add spinner while image loads
            $('<div></div>').attr('id','spinner').appendTo('#overlay');

            //Calculate the name the hight res image
            var largeImage = $(this).children('img').attr('src');
            console.log(largeImage);
            largeImage = largeImage.substr(0,largeImage.length - 7) + '.jpg';

            $('<img>').attr('src',largeImage).attr('id','overlayimg').appendTo('#overlay')
                .load(function(){
                    centerImage();
                    fadespinner();

                    $('<div></div>').attr('id','clicktoreturn')
                        .appendTo('#overlay').hide()
                        .delay(500).fadeIn(400)
                        .delay(1500).fadeOut(400);
                });

        });



    }


    function fadespinner(){

        $('#spinner').fadeOut('slow',function(){
            $(this).remove();
        })
    }
	
	


})(window.jQuery);