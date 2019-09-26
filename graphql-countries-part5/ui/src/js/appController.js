/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
  function (oj, ko, moduleUtils) {
    function ControllerViewModel() {
      var self = this;

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'dashboard': {
          label: 'REST vs GraphQL',
          isDefault: true
        }
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.moduleConfig = ko.observable({
        'view': [],
        'viewModel': null
      });

      self.loadModule = function () {
        ko.computed(function () {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          var masterPromise = Promise.all([
            moduleUtils.createView({
              'viewPath': viewPath
            }),
            moduleUtils.createViewModel({
              'viewModelPath': modelPath
            })
          ]);
          masterPromise.then(
            function (values) {
              self.moduleConfig({
                'view': values[0],
                'viewModel': values[1]
              });
            }
          );
        });
      };

      // Navigation setup
      var navData = [{
        name: 'REST vs GraphQL',
        id: 'dashboard'
      }];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {
        idAttribute: 'id'
      });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("REST vs GraphQL");

    }

    return new ControllerViewModel();
  }
);