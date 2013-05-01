﻿(function ($, document) {

    $(document).on('pagebeforeshow', "#tvRecommendedPage", function () {

        var page = this;

        var options = {

            SortBy: "DateCreated",
            SortOrder: "Descending",
            IncludeItemTypes: "Episode",
            Limit: 6,
            Recursive: true,
            Fields: "PrimaryImageAspectRatio,SeriesInfo",
            Filters: "IsUnplayed"
        };

        ApiClient.getItems(Dashboard.getCurrentUserId(), options).done(function (result) {

            $('#recentlyAddedItems', page).html(LibraryBrowser.getPosterViewHtml({
                items: result.Items,
                useAverageAspectRatio: true,
                showNewIndicator: false,
                shape: "backdrop",
                showTitle: true,
                showParentTitle: true
            }));

        });

        options = {

            SortBy: "DatePlayed",
            SortOrder: "Descending",
            IncludeItemTypes: "Episode",
            Filters: "IsResumable",
            Limit: 6,
            Recursive: true,
            Fields: "PrimaryImageAspectRatio,SeriesInfo,DateCreated"
        };

        ApiClient.getItems(Dashboard.getCurrentUserId(), options).done(function (result) {

            if (result.Items.length) {
                $('#resumableSection', page).show();
            } else {
                $('#resumableSection', page).hide();
            }

            $('#resumableItems', page).html(LibraryBrowser.getPosterViewHtml({
                items: result.Items,
                useAverageAspectRatio: true,
                shape: "backdrop",
                showTitle: true,
                showParentTitle: true
            }));

        });

    });


})(jQuery, document);