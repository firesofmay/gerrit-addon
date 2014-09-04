function get_patch_set() {
    logged_in_usr = document.querySelector("#gerrit_topmenu div[role='menubar'] span").textContent;
    result = [];
    logs = document.querySelectorAll("#gerrit_body .GFE-PU4BFC.GFE-PU4BHC");
    get_patch_no = /(.*):(.*)/;
    for (i = 0; i < logs.length; i++) {
        if (logs[i].querySelector("td[title='" + logged_in_usr + "']")) {
            txt = logs[i].lastChild.textContent;
            patch = get_patch_no.exec(txt);
            if (patch) {
                result.push(patch[1]);
            }
        }
    }
    if (result.length == 0) {
        return null;
    } else {
        return result[result.length - 1];
    }
}

function select_option(s) {
    d = document.querySelector(".gwt-ListBox");
    for (i = 0; i < d.length; i++) {
        if (d[i].textContent == s) {
            elm = document.querySelector(".gwt-ListBox");
            elm.value = d[i].value;
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            elm.dispatchEvent(evt);
            return;
        }
    }
}

function set_patch() {
    patch_number = get_patch_set();
    if (patch_number) {
        select_option(patch_number);
    }
}

//Sets the patch number if found.
set_patch();
