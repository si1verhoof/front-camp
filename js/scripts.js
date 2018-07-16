(function () {
    var bannersUrl = "https://frontend.camp.dev.unit6.ru/get-slides";
    $.getJSON(bannersUrl)
        .done(function (downloadedBanners) {
            if (!Array.isArray(downloadedBanners)) {
                console.error('The downloaded data is not array');
                return;
            }

            var banners = prepareBanners(downloadedBanners);
            var sliderInterval = null;
            var sliderIntervalDelay = 2000;
            var currentBannerId = 0;

            if (banners.length === 0) {
                return;
            }

            createSliderDots(banners);
            toggleSliderDot(0);
            startSlider(0);

            function createSliderDots(banners) {
                var sliderDots = $('.b-slider__dots');

                $('.b-slider__dot').remove();

                $(banners).each(function (bannerId, banner) {
                    var dot = $(document.createElement('div'))
                        .addClass('b-slider__dot')
                        .mouseenter(stopSlider)
                        .mouseleave(function () {
                            startSlider(bannerId);
                        })
                        .click(function () {
                            currentBannerId = (bannerId + 1) % banners.length;
                            showBanner(banner);
                            toggleSliderDot(bannerId);
                        });

                    sliderDots.append(dot);
                });
            }

            function showBanner(banner) {
                $('.b-slide__title').html(banner.title);
                $('.b-slide__text').html(banner.text);
                $('.b-slide__image')
                    .css({
                        "background-image": "url(" + banner.image.slice(1) + ")",
                        "display": "none"
                    })
                    .fadeIn()
                    .show(250);
            }

            function toggleSliderDot(bannerId) {
                var dots = $('.b-slider__dot');
                dots.removeClass('b-slider__dot--selected');
                $(dots[bannerId]).addClass('b-slider__dot--selected');
            }

            function showNextBanner() {
                nextBannerId = (currentBannerId + 1) % banners.length;
                currentBannerId = nextBannerId;
                showBanner(banners[nextBannerId]);
                toggleSliderDot(nextBannerId);
            }

            function startSlider(startBannerId) {
                currentBannerId = startBannerId;
                sliderInterval = setInterval(showNextBanner, sliderIntervalDelay);
            }

            function stopSlider() {
                clearInterval(sliderInterval);
                sliderInterval = null;
            }

            function prepareBanners(banners) {
                var now = new Date().getTime();

                var activeBanners = banners.filter(function (banner) {
                    return banner.active === true
                        && (banner.startDate * 1000) <= now
                        && (banner.endDate * 1000) >= now;
                });

                activeBanners.sort(function (a, b) {
                    return a.order - b.order;
                });

                return activeBanners;
            }
        });
})();
