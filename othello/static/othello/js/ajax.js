function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// function csrfSafeMethod(method) {
//     // these HTTP methods do not require CSRF protection
//     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
// }
//
// $("form").submit( function(event) {
//         event.preventDefault();
//         var form = $(this);
//         $.ajax({
//           url: form.prop("action"),
//           method: form.prop("method"),
//           data: form.serialize(),
//           timeout: 10000,
//           dataType: "json",
//         })
//         .done( function(data) {
//           alert("done");
//           $("#id_div_ajax_response").text(data);
//         })
//       });

$(document).on("click", "#button_id", function() {
    console.log('click')
    var button = $(this);
    var csrf_token = getCookie("csrftoken");

    $.ajax({
        url: "/othello/ajax/",
        method: "POST",
        data: {
               "key1": 1,
               "key2": 2,
           },
        timeout: 10000,
        dataType: "json",
        beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrf_token);
                }},
        success: function(data) {
                alert(data);
                $("#id_div_ajax_response1").text(data.key1);
                $("#id_div_ajax_response2").text(data.key2);
            },
        error: function(xhr, status, error) {
                alert(status + "\n" +
                        "Status: " + xhr.status + "\n" + error);
            }
    });
});