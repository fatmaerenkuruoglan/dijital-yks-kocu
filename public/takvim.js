const mainCalendar = document.getElementById('mainCalendar');
const miniCalendar = document.getElementById('miniCalendar');
const datePicker = document.getElementById('datePicker');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const toast = document.getElementById('toast');

let dbTasks = {}; 
let todayDate = new Date();
todayDate.setHours(0, 0, 0, 0); 

let selectedDate = new Date();

datePicker.value = formatDate(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

async function init() {
    try {
        await fetchTasksFromDB(); 
    } catch (error) {
        console.error("Veritabanı bağlantı hatası:", error);
    }
    renderCalendars(); 
    
    datePicker.onchange = (e) => {
       
        selectedDate = new Date(e.target.value);
        renderCalendars();
    };
}

window.deleteTask = async function(dateStr, index) {
    if(confirm("Bu görevi silmek istediğine emin misin?")) {
        const taskText = dbTasks[dateStr][index].text; 
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/takvim/delete', { 
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ date: dateStr, text: taskText })
            });

            if (response.ok) {
                dbTasks[dateStr].splice(index, 1); 
                renderCalendars(); 
            }
        } catch (error) {
            console.error("Silme işlemi başarısız:", error);
        }
    }
}

async function fetchTasksFromDB() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const response = await fetch('http://localhost:3000/api/takvim/tasks', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
        dbTasks = await response.json();
    }
}

function renderCalendars() {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay(); 
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    miniCalendar.innerHTML = '';
    mainCalendar.innerHTML = '';

    const priorityDots = { 'DÜŞÜK': '🟢', 'ORTA': '🟡', 'YÜKSEK': '🔴' };

    for (let x = 0; x < startOffset; x++) {
        const emptyBox = document.createElement('div');
        emptyBox.className = 'day-box empty';
        mainCalendar.appendChild(emptyBox);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = formatDate(year, month, i);

        
        const miniDay = document.createElement('div');
        miniDay.className = 'mini-day';
        miniDay.innerText = i;
       
        if (dateStr === datePicker.value) miniDay.classList.add('selected');
        
        miniDay.onclick = () => {
            datePicker.value = dateStr;
            selectedDate = new Date(dateStr);
            renderCalendars();
        };
        miniCalendar.appendChild(miniDay);


        const dayBox = document.createElement('div');
        dayBox.className = 'day-box';

       
        if (dateStr === datePicker.value) {
            dayBox.classList.add('selected-frame'); 
        }

        const todayStr = formatDate(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
        if (dateStr === todayStr) {
            dayBox.classList.add('today-highlight'); 
        }

        dayBox.innerHTML = `<span>${i}</span>`;
        
        if (dbTasks[dateStr] && Array.isArray(dbTasks[dateStr])) {
            dbTasks[dateStr].forEach((task, index) => {
                const pill = document.createElement('div');
                const priorityClass = task.priority || 'ORTA';
                pill.className = `task-pill ${task.status === 'done' ? 'completed' : ''} priority-${priorityClass}`;
                
                const dot = priorityDots[priorityClass] || '⚪';

                pill.innerHTML = `
                    <span class="task-text">${dot} ${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask('${dateStr}', ${index})">×</button>
                `;
                dayBox.appendChild(pill);
            });
        }
        mainCalendar.appendChild(dayBox);
    }
}

addTaskBtn.onclick = async () => {
    const text = taskInput.value.trim();
    const dateStr = datePicker.value;
    const prioritySelect = document.getElementById('priorityInput');
    const priority = prioritySelect ? prioritySelect.value : 'ORTA';

    if (!text) return;

    const chosenDate = new Date(dateStr);
    chosenDate.setHours(0,0,0,0);
    
    if (chosenDate < todayDate) {
        showToast("Geçmiş tarihlere görev ekleyemezsiniz!");
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/takvim/add-task', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: text, date: dateStr, priority: priority }) 
        });

        if (response.ok) {
            await fetchTasksFromDB(); 
            renderCalendars();
            taskInput.value = '';
        } else if (response.status === 403) {
            alert("Oturum süreniz dolmuş veya yetkiniz yok. Lütfen tekrar giriş yapın.");
        } else {
            console.error("Sunucu hatası: Görev eklenemedi.");
        }
    } catch (error) {
        console.error("Kayıt hatası:", error);
    }
};

function showToast(message) {
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function formatDate(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
}

init();