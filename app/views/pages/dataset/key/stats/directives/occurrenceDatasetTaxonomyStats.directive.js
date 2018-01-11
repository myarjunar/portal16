'use strict';

var angular = require('angular');
var _ = require('lodash');

angular
    .module('portal')
    .directive('occurrenceDatasetTaxonomyStats', occurrenceDatasetTaxonomyStats);

/** @ngInject */
function occurrenceDatasetTaxonomyStats() {
    var directive = {
        restrict: 'E',
        templateUrl: '/templates/pages/dataset/key/stats/directives/occurrenceDatasetTaxonomyStats.html',
        scope: {},
        controller: occurrenceDatasetTaxonomyStats,
        controllerAs: 'occurrenceDatasetTaxonomyStats',
        bindToController: {
            dataset: '='
        }
    };
    return directive;

    /** @ngInject */
    function occurrenceDatasetTaxonomyStats(Highcharts, DatasetOccurrenceTaxonomy, $stateParams, $filter, $state) {
        var vm = this;
        vm.loading = true;


        var query = {key: vm.dataset.key};

        vm.chartType = "sunburst"; // could also work as "treemap", may need some adjustments

        function displayRootTree(){

            DatasetOccurrenceTaxonomy.query(query).$promise
                .then(function(taxonomy) {
                    vm.loading = false;
                    vm.preparing = true;

                    vm.chart =   paintChart(Highcharts,vm.chartType, taxonomy, function (event) {
                        if(this.rank === 'ORDER'){

                            var splittedKey =    this.id.split(".");


                                centerTreeAtTAxon(splittedKey[1])


                        }
                    });
                    vm.preparing = false;

                });

        }

        function centerTreeAtTAxon(taxon_key){


            query.taxon_key = taxon_key;
            $stateParams.taxon_key =  query.taxon_key;
            $state.go('.', $stateParams, {inherit: true, notify: false, reload: false});
            vm.loading = true;
            DatasetOccurrenceTaxonomy.query(query).$promise
                .then(function(taxonomy) {
                    if(vm.chart){
                        vm.chart.destroy();
                    }
                    vm.loading = false;
                    vm.preparing = true;

                    vm.chart = paintChart(Highcharts, vm.chartType, taxonomy, function(event){
                        var taxon_key = this.id.split(".")[1];

                        if(this.rank === 'GENUS'){
                            $state.go('occurrenceSearchTable',{'taxon_key': taxon_key, 'dataset_key': vm.dataset.key});
                        } else if(this.rank === 'ORDER'){
                            delete $stateParams.taxon_key;
                            delete query.taxon_key
                            displayRootTree();
                            $state.go('.', $stateParams, {inherit: true, notify: false, reload: false});
                        }

                    });
                    vm.preparing = false;

                });

        };

        angular.element(document).ready(function () {

            if($stateParams.taxon_key) {

                centerTreeAtTAxon($stateParams.taxon_key)

            } else {
                displayRootTree();
            }




        });


    }
}

function paintChart(Highcharts, type, taxonomy, click){

    if(!type){
        type = "sunburst"
    }

    var options = {


        plotOptions: {
            sunburst: {
                size: "100%"
            }
        },
        boost: {
            useGPUTranslations: true
        },
        credits: false,
        title: {
            text: 'Taxonomic distribution of occurrences'
        },

        series: [{
            type: type,
            turboThreshold: 0,
            data: taxonomy,
            allowDrillToNode: true,
            boostThreshold: 5000,
            cursor: 'pointer',

            dataLabels: {
                format: '{point.name}',
                filter: {
                    property: 'innerArcLength',
                    operator: '>',
                    value: 16
                }
            },
            levels: [{
                level: 2,
                colorByPoint: true,
                dataLabels: {
                    rotationMode: 'parallel'
                }
            },
                {
                    level: 3,
                    colorVariation: {
                        key: 'brightness',
                        to: -0.5
                    }
                }, {
                    level: 4,
                    colorVariation: {
                        key: 'brightness',
                        to: 0.5
                    }
                }]

        }],
        tooltip: {
            headerFormat: "",
            pointFormat: '<b>{point.name} : {point.value}</b> occurrences'
        }
    };
    if(click && typeof click === 'function'){
        options.series[0].point ={
            events:{
                click: click
            }
        };
    }
   return Highcharts.chart('taxonomyStats', options);
}

module.exports = occurrenceDatasetTaxonomyStats;

