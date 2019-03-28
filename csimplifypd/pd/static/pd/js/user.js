$(document).ready(function () {
    $('#userDetailsDataTable').dataTable();

    $('#query1').hide();
    $('#query').hide();
    $('#selectdept').hide();
    $('#selectstatus').hide();

    var $myForm = $('.my-ajax-form');
    $myForm.submit(function (event) {
        alert('ran');
        event.preventDefault();
        alert('stopped');

        function getFormData(data) {
            var unindexed_array = data;
            var indexed_array = {};

            $.map(unindexed_array, function (n, i) {
                indexed_array[n['name']] = n['value'];
            });

            return indexed_array;
        }



        var $formData = $(this).serializeArray();
        $formData = getFormData($formData);
        console.log($formData);
        var $thisURL = $myForm.attr('data-url') || window.location.href; // or set your own url
        console.log($thisURL);

        $formData['selected_roles'] = $("input[name='selected_roles']:checked").map(function () {
            return this.value;
        }).get();
        $formData['id'] = $('#hdnUserId').val();
        console.log($formData);
        $.ajax({
            url: $thisURL,
            type: "POST",
            dataType: 'json',
            data: JSON.stringify($formData),

            success: handleFormSuccess,
            error: handleFormError,
        });

        function handleFormSuccess(data, textStatus, jqXHR) {
            console.log(data)
            console.log(textStatus)
            console.log(jqXHR)
            // $myForm.reset();
        }

        function handleFormError(jqXHR, textStatus, errorThrown, data) {
            console.log(data)
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
            // $myForm.reset();
        }

    });
    //utility function



});






$(document).click(function (event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest(".query1,.dropdown-form").length) {
        $("body").find(".query1").removeClass("visible");
    }
});

$(".dropdown-form").click(function () {
    $("#query1").addClass("visible");
});

function createNewUserOrUpdateUser() {
    $('.search-wrapper').hide();
    $('#user-heading').hide();
    $('#query').show();
    $('#details').hide();
    $('.data_table').hide();
    $('#txtfirstName').focus();
    clearuserPopUpScreen();
    $('#txtstatusvalue').val(defaultStatus);
    $('#heading-one').hide();
    $('#sub-heading').hide();
    $('#details').hide();
    $('#search-product').hide();
    $('#funcc').hide();
    $('#funcc1').hide();
    $('#funcc2').hide();
    $('#funcc3').hide();
    $("#btnsaveuser").show();
    $("#btnreset").show();
    $("#txtSchIndustrySegment").show();
    $("#txtSchIndustrySegment").val("No Industry Segment")
    $("#txtSchIndustrySegment").prop("disabled", false).addClass("fixed-label");
    $('.search-wrapper').hide();
    $('.main-heading').hide();
    // $('.content > div > .main-heading').hide();
}

function resetUserScreen() {


    $("#hdnUserRolelinkIds").val();
    $("#hdnUserId").val("");
    $("#txtfirstName").val("");
    $("#txtlastName").val("");
    $("#txtcontactNo").val("");
    //$("#txtpassword").val("");
    //$("#txtrepassword").val("");
    $("#depts").val("");
    $("#hdnDeptSearchtxtdeptvalue").val("");
    $("#txtselectRole").empty();
    $("#stats").val("");
    $("#hdnstatusId").val("");
    $("#txtSchIndustrySegment").val("")
    $("#hdnAssignIndustrySegmentId").val("");
    // $("#txtSchIndustrySegment").prop("disabled", true).addClass("fixed-label");
    $("#txtemailId").val("");
    $("#selected_roles").prop("checked", false);
}

$('#save_user').click(function () {
    var roles = [];
    var selectedRoles = [];
    roles = document.getElementsByName('selected_roles');
    console.log(roles);
    for (i = 0; i < roles.length; i++) {
        console.log(roles[i].value)
        if (roles[i].checked) {
            selectedRoles.push(roles[i].value)
        }
    }
    console.log(selectedRoles)
});


function crossUserPopup() {
    $('.content > div > .main-heading').show();
    $('#heading-one').show();
    $('#sub-heading').show();
    $('.search-wrapper').show();
    $('#details').show();
    $('#search-product').show();
    $('#funcc').show();
    $('#funcc1').hide();
    $('#funcc2').hide();
    $('#funcc3').hide();
    $('#query').hide();
    $('.number').removeClass('intro');
    $('.product-details>.number').addClass('intro');
    searchUsers();
}

$('#depts').click(function () {
    $('.dptlabel').addClass('label-top');
});
$('#showdptlabel').click(function () {
    $('.dptlabel').show();
});

$('#stats').click(function () {
    $('.statlabel').addClass('label-top');
});

$('tr[name="user_row"]').click(function () {
    var user_id = $(this).closest("tr").find("td:eq(0)").text();
    console.log(user_id);
    $('.search-wrapper').hide();
    $('#user-heading').hide();
    $('#query').show();
    $('#details').hide();
    $('.data_table').hide();
    $('#txtfirstName').focus();

    $('#heading-one').hide();
    $('#sub-heading').hide();
    $('#details').hide();
    $('#search-product').hide();
    $('#funcc').hide();
    $('#funcc1').hide();
    $('#funcc2').hide();
    $('#funcc3').hide();
    $("#btnsaveuser").show();
    $("#btnreset").show();
    $("#txtSchIndustrySegment").show();
    $('.search-wrapper').hide();
    // $('.main-heading').hide();
    var $thisURL = window.location.href; // or set your own url

    $.ajax({
        url: $thisURL + 'update/',
        type: 'GET',
        dataType: 'json',
        data: {
            'id': Number(user_id),
        },
        success: function (data) {
            console.log(data);
            firstname = data[0].fields.username.split(' ')[0];
            lastname = data[0].fields.username.split(' ')[1];
            console.log(firstname, lastname);
            $('#hdnUserId').val(Number(data[0].pk));
            $('#txtfirstName').val(firstname);
            $('#txtlastName').val(lastname);
            $('#txtcontactNo').val(data[0].fields.contact_no);
            $('#txtemailId').val(data[0].fields.email);
            $('#depts').val(data[0].fields.department);
            $('#stats').val(data[0].fields.status);
            $('#txtSchIndustrySegment').val(data[0].fields.industry_segment);
            console.log(data[0].fields.roles)
            console.log(data[0].fields.roles[0].fields.role_id);

            for (i = 0; i < data[0].fields.roles.length; i++) {
                $("input[value='" + data[0].fields.roles[i].fields.role_id + "'][name='selected_roles']").attr('checked', true);
            }


        },
        error: function (data, textStatus, jqXHR) {
            console.log(data)
            console.log(textStatus)
            console.log(jqXHR)

        }

    });

});