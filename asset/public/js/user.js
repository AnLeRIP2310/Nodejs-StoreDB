// hàm hiển thị các input chỉnh sửa
window.addEventListener('DOMContentLoaded', () => {
    // Function chuyển đổi đống mở form edit trên user
    function toggleInputField() {
        const editButton = $('#editButton');
        const saveButton = $('#saveButton');
        const closeButton = $('#closeButton');
        const elementsToToggle = [
            { label: $('#lblPhoneNumber'), input: $('#tblPhoneNumber') },
            { label: $('#lblGender'), input: $('#genderSelect') },
            { label: $('#lblDateofbirth'), input: $('#tblDateofbirth') },
            { label: $('#lblAddress'), input: $('#tblAddress') },
            { label: $('#displayName'), input: $('#tblDisplayName') },
        ];

        // Button mở input edit
        editButton.on('click', () => {
            if ($('#userAvatar').hasClass('d-none')) {
                $('#userAvatar').removeClass('d-none');
            }
            if ($('#Useradvanced').hasClass('d-none')) {
                $('#Useradvanced').removeClass('d-none');
            }

            elementsToToggle.forEach(element => {
                element.label.css('display', 'none');
                element.input.css('display', 'block');
            });
            toggleButton(true);
        });

        // Button đóng input edit
        closeButton.on('click', () => {
            closeInput();
            $('#userAvatar').addClass('d-none');
            $('#Useradvanced').addClass('d-none');
        });
        function closeInput() {
            elementsToToggle.forEach(element => {
                element.label.css('display', 'block');
                element.input.css('display', 'none');
            });
            toggleButton(false);
        }
        function toggleButton(showBtn = true) {
            editButton.css('display', showBtn ? 'none' : 'block');
            saveButton.css('display', showBtn ? 'block' : 'none');
            closeButton.css('display', showBtn ? 'block' : 'none');
        }
        // Button cập nhật dữ liệu người dùng
        saveButton.on('click', () => {
            //Kiểm tra và chuyển đổi giá trị gender
            var gioiTinh;
            if ($('#genderSelect').val() === 'male') {
                gioiTinh = 'Nam';
            } else if ($('#genderSelect').val() === 'female') {
                gioiTinh = 'Nữ';
            } else {
                gioiTinh = 'Khác';
            }

            //lấy dữ input
            const data = {
                DisplayName: $('#tblDisplayName').val(),
                PhoneNumber: $('#tblPhoneNumber').val(),
                DateOfBirth: $('#tblDateofbirth').val(),
                Address: $('#tblAddress').val(),
                Gender: gioiTinh,
            };

            $.ajax({
                url: 'updateUser',
                type: 'POST',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    if (result.success) {
                        showSuccessToast('Cập nhật thành công');
                        closeInput();
                        $('#userAvatar').addClass('d-none');
                        $('#Useradvanced').addClass('d-none');
                    } else {
                        showErrorToast('Cập nhật thất bại');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });

        // Function xoá error class trên password
        function userVailidatePwd() {
            $('#currentPassword').on('change', function () {
                if ($('#currentPassword').hasClass('is-invalid')) {
                    $('#currentPassword').removeClass('is-invalid');
                }
            });
            $('#newPassword').on('change', function () {
                if ($('#newPassword').hasClass('is-invalid')) {
                    $('#newPassword').removeClass('is-invalid');
                }
            });
            $('#confirmPassword').on('change', function () {
                if ($('#confirmPassword').hasClass('is-invalid')) {
                    $('#confirmPassword').removeClass('is-invalid');
                }
            });
        } userVailidatePwd();

        // Button cập nhật mật khẩu mới
        $('#btnSavePassword').click(() => {
            if ($('#currentPassword').val() == '') { $('#currentPassword').addClass('is-invalid'); }
            if ($('#newPassword').val() == '') { $('#newPassword').addClass('is-invalid'); }
            if ($('#confirmPassword').val() == '') { $('#confirmPassword').addClass('is-invalid'); }

            if ($('#newPassword').val() != $('#confirmPassword').val()) {
                $('#confirmPassword').addClass('is-invalid');
                $('#err-cfpwd').text('Mật khẩu xác nhận không trùng nhau');
                return;
            }

            const data = {
                OldPassword: $('#currentPassword').val(),
                NewPassword: $('#newPassword').val(),
            };

            $.ajax({
                url: 'updaePasswordUser',
                type: 'POST',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    if (result.notExist) {
                        $('#currentPassword').addClass('is-invalid');
                        $('#err-cpwd').text('Mật khẩu cũ không chính xác');
                    }

                    if (result.success) {
                        showSuccessToast('Cập nhật mật khẩu thành công');
                    } else {
                        showErrorToast('Cập nhật mật khẩu thất bại');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    } toggleInputField();

    // Code đặt css focus cho thẻ div tagInput
    $('#tagInput').on('focus', function () {
        $('.tag-input').addClass('tag-input-focus');
    });
    $('#tagInput').on('blur', function () {
        $('.tag-input').removeClass('tag-input-focus');
    });

    // Code thêm các tags vào thẻ div tagInput
    function addtagsearchinput() {
        const tagsContainer = document.querySelector('.tags');
        const tagInput = document.querySelector('#tagInput');
        if (tagInput) {
            tagInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && tagInput.value.trim() !== '') {
                    const tag = document.createElement('div');
                    tag.className = 'tag';
                    tag.textContent = tagInput.value;
                    const closeButton = document.createElement('span');
                    closeButton.className = 'close-button';
                    closeButton.innerHTML = '&#10006;';
                    closeButton.addEventListener('click', function () {
                        tagsContainer.removeChild(tag);
                    });
                    tag.appendChild(closeButton);
                    tagsContainer.appendChild(tag);
                    tagInput.value = '';
                }
            });
        }
    } addtagsearchinput();

    function clearErrorMsgInput() {
        $('#productName').on('change', function () {
            if ($('#productName').hasClass('is-invalid')) {
                $('#productName').removeClass('is-invalid');
            }
        });
        $('#price').on('change', function () {
            if ($('#price').hasClass('is-invalid')) {
                $('#price').removeClass('is-invalid');
            }
        });
        $('#image').on('change', function () {
            if ($('#image').hasClass('is-invalid')) {
                $('#image').removeClass('is-invalid');
            }
        });
        $('#quantity').on('change', function () {
            if ($('#quantity').hasClass('is-invalid')) {
                $('#quantity').removeClass('is-invalid');
            }
        });
        $('#editor').on('change', function () {
            if ($('#editor').hasClass('is-invalid')) {
                $('#editor').removeClass('is-invalid');
            }
        });
    } clearErrorMsgInput();

    // Jquery thực hiện thêm sản phẩm
    $('#btnAdd').click(function () {

        if ($('#productName').val() == '') {
            $('#productName').addClass('is-invalid');
        }
        if ($('#price').val() == '') {
            $('#price').addClass('is-invalid');
        }
        if ($('#image').prop('files').length == 0) {
            $('#image').addClass('is-invalid');
        }
        if ($('#quantity').val() == '') {
            $('#quantity').addClass('is-invalid');
        }
        if ($('#editor').html() == '<p><br data-cke-filler="true"></p>') {
            $('#editor').addClass('is-invalid');
        }

        if ($('#productName').val() != '' && $('#price').val() != '' &&
            $('#image').prop('files').length != 0 && $('#quantity').val() != '' && $('#editor').html() != '<p><br data-cke-filler="true"></p>') {

            // Xử lý tải lên hình ảnh sản phẩm
            const files = document.querySelector('#image').files;
            const formData = new FormData();

            for (const file of files) {
                formData.append('file', file);
            };
            $.ajax({
                url: '/upload/image',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    // Lấy các tags
                    var tagsArray = [];
                    $('.tags .tag').each(function () {
                        var tagText = $(this).contents().filter(function () {
                            return this.nodeType === Node.TEXT_NODE;
                        }).text().trim(); // Lấy nội dung văn bản và loại bỏ khoảng trắng thừa
                        tagsArray.push(tagText);
                    });

                    // khai báo dữ liệu
                    const data = {
                        productName: $('#productName').val(),
                        price: $('#price').val(),
                        image: res.uploadedFilePath, //lấy đường dẫn hình ảnh
                        category: $('#category').val(),
                        quantity: $('#quantity').val(),
                        description: $('#editor').html(),
                        tags: tagsArray,
                        slugs: $('#productSlug').val(),
                    }
                    // xử lý gửi dữ liệu về api để tải lên sản phẩm
                    $.ajax({
                        url: 'quan-ly-san-pham/createProduct',
                        method: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                showSuccessToast('Thêm sản phẩm thành công');
                                $('#modal-addProduct').modal('hide'); // ẩn modal
                                // Đặt lại nội dung trong các input
                                $('#productName').val('');
                                $('#price').val('');
                                $('#image').val('');
                                $('#category').val('1');
                                $('#quantity').val('1');
                                // Đặt lại nội dung trong ckeditor
                                if (editor) {
                                    editor.setData(initialContent);
                                }
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });

    // Jquery thực hiện cập nhật sản phẩm
    $('#btnSave').click(function () {
        // Lấy các tags
        var tagsArray = [];
        $('.tags .tag').each(function () {
            var tagText = $(this).contents().filter(function () {
                return this.nodeType === Node.TEXT_NODE;
            }).text().trim(); // Lấy nội dung văn bản và loại bỏ khoảng trắng thừa
            tagsArray.push(tagText);
        });

        const data = {
            Id: $('#modal-addProduct').attr('currentprd'),
            Productname: $('#productName').val(),
            Price: $('#price').val(),
            CategoryId: $('#category').val(),
            Quantity: $('#quantity').val(),
            Description: editor.getData(),
            tags: tagsArray,
        };

        $.ajax({
            url: '/nguoi-dung/quan-ly-san-pham/updateProduct',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.success) {
                    showSuccessToast('Cập nhật sản phẩm thành công');
                    $('#modal-addProduct').modal('hide'); // ẩn modal
                    // Đặt lại nội dung trong các input
                    $('#productName').val('');
                    $('#price').val('');
                    $('#image').val('');
                    $('#category').val('1');
                    $('#quantity').val('1');
                    // Đặt lại nội dung trong ckeditor
                    if (editor) {
                        editor.setData(initialContent);
                    }
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    // Jquery thực hiện xoá sản phẩm
    $('#btnDelete').click(function () {
        const data = {
            Id: $('#modal-addProduct').attr('currentprd')
        }

        $.ajax({
            url: 'quan-ly-san-pham/deleteProduct',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    showSuccessToast('Xoá thành công');
                    $('#modal-addProduct').modal('hide'); // ẩn modal

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    // Lấy dữ liệu và đưa lên modal edit
    const btnLinkEdits = document.querySelectorAll('.btn-link-edit');
    btnLinkEdits.forEach((btnlinkEdit) => {
        btnlinkEdit.addEventListener('click', function () {
            $('#btnSave').removeClass('d-none'); //hiển thị nút lưu
            $('#btnAdd').addClass('d-none'); //ẩn nút thêm
            $('#modal-addProduct').modal('show');   //hiển thị modal
            $('#titleModel').text('Chỉnh sửa sản phẩm') //đặt lại nội dung tiêu đề
            if ($('#divbtnDelete').hasClass('d-none')) {
                $('#divbtnDelete').removeClass('d-none'); //hiển thị nút xoá
            }

            const prdId = btnlinkEdit.getAttribute('prd');
            const data = {
                Id: prdId
            }
            $.ajax({
                url: '/nguoi-dung/quan-ly-san-pham/getProductbyId',
                method: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                success: function (response) {
                    if (response.product) {
                        const result = response.product;
                        // Gán nội dung lên các input
                        $('#modal-addProduct').attr('currentprd', result.Id);
                        $('#productName').val(result.Productname);
                        $('#price').val(result.Price);
                        $('#category').val(result.CategoryId);
                        $('#quantity').val(result.Quantity);
                        $('#productSlug').val(result.Slugs);
                        editor.setData(result.Description);
                    }
                    if (response.tags) {
                        createTagsFromArray(response.tags);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    });

    // Đặt lại dữ liệu và mở modal add
    $('#btn-link-add').click(function () {
        $('#btnSave').addClass('d-none'); //ẩn nút lưu
        $('#divbtnDelete').addClass('d-none'); //ẩn nút xoá
        if ($('#btnAdd').hasClass('d-none')) {
            $('#btnAdd').removeClass('d-none'); //hiển thị nút lưu
        }
        $('#titleModel').text('Thêm sản phẩm mới') //đặt lại nội dung tiêu đề
    });
});

// hàm sử lý nút xoá tags
function closetagsbtn(element) {
    const tagElement = element.parentElement; // Lấy phần tử div có class "tag"
    const tagsContainer = document.querySelector('.tags');

    tagsContainer.removeChild(tagElement); // Xóa thẻ ra khỏi container
}
// Hàm sử lý tạo tags từ một mảng các tags
function createTagsFromArray(tagsArray) {
    const tagsContainer = document.querySelector('.tags'); // Chọn container .tags

    // Xóa tất cả các thẻ tags hiện có trong container
    while (tagsContainer.firstChild) {
        tagsContainer.removeChild(tagsContainer.firstChild);
    }

    // Nếu mảng tagsArray không rỗng, thêm các thẻ tags mới
    if (tagsArray.length > 0) {
        tagsArray.forEach(tagText => {
            // Tạo phần tử div.tag
            const tagDiv = document.createElement('div');
            tagDiv.classList.add('tag');

            // Tạo nút "✖" và thêm sự kiện cho nó
            const closeButton = document.createElement('span');
            closeButton.classList.add('close-button');
            closeButton.textContent = '✖';
            closeButton.onclick = function () {
                closetagsbtn(this);
            };

            // Tạo nội dung của tag
            const tagContent = document.createTextNode(tagText);

            // Gắn các phần tử vào div.tag
            tagDiv.appendChild(tagContent);
            tagDiv.appendChild(closeButton);

            // Thêm div.tag vào container
            tagsContainer.appendChild(tagDiv);
        });
    }
}

// Upload avatar cho user
function uploadAvatarUser() {
    // Xem trước hình ảnh
    const input = document.getElementById('file-avatar');
    const preview = document.getElementById('previewAvatar');
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }


    // Xử lý tải lên hình ảnh sản phẩm
    const files = document.querySelector('#file-avatar').files;
    const formData = new FormData();

    for (const file of files) {
        formData.append('file', file);
    };

    $.ajax({
        url: '/upload/image',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            // Xử lý cập nhật đường dẫn cho avatar user
            var pathAvatar = res.uploadedFilePath;
            const data = {
                Avatar: pathAvatar,
            };

            $.ajax({
                url: 'updateAvatarUser',
                type: 'POST',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    if (result.success) {
                        showSuccessToast('Cập nhật avatar thành công');
                    } else {
                        showErrorToast('Cập nhật avatar thất bại');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// function chuyển đổi tên sản phẩm thành dạng url slug
function ChangeToSlug() {
    var slug;
    //Lấy text từ thẻ input title 
    slug = document.getElementById("productName").value;
    slug = slug.toLowerCase();
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    // Thêm một chuỗi số ngẫu nhiên 4 số vào cuối slug
    var randomNumber = Math.floor(Math.random() * 10000); // Số ngẫu nhiên từ 0 đến 9999
    slug = slug + '-' + randomNumber;
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox có id “slug”
    document.getElementById('productSlug').value = slug;
}




