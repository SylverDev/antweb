function serviceService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/services', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/services');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/services/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/services/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/services/' + id);
    };
}
