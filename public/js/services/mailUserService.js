function mailUserService($http) {

    this.$http = $http;
    this.mailTransport = (data1, data2, data3, data4) => {
        return this.$http.post('/api/sendEmail', {
            name: data1,
            email: data2,
            tel: data3,
            msg: data4,
        });
    };
}
