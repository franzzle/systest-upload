angular.module('fileUpload', ['ngFileUpload'])
    .controller('MyCtrl',['Upload','$window',function(Upload,$window){
        var vm = this;
        vm.submit = function(){ //function to call on form submit
            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
                vm.upload(vm.file); //call upload function
            }
        }
        vm.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:8877/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    console.log('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
            });
        };
    }]);