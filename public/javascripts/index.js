'use strict';
window.onload = () => {
    let radio1 = document.getElementById('optionsRadios1');
    let radio2 = document.getElementById('optionsRadios2');
    radio1.onclick = () => {
        $('#person').attr('disabled', true);
        // document.getElementById('person').setAttribute('disabled', false)
    }
    radio2.onclick = () => {
        $('#person').attr('disabled', false);
        // document.getElementById('person').setAttribute('disabled', false)
    }
}
function check() {
    let name = document.myform.name.value.trim(),
        donetime = document.myform.donetime.value.trim(),
        forWho = document.myform.forWho.value.trim(),
        content = document.myform.content.value.trim();
    if (name === "" || name === null) {
        alert("未填写单位名称");
        return false;
    }
    if (donetime === "" || donetime === null) {
        alert("未填写办理时间");
        return false;
    }
    if (forWho === "" || forWho === null) {
        alert("未填写办事对象");
        return false;
    }
    if (content === "" || content === null) {
        alert("未填写主要内容");
        return false;
    }
    $('#btn').attr('disabled','disabled');
    return true;
}