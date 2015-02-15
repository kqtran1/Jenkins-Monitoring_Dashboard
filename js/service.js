jenkinsMonitoringModule.factory('JobService', function ($http, $q) {
    var jobService = {
        async: function (url) {
            var deferred = $q.defer();
            $http.get(url + '/api/json')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            ;
            return deferred.promise;
        }
    };
    return jobService;
});

jenkinsMonitoringModule.factory('JobBuildService', function ($http) {
    var jobBuildService = {
        async: function (url) {
            var promise = $http.get(url + '/api/json').then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
    return jobBuildService;
});

jenkinsMonitoringModule.factory('JobBuildTestReportService', function ($http) {
    var jobBuildTestReportService = {
        async: function (url) {
            var promise = $http.get(url + 'lastBuild/testReport/api/json').then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
    return jobBuildTestReportService;
});