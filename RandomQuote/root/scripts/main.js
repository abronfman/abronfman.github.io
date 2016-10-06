(function (quote, $, undefined) {
    'use strict';
    var html = "";

    quote.docReady = function () {
        addEventHandlers();
    };

    //#region private functions
    function addEventHandlers() {
        $('#btnGetQuote').on('click', function () {
            getQuote($(this));
        });

        $('#twitterLink').on('click', function (e) {
            e.preventDefault();
            window.open($('#twitterLink').attr('href'));
        })
    }

    function getQuote(e) {
        $.ajax({
            url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
            success: function (data) {
                displayQuote(data);
            },
            cache: false
        });

    }

    function displayQuote(jsonData) {
        var post = jsonData.shift(); // The data is an array of posts. Grab the first one.
        var html = "";
        html = post.content;
        if (post.title !== "")
            html += '<cite>&mdash; ' + post.title + '</cite>';

        $('#quote-content').html(html);
        $('#quote-wrapper').addClass('quoteShadow');

        $('#tweetWrapper').show();
        var $twitterLink = $('#twitterLink');
        var textToTweet = "https://twitter.com/intent/tweet?hashtags=myQuoteOfTheDay&text=" + $(post.content).text().substr(0, (138 - post.title.length)) + '  --' + post.title;
        $twitterLink.attr('href', textToTweet);
    }

    //On DocReady
    $(function () {
        addEventHandlers();

        //we have nothing to tweet, so no need to show the button
        $('#tweetWrapper').hide();
    });

}(window.quote = window.quote || {}, jQuery));