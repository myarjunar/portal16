'use strict';

var angular = require('angular'),
    _ = require('lodash');

angular
    .module('portal')
    .controller('faqCtrl', faqCtrl);

/** @ngInject */
function faqCtrl($sce, Page, $state, $stateParams, ResourceSearch, ResourceItem, $location, $anchorScroll) {
    var vm = this;
    vm.limit = 50;
    vm.maxSize = 5;
    vm.offset = 0;
    vm.question = $stateParams.question;
    vm.q = $stateParams.q;
    vm.answers = ResourceSearch.query({q: vm.q, contentType: 'help', limit: vm.limit, offset: vm.offset});

    vm.search = function() {
        vm.answer = undefined;
        if (_.isString(vm.q) && vm.q.indexOf('question:') == 0) {
            vm.linkToAnswer(vm.q.substr(9));
        } else {
            $location.hash('');
            $state.go('.', {question: undefined, q: vm.q}, {inherit: true, notify: true, reload: false});
        }
    };
    window.scrollTo(0, 0);

    vm.pageChanged = function () {
        vm.offset = (vm.currentPage - 1) * vm.limit;
        vm.search();
        window.scrollTo(0, 0);
    };

    if ($stateParams.question) {
        vm.question = $stateParams.question;
    }

    vm.linkToAnswer = function(identifier) {
        $state.go('.', {question: identifier, q: undefined, '#':'faq-search'}, {inherit: true, notify: true, reload: true});
    };

    vm.expandAnswer = function(question) {
        vm.helpItem = ResourceItem.query({
            contentType: 'help',
            identifier: question.identifier,
            locale: $stateParams.locale
        });
        vm.helpItem.$promise.then(function (resp) {
            question._trustedBody = $sce.trustAsHtml(resp.body);
            question._expanded = true;
        }).catch(function () {
            vm.failed = true;
            vm.loading = false;
        });
    };

    if (vm.question) {
        vm.q = 'question:' + vm.question;
        vm.helpItem = ResourceItem.query({
            contentType: 'help',
            identifier: vm.question,
            locale: $stateParams.locale
        });
        vm.helpItem.$promise.then(function (resp) {
            $anchorScroll();
            vm.answer = resp;
            vm.answer._trustedBody = $sce.trustAsHtml(resp.body);
        }).catch(function () {
            vm.failed = true;
            vm.loading = false;
        });
    }
}

module.exports = faqCtrl;