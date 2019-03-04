const templateUrl = require('~components/lookup-list/lookup-list.partial.html');

function LookupListController (GetBasePath, Rest, strings) {
    const vm = this || {};

    vm.strings = strings;

    vm.$onInit = () => {
        const params = vm.baseParams;
        setBaseParams(params);
        setData({ results: [], count: 0 });

        const resultsFilter = vm.resultsFilter || (data => data);
        Rest.setUrl(GetBasePath(`${vm.resourceName}s`));
        Rest.get({ params })
            .then(({ data }) => {
                setData(resultsFilter(data));
            });
    };

    function setData ({ results, count }) {
        vm.dataset = { results, count };
        vm.collection = vm.dataset.results;
    }

    function setBaseParams (params) {
        vm.list = { name: vm.resourceName, iterator: vm.resourceName };
        vm.defaultParams = params;
        vm.queryset = params;
    }
}

LookupListController.$inject = [
    'GetBasePath',
    'Rest',
    'ComponentsStrings',
];

export default {
    templateUrl,
    controller: LookupListController,
    controllerAs: 'vm',
    bindings: {
        onSelect: '=',
        onRowClick: '=',
        selectedId: '=',
        resourceName: '@',
        baseParams: '=',
        resultsFilter: '=',
    },
};