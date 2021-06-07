var countries = [
    { country: "Maldives", active: true },
    { country: "Tahiti", active: true },
    { country: "Bahamas", active: true },
    { country: "Hawaii", active: false },
    { country: "Indonesia", active: true },
];

var destinations = [
    {
        country: "Maldives",
        title: "Maldives",
        description: "Strung across the Indian Ocean southwest of India and Sri Lanka, the 26 natural atolls of the Maldives exude an almost surreal beauty due, in large part, to the luminous blue waters that surround them.",
        imageUrl: "https://pix10.agoda.net/hotelImages/6890324/-1/ad4c1139afa29dfc6158cc048ca2bb37.jpg?s=1024x768",
    },
    {
        country: "Tahiti",
        title: "Bora Bora",
        description: "Bora Bora is the quintessential South Pacific paradise. This lush and dramatically beautiful island in French Polynesia rises to a sharp emerald peak ringed by an azure lagoon.",
        imageUrl: "https://cache.marriott.com/marriottassets/marriott/BOBXR/bobxr-exterior-aerialview-1580-hor-wide.jpg?interpolation=progressive-bilinear&downsize=1440px:*",
    },
    {
        country: "Bahamas",
        title: "The Abacos",
        description: "Almost 300 kilometers east of Florida, the beautiful Abacos, in the Bahamas, offer some of the world's best waters for boating and sailing.",
        imageUrl: "https://boatimages0.boatbookings.com/imgcache//abacos_Bahamas_abacos_itinerary_10332_20666_3ac881.jpg",
    },
    {
        country: "Hawaii",
        title: "Kaua'i",
        description: "Called the Garden Isle, Kaua'i is a tropical Eden, with lush rainforests, waterfalls, and spectacular green coastal peaks.",
        imageUrl: "https://www.gohawaii.com/sites/default/files/styles/narrow_carousel_large/public/content-carousel-images/WaterActivitiesKauai.jpg?itok=-pU5VgvZ",
    },
    {
        country: "Hawaii",
        title: "Honalulu",
        description: "In this cosmopolitan capital city, you’ll find everything from historic landmarks to fine dining to world-class shopping",
        imageUrl: "https://assets3.thrillist.com/v1/image/2766704/size/gn-gift_guide_variable_c.jpg",
    },
    {
        country: "Indonesia",
        title: "Bali",
        description: "Bali beckons with its mystical charm. Temples filled with fragrant incense; rice paddies glowing in the late amber sun; and the calm, gentle people of Bali add to this island's irresistible allure.",
        imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/222/222790006.jpg",
    },
];

$(document).ready(function () {
    $(".menuToggler").on("click", function () {
        $(".navlinks").toggleClass("open");
    });
    var errorMessageTimeout;
    $("#tripSearchForm").on("submit", function (e) {
        e.preventDefault();
        $(".tripSearchFormContainer").find(".errorMessage").addClass("shown");
        clearTimeout(errorMessageTimeout);
        errorMessageTimeout = setTimeout(function () {
            $(".tripSearchFormContainer").find(".errorMessage").removeClass("shown");
        }, 2000);
    })

    countries.forEach(function (curr, i) {
        var button = $(`
        <button class="filterTag mb-3 mr-3 px-3 font-14 rounded-pill" data-country="${curr.country}">${curr.country.toUpperCase()}</button>
      `);
        if (curr.active) {
            button.addClass("active");
        }
        $("#filterTagsContainer").append(button);
        button.on("click", function () {
            $(this).toggleClass("active");
            countries.forEach((country, i, arr) => {
                if (country.country === $(this).attr("data-country")) {
                    arr[i].active = !arr[i].active;
                }
            });
            renderDestinations();
        });
    });

    renderDestinations();
});

function renderDestinations() {
    $("#destinationContainer").empty();
    destinations.forEach(function (destination, i) {
        if (countries.find(function (country) {
            if (country.country === destination.country && country.active) {
                return true;
            }
            return false;
        })) {
            $("#destinationContainer").append(`
        <div class="col-12 col-sm-6 col-md-3 mb-5">
          <div class="w-100 rounded mb-2" style="padding-top: 60%; background: url('${destination.imageUrl}'); background-size: cover; background-position: center;"></div>
          <p class="m-0"><b>${destination.title}</b></p>
          <p>${destination.description}</p>
        </div>
      `);
        }
    });
}