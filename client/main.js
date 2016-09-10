angular.module('fileUpload', ['ngFileUpload'])
    .controller('MyCtrl', ['Upload', '$scope', function (Upload, $scope) {
        $scope.upload = function (file) {
            file.upload = Upload.upload({
                url: 'http://localhost:8877/upload', //webAPI exposed to upload the file
                data: { file: file, nameTest: $scope.nameTest } //pass file as data, should be user ng-model
            });

            //upload function returns a promise
            file.upload.then(function (response) {
                //validate success
                if (response.data.error_code === 0) {
                    console.log('Success ' + response.config.data.file.name + 'uploaded. responseonse: ');
                } else {
                    console.log('An error occured');
                }
            }, function (response) {
                console.log('Error status: ' + response.status);
            });
        };
    }]);