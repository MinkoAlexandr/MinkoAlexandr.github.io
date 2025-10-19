document.addEventListener("DOMContentLoaded", function () {

    const select = document.querySelectorAll(
        "input[name=\"serviceType\"]"
    );
    const resDiv = document.getElementById("result");
    const optionDiv = document.getElementById("optionSelect");
    const checkDiv = document.getElementById("checkSelect");
    const foodOption = document.getElementById("SplitOption");
    const sauces = document.querySelectorAll(
        "#SplitCheck input[type=\"checkbox\"]"
    );
    const quantityInput = document.getElementById("quantity");

    function changeClass() {
        const selected = document.querySelector(
            "input[name=\"serviceType\"]:checked"
        );
        if (!selected) {
            return;
        }
        if (selected.value === "1000") {
            optionDiv.className = "mt-3 w-100";
            checkDiv.className = "d-none mt-3 w-100";
        } else if (selected.value === "3500") {
            optionDiv.className = "d-none mt-3 w-100";
            checkDiv.className = "mt-3 w-100";
        } else {
            optionDiv.className = "d-none mt-3 w-100";
            checkDiv.className = "d-none mt-3 w-100";
        }
    }

    function calculateTotal() {
        const selected = document.querySelector(
            "input[name=\"serviceType\"]:checked"
        );
        const strQuantity = document.getElementById("quantity").value;
        const quantity = Number(strQuantity);

        if (!selected) {
            resDiv.textContent = "Выберите опцию";
            resDiv.className = "alert alert-secondary mt-3 w-100 text-center";
            return;
        }

        if (!(/^\d+$/.test(strQuantity)) || quantity <= 0) {
            resDiv.textContent = "Введите корректное положительное число";
            resDiv.className = "alert alert-secondary mt-3 w-100 text-center";
            return;
        }

        const price = Number(selected.value);
        let optionPrice = 0;
        let saucePrice = 0;

        if (selected.value === "1000") {
            optionPrice = Number(document.getElementById("SplitOption").value);
        }

        if (selected.value === "3500") {
            const checkedSauces = document.querySelectorAll(
                "#SplitCheck input[type=\"checkbox\"]:checked"
            );
            checkedSauces.forEach(function (sauce) {
                saucePrice += Number(sauce.value);
            });
        }

        const total = (price + optionPrice + saucePrice) * quantity;

        resDiv.textContent = "Стоимость заказа: " + total + " ₽";
        resDiv.className = "alert alert-success mt-3 w-100 text-center";
    }

    select.forEach(function (radio) {
        radio.addEventListener("change", function () {
            changeClass();
            calculateTotal();
        });
    });

    foodOption.addEventListener("change", calculateTotal);
    sauces.forEach(function (sauce) {
        sauce.addEventListener("change", calculateTotal);
    });
    quantityInput.addEventListener("input", calculateTotal);
});