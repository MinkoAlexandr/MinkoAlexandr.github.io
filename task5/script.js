document.addEventListener("DOMContentLoaded", function () {

    let btn = document.getElementById("calcButton");

    btn.onclick = function () {

        let select = document.getElementById("good");
        let price = Number(select.value);
        let strQuantity = document.getElementById("quantity").value;
        let quantity = Number(strQuantity);
        let resDiv = document.getElementById("result");

        resDiv.className = "alert";

        if (!(/^\d+$/).test(strQuantity) || quantity <= 0) {
            resDiv.textContent = "Введите корректное положительное число";
            resDiv.className = "alert alert-danger";
            return;
        }

        let total = price * quantity;
        resDiv.textContent = "Стоимость заказа: " + total + " gold";
        resDiv.className = "alert alert-success";
    };
});