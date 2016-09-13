angular.module('fileUpload', ['ngFileUpload'])
    .controller('MyCtrl', ['Upload', '$scope', '$timeout', function (Upload, $scope, $timeout) {

        $scope.upload = function (files) {
            if (files && files.length) {

                Upload.upload({
                    url: 'http://localhost:8877/upload', //webAPI exposed to upload the file
                    data: { file: files, test: $scope.systest, uuid: '4AECBD' } //pass file as data, should be user ng-model
                }).then(function (response) {
                    //validate success
                    if (response.data.error_code === 0) {
                        $scope.succesMsg = 'Success uploading' + response.config.data.file.name;
                        $scope.showMessage = true;
                        $timeout(function () {
                            $scope.showMessage = false;
                        }, 3000);

                    } else {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (response) {
                    console.log('Error status: ' + response.status);
                });
            }
        }
    }]);