async function addParticipant(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetch('/participants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        
        if (response.ok) {
            showMessage('Participante registrado com sucesso!', 'success');
            form.reset();
            
            // Atualiza a lista de participantes
            const activityId = formData.get('activity_id');
            await updateParticipantsList(activityId);
        } else {
            showMessage('Erro ao registrar participante.', 'error');
        }
    } catch (error) {
        showMessage('Erro ao conectar com o servidor.', 'error');
    }
}

async function updateParticipantsList(activityId) {
    try {
        const response = await fetch(`/activities/${activityId}/participants`);
        const participants = await response.json();
        
        const participantsList = document.querySelector(`#activity-${activityId} .participants-list`);
        if (!participantsList) return;
        
        participantsList.innerHTML = '';
        
        participants.forEach(participant => {
            const li = document.createElement('li');
            li.textContent = participant.name;
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-participant';
            deleteButton.onclick = () => deleteParticipant(participant.id, activityId);
            
            li.appendChild(deleteButton);
            participantsList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao atualizar lista de participantes:', error);
    }
}

function showMessage(text, type) {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 3000);
}

// Adiciona os event listeners quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', addParticipant);
    }
});
