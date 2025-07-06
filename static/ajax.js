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
    var tabWrapper = $('#tab-block'),
      tabMnu = tabWrapper.find('.tab-mnu  li'),
      tabContent = tabWrapper.find('.tab-cont > .tab-pane');
  
    tabContent.not(':first-child').hide();
    
    tabMnu.each(function(i){
        $(this).attr('data-tab','tab'+i);
    });
    tabContent.each(function(i){
        $(this).attr('data-tab','tab'+i);
    });
    
    tabMnu.click(function(){
        var tabData = $(this).data('tab');
        tabWrapper.find(tabContent).hide();
        tabWrapper.find(tabContent).filter('[data-tab='+tabData+']').show(); 
    });
    
    $('.tab-mnu > li').click(function(){
        var before = $('.tab-mnu li.active');
        before.removeClass('active');
        $(this).addClass('active');
    });
});