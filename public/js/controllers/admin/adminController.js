function adminController(mainService, $timeout) {
    this.mainService = mainService;

    // Réalisations
    this.order = '-_id';

    this.load = () => {
        this.mainService.getAll().then((res) => {
            this.realisations = res.data;
            this.realisations.map((n) => {
                n.date = new Date(n.date);
                return n;
            })
        });
        $(document).ready(function() {
            $('.collapsible').collapsible({
                accordion: false,
            });
        });
    };
    this.load();


    this.activeFirst = (index) => {
        $('.collapsible').collapsible('open', index);
        $(".collapsible-header:eq(index)").scrollTop();
    };

    this.create = () => {
        this.mainService.create().then(() => {
            this.load();
            $timeout(function() {
                $(".collapsible ").collapsible({
                    accordion: false,
                    active: true
                });
                $(".collapsible-header:eq(0)").addClass("active");
            }, 500);
        });
    };

    this.update = (realisation, index) => {
        var uploadfiles = document.querySelector('#uploadImage-' + index);
        var files = uploadfiles.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var url = '/api/picture';
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                xhr.open("POST", url, true);
                xhr.onload = () => {
                    var urlImage = '/uploads/img_' + document.getElementById('uploadImage-' + index).value.split(/(\|\/)/g).pop().replace('C:\\fakepath\\', '');

                    realisation.logo = urlImage;
                    this.mainService.update(realisation._id, realisation).then(() => {
                        $timeout(() => {
                            this.load();
                        }, 1000);

                    });
                };
                fd.append("upload_file", files[i]);
                xhr.send(fd);
            }
        } else {
            this.mainService.update(realisation._id, realisation).then(() => {
                this.load();
            });
        }
    };

    this.delete = (realisation) => {
        this.mainService.delete(realisation._id).then(() => {
            this.load();
        });
    };

    // this.openFile = () => {
    //     var input = event.target;
    //     var reader = new FileReader();
    //     var output = document.getElementById('output');
    //     var dataURL = reader.result;
    //     output.src = dataURL;
    //     reader.readAsDataURL(input.files[0]);
    // };






    // this.expandAll = () => {
    //     $(".collapsible-header").addClass("active");
    //     $(".collapsible").collapsible({
    //         accordion: false
    //     });
    // }
    //
    // this.collapseAll = () => {
    //     $(".collapsible-header").removeClass(function() {
    //         return "active";
    //     });
    //     $(".collapsible").collapsible({
    //         accordion: true
    //     });
    //     $(".collapsible").collapsible({
    //         accordion: false
    //     });
    // }
};
