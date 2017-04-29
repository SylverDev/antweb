function mainService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/realisations', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/realisations');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/realisations/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/realisations/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/realisations/' + id);
    };
}
