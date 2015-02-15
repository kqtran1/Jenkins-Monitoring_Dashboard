var jenkinsMonitoringControllers = angular.module('jenkinsMonitoring', ['ngResource']);

jenkinsMonitoringControllers.controller('JobCtrl', ['$scope', '$timeout', 'JobService', 'JobBuildService', 'JobBuildTestReportService',
    function ($scope, $timeout, JobService, JobBuildService, JobBuildTestReportService) {

        function getJobDescriptions() {
            return jenkinsJobList.map(function (jobConfig) {
                var jobBuild = {};
                JobService.async(jobConfig.url).then(function (callbackdata) {
                    jobBuild.jobName = callbackdata.displayName;

                    // request build result
                    JobBuildService.async(callbackdata.lastBuild.url).then(function (callbackdata) {
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

                });

                // request tests result
                JobBuildTestReportService.async(jobConfig.url).then(function (callbackdata) {
                    jobBuild.totalTests = callbackdata.totalCount;
                    jobBuild.failedTests = callbackdata.failCount;
                    jobBuild.skipTests = callbackdata.skipCount;
                });

                return jobBuild;
            });
        }

        $scope.jobBuilds = getJobDescriptions();

        $scope.intervalFunction = function(){
            $timeout(function() {
                $scope.jobBuilds = getJobDescriptions();
                $scope.intervalFunction();
            }, 10000)
        };

        $scope.intervalFunction();


    }]);
