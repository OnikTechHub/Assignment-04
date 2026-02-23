
let Interviews = [];
let Rejecteds = [];
let currentStatus = "all";


const totalCount = document.getElementById('totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');


const tabCount = document.getElementById('tabCount');
const allFilterBtn = document.getElementById('allFilter');

const interviewFilterBtn = document.getElementById('interviewFilter');
const rejectedFilterBtn = document.getElementById('rejectedFilter');

const allCards = document.getElementById('allCards');

const filteredSection = document.getElementById('filtered-section');
const emptyState = document.getElementById('emptyState');
const mainContainer = document.querySelector('main');



function updateCounts() {
    totalCount.innerText = allCards.children.length;
    interviewCount.innerText = Interviews.length;
    rejectedCount.innerText = Rejecteds.length;

    if (currentStatus === 'all') {
        tabCount.innerText = allCards.children.length + ' jobs';
    } else if (currentStatus === "interview") {
        tabCount.innerText = Interviews.length + ' jobs';
    } else {
        tabCount.innerText = Rejecteds.length + ' jobs';
    }
}



function checkEmpty() {
    let isEmpty = false;

    
    if (currentStatus === 'all' && allCards.children.length === 0) {
        isEmpty = true;
    }

    if (currentStatus === 'interview' && Interviews.length === 0) {
        isEmpty = true;
    }

    if (currentStatus === "rejected" && Rejecteds.length === 0) {
        isEmpty = true;
    }

    if (isEmpty) {
        emptyState.classList.remove('hidden');
    } 
    
    else {
        emptyState.classList.add('hidden');
    }
}


function toggleStyle(id) {

    allFilterBtn.classList.remove(  'bg-blue-500', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

    allFilterBtn.classList.add('bg-white', 'text-black');
    interviewFilterBtn.classList.add('bg-white', 'text-black');
    rejectedFilterBtn.classList.add('bg-white', 'text-black');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-blue-500', 'text-white');

    if (id === 'allFilter') {
        currentStatus = 'all';
        allCards.classList.remove('hidden');
        filteredSection.classList.add('hidden');
    }

    if (id === 'interviewFilter') {
        currentStatus = 'interview';
        allCards.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderInterviews();
    }

    if (id === 'rejectedFilter') {
        currentStatus = 'rejected';
        allCards.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderRejecteds();
    }

    updateCounts();
    checkEmpty();
}




mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains(   'interview-btn')) {

        const parent = event.target.closest('.card');

        const companyName = parent.querySelector('.com-name').innerText;
        const position = parent.querySelector('.position').innerText;
        const location = parent.querySelector('.location').innerText;
        const description = parent.querySelector('.description').innerText;

        parent.querySelector(".status-badge").innerText = 'Interview';

        const job = {
            companyName,
            position,
            location,
            description 
        };

        const jobExists = Interviews.find(item => item.companyName === companyName);
        if (!jobExists) {
            Interviews.push(job);
        }

        Rejecteds = Rejecteds.filter(item => item.companyName !== companyName);

        if (currentStatus === 'interview') {
            renderInterviews();
        }
        else if (currentStatus === 'rejected') {
            renderRejecteds();
        }

        updateCounts();
        checkEmpty();
    }



    else if (event.target.classList.contains('reject-btn')) {

        const parent = event.target.closest('.card');

        const companyName = parent.querySelector('.com-name').innerText;
        const position = parent.querySelector('.position').innerText;
        const location = parent.querySelector('.location').innerText;
        const description = parent.querySelector('.description').innerText;

        parent.querySelector(".status-badge").innerText = 'Rejected';

        const job = { 
            companyName, 
            position, 
            location, 
            description 
        };


        
        const jobExists = Rejecteds.find(item => item.companyName === companyName);
        if (!jobExists) {
            Rejecteds.push(job);
        }
        Interviews = Interviews.filter(item => item.companyName !== companyName);
    

        if (currentStatus === 'interview') {
        renderInterviews();
    }
    else if (currentStatus === 'rejected') {
        renderRejecteds();
    }

        updateCounts();
        checkEmpty();
    }

    if (event.target.closest('.delete-button')) {

        const parent = event.target.closest('.card');
        const companyName = parent.querySelector('.com-name').innerText;

        parent.remove();

        Interviews = Interviews.filter(item => item.companyName !== companyName);
        Rejecteds = Rejecteds.filter(item => item.companyName !== companyName);

        if (currentStatus === 'interview') renderInterviews();
        if (currentStatus === 'rejected') renderRejecteds();

        updateCounts();
        checkEmpty();
    }
});



function renderInterviews() {

    filteredSection.innerHTML = "";

    Interviews.forEach(job => {

        const div = document.createElement('div');
        div.innerHTML = createCard(job, 'Interview');

        filteredSection.appendChild(div);
    });
}

function renderRejecteds() {

    filteredSection.innerHTML = '';

    Rejecteds.forEach(job => {

        const div = document.createElement('div');
        div.innerHTML = createCard(job, 'Rejected');

        filteredSection.appendChild(div);
    });
}




function createCard(job, status) {

    return `
    <div class="card bg-white rounded-xl shadow-md p-8 relative mb-4">
        <h2 class="com-name text-2xl font-bold">${job.companyName}</h2>
        <p class="position mt-3 text-lg text-gray-400">${job.position}</p>
        <p class="location text-gray-400 mt-3 text-sm">${job.location}</p>

        <div class="mt-4">
            <span class="status-badge bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-md font-medium">
                ${status}
            </span>
        </div>

        <p class="description text-gray-500 mt-4">${job.description}</p>

        <div class="mt-6 flex gap-4">
            <button class="interview-btn px-5 py-2 border border-green-500 text-green-600 rounded-md">Interview</button>
            <button class="reject-btn px-5 py-2 border border-red-500 text-red-600 rounded-md">Rejected</button>
            <button class="delete-button absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>
    `;
}


updateCounts();
checkEmpty();