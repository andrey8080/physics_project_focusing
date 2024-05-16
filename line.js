// Находим красную точку, линию и контейнер graphs в DOM
const handle = document.getElementById('handle');
const line = document.getElementById('line');
const graphsContainer = document.querySelector('.graphs');

// Функция, которая обновляет положение линии в зависимости от положения красной точки
function updateLinePosition() {
    const handleRect = handle.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();
    
    // Новая позиция линии
    let newLeft = handleRect.left + handleRect.width / 2 - lineRect.width / 2;
    
    // Ограничиваем положение линии в пределах контейнера graphs
    const containerRect = graphsContainer.getBoundingClientRect();
    newLeft = Math.max(containerRect.left, Math.min(containerRect.right - lineRect.width, newLeft));
    
    // Устанавливаем новое положение линии
    line.style.left = newLeft + 'px';
}

// Событие, срабатывающее при нажатии на красную точку
handle.addEventListener('mousedown', function(event) {
    // Предотвращаем действие по умолчанию (например, выделение текста)
    event.preventDefault();
    
    // Функция, которая будет вызываться при перемещении мыши
    function onMouseMove(moveEvent) {
        // Получаем текущее положение мыши
        const mouseX = moveEvent.clientX;
        
        // Ограничиваем положение красной точки в пределах контейнера graphs
        const containerRect = graphsContainer.getBoundingClientRect();
        const newLeft = Math.max(containerRect.left, Math.min(containerRect.right - handle.offsetWidth, mouseX));
        
        // Устанавливаем новое положение красной точки
        handle.style.left = newLeft + 'px';
        
        // Обновляем положение линии
        updateLinePosition();
    }
    
    // Событие, срабатывающее при отпускании кнопки мыши
    function onMouseUp(upEvent) {
        // Удаляем обработчики событий
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    
    // Добавляем обработчики событий перемещения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Инициализация положения линии
updateLinePosition();
