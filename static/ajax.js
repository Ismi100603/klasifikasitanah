$(document).ready(function () {
    $('#submit').click(function () {
        var formData = new FormData();
        var fileInput = $('#fileInput')[0].files[0];
        formData.append('image', fileInput); // 'image' sesuai dengan nama parameter di server

        $.ajax({
            type: 'POST',
            url: '/proses',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#text_result').show();
                $('#class').text(response.kelas);
                $('#persentase').text(response.persentase);
            },
            error: function (xhr, status, error) {
                alert(xhr.responseJSON?.error || 'Terjadi kesalahan.');
            }
        });
    });
});