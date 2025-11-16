// Ключ для LocalStorage
const STORAGE_KEY = 'feedbackFormData';


document.addEventListener('DOMContentLoaded', function() {
    
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackForm = document.getElementById('feedbackForm');
    
    // Инициализация модального окна Bootstrap
    const modal = new bootstrap.Modal(feedbackModal);
    
    // Обработчик открытия модального окна
    feedbackModal.addEventListener('show.bs.modal', function() {
        
        history.pushState({ modalOpen: true }, '', '#feedback');
     
        restoreFormData();
    });
    
    // Обработчик закрытия модального окна
    feedbackModal.addEventListener('hide.bs.modal', function() {
       
        if (window.location.hash === '#feedback') {
            history.replaceState(null, '', window.location.pathname);
        }
    });
    
   
    window.addEventListener('popstate', function() {
        if (modal._isShown) {
            modal.hide();
        }
    });
    
    
    const formInputs = document.querySelectorAll('#feedbackForm input, #feedbackForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', saveFormData);
    });
    document.getElementById('agreement').addEventListener('change', saveFormData);
    
   
    feedbackForm.addEventListener('submit', handleFormSubmit);
});

// Сохранение данных формы в LocalStorage
function saveFormData() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        organization: document.getElementById('organization').value,
        message: document.getElementById('message').value,
        agreement: document.getElementById('agreement').checked
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Восстановление данных формы из LocalStorage
function restoreFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('fullName').value = formData.fullName || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('phone').value = formData.phone || '';
        document.getElementById('organization').value = formData.organization || '';
        document.getElementById('message').value = formData.message || '';
        document.getElementById('agreement').checked = formData.agreement || false;
    }
}

// Очистка данных формы в LocalStorage
function clearFormData() {
    localStorage.removeItem(STORAGE_KEY);
}

// Обработчик отправки формы
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const feedbackModal = document.getElementById('feedbackModal');
    const modal = bootstrap.Modal.getInstance(feedbackModal);
    
    // Блокируем кнопку отправки
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Отправка...';
    
    // Скрываем предыдущие сообщения
    successMessage.classList.add('d-none');
    errorMessage.classList.add('d-none');
    
    // Собираем данные формы
    const formData = new FormData(e.target);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        organization: formData.get('organization'),
        message: formData.get('message'),
        agreement: formData.get('agreement') === 'on'
    };
    
    try {
        
        const response = await fetch('https://formcarry.com/s/your-form-id', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            showMessage(successMessage);
            e.target.reset();
            clearFormData();
            
            
            setTimeout(() => {
                modal.hide();
            }, 2000);
        } else {
            showMessage(errorMessage);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showMessage(errorMessage);
    } finally {
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Отправить';
    }
}

function showMessage(messageElement) {
    messageElement.classList.remove('d-none');
    
    
    setTimeout(() => {
        messageElement.classList.add('d-none');
    }, 5000);
}