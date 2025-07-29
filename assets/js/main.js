(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });

        // Chatbot
        $('#chatbot-icon').on('click', function() {
            var $chatbotWindow = $('#chatbot-window');
            // Use a custom toggle to ensure display:flex is used for the flexbox layout.
            if ($chatbotWindow.is(':visible')) {
                $chatbotWindow.fadeOut();
            } else {
                $chatbotWindow.css('display', 'flex').hide().fadeIn();
            }
        });

        $('#chatbot-close-btn').on('click', function() {
            $('#chatbot-window').fadeOut();
        });

        function sendMessage() {
            var userInput = $('#chatbot-input').val();
            if (userInput.trim() === '') {
                return;
            }

            // Append user message safely to prevent XSS
            var userMessageContainer = $('<div class="chat-message user-message"></div>');
            var userMessageParagraph = $('<p></p>').text(userInput); // Use .text() to escape HTML
            userMessageContainer.append(userMessageParagraph);
            $('#chatbot-body').append(userMessageContainer);
            
            $('#chatbot-input').val('');

            // Scroll to bottom
            $('#chatbot-body').scrollTop($('#chatbot-body')[0].scrollHeight);

            // Show typing indicator
            var typingIndicator = $('<div class="chat-message bot-message" id="typing-indicator"><p><span class="typing-indicator"><span></span><span></span><span></span></span></p></div>');
            $('#chatbot-body').append(typingIndicator);
            $('#chatbot-body').scrollTop($('#chatbot-body')[0].scrollHeight);

            // Bot response
            setTimeout(function() {
                // Remove typing indicator
                $('#typing-indicator').remove();

                var botResponse = getBotResponse(userInput);
                var botMessageContainer = $('<div class="chat-message bot-message"></div>');
                // Bot response can contain HTML (like links), so we use .html()
                var botMessageParagraph = $('<p></p>').html(botResponse);
                botMessageContainer.append(botMessageParagraph);
                $('#chatbot-body').append(botMessageContainer);
                
                $('#chatbot-body').scrollTop($('#chatbot-body')[0].scrollHeight);
            }, 1000); // Increased delay to make typing feel more natural
        }

        $('#chatbot-send-btn').on('click', function() {
            sendMessage();
        });

        $('#chatbot-input').on('keypress', function(e) {
            if (e.which == 13) { // Enter key
                sendMessage();
                return false;
            }
        });

        function getBotResponse(input) {
            var lowerInput = input.toLowerCase();

            // Use a regular expression for 'hi' to match it as a whole word and avoid matching it in "shipping".
            if (lowerInput.includes('hello') || /\bhi\b/.test(lowerInput) || lowerInput.includes('hey')) {
                return 'Hello there! How can I assist you today?';
            } else if (lowerInput.includes('shipping') || lowerInput.includes('delivery')) {
                return 'We offer free shipping on all orders over $75! Standard delivery typically takes 3-5 business days.';
            } else if (lowerInput.includes('product') || lowerInput.includes('fruit')) {
                return 'You can see our full collection on the <a href="shop.html">Shop</a> page.';
            } else if (lowerInput.includes('contact') || lowerInput.includes('support')) {
                return 'You can reach us at support@fruitkha.com or call +00 111 222 3333. Our <a href="contact.html">Contact</a> page has more details.';
            } else if (lowerInput.includes('deal') || lowerInput.includes('sale')) {
                return 'Our deal of the month is the Hikan Strawberry, with 30% off! Check it out on the homepage.';
            } else if (lowerInput.includes('return') || lowerInput.includes('refund')) {
                return 'We have a 3-day return policy. If you are not satisfied with your order, you can get a refund within 3 days of purchase.';
            } else if (lowerInput.includes('about')) {
                return 'You can learn more about Fruitkha on our <a href="about.html">About Us</a> page.';
            } else if (lowerInput.includes('hours') || lowerInput.includes('open')) {
                return 'Our shop hours are Monday to Friday, 8 AM to 9 PM, and Saturday to Sunday, 10 AM to 8 PM.';
            } else if (lowerInput.includes('bye') || lowerInput.includes('thanks')) {
                return 'You\'re welcome! Have a great day.';
            } else {
                return "I'm sorry, I don't understand. You can ask me about shipping, products, returns, or contact information.";
            }
        }
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));
