(function () {
    'use strict';
    var angular = require('angular');

    angular
        .module('portal')
        .filter('prettifyEnum', function () {
            return function (text) {
                if (typeof text === 'undefined') {
                    return '';
                }
                return text.charAt(0) + text.slice(1).toLowerCase().replace(/_/g, ' ');
            }
        })
        .filter('truncate', function () {
            return function (text, length) {
                length = length || 10;
                if (typeof text !== 'string') {
                    return '';
                }
                return text.length > length ? text.slice(0, length) + '…' : text;
            }
        })
        .filter('underscoreToHyphen', function () {
            return function (text) {
                return text.replace(/_/g, '-');
            }
        })
        .filter('encodeURIComponent', function () {
            return window.encodeURIComponent;
        })
        .filter('localNumber', function () {
            return function (num, lang) {
                if (angular.isUndefined(num)) return '';
                return num.toLocaleString(lang);
            }
        })
        .filter('startFrom', function () {
            return function (input, start) {
                start = +start; //parse to int
                return input.slice(start);
            }
        })
        .filter('stripTags', function () {
            return function (text) {
                return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            };
        })
        .filter('unique', function () {
            return function (a) {
                if (angular.isString(a)) return [a];
                if (!Array.isArray(a)) return [];
                var n = {}, r = [];
                for (var i = 0; i < a.length; i++) {
                    if (!n[a[i]] && typeof a[i] !== 'undefined') {
                        n[a[i]] = true;
                        r.push(a[i]);
                    }
                }
                return r;
            }
        })
        .filter('uniqueLower', function () {
            return function (a) {
                if (angular.isString(a)) return [a.toString().toLowerCase()];
                if (!Array.isArray(a)) return [];
                var n = {}, r = [];
                for (var i = 0; i < a.length; i++) {
                    var val = a[i].toString().toLowerCase();
                    if (!n[val]) {
                        n[val] = true;
                        r.push(val);
                    }
                }
                return r;
            }
        })
        .filter('authorFirstName', function(){
            return function(text) {
                return (text) ? text.charAt(0).toUpperCase() + '.' : '';
            }
        })
        .filter('formatBytes', function(){
            return function(bytes, lang, decimals) {
                decimals = decimals || 1;
                if (bytes == 0) return '0 Byte';
                var k = 1000;
                var dm = decimals + 1 || 3;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)).toLocaleString(lang) + ' ' + sizes[i];
            }
        })
})();