angular.module('extension.storidge')
.controller('StoridgeDrivesController', ['$q', '$scope', '$state', 'Notifications', 'StoridgeDriveService',
function ($q, $scope, $state, Notifications, StoridgeDriveService) {

  // $scope.removeAction = function(selectedItems) {
  //   ModalService.confirm({
  //     title: 'Are you sure?',
  //     message: 'Do you want really want to remove the drives from the storage pool?',
  //     buttons: {
  //       confirm: {
  //         label: 'Remove',
  //         className: 'btn-danger'
  //       }
  //     },
  //     callback: function onConfirm(confirmed) {
  //       if(!confirmed) { return; }
  //       var actionCount = selectedItems.length;
  //       selectedItems = selectedItems.filter(function (item) {
  //         return item.Status === 'faulty';
  //       });
  //       angular.forEach(selectedItems, function (drive) {
  //         StoridgeDriveService.remove(drive.Id)
  //         .then(function success() {
  //           Notifications.success('Drive successfully removed', drive.Id);
  //         })
  //         .catch(function error(err) {
  //           Notifications.error('Failure', err, 'Unable to remove drive');
  //         })
  //         .finally(function final() {
  //           --actionCount;
  //           if (actionCount === 0) {
  //             $state.reload();
  //           }
  //         });
  //       });
  //     }
  //   });
  // };

  // $scope.addAction = function (selectedItems) {
  //   var actionCount = selectedItems.length;
  //   selectedItems = selectedItems.filter(function (item) {
  //     return item.Status === 'available';
  //   });
  //   angular.forEach(selectedItems, function (drive) {
  //     StoridgeDriveService.add(drive.Device, drive.Node)
  //     .then(function success() {
  //       Notifications.success('Drive ' + drive.Device + ' successfully added on node ' + drive.Node);
  //     })
  //     .catch(function error(err) {
  //       Notifications.error('Failure', err, 'Unable to add drive');
  //     })
  //     .finally(function final() {
  //       --actionCount;
  //       if (actionCount === 0) {
  //         $state.reload();
  //       }
  //     });
  //   });
  // };

  $scope.rescanAction = function () {
    StoridgeDriveService.rescan()
    .then(function sucess() {
      $state.reload();
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to scan drives');
    });
  };

  function initView() {
    StoridgeDriveService.drives()
    .then(function success(data) {
      $scope.drives = data;
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to retrieve drives');
    });
  }

  initView();
}]);
