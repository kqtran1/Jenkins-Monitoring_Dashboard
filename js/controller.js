var jenkinsMonitoringModule = angular.module('jenkinsMonitoring', ['ngResource']);

jenkinsMonitoringModule.controller('JobListCtrl', ['$scope', 'JobService', function ($scope, JobService) {
    $scope.jobList = jenkinsJobList.map(function (jobConfig) {
        var job = {};
        job.url = jobConfig.url;

        JobService.async(jobConfig.url).then(function (callbackdata) {
            job.name = callbackdata.displayName;
            job.lastBuildUrl = callbackdata.lastBuild.url;
        });
        return job;
    });
}]);

jenkinsMonitoringModule.controller('JobCtrl', ['$scope', '$timeout', 'JobService', 'JobBuildService', 'JobBuildTestReportService',
    function ($scope, $timeout, JobService, JobBuildService, JobBuildTestReportService) {

        function getJobBuild() {
            console.log($scope.build);
            var jobBuild = $scope.build || {};

            if ($scope.job.lastBuildUrl) {
                // request build result
                JobBuildService.async($scope.job.lastBuildUrl).then(function (callbackdata) {
                    jobBuild.result = callbackdata.result;
                    var authors = callbackdata.changeSet.items.map(function (change) {
                        return change.author.fullName;
                    });
                    if (authors.length != 0) {
                        jobBuild.authors = authors.reduce(function (previousValue, currentValue) {
                            return previousValue + ' ' + currentValue;
                        });
                    }
                });
            }

            JobBuildTestReportService.async($scope.job.url).then(function (callbackdata) {
                jobBuild.totalTests = callbackdata.totalCount;
                jobBuild.failedTests = callbackdata.failCount;
                jobBuild.skipTests = callbackdata.skipCount;
            });

            return jobBuild;
        }

        $scope.build = getJobBuild();

        $scope.intervalFunction = function () {
            $timeout(function () {
                $scope.build = getJobBuild();
                $scope.intervalFunction();
            }, 10000)
        };

        $scope.intervalFunction();


    }]);
