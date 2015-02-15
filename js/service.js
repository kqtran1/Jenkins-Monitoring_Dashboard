jenkinsMonitoringControllers.factory('JobService', function ($http) {
    var jobService = {
        async: function (url) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url + '/api/json').then(function (response) {
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return jobService;
});

jenkinsMonitoringControllers.factory('JobBuildService', function ($http) {
    var jobBuildService = {
        async: function (url) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url + '/api/json').then(function (response) {
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return jobBuildService;
});

jenkinsMonitoringControllers.factory('JobBuildTestReportService', function ($http) {
    var jobBuildTestReportService = {
        async: function (url) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url + '/lastBuild/testReport/api/json').then(function (response) {
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return jobBuildTestReportService;
});