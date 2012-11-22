(function ($) {
    var $template = $('<div class="tooltip"><p class="message"></p></div>');

    $.fn.tooltip = function () {
        return this.each(function () {
            var $body = $("body"),
                $element = $(this),
                $tooltip,
                title = $element.attr("title");

            var show = function () {
                if ($tooltip && $tooltip.length) $tooltip.remove();

                $tooltip = $template.clone()
                    .find(".message")
                    .text(title).end();

                $body.append($tooltip);
                positionTooltip($tooltip, $element);
                $tooltip.addClass("visible");
            };

            var hide = function () {
                $tooltip.on("transitioned webkitTransitionEnd", function () {
                    $tooltip.remove();
                });

                $tooltip.removeClass("visible");
            };

            $element
                .addClass("has-tooltip")
                .removeAttr("title")
                .on("mouseenter", show)
                .on("mouseleave", hide)
                .on("click", hide);
        });
    };

    // TODO: Can we calculate this with just CSS?
    var positionTooltip = function (tooltip, element) {
        var targetPosition = element.offset(),
            targetWidth = element.outerWidth(true),
            tooltipWidth = tooltip.outerWidth(true),
            tooltipHeight = tooltip.outerHeight(true);

        tooltip.css({
            top: (targetPosition.top - (tooltipHeight + 16)),
            left: (targetPosition.left - ((tooltipWidth - targetWidth) / 2))
        });
    };
})(jQuery);