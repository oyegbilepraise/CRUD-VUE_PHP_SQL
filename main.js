<script src="https://unpkg.com/axios/dist/axios.min.js"></script>;

var app = new Vue({
    el: '#app',
    data: {
        errorMsg: '',
        successMsg: '',
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        users: [],
        newUser: { name: '', email: '', phone: '' },
        currentUser: {}
    },
    mounted: function () {
        this.getAllUsers();
    },
    methods: {
        getAllUsers() {
            axios.get('http://localhost/CRUD%20VUE%20PHP/process.php?action=read').then(function (res) {
                if (res.data.error) {
                    app.errorMsg = res.data.message;
                } else {
                    app.users = res.data.users;
                }
            })
        },
        addUser() {
            var formData = app.toFormData(app.newUser);
            axios.post('http://localhost/CRUD%20VUE%20PHP/process.php?action=create', formData).then(function (res) {
                app.newUser = { name: '', email: '', phone: '' };
                if (res.data.error) {
                    app.errorMsg = res.data.message;
                } else {
                    app.successMsg = res.data.message;
                    app.getAllUsers()
                }
            })
        },
        updateUser() {
            var formData = app.toFormData(app.currentUser);
            axios.post('http://localhost/CRUD%20VUE%20PHP/process.php?action=update', formData).then(function (res) {
                app.currentUser = { };
                if (res.data.error) {
                    app.errorMsg = res.data.message;
                } else {
                    app.successMsg = res.data.message;
                    app.getAllUsers()
                }
            })
        },
        deleteUser() {
            var formData = app.toFormData(app.currentUser);
            axios.post('http://localhost/CRUD%20VUE%20PHP/process.php?action=delete', formData).then(function (res) {
                app.currentUser = { };
                if (res.data.error) {
                    app.errorMsg = res.data.message;
                } else {
                    app.successMsg = res.data.message;
                    app.getAllUsers()
                }
            })
        },
        toFormData(obj) {
            var fd = new FormData();
            for (var i in obj) {
                fd.append(i, obj[i])
            }
            return fd;
        },
        selectUser(user) {
            app.currentUser = user
        },
        clearMsg() {
            app.errorMsg = '';
            app.successMsg = '';
        }
    }
})