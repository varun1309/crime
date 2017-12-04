angular.module('search').component('search', {
    templateUrl: '/components/search/search.template.html',
    controller: function () {        
        console.log('inside search controller');
        
        var self = this;
        self.$onInit = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, function () {
                    showPosition();
                })
            }
        };

        function showPosition(position) {
            console.log('inside showposition');
            console.log(position);
        }

    }
});

angular.module('search').controller('TypeaheadCtrl', ['$scope', '$http', function ($scope, $http) {
    var states = { "AL": "Alabama", "AK": "Alaska", "AS": "American Samoa", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FM": "Federated States Of Micronesia", "FL": "Florida", "GA": "Georgia", "GU": "Guam", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MH": "Marshall Islands", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "MP": "Northern Mariana Islands", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VI": "Virgin Islands", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
    


    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function (val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                region: "us",
                address: val,
                sensor: false
            }
        }).then(function (response) {
            return response.data.results.map(function (item) {
                return item.formatted_address;
            });
        });
    };

    $scope.getCityData = function (params) {
        console.log('inside getCityData');
        console.log(params);
        var data = params.split(',');
        var host = 'http://10.152.181.9:3000/';

        //http://10.152.181.9:3000/federalExpenses/ArizoNA
        //http://10.152.181.9:3000/crimeData/tempe/arizona
        //http://10.152.181.9:3000/educationData/arizona

        var fedExpenseUrl = host + 'federalExpenses/';
        var crimeDataUrl = host + 'crimeData/';
        var demoUrl = host + 'educationData/';

        if(data[0] !== undefined && data[1] !== undefined) {
            var city = data[0].trim();
            var state = states[data[1].trim()].trim();
            crimeDataUrl = host + 'crimeData/' + city + '/' + state;
            fedExpenseUrl = host + 'federalExpenses/' + state;
            demoUrl = host + 'educationData/' + state;
        }

        $scope.fedExpense = $http.get(fedExpenseUrl).then(function (response) {
            console.log('fed', response);
            return response;
        });
        $scope.demography = $http.get(demoUrl).then(function (response) {
            console.log('demo', response);
            return response;
        });
        $scope.crimeData = $http.get(crimeDataUrl).then(function (response) {
            console.log('crime', response);
            return response;
        });
    }
}]);