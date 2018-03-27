(function(){

function GetAllService($http){
	
	function GetAll(){
      return $http.get('/bookday/');
    }
	
    var factory = {
      GetAll: GetAll
    };

    return factory;	
  }
  
  function GetByIdService($http){
	
	function GetById(id){
      return $http.get('/bookday/' + id);
    }

    var factory = {
      GetById: GetById
    };

    return factory;
  }
  
  function CreateService($http){
	
	function Create(data){
      return $http.post('/bookday', data);
    }

    var factory = {
      Create: Create
    };

    return factory;

  }
  
  function UpdateService($http){
	
	function Update(id,recept){
      return $http.put('/bookday/' + id, recept)
    }

    var factory = {
      Update: Update
    };

    return factory;

  }
  
  function DeleteService($http){
	
    function Delete(id){
      return $http.delete('/bookday/' + id);
    }

    var factory = {
      Delete: Delete
    };
	
    return factory;

  }
  
function Controller($scope, GetAllService,GetByIdService,CreateService,UpdateService,DeleteService) {

console.log("I am in controller");
	$scope.filteredTodos = []
   ,$scope.currentPage = 1
   ,$scope.numPerPage = 2
   ,$scope.maxSize = 5;

   
	var refresh = function() {
		var promise = GetAllService.GetAll();
		promise.then(function(response){
		$scope.bookday = response.data;
		$scope.len=$scope.bookday.length;
		$scope.page=Math.ceil($scope.len/$scope.numPerPage);
		$scope.contact = "";
		});
	};

	refresh();
	//панинация
	$scope.numPages = function () {
		var promise = GetAllService.GetAll();
		promise.then(function(response){
			$scope.bookday = response.data;
			$scope.numPages= Math.ceil($scope.bookday.length / $scope.numPerPage);
		}); 
	};
	  
	var pagin = function() {
		$scope.$watch('currentPage + numPerPage', function() {
			var promise = GetAllService.GetAll();
			promise.then(function(response){
				$scope.bookday = response.data;
				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
				var end = begin + $scope.numPerPage; 
				$scope.filteredTodos = $scope.bookday.slice(begin, end);
			});
		});
	};
	pagin();  
	//конец пагинации
	$scope.addContact = function() {
		var d1 = new Date();
		var d1Year = d1.getFullYear();
		var d1Month = d1.getMonth();
		var d1Day = d1.getDate();
		var d2;
		
		d1Month=d1Month+1;
		if (d1Month<10){
			d2=d1Day+'.'+'0'+d1Month+'.'+d1Year;
		}else{
			d2=d1Day+'.'+d1Month+'.'+d1Year;
		};
		$scope.contact.registr=d2;
		//--
		var promise = CreateService.Create($scope.contact);
		promise.then(function(){
			pagin();			  
			refresh();
		}); 
	};
	$scope.remove = function(id) {
	  var promise = DeleteService.Delete(id);
		promise.then(function(){
			pagin();			  
			refresh();
		});  
	};
	$scope.edit = function(id) {
		var promise = GetByIdService.GetById(id);
		promise.then(function(response){
			$scope.contact = response.data;
		});
	};  

	$scope.update = function() {
		var promise = UpdateService.Update($scope.contact._id, $scope.contact);
		promise.then(function(response){
			pagin();
			refresh();
		});
	};

	$scope.deselect = function() {
	  $scope.contact = "";
	};
};//Controller

angular
.module('myApp', [])
.factory('GetAllService', GetAllService)
.factory('GetByIdService', GetByIdService)
.factory('CreateService', CreateService)
.factory('UpdateService', UpdateService)
.factory('DeleteService', DeleteService)
.controller('AppCtrl', Controller);

})();