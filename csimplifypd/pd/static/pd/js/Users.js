var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
/// <reference path="Users.js" />

//Supports alphabets and numbers no special characters except underscore('_') min 3 and max 20 characters.

$(document).ready(function () {
    $('#userDetailsDataTable').dataTable({
        "order": [
            [8, 'desc']
        ]
        //,"searching": false
    });
    $('.editextuser').hide();
    $('.selectdept').hide();
    $('.selectrole').hide();
    $('.selectstatus').hide();
    $('.newuser').css('background', '#2c4285');
    $('.newuser').css('color', 'white');
    //usersTag();
    //searchUsers();
    //fetchAndSetRoles();
    //fetchAndSetDepartment();
    //onClickCheckBox();
    $("#searchKeyword").focus();
    $("#txtstatusvalue").val("Active");
    defaultStatus = $("#txtstatusvalue").val();
    //SearchTextBoxList('txtstatusvalue', 'btnSchAssociatedVendor', ' Users/fetchStatus', 'selectstatus', 'hdnstatusId');
    //   SearchTextBoxListbySpan('txtstatusvalue', ' Users/fetchStatus', 'selectstatus', 'hdnstatusId', 'spnAdvSrchStatus');
    //SearchTextBoxList('txtroles', 'btnSchAssociatedVendor', ' Users/fetchAndSetRoles', 'selectrole', 'hdnSchtxtrolesId');
    //   SearchTextBoxListbySpan('txtroles', ' Users/fetchAndSetRoles', 'selectrole', 'hdnSchtxtrolesId', 'scnAdvSrchRoles');
    //SearchTextBoxList('txtDepartment', 'btnSchAssociatedVendor', ' Users/fetchAndSetDepartment', 'selectdepartment', 'hdnSchtxtDepartmentId');
    //  SearchTextBoxListbySpan('txtDepartment', ' Users/fetchAndSetDepartment', 'selectdepartment', 'hdnDeptSearchtxtdeptvalue', 'spnAdvSrchDepartment')
    //SearchTextBoxList('txtdeptvalue', 'btnSchAssociatedVendor', ' Users/fetchAndSetDepartment', 'selectdept', 'hdnDeptSearchtxtdeptvalue');
    //  SearchTextBoxListbySpan('txtdeptvalue', ' Users/fetchAndSetDepartment', 'selectdept', 'hdnDeptSearchtxtdeptvalue', 'spnDepartment');
    //SearchLookUpList("txtSchIndustrySegment", "/DigiQuotePro/searchIndustrySegment", "lstIndustrySegment", "hdnAssignIndustrySegmentId");

    $('#txtdeptvalue').keypress(function (e) {
        e.preventDefault();
    });
    $('#txtstatusvalue').keypress(function (e) {
        e.preventDefault();
    });
    $('#txtroles').keypress(function (e) {
        e.preventDefault();
    });
    $('#txtDepartment').keypress(function (e) {
        e.preventDefault();
    });
    $(".container").mouseup(function (e) {
        var subject = $("#query1");

        if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
            subject.fadeOut(10);
        }
    });
    $("#txtdeptvalue").keydown(function (e) {
        if (e.which == 9) {
            $(".selectdept").fadeOut(10);
        } else if (e.which == 40) {
            $(".selectdept > li:focus").closest('li').next().find('li').focus();
        }

        // Up key
        else if (e.which == 38) {
            $(".selectdept > li:focus").closest('li').prev().find('li').focus();
        }

    });
    $("#txtSchIndustrySegment").keydown(function (e) {
        if (e.which == 9) {
            $("#lstIndustrySegment").fadeOut(10);
        }
        if (e.keyCode == 40) {
            $("#lstIndustrySegment:focus").next().focus();
        }

        // Up key
        if (e.keyCode == 38) {
            $("#lstIndustrySegment:focus").prev().focus();
        }
    });
    $("#txtroles").keydown(function (e) {
        if (e.which == 9) {
            $(".selectrole").fadeOut(10);
        }

    });

    $("#txtDepartment").keydown(function (e) {
        if (e.which == 9) {
            $(".selectdepartment").fadeOut(10);
        }

    });
});

/**/


$(document).click(function (event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest(".query1,.dropdown-form").length) {
        $("body").find(".query1").removeClass("visible");
    }
    if ($(event.target).closest("#selectdepartment,.department").length === 0) {
        $("body").find('#selectdepartment li').hide();
        // $('.fa-angle-down').css('display','block');
    }
    if ($(event.target).closest("#selectrole,.role").length === 0) {
        $("body").find('#selectrole li').hide();
        // $('.fa-angle-down').css('display','block');

    }
});
var saveOrUpdate = '';
var defaultStatus = '';

//-----To Show Users Tag Selected in Sidebar-------//
function usersTag() {

    $('#usersTag a').addClass('active');
    $('#productTag a').removeClass('active');
    $('#inboxTag a').removeClass('active');
    $('#customerTag a').removeClass('active');
    $('#quoteTag a').removeClass('active');
    $('#followupTag  a').removeClass('active');
    $('#reportTag a').removeClass('active');
    $('#documentTemplate a').removeClass('active');
    $('#documentSectionTag a').removeClass('active');
    $('#dashboardTag a').removeClass('active');
}

//----- To show Div for create New User or Update Existing User Details-------//
function createNewUserOrUpdateUser() {
    $('#query').show();
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
    $('.content > div > .main-heading').hide();
}

//------ Close Divfor create New User or Update Existing User Details------//
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


$(document).click(function (event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest(".editnewuser,.newuser").length) {
        $("body").find(".editnewuser").removeClass("visible");
        $('body').find('.newuser').removeClass('int');
    }
});

//----To Open and Close Advance Search Popup------//
$(".dropdown-form").click(function () {
    $("#searchKeyword").val("");
    resetUserAdvanceSearch();
    var x = document.getElementById("query1");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
});
//$(".dropdown-form").click(function () {
//    debugger;
//    $(".query1").addClass("visible");
//});
//$(document).click(function (event) {
//    debugger;
//    //if you click on anything except the modal itself or the "open modal" link, close the modal
//    if (!$(event.target).closest(".query1,.dropdown-form").length) {
//        $("body").find(".query1").removeClass("visible");
//    }
//});

$(".existing").click(function () {
    $(".editextuser").addClass("visible");
});
$(document).click(function (event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest(".editextuser,.existing").length) {
        $("body").find(".editextuser").removeClass("visible");
        $('body').find('.existing').removeClass('int');
    }
});
$('#query1').on('click', function (event) {
    event.stopPropagation();
});



//$(".dept").click(function () {
//    $(".selectdept").addClass("visible");
//   // $('.dept .fa-angle-down').css('display', 'none');
//});
//$('.selectdept li').click(function () {
//    $("#txtdeptvalue").val($(this).attr("value"));
//   // $("#txtDepartment").val($(this).attr("value"));
//    $('.selectdept li').hide();
//    // $('.fa-angle-down').css('display','block');
//});
//$('#txtdeptvalue').focus(function () {
//    $('.selectdept li').show();
//    // $('.fa-angle-down').css('display','block');
//});

//---Hide List on click outside current div-----//
$(document).click(function (event) {

    if ($(event.target).closest("#selectdept,.dept").length === 0) {
        $("body").find('#selectdept li').hide();
        // $('.fa-angle-down').css('display','block');

    }
});





//$(".department").click(function () {
//    $(".selectdepartment").addClass("visible");
//    // $('.dept .fa-angle-down').css('display', 'none');
//});
//$('.selectdepartment li').click(function () {

//    $("#txtDepartment").val($(this).attr("value"));
//    $('.selectdepartment li').hide();
//    // $('.fa-angle-down').css('display','block');
//});
//$('#txtDepartment').focus(function () {
//    $('.selectdepartment li').show();
//    // $('.fa-angle-down').css('display','block');
//});
//$('#txtDepartment').focus(function () {
//    $('.selectdepartment li').show();
//    // $('.fa-angle-down').css('display','block');
//});
//$(document).click(function (event) {
//    //if you click on anything except the modal itself or the "open modal" link, close the modal
//    if (!$(event.target).closest(".selectdepartment,.department").length) {
//        $("body").find('.selectdepartment li').hide()
//        // $('.fa-angle-down').css('display','block');
//    }
//});

//$(".status").click(function () {
//    $(".selectstatus").addClass("visible");
//   // $('.dept .fa-angle-down').css('display', 'none');
//});
//$('.selectstatus li').click(function () {
//    $("#txtstatusvalue").val($(this).attr("value"));
//    $(this).closest('li').addClass('select');
//    $('.selectstatus li').hide();
//    // $('.fa-angle-down').css('display','block');
//});
//$('#txtstatusvalue').focus(function () {
//    $('.selectstatus li').show();
//    // $('.fa-angle-down').css('display','block');
//});
//$(document).click(function (event) {
//    //if you click on anything except the modal itself or the "open modal" link, close the modal
//    if (!$(event.target).closest(".selectstatus,.status").length) {
//        $("body").find(".selectstatus").removeClass("visible");
//        // $('.fa-angle-down').css('display','block');
//    }
//});

//---Hide List on click outside current div-----//
$(document).click(function (event) {

    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if ($(event.target).closest("#selectstatus,.status").length === 0) {
        $("body").find('#selectstatus li').hide();
        // $('.fa-angle-down').css('display','block');

    }
});

//---Hide List on click outside current div-----//
$('#query1').click(function (event) {

    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if ($(event.target).closest("#selectdepartment,.department").length === 0) {
        $("body").find('#selectdepartment li').hide();
        // $('.fa-angle-down').css('display','block');

    }
});
//---Hide List on click outside current div-----//
$('#query1').click(function (event) {

    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if ($(event.target).closest("#selectrole,.role").length === 0) {
        $("body").find('#selectrole li').hide();
        // $('.fa-angle-down').css('display','block');

    }
});

//---Hide List on click outside current div-----//
$(document).click(function (event) {

    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if ($(event.target).closest("#lstIndustrySegment,.assignIndustrySegment").length === 0) {
        $("body").find('#lstIndustrySegment li').hide();
        // $('.fa-angle-down').css('display','block');

    }
});



//$(".role").click(function () {
//    $(".selectrole").addClass("visible");
//   // $('.role .fa-angle-down').css('display', 'none');
//});
//$('.selectrole li').click(function () {
//    $("#txtroles").val($(this).attr("value"));
//    $('.selectrole li').hide();
//    // $('.fa-angle-down').css('display','block');
//});
//$('#txtroles').focus(function () {
//    $('.selectrole li').show();
//    // $('.fa-angle-down').css('display','block');
//});
//$(document).click(function (event) {
//    //if you click on anything except the modal itself or the "open modal" link, close the modal
//    if (!$(event.target).closest(".selectrole,.role").length) {
//        $("body").find('.selectrole li').hide();
//        // $('.fa-angle-down').css('display','block');
//    }
//});


// Fetching User Roles
var roleListLength = "";
var roleListDetails = "";

function fetchAndSetRoles() {

    var inputData = {};
    inputData.text = "";
    ajaxCaller("POST", "/Users/fetchAndSetRoles", JSON.stringify(inputData), "application/json", "Please wait ! Getting Screen Parameters").done(function (data) {

        if (data.Status == 1) {
            var html = "";
            var oResult = data.Result;
            roleListDetails = oResult;
            roleListLength = oResult.length;
            var userRolesTable = $('#userRolesTable').DataTable({
                "paging": false,
                "ordering": false,
                "info": false,
                "searching": false
            });

            $.each(oResult, function (key, value) {

                html += '<tr><td><div class="checkbox"><label><input class="colored-success" id="userRole-' + value.Item1 + '" name="userRoles" onclick="onClickCheckBox()" type="checkbox" value="true"><span class="text"></span></label></div></td><td>' + value.Item2 + '</td><td>' + value.RoleDescription + '</td></tr>';
            });
            $("#userRolesTableBody").html(html);
        } else if (data.Status == 2) {
            showMessage("red", data.Description, "");
        } else {
            showMessage("red", data.Description, "");
        }
    });
}

function fetchAndSetDepartment() {
    ;
    var inputData = {};
    inputData.text = "";
    ajaxCaller("POST", "/Users/fetchAndSetDepartment", JSON.stringify(inputData), "application/json", "Please wait ! Getting Screen Parameters").done(function (data) {

        if (data.Status == 1) {
            var html = "";
            var oResult = data.Result;

        } else if (data.Status == 2) {
            showMessage("red", data.Description, "");
        } else {
            showMessage("red", data.Description, "");
        }
    });
}




//---- To show password when click eye Icon ----//

$(".toggle-password").click(function () {
    ;
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
$(".toggle-repassword").click(function () {
    ;
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

//------- On Click check Box------//

function onClickCheckBox() {

    debugger;
    if ($("#userRole-3").prop("checked") == true) {

        $("#txtSchIndustrySegment").prop("disabled", false).addClass("fixed-label");

    } else {
        $("#txtSchIndustrySegment").prop("disabled", true).addClass("fixed-label");
        $("#txtSchIndustrySegment").val("No Industry Segment")
    }



}

//----- To save or Update User Details -----//
function saveUsers(userIDforChangeStatus) {

    var inputData = {};
    var userId = $("#hdnUserId").val();
    var userRoleLinkIds = $("#hdnUserRolelinkIds").val();
    var firstName = $("#txtfirstName").val();
    var lastName = $("#txtlastName").val();
    var contactNo = $("#txtcontactNo").val();
    var emailId = $("#txtemailId").val();
    //var password = $("#txtpassword").val();
    //var repassword = $("#txtrepassword").val();
    var department = $("#hdnDeptSearchtxtdeptvalue").val();

    var status = $("#txtstatusvalue").val();
    if (firstName == null || firstName == "" || firstName == undefined) {
        showMessage("red", "Enter User Name");
        $("#txtfirstName").addClass("inputError");
        $("#txtfirstName").focus();
        return;
    } else {
        $("#txtfirstName").removeClass("inputError");
        inputData.firstName = firstName;
    }
    if (lastName == null || lastName == "" || lastName == undefined) {
        inputData.lastName = lastName;
    }


    if (contactNo != null && contactNo != "" && contactNo != "undefined") {
        if (contactNo.length < 10) {
            showMessage("red", "Enter 10 gigit Contact No.", "");
            $("#txtcontactNo").addClass("inputError");
            $("#txtcontactNo").focus();
            return false;
        } else {
            $("#txtcontactNo").removeClass("inputError");
            inputData.contactNo = contactNo;
        }

    } else {
        $("#txtcontactNo").addClass("inputError");
        $("#txtcontactNo").focus();
        showMessage("red", "Enter the Contact No.", "");
        return false;
    }

    if (emailId == null || emailId == "" || emailId == undefined) {

        showMessage("red", "Enter Email Address");
        $("#txtemailId").addClass("inputError");
        $("#txtemailId").focus();
        return;
    } else {
        if (!ck_email.test($("#txtemailId").val())) {
            showMessage("red", "Enter a valid email address");
            $("#txtemailId").addClass("inputError");
            $("#txtemailId").focus();
            return;
        } else {
            $("#txtemailId").removeClass("inputError");
            inputData.emailId = emailId;
        }

    }

    if ($('#txtdeptvalue').val() == null || $('#txtdeptvalue').val() == "" || $('#txtdeptvalue').val() == undefined) {
        showMessage("red", "Select user department");
        $("#txtdeptvalue").addClass("inputError");
        $("#txtdeptvalue").focus();
        return;
    } else {
        $("#txtdeptvalue").removeClass("inputError");
        if (department != null && department != undefined && department != "") {
            inputData.department = department;
        }

    }
    if (status == null || status == "" || status == undefined) {
        showMessage("red", "Select user status");
        $("#txtstatusvalue").addClass("inputError");
        $("#txtstatusvalue").focus();
        return;
    } else {
        $("#txtstatusvalue").removeClass("inputError");
        inputData.firstName = firstName;
    }

    if ($("#userRole-3").prop("checked") == true) {
        $(".assignIndustrySegment").show();
    } else {
        $(".assignIndustrySegment").hide();
    }
    var assignIndustrySegmentId = $("#hdnSchIndustrySegment").val();
    if (assignIndustrySegmentId != "" && assignIndustrySegmentId != undefined) {
        inputData.assignIndustrySegmentId = assignIndustrySegmentId;
    } else {
        inputData.assignIndustrySegmentId = "";
    }
    var userRoles = [];
    $("input:checkbox[name='userRoles']:checked").each(function () {
        var roleId = this.id.split("-");
        userRoles.push(roleId);
    })
    if (userRoles.length != 0) {
        inputData.userRoles = userRoles;

    } else {
        showMessage("red", "Assign user roles before save user details", "");
        return false;
    }

    inputData.saveOrUpdate = saveOrUpdate;
    if (userId != null || userId != undefined || userId != "") {
        inputData.userId = userId;
    } else {
        inputData.userId = 0;
    }

    inputData.userRoleLinkIds = userRoleLinkIds;


    //if (password != null && password != "" && password != "undefined") {
    //    inputData.password = password;
    //} else {
    //    showMessage("red", "Please enter password", "");
    //    return false;
    //}
    //if (repassword != null && repassword != "" && repassword != "undefined") {
    //    inputData.repassword = repassword;
    //} else {
    //    showMessage("red", "Please enter Re-enter password", "");
    //    return false;

    //}
    //if (inputData.password != inputData.repassword) {
    //    showMessage("red", "Password not Match", "");
    //    return false;
    //}

    if (department != null && department != "" && department != "undefined") {
        inputData.department = department;
    } else {
        showMessage("red", "Please enter User Department", "");
        return false;

    }

    if (status != null && status != "" && status != "undefined") {
        inputData.status = status;
    } else {
        showMessage("red", "Status not selected", "");
        return false;

    }

    if (userId != undefined && userId != null && userId != "") {
        ajaxCaller("POST", "/Users/updateUsers", JSON.stringify(inputData), "application/json", "Please wait!").done(function (data) {
            if (data.Status == 1) {

                showMessage("green", data.Description, "");
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


            } else {
                showMessage("red", data.Description, "");
            }
        })
    } else {
        ajaxCaller("POST", "/Users/saveUsers", JSON.stringify(inputData), "application/json", "Please wait!").done(function (data) {
            if (data.Status == 1) {

                showMessage("green", data.Description, "");
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


            } else {
                showMessage("red", data.Description, "");
            }
        })
    }


}
var oresult = "";

function resetUserScreen() {
    debugger;
    var oResult = oresult;
    var userID = $("#hdnUserId").val();
    if (userID != null && userID != "" && userID != undefined) {
        //$("#txtpassword").val(password);
        //$("#txtrepassword").val(repassword);
        $("#txtdeptvalue").val(oResult.Department);
        $("#hdnDeptSearchtxtdeptvalue").val(oResult.DepartmentId);
        $("#txtstatusvalue").val(oResult.UserStatus);
        $("#hdnstatusId").val(oResult.IsActive);
        $("#txtSchIndustrySegment").val(oResult.AssignIndustrySegmentName);
        $("#hdnAssignIndustrySegmentId").val(oResult.AssignIndustrySegment);
        $("#txtSchIndustrySegment").prop("disabled", true).addClass("fixed-label");
        for (var i = 0; i < roleListLength - 1; i++) {
            if (oResult.RoleId == roleListDetails[i].Item1) {
                $("#userRole-" + i).prop("checked", true);
            } else {
                $("#userRole-" + i).prop("checked", false);
            }


        }
    } else {

        $("#hdnUserRolelinkIds").val();
        $("#hdnUserId").val("");
        $("#txtfirstName").val("");
        $("#txtlastName").val("");
        $("#txtcontactNo").val("");
        //$("#txtpassword").val("");
        //$("#txtrepassword").val("");
        $("#txtdeptvalue").val("");
        $("#hdnDeptSearchtxtdeptvalue").val("");
        $("#txtselectRole").empty();
        $("#txtstatusvalue").val("");
        $("#hdnstatusId").val("");
        $("#txtSchIndustrySegment").val("No Industry Segment")
        $("#hdnAssignIndustrySegmentId").val("");
        $("#txtSchIndustrySegment").prop("disabled", true).addClass("fixed-label");
        $("#txtemailId").val("");
        for (var i = 1; i <= roleListLength; i++) {
            $("#userRole-" + i).prop("checked", false);
        }
    }


}

function clearuserPopUpScreen() {
    ;
    $("#hdnUserRolelinkIds").val("");
    $("#hdnUserId").val("");
    $("#txtfirstName").val("");
    $("#txtfirstName").prop("disabled", false).removeClass("fixed-label");
    $("#txtlastName").val("");
    $("#txtlastName").prop("disabled", false).removeClass("fixed-label");
    $("#txtcontactNo").val("");
    $("#txtcontactNo").prop("disabled", false).removeClass("fixed-label");
    //$("#txtpassword").val("");
    //$("#txtpassword").prop("disabled", false).removeClass("fixed-label");
    //$("#txtrepassword").val("");
    $("#txtemailId").val("");
    $("#txtemailId").prop("disabled", false).removeClass("fixed-label");
    // $("#txtrepassword").prop("disabled", false).removeClass("fixed-label");
    $("#txtdeptvalue").val("");
    $("#txtdeptvalue").prop("disabled", false).removeClass("fixed-label");
    $('#hdnDeptSearchtxtdeptvalue').val("");
    $("#txtselectRole").empty();
    // $("#txtstatusvalue").val("");
    $("#txtemailId").val("");
    for (var i = 1; i <= roleListLength; i++) {
        $("#userRole-" + i).prop("checked", false);

    }

}
var edit = false;
var userType = "";

//------Search Users By Advance Search-------//
function searchUsers(value) {
    var inputData = {};
    // $('#tbUserDatatable').DataTable();
    var searchInputKeyword = $("#searchKeyword").val();
    var userName = $("#txtUserName").val();
    var department = $("#hdnSchtxtDepartmentId").val();
    var userRoles = $("#txtroles").val();
    userType = value;
    //  $("#searchKeyword").val(''+$("#txtUserName").val()+', '+$("#txtDepartment").val()+', '+$("#txtroles").val()+'');
    inputData.searchuserId = 0;
    inputData.searchInputKeyword = searchInputKeyword;
    inputData.userName = userName;
    inputData.department = department;
    inputData.userRoles = userRoles

    ajaxCallerWithoutMessage("POST", "/Users/searchUsers", JSON.stringify(inputData), "application/json").done(function (data) {
        debugger;

        x = document.getElementById('query1');
        x.style.display = "none";
        if (data.Status == 1) {
            //if (data.Result.length <= 75) {
            //    showMessage("green", data.Result.length + " Record(s) found");
            //} else {
            //    showMessage("green", data.Result.length + " Record(s) found refine your filter ");
            //}
            $('#details > div > div.col-6.col-md-3.product-details > p').removeClass('intro');
            $('#details > div > div:nth-child(2) > p').removeClass('intro');

            $('#details > div > div:nth-child(3) > p').removeClass('intro');

            var oResult = data.Result;

            if (userType == "active") {
                $("#activeUserCount").text("0");
                $('#details > div > div.col-6.col-md-3.product-details > p').addClass('intro');
            } else if (userType == "inactive") {
                $("#inactiveUserCount").text("0");
                $('#details > div > div:nth-child(2) > p').addClass('intro');
            } else {
                $("#activeUserCount").text("0");
                $("#inactiveUserCount").text("0");
                $('#details > div > div:nth-child(3) > p').addClass('intro');
            }
            $("#allUsersCount").text("0");
            var activecount = 0;
            var inactivecount = 0;
            var allUserCount = 0;
            var userDataTable = $('#userDetailsDataTable').DataTable();
            userDataTable.clear().draw();
            userDataTable.column(0).visible(false);
            userDataTable.column(1).visible(false);
            userDataTable.column(8).visible(false);
            if (oResult.length != 0) {
                if (oResult != null && oResult != "" && oResult != "undefined") {

                    var i = 0;
                    for (var i = 0; i < oResult.length; i++) {
                        allUserCount++;
                        $("#allUsersCount").text(allUserCount);
                        if (userType == "active") {

                            if (oResult[i].IsActive == 1) {
                                activecount++;
                                $("#activeUserCount").text(activecount);
                                userDataTable.row.add([
                                    oResult[i].UserRoleLinkId,
                                    oResult[i].UserId,
                                    oResult[i].UserName,
                                    oResult[i].UserContactNo,
                                    oResult[i].Department,
                                    oResult[i].RoleName,
                                    oResult[i].UserStatus,
                                    '<div class=row">' +
                                    ' <i class="fa fa-pencil cursorclick" onclick="editUserDetails()"></i> &nbsp&nbsp&nbsp' +
                                    ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>' +
                                    '</div>',
                                    oResult[i].LastModifedOn
                                ]).draw();


                            }
                        } else if (userType == "inactive") {

                            if (oResult[i].IsActive == 0) {
                                inactivecount = inactivecount + 1;
                                $("#inactiveUserCount").text(inactivecount);
                                userDataTable.row.add([
                                    oResult[i].UserRoleLinkId,
                                    oResult[i].UserId,
                                    oResult[i].UserName,
                                    oResult[i].UserContactNo,
                                    oResult[i].Department,
                                    oResult[i].RoleName,
                                    oResult[i].UserStatus,
                                    '<div class=row">' +
                                    ' <i class="fa fa-pencil cursorclick" onclick="editUserDetails()"></i> &nbsp&nbsp&nbsp'
                                    //+ ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>'
                                    +
                                    '</div>',
                                    oResult[i].LastModifedOn
                                ]).draw();
                            }

                        } else {
                            if (oResult[i].IsActive == 1) {
                                activecount = activecount + 1;
                                $("#activeUserCount").text(activecount);
                                userDataTable.row.add([
                                    oResult[i].UserRoleLinkId,
                                    oResult[i].UserId,
                                    oResult[i].UserName,
                                    oResult[i].UserContactNo,
                                    oResult[i].Department,
                                    oResult[i].RoleName,
                                    oResult[i].UserStatus,
                                    '<div class=row">' +
                                    ' <i class="fa fa-pencil cursorclick" onclick="editUserDetails()"></i> &nbsp&nbsp&nbsp' +
                                    ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>' +
                                    '</div>',
                                    oResult[i].LastModifedOn
                                ]).draw();
                            } else {
                                inactivecount = inactivecount + 1;
                                $("#inactiveUserCount").text(inactivecount);
                                userDataTable.row.add([
                                    oResult[i].UserRoleLinkId,
                                    oResult[i].UserId,
                                    oResult[i].UserName,
                                    oResult[i].UserContactNo,
                                    oResult[i].Department,
                                    oResult[i].RoleName,
                                    oResult[i].UserStatus,
                                    '<div class=row">' +
                                    ' <i class="fa fa-pencil cursorclick" onclick="editUserDetails()"></i> &nbsp&nbsp&nbsp'
                                    //+ ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>'
                                    +
                                    '</div>',
                                    oResult[i].LastModifedOn
                                ]).draw();
                            }

                        }


                    }


                }
            } else {


            }


        } else {
            showMessage("red", data.Description, "");
        }
        window.scroll(0, 0);
    });
}

//-------Reset Advance Search user Screen-------//
function resetUserAdvanceSearch() {
    $("#txtroles").val("");
    $("#hdnSchtxtrolesId").val("");
    $("#txtDepartment").val("");
    $("#hdnSchtxtDepartmentId").val("");
    $("#txtUserName").val("");

}

//------Search User Using Search Bar--------//

function searchUsersUsingSearchBar(userType) {
    debugger;
    var inputData = {};
    resetUserAdvanceSearch();
    var UserType = userType;
    var searchInputKeyword = $("#searchKeyword").val();


    inputData.searchInputKeyword = searchInputKeyword;
    if (UserType != "" && UserType !== undefined) {
        inputData.userType = UserType;
    } else {
        inputData.userType = "";
    }

    ajaxCallerWithoutMessage("POST", "/Users/searchUsersUsingSearchBar", JSON.stringify(inputData), "application/json").done(function (data) {
        debugger;

        if (data.Status == 1) {
            if (data.Result.length <= 75) {
                showMessage("green", data.Result.length + " Record(s) found");
            } else {
                showMessage("green", data.Result.length + " Record(s) found refine your filter ");
            }
            $('#details > div > div.col-6.col-md-3.product-details > p').removeClass('intro');
            $('#details > div > div:nth-child(2) > p').removeClass('intro');

            $('#details > div > div:nth-child(3) > p').removeClass('intro');

            var oResult = data.Result;
            if (userType == "active") {
                $("#activeUserCount").text("0");
                $('#details > div > div.col-6.col-md-3.product-details > p').addClass('intro');
            } else if (userType == "inactive") {
                $("#inactiveUserCount").text("0");
                $('#details > div > div:nth-child(2) > p').addClass('intro');

            } else {
                $("#activeUserCount").text("0");
                $("#inactiveUserCount").text("0");
                $('#details > div > div:nth-child(3) > p').addClass('intro');

            }
            $("#allUsersCount").text("0");
            var activecount = 0;
            var inactivecount = 0;
            var allUserCount = 0;
            var userDataTable = $('#userDetailsDataTable').DataTable();
            userDataTable.clear().draw();
            userDataTable.column(0).visible(false);
            userDataTable.column(1).visible(false);
            userDataTable.column(8).visible(false);
            // $("#tbUserDatatable").empty();
            if (oResult.length != 0) {
                if (oResult != null && oResult != "" && oResult != "undefined") {
                    var oResult = data.Result;
                    var i = 0;
                    for (var i = 0; i < oResult.length; i++) {

                        allUserCount++;
                        $("#allUsersCount").text(allUserCount);
                        if (oResult[i].IsActive == 1) {
                            activecount++;
                            $("#activeUserCount").text(activecount);
                        }
                        if (oResult[i].IsActive == 0) {
                            inactivecount++;
                            $("#inactiveUserCount").text(inactivecount);
                        }


                        if (userType == "active" && oResult[i].IsActive == 1) {

                            userDataTable.row.add([
                                oResult[i].UserRoleLinkId,
                                oResult[i].UserId,
                                oResult[i].UserName,
                                oResult[i].UserContactNo,
                                oResult[i].Department,
                                oResult[i].RoleName,
                                oResult[i].UserStatus,
                                '<div class=row">' +
                                ' <i class="fa fa-pencil cursorclick"></i> &nbsp&nbsp&nbsp' +
                                ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>' +
                                '</div>',
                                oResult[i].LastModifedOn
                            ]).draw();


                        } else if (userType == "inactive" && oResult[i].IsActive == 0) {

                            userDataTable.row.add([
                                oResult[i].UserRoleLinkId,
                                oResult[i].UserId,
                                oResult[i].UserName,
                                oResult[i].UserContactNo,
                                oResult[i].Department,
                                oResult[i].RoleName,
                                oResult[i].UserStatus,
                                '<div class=row">' +
                                ' <i class="fa fa-pencil cursorclick" onclick="editUserDetails()"></i> &nbsp&nbsp&nbsp'
                                //+ ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>'
                                +
                                '</div>',
                                oResult[i].LastModifedOn
                            ]).draw();


                        } else if (userType == "" || userType == undefined) {
                            if (oResult[i].IsActive == 1) {

                                userDataTable.row.add([
                                    oResult[i].UserRoleLinkId,
                                    oResult[i].UserId,
                                    oResult[i].UserName,
                                    oResult[i].UserContactNo,
                                    oResult[i].Department,
                                    oResult[i].RoleName,
                                    oResult[i].UserStatus,
                                    '<div class=row">' +
                                    ' <i class="fa fa-pencil cursorclick" onclick="editUserDetails()"></i> &nbsp&nbsp&nbsp' +
                                    ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>' +
                                    '</div>',
                                    oResult[i].LastModifedOn
                                ]).draw();
                            } else {

                                userDataTable.row.add([
                                    oResult[i].UserRoleLinkId,
                                    oResult[i].UserId,
                                    oResult[i].UserName,
                                    oResult[i].UserContactNo,
                                    oResult[i].Department,
                                    oResult[i].RoleName,
                                    oResult[i].UserStatus,
                                    '<div class=row">' +
                                    ' <i class="fa fa-pencil cursorclick" onclick="editUserDetails()"></i> &nbsp&nbsp&nbsp'
                                    //+ ' <i class="fa fa-trash  " onclick="changeUserStatus()"></i>'
                                    +
                                    '</div>',
                                    oResult[i].LastModifedOn
                                ]).draw();
                            }

                        } else {

                        }


                    }

                }
            }

        } else {
            showMessage("red", data.Description, "");
        }
        window.scroll(0, 0);
    });
}

//-----Search User By Active And in Active-------//
function searchUsersby(UserType) {
    debugger;
    var userType = UserType;
    if ($("#searchKeyword").val() != "" && $("#searchKeyword").val() != undefined) {
        searchUsersUsingSearchBar(userType);
    } else {
        searchUsers(UserType);
    }


}



var password = "";
var repassword = "";
var department = "";
var status = "";
//------Edit User Details on cick Edit Icon------//


$('#userDetailsDataTable').on("click", 'i.cursorclick', function (e) {
    e.preventDefault();
    debugger;
    var inputData = {};
    var grdItemDataTable = $('#userDetailsDataTable').DataTable();
    var nRow = $(this).parents('tr')[0];
    var userId = grdItemDataTable.row(nRow._DT_RowIndex).data()[1];
    var userId = userId;
    inputData.searchuserId = userId;
    inputData.searchInputKeyword = "";
    inputData.userName = "";
    inputData.department = "";
    inputData.userRoles = ""
    inputData.userStatus = "";
    ajaxCaller("POST", "/Users/searchUsers", JSON.stringify(inputData), "application/json", "Please wait ! Getting Screen Parameters").done(function (data) {
        if (data.Status == 1) {
            debugger;
            var oResult = data.Result[0];
            var grdItemDataTable = $('#userDetailsDataTable').DataTable();
            oresult = oResult;
            createNewUserOrUpdateUser();
            $('#txtdeptvalue').prop("disabled", false).removeClass("fixed-label");
            $('#txtstatusvalue').prop("disabled", false).removeClass("fixed-label");
            //$("#txtrepassword").prop("disabled", false).removeClass("fixed-label");
            //$("#txtpassword").prop("disabled", false).removeClass("fixed-label");
            debugger;

            if (oResult.UserId != null && oResult.UserId != undefined && oResult.UserId != "")
                $("#hdnUserId").val(oResult.UserId);
            if (oResult.UserName != null && oResult.UserName != undefined && oResult.UserName != "") {
                var userName = oResult.UserName;
                var splitName = userName.split(" ");
                if (splitName != null) {
                    $("#txtfirstName").val(splitName[0]);
                    $("#txtfirstName").prop("disabled", true).addClass("fixed-label");

                }
                if (splitName != null) {
                    $("#txtlastName").val(splitName[1]);
                    $("#txtlastName").prop("disabled", true).addClass("fixed-label");
                }
            }

            if (oResult.UserContactNo != null && oResult.UserContactNo != undefined && oResult.UserContactNo != "")
                $("#txtcontactNo").val(oResult.UserContactNo);
            $("#txtcontactNo").prop("disabled", true).addClass("fixed-label");

            //if (oResult.UserPassword != null && oResult.UserPassword != undefined && oResult.UserPassword != "")
            //    $("#txtpassword").val(oResult.UserPassword);
            //$("#txtpassword").prop("disabled", false).removeClass("fixed-label");
            //password = $("#txtpassword").val();
            //if (oResult.UserPassword != null && oResult.UserPassword != undefined && oResult.UserPassword != "")
            //    $("#txtrepassword").val(oResult.UserPassword);
            //$("#txtrepassword").prop("disabled", false).removeClass("fixed-label");
            //repassword = $("#txtrepassword").val();

            if (oResult.DepartmentId != null && oResult.DepartmentId != undefined && oResult.DepartmentId != "")
                $("#hdnDeptSearchtxtdeptvalue").val(oResult.DepartmentId);


            if (oResult.Department != null && oResult.Department != undefined && oResult.Department != "")
                $("#txtdeptvalue").val(oResult.Department);
            department = $("#txtdeptvalue").val();

            if (oResult.UserStatus != null && oResult.UserStatus != undefined && oResult.UserStatus != "")
                $("#txtstatusvalue").val(oResult.UserStatus);
            $('#txtstatusvalue').prop("disabled", false);
            status = $("#txtstatusvalue").val();
            if (oResult.UserEmail != null && oResult.UserEmail != undefined && oResult.UserEmail != "")
                $("#txtemailId").val(oResult.UserEmail);

            $("#txtemailId").prop("disabled", true).addClass("fixed-label");

            if (oResult.AssignIndustrySegmentName != null && oResult.AssignIndustrySegmentName != undefined && oResult.AssignIndustrySegmentName != "")
                $("#txtSchIndustrySegment").val(oResult.AssignIndustrySegmentName);


            if (oResult.RoleId != null && oResult.RoleId != undefined && oResult.RoleId != "")
                var userRolesAssisgn = oResult.RoleId.split(",")

            for (var i = 0; i <= userRolesAssisgn.length - 1; i++) {
                $("#userRole-" + userRolesAssisgn[i]).prop("checked", true);

            }
            for (var i = 1; i <= roleListLength; i++) {
                $("#userRole-" + i).attr("disabled", false);
            }
            if (($("#userRole-3").prop("checked") == true)) {
                $("#txtSchIndustrySegment").prop("disabled", false).addClass("fixed-label");
            } else {
                $("#txtSchIndustrySegment").prop("disabled", true).addClass("fixed-label");

            }
            if (oResult.UserRoleLinkId != null && oResult.UserRoleLinkId != undefined && oResult.UserRoleLinkId != "")
                $('#hdnUserRolelinkIds').val(oResult.UserRoleLinkId);



            $("#btnsaveuser").show();
            $("#btnreset").show();
        } else {
            showMessage("red", data.Description, "");
        }
        window.scroll(0, 0);
    });


});






var input_Data = {};

function changeUserStatus() {
    var inputData = {};
    $(document).on("click", "#userDetailsDataTable tr", function () {

        var grdItemDataTable = $('#userDetailsDataTable').DataTable();
        var rowIndex = grdItemDataTable.row(this).index()
        var data = grdItemDataTable.row(this).data();
        var changeStatusOfuserId = data[1];
        userIdToStatus(changeStatusOfuserId);
        //    inputData.changeStatusOfuserId = changeStatusOfuserId;
        //    ajaxCaller("POST", "/Users/changeUserStatus", JSON.stringify(inputData), "application/json", "Please wait ! Getting Screen Parameters").done(function (data) {

        //        if (data.Status == 1) {
        //            searchUsers();

        //            showMessage("green", data.Description, "");
        //        } else {
        //            showMessage("red", data.Description, "");
        //        }

        //    });
    });
}

function userIdToStatus(userId) {
    debugger
    input_Data.changeStatusOfuserId = userId;

    $("#deleteUser").modal('show');
}

function onClickCancelDeleteUserModel(inputData) {
    debugger
    $('#deleteUser').modal('hide');
}

function onclickYesDeleteUserModel() {
    debugger
    $('#deleteUser').modal('hide');
    ajaxCaller("POST", "/Users/changeUserStatus", JSON.stringify(input_Data), "application/json", "Please wait ! Getting Screen Parameters").done(function (data) {

        if (data.Status == 1) {
            searchUsers();

            showMessage("green", data.Description, "");
        } else {
            showMessage("red", data.Description, "");
        }

    });

}

//-----DOuble click on Datatable row to view Users Details----//
var UserRolesAssisgn = "";
$('#userDetailsDataTable').on("dblclick", 'td', function (e) {
    e.preventDefault();

    var inputData = {};

    var grdItemDataTable = $('#userDetailsDataTable').DataTable();
    var rowIndex = grdItemDataTable.row(this).index()
    var data = grdItemDataTable.row(this).data();
    var UserId = data[1];
    inputData.searchInputKeyword = "";
    inputData.userName = "";
    inputData.department = "";
    inputData.userRoles = ""
    inputData.userStatus = "";
    inputData.searchuserId = UserId;
    ajaxCaller("POST", "/Users/searchUsers", JSON.stringify(inputData), "application/json", "Please wait ! Getting Screen Parameters").done(function (data) {
        if (data.Status == 1) {

            debugger;
            var oResult = data.Result[0];
            var grdItemDataTable = $('#userDetailsDataTable').DataTable();
            oresult = oResult;
            createNewUserOrUpdateUser();
            $('#txtdeptvalue').prop("disabled", false).removeClass("fixed-label");
            $('#txtstatusvalue').prop("disabled", false).removeClass("fixed-label");
            //$("#txtrepassword").prop("disabled", false).removeClass("fixed-label");
            //$("#txtpassword").prop("disabled", false).removeClass("fixed-label");
            debugger;

            if (oResult.UserId != null && oResult.UserId != undefined && oResult.UserId != "")
                $("#hdnUserId").val(oResult.UserId);
            if (oResult.UserName != null && oResult.UserName != undefined && oResult.UserName != "") {
                var userName = oResult.UserName;
                var splitName = userName.split(" ");
                if (splitName != null) {
                    $("#txtfirstName").val(splitName[0]);
                    $("#txtfirstName").prop("disabled", true).addClass("fixed-label");

                }
                if (splitName != null) {
                    $("#txtlastName").val(splitName[1]);
                    $("#txtlastName").prop("disabled", true).addClass("fixed-label");
                }
            }

            if (oResult.UserContactNo != null && oResult.UserContactNo != undefined && oResult.UserContactNo != "")
                $("#txtcontactNo").val(oResult.UserContactNo);
            $("#txtcontactNo").prop("disabled", true).addClass("fixed-label");

            //if (oResult.UserPassword != null && oResult.UserPassword != undefined && oResult.UserPassword != "")
            //    $("#txtpassword").val(oResult.UserPassword);
            //$("#txtpassword").prop("disabled", false).removeClass("fixed-label");
            //password = $("#txtpassword").val();
            //if (oResult.UserPassword != null && oResult.UserPassword != undefined && oResult.UserPassword != "")
            //    $("#txtrepassword").val(oResult.UserPassword);
            //$("#txtrepassword").prop("disabled", false).removeClass("fixed-label");
            //repassword = $("#txtrepassword").val();

            if (oResult.DepartmentId != null && oResult.DepartmentId != undefined && oResult.DepartmentId != "")
                $("#hdnDeptSearchtxtdeptvalue").val(oResult.DepartmentId);


            if (oResult.Department != null && oResult.Department != undefined && oResult.Department != "")
                $("#txtdeptvalue").val(oResult.Department);
            department = $("#txtdeptvalue").val();

            if (oResult.UserStatus != null && oResult.UserStatus != undefined && oResult.UserStatus != "")
                $("#txtstatusvalue").val(oResult.UserStatus);
            $('#txtstatusvalue').prop("disabled", false);
            status = $("#txtstatusvalue").val();
            if (oResult.UserEmail != null && oResult.UserEmail != undefined && oResult.UserEmail != "")
                $("#txtemailId").val(oResult.UserEmail);

            $("#txtemailId").prop("disabled", true).addClass("fixed-label");

            if (oResult.AssignIndustrySegmentName != null && oResult.AssignIndustrySegmentName != undefined && oResult.AssignIndustrySegmentName != "")
                $("#txtSchIndustrySegment").val(oResult.AssignIndustrySegmentName);


            if (oResult.RoleId != null && oResult.RoleId != undefined && oResult.RoleId != "")
                var userRolesAssisgn = oResult.RoleId.split(",")

            for (var i = 0; i <= userRolesAssisgn.length - 1; i++) {
                $("#userRole-" + userRolesAssisgn[i]).prop("checked", true);

            }
            for (var i = 1; i <= roleListLength; i++) {
                $("#userRole-" + i).attr("disabled", false);
            }
            if (($("#userRole-3").prop("checked") == true)) {
                $("#txtSchIndustrySegment").prop("disabled", false).addClass("fixed-label");
            } else {
                $("#txtSchIndustrySegment").prop("disabled", true).addClass("fixed-label");

            }
            if (oResult.UserRoleLinkId != null && oResult.UserRoleLinkId != undefined && oResult.UserRoleLinkId != "")
                $('#hdnUserRolelinkIds').val(oResult.UserRoleLinkId);



            $("#btnsaveuser").show();
            $("#btnreset").show();

        } else {
            showMessage("red", data.Description, "");
        }
        window.scroll(0, 0);
    });

});



function searchTextBoxList(textBoxSerchId, url, listId, inputFieldID) {
    debugger;
    $("#" + textBoxSerchId + "").bind("click keyup", function (e) {

        $("#" + inputFieldID + "").val("");
        var inputData = {};
        inputData.text = "";

        if ($("#" + textBoxSerchId + "").val().length >= 0) {
            ajaxCaller(
                    "POST", url, JSON.stringify(inputData), "application/json", 'Loading Suggestions')
                .done(function (data) {

                    if (data.Status == 1) {
                        if (data.Result.length > 0) {

                            showResultListLoc(data, textBoxSerchId, listId, inputFieldID);
                        } else {
                            var list = '';
                            list += '<li class="list-group-item list-search-items"   style="width:100%;">' +
                                '<div class="clearfix" ><span  >Nothing Found. Try Other Keywords</span></div>' +
                                '</li>';
                            $("." + listId + "").show();
                            $("." + listId + "").empty();
                            $("." + listId + "").append(list);

                        }
                    } else {
                        showMessage("red", data.Description);
                    }
                });
        } else {
            $("." + listId + "").hide();
            return;
        }
    });
}

function SearchTextBoxListbySpan(textBoxSerchId, url, listId, inputFieldID, spanId) {
    debugger;
    $("#" + spanId + "").bind("click keyup", function (e) {

        $("#" + inputFieldID + "").val("");
        var inputData = {};
        inputData.text = "";

        if ($("#" + textBoxSerchId + "").val().length >= 0) {
            ajaxCaller(
                    "POST", url, JSON.stringify(inputData), "application/json", 'Loading Suggestions')
                .done(function (data) {

                    if (data.Status == 1) {
                        if (data.Result.length > 0) {

                            showResultListLoc(data, textBoxSerchId, listId, inputFieldID);
                        } else {
                            var list = '';
                            list += '<li class="list-group-item list-search-items"   style="width:100%;">' +
                                '<div class="clearfix" ><span  >Nothing Found. Try Other Keywords</span></div>' +
                                '</li>';
                            $("." + listId + "").show();
                            $("." + listId + "").empty();
                            $("." + listId + "").append(list);

                        }
                    } else {
                        showMessage("red", data.Description);
                    }
                });
        } else {
            $("." + listId + "").hide();
            return;
        }
    });
}

function showResultListLoc(oResponse, textBoxSerchId, listId, inputFieldID) {
    if (oResponse.Status == 1) {
        ;
        var oResult = oResponse.Result;
        var list = '';
        var listIncrementer = 0;
        $.each(oResult, function (key, value) {
            var id = value.Id;
            var name = value.Name;
            list += '<li value="' + name + '"  onClick=onSelectItemLoc(this,"' + textBoxSerchId + '","' + listId + '","' + inputFieldID + '","' + id + '")>' +

                '<span>' + name + '</span>' +
                '</li>';
        });

        $("." + listId + "").show();
        $("." + listId + "").empty();
        $("." + listId + "").append(list);
    } else {
        showMessage(oResponse.Description);
    }
}


function onSelectItemLoc(id, textBoxSerchId, listId, inputFieldID, itemId) {
    ;
    $("#" + inputFieldID + "").val(id.parentNode.parentNode.getAttribute("data-id"));
    document.getElementById(textBoxSerchId).value = id.innerText;
    document.getElementById(inputFieldID).value = itemId;

    $("." + listId + "").empty();
    $("#" + inputFieldID + "").val();

}