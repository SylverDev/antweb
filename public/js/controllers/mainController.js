function mainController(mainService, mailUserService, serviceService, $timeout) {

    this.mainService = mainService;
    this.serviceService = serviceService;
    this.mailUserService = mailUserService;


    this.tinymceOptions = {
        toolbar: "forecolor | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        plugins: 'advlist fullscreen autolink link image lists charmap autoresize textcolor'
    };



    // Mail transport
    this.mailTransport = (email) => {
        this.mailUserService.mailTransport(email.name, email.email, email.tel, email.msg);
        // Reset du formulaire contact
        document.getElementById("contactFormID").reset();
        location.reload(false)
        document.getElementById('boutonSubmit').removeAttribute("enable");

        // console.log("Demande envoyée");
    };

    this.order = '-_id';

    this.recaptchaValid = false;

    this.recaptcha_callback = () => {
        this.recaptchaValid = true;
    };

    this.load = () => {
        // Services
        this.serviceService.getAll().then((res) => {
            this.services = res.data;
        });
        // Réalisations
        this.mainService.getAll().then((res) => {
            this.realisations = res.data;
            this.realisations.map((n) => {
                n.date = new Date(n.date);
                return n;
            });
            // Configuration carousel - Vue responsive
            this.slickCurrentIndex = 0;



            this.slickConfig = {
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false,
                data: true,
                speed: 1000,
                cssEase: 'linear',
                // adaptiveHeight: true,
                mobileFirst: true,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            mobileFirst: true,
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            mobileFirst: true,
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            mobileFirst: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,

                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            mobileFirst: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            };
            // $('.slider-for').slick({
            //     slidesToShow: 1,
            //     slidesToScroll: 1,
            //     arrows: false,
            //     fade: true,
            //     asNavFor: '.slider-nav'
            // });
            // $('.slider-nav').slick({
            //     slidesToShow: 3,
            //     slidesToScroll: 1,
            //     asNavFor: '.slider-for',
            //     dots: true,
            //     centerMode: true,
            //     focusOnSelect: true
            // });

            // $('.slider-for').slick({
            //     slidesToShow: 1,
            //     slidesToScroll: 1,
            //     arrows: false,
            //     fade: true,
            //     asNavFor: '.slider-nav'
            // });
            // $('.slider-nav').slick({
            //     slidesToShow: 3,
            //     slidesToScroll: 1,
            //     asNavFor: '.slider-for',
            //     dots: true,
            //     centerMode: true,
            //     focusOnSelect: true
            // });

            $(document).ready(function() {
                $timeout(function() {
                    $('.parallax').parallax();
                    $('.materialboxed').materialbox();
                    $('.button-collapse').sideNav({
                        closeOnClick: true,
                    });
                    $('.js-scrollTo').on('click', function() { // Au clic sur un élément
                        var page = $(this).attr('href'); // Page cible
                        var speed = 500; // Durée de l'animation (en ms)
                        $('html, body').animate({
                            scrollTop: $(page).offset().top
                        }, speed); // Go
                        return false;
                    });

                    // $('.collapsible').collapsible();


                    $('.collapsible').collapsible({
                        accordion: false
                    });




                    // $('.slider-for').slick({
                    //     slidesToShow: 1,
                    //     slidesToScroll: 1,
                    //     arrows: false,
                    //     fade: true,
                    //     asNavFor: '.slider-nav'
                    // });
                    // $('.slider-nav').slick({
                    //     slidesToShow: 3,
                    //     slidesToScroll: 1,
                    //     asNavFor: '.slider-for',
                    //     dots: true,
                    //     centerMode: true,
                    //     focusOnSelect: true
                    // });

                }, 500);
            });

            this.recaptcha_callback();
        });
    };

    this.activeFirst = (index) => {
        $(".collapsible-header:eq(index)").scrollTop()

    };
    this.load();




}


//
//
// this.expandAll = () => {
//     $(".collapsible-header").addClass("active");
//     $(".collapsible").collapsible({
//         accordion: false
//     });
// };

// this.collapseAll = () => {
//     $(".collapsible-header").removeClass(function() {
//         return "active";
//     });
//     $(".collapsible").collapsible({
//         accordion: true
//     });
//     $(".collapsible").collapsible({
//         accordion: false
//     });
// };
